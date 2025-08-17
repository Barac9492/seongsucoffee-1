#!/usr/bin/env python3
"""
Seongsu Coffee & Bakery Forecast Agent
Collects attention signals and demand proxies for ML-based surge prediction
"""

import os
import sys
import time
import json
import logging
import asyncio
import hashlib
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional, Tuple
from dataclasses import dataclass, asdict

import pandas as pd
import numpy as np
import yaml
import pytz
from dotenv import load_dotenv
from sqlalchemy import create_engine, text, MetaData
from sqlalchemy.orm import Session
import structlog

# Google APIs
from pytrends.request import TrendReq
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.stdlib.PositionalArgumentsFormatter(),
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.StackInfoRenderer(),
        structlog.processors.format_exc_info,
        structlog.processors.UnicodeDecoder(),
        structlog.dev.ConsoleRenderer()
    ],
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
)

log = structlog.get_logger()

# ============= Configuration =============

load_dotenv()

@dataclass
class Config:
    """Runtime configuration"""
    postgres_dsn: str
    youtube_api_key: Optional[str]
    naver_client_id: Optional[str]
    naver_client_secret: Optional[str]
    log_level: str = "INFO"
    dry_run: bool = False
    
    @classmethod
    def from_env(cls) -> 'Config':
        return cls(
            postgres_dsn=os.getenv("DATABASE_URL") or os.getenv("POSTGRES_DSN", ""),
            youtube_api_key=os.getenv("YOUTUBE_API_KEY"),
            naver_client_id=os.getenv("NAVER_CLIENT_ID"),
            naver_client_secret=os.getenv("NAVER_CLIENT_SECRET"),
            log_level=os.getenv("LOG_LEVEL", "INFO"),
            dry_run=os.getenv("DRY_RUN", "false").lower() == "true"
        )

# ============= Database Models =============

from sqlalchemy import Table, Column, String, DateTime, Float, Integer, JSON, Index
from sqlalchemy.dialects.postgresql import insert as pg_insert

def create_tables(engine):
    """Create database schema"""
    meta = MetaData()
    
    # Raw signals from various sources
    signals_raw = Table(
        "signals_raw", meta,
        Column("id", Integer, primary_key=True, autoincrement=True),
        Column("source", String(40), nullable=False),
        Column("entity_type", String(20), nullable=False),  # keyword/venue/area
        Column("entity_id", String(128), nullable=False),
        Column("timestamp", DateTime, nullable=False),
        Column("metric", String(40), nullable=False),
        Column("value", Float, nullable=False),
        Column("metadata", JSON, nullable=True),
        Column("created_at", DateTime, default=datetime.utcnow),
        Index("idx_signals_timestamp", "timestamp"),
        Index("idx_signals_entity", "entity_type", "entity_id"),
    )
    
    # Processed daily features
    features_daily = Table(
        "features_daily", meta,
        Column("id", Integer, primary_key=True, autoincrement=True),
        Column("venue_id", String(128), nullable=False),
        Column("date", DateTime, nullable=False),
        Column("d_index", Float),  # Dopamine (novelty)
        Column("o_index", Float),  # Oxytocin (social)
        Column("c_index", Float),  # Cortisol (urgency)
        Column("s_index", Float),  # Serotonin (satisfaction)
        Column("weekday", Integer),
        Column("is_holiday", Integer),
        Column("weather_temp", Float),
        Column("weather_rain", Float),
        Column("created_at", DateTime, default=datetime.utcnow),
        Index("idx_features_venue_date", "venue_id", "date", unique=True),
    )
    
    # Labels for training
    labels = Table(
        "labels", meta,
        Column("id", Integer, primary_key=True, autoincrement=True),
        Column("venue_id", String(128), nullable=False),
        Column("date", DateTime, nullable=False),
        Column("surge_occurred", Integer),  # 0/1
        Column("busyness_percentile", Float),
        Column("queue_time_minutes", Float),
        Column("created_at", DateTime, default=datetime.utcnow),
        Index("idx_labels_venue_date", "venue_id", "date", unique=True),
    )
    
    # Run history
    runs_log = Table(
        "runs_log", meta,
        Column("id", Integer, primary_key=True, autoincrement=True),
        Column("started_at", DateTime, nullable=False),
        Column("finished_at", DateTime),
        Column("status", String(20)),
        Column("rows_inserted", Integer),
        Column("errors", JSON),
        Column("notes", String),
    )
    
    meta.create_all(engine)
    return {
        "signals_raw": signals_raw,
        "features_daily": features_daily,
        "labels": labels,
        "runs_log": runs_log
    }

# ============= Data Collectors =============

class GoogleTrendsCollector:
    """Collects Google Trends data including YouTube search trends"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.pytrends = TrendReq(hl="ko-KR", tz=540, timeout=(10, 30))
        
    def fetch(self, keywords: List[str]) -> pd.DataFrame:
        """Fetch trends for keywords"""
        results = []
        settings = self.config.get("collection", {}).get("google_trends", {})
        
        if not settings.get("enabled", True):
            return pd.DataFrame()
            
        geo = settings.get("geo", "KR-11")
        timeframe = settings.get("timeframe", "now 7-d")
        batch_size = settings.get("batch_size", 4)
        
        # Process web search trends
        for i in range(0, len(keywords), batch_size):
            batch = keywords[i:i+batch_size]
            try:
                self.pytrends.build_payload(
                    batch, 
                    cat=0, 
                    timeframe=timeframe, 
                    geo=geo, 
                    gprop=""
                )
                df = self.pytrends.interest_over_time()
                
                if not df.empty:
                    df = df.drop(columns=["isPartial"], errors="ignore")
                    df = df.reset_index()
                    df = df.melt(
                        id_vars=["date"], 
                        var_name="keyword", 
                        value_name="value"
                    )
                    df["source"] = "google_trends_web"
                    df["metric"] = "search_index"
                    results.append(df)
                    
                time.sleep(1.5)  # Rate limiting
                
            except Exception as e:
                log.warning("google_trends_batch_failed", batch=batch, error=str(e))
                time.sleep(3)
                
        # Process YouTube search trends
        for i in range(0, len(keywords), batch_size):
            batch = keywords[i:i+batch_size]
            try:
                self.pytrends.build_payload(
                    batch, 
                    cat=0, 
                    timeframe=timeframe, 
                    geo=geo, 
                    gprop="youtube"
                )
                df = self.pytrends.interest_over_time()
                
                if not df.empty:
                    df = df.drop(columns=["isPartial"], errors="ignore")
                    df = df.reset_index()
                    df = df.melt(
                        id_vars=["date"], 
                        var_name="keyword", 
                        value_name="value"
                    )
                    df["source"] = "google_trends_youtube"
                    df["metric"] = "search_index"
                    results.append(df)
                    
                time.sleep(1.5)
                
            except Exception as e:
                log.warning("youtube_trends_batch_failed", batch=batch, error=str(e))
                time.sleep(3)
                
        if results:
            return pd.concat(results, ignore_index=True)
        return pd.DataFrame()

class YouTubeGeoCollector:
    """Collects geo-tagged YouTube videos around Seongsu"""
    
    def __init__(self, api_key: str, config: Dict[str, Any]):
        self.api_key = api_key
        self.config = config
        self.youtube = None
        
    def _get_client(self):
        if not self.youtube:
            self.youtube = build("youtube", "v3", developerKey=self.api_key)
        return self.youtube
        
    def fetch(self, queries: List[str]) -> pd.DataFrame:
        """Fetch recent geo-tagged videos"""
        if not self.api_key:
            log.warning("youtube_api_key_missing")
            return pd.DataFrame()
            
        settings = self.config.get("collection", {}).get("youtube", {})
        if not settings.get("enabled", True):
            return pd.DataFrame()
            
        area = self.config.get("area", {})
        lat = area.get("lat", 37.544)
        lon = area.get("lon", 127.055)
        radius = area.get("radius_km", 3)
        
        max_results = settings.get("max_results", 25)
        hours_back = settings.get("published_after_hours", 48)
        
        published_after = (datetime.utcnow() - timedelta(hours=hours_back))
        published_after = published_after.isoformat("T") + "Z"
        
        results = []
        client = self._get_client()
        
        for query in queries:
            try:
                # Search for videos
                search_response = client.search().list(
                    q=query,
                    part="id,snippet",
                    type="video",
                    location=f"{lat},{lon}",
                    locationRadius=f"{radius}km",
                    order="date",
                    maxResults=max_results,
                    publishedAfter=published_after
                ).execute()
                
                video_ids = []
                videos = []
                
                for item in search_response.get("items", []):
                    video_id = item["id"]["videoId"]
                    video_ids.append(video_id)
                    videos.append({
                        "video_id": video_id,
                        "title": item["snippet"]["title"],
                        "channel_id": item["snippet"]["channelId"],
                        "timestamp": item["snippet"]["publishedAt"],
                        "query": query
                    })
                
                if video_ids:
                    # Get video statistics
                    stats_response = client.videos().list(
                        part="statistics",
                        id=",".join(video_ids)
                    ).execute()
                    
                    stats_map = {
                        item["id"]: item["statistics"]
                        for item in stats_response.get("items", [])
                    }
                    
                    for video in videos:
                        stats = stats_map.get(video["video_id"], {})
                        video["value"] = int(stats.get("viewCount", 0))
                        video["likes"] = int(stats.get("likeCount", 0))
                        video["comments"] = int(stats.get("commentCount", 0))
                        
                    df = pd.DataFrame(videos)
                    df["source"] = "youtube_geo"
                    df["metric"] = "video_stats"
                    results.append(df)
                    
                time.sleep(0.5)  # Rate limiting
                
            except HttpError as e:
                log.warning("youtube_api_error", query=query, error=str(e))
                time.sleep(2)
            except Exception as e:
                log.error("youtube_fetch_error", query=query, error=str(e))
                
        if results:
            return pd.concat(results, ignore_index=True)
        return pd.DataFrame()

class NaverDataLabCollector:
    """Collects Naver DataLab search trends"""
    
    def __init__(self, client_id: str, client_secret: str, config: Dict[str, Any]):
        self.client_id = client_id
        self.client_secret = client_secret
        self.config = config
        
    def fetch(self, keywords: List[str]) -> pd.DataFrame:
        """Fetch Naver search trends"""
        if not self.client_id or not self.client_secret:
            log.debug("naver_api_credentials_missing")
            return pd.DataFrame()
            
        # Implementation would go here
        # Using Naver DataLab API requires specific setup
        return pd.DataFrame()

class GoogleMapsBusynessCollector:
    """Collects Google Maps live busyness data"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        # Lazy import to avoid loading Playwright if not needed
        self.scraper_module = None
        
    def _get_scraper(self):
        """Lazy load the scraper module"""
        if self.scraper_module is None:
            from scrapers.fetch_gmaps_busyness_playwright import fetch_gmaps_busyness
            self.scraper_module = fetch_gmaps_busyness
        return self.scraper_module
        
    def fetch(self, venues: List[Dict[str, Any]]) -> pd.DataFrame:
        """Fetch live busyness for venues"""
        settings = self.config.get("collection", {}).get("google_maps", {})
        if not settings.get("enabled", True):
            return pd.DataFrame()
            
        fetch_func = self._get_scraper()
        results = []
        
        for venue in venues:
            try:
                result = fetch_func(venue)
                if result:
                    results.append({
                        "venue_id": result["venue_id"],
                        "timestamp": result["ts"],
                        "metric": result["metric"],
                        "value": result["value"],
                        "confidence": result["meta"].get("confidence", "unknown"),
                        "raw_percent": result["meta"].get("raw_percent"),
                        "source": "gmaps_live"
                    })
                    log.info("busyness_collected", 
                        venue_id=venue["venue_id"], 
                        value=result["value"],
                        confidence=result["meta"].get("confidence")
                    )
                else:
                    log.debug("no_busyness_data", venue_id=venue["venue_id"])
                    
                # Be polite between requests
                time.sleep(20)
                
            except Exception as e:
                log.warning("busyness_fetch_failed", 
                    venue_id=venue.get("venue_id"), 
                    error=str(e)
                )
                
        if results:
            return pd.DataFrame(results)
        return pd.DataFrame()

# ============= Signal Processing =============

class SignalProcessor:
    """Processes raw signals into features"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        
    def compute_indices(self, signals_df: pd.DataFrame, venue_id: str, date: datetime) -> Dict[str, float]:
        """Compute D/O/C/S indices from signals"""
        
        # Filter relevant signals
        venue_signals = signals_df[
            (signals_df["entity_id"] == venue_id) |
            (signals_df["entity_type"] == "area")
        ]
        
        if venue_signals.empty:
            return {"d_index": 0, "o_index": 0, "c_index": 0, "s_index": 0}
            
        indices = {}
        signal_config = self.config.get("signals", {}).get("indices", {})
        
        # Dopamine Index (Novelty velocity)
        d_signals = venue_signals[
            venue_signals["metric"].isin(["search_index", "video_stats"])
        ]
        if not d_signals.empty:
            # Calculate velocity (rate of change)
            d_values = d_signals.groupby("metric")["value"].mean()
            weights = signal_config.get("dopamine", {})
            indices["d_index"] = self._weighted_average(d_values, weights)
        else:
            indices["d_index"] = 0
            
        # Oxytocin Index (Social density)
        o_signals = venue_signals[
            venue_signals["metric"].isin(["live_busyness", "queue_mentions"])
        ]
        if not o_signals.empty:
            o_values = o_signals.groupby("metric")["value"].mean()
            weights = signal_config.get("oxytocin", {})
            indices["o_index"] = self._weighted_average(o_values, weights)
        else:
            indices["o_index"] = 0
            
        # Cortisol Index (Urgency)
        # Would include time-of-day patterns, limited availability signals
        indices["c_index"] = 0
        
        # Serotonin Index (Satisfaction)
        # Would include review sentiment, photo counts
        indices["s_index"] = 0
        
        return indices
        
    def _weighted_average(self, values: pd.Series, weights: Dict[str, float]) -> float:
        """Calculate weighted average of values"""
        total_weight = 0
        weighted_sum = 0
        
        for metric, value in values.items():
            weight = weights.get(f"weight_{metric}", 0.5)
            weighted_sum += value * weight
            total_weight += weight
            
        if total_weight > 0:
            return weighted_sum / total_weight
        return 0
        
    def normalize_signals(self, df: pd.DataFrame) -> pd.DataFrame:
        """Normalize signals using configured method"""
        method = self.config.get("signals", {}).get("normalization", {}).get("method", "zscore")
        window_days = self.config.get("signals", {}).get("normalization", {}).get("window_days", 30)
        
        if method == "zscore":
            # Z-score normalization
            for col in ["value"]:
                if col in df.columns:
                    df[f"{col}_normalized"] = (df[col] - df[col].mean()) / df[col].std()
                    
        elif method == "minmax":
            # Min-max normalization
            for col in ["value"]:
                if col in df.columns:
                    min_val = df[col].min()
                    max_val = df[col].max()
                    if max_val > min_val:
                        df[f"{col}_normalized"] = (df[col] - min_val) / (max_val - min_val)
                        
        return df

# ============= Main Agent =============

class ForecastAgent:
    """Main agent orchestrating data collection"""
    
    def __init__(self, config_path: str):
        self.config = self._load_config(config_path)
        self.runtime = Config.from_env()
        self.engine = None
        self.tables = None
        
        # Initialize collectors
        self.collectors = {
            "google_trends": GoogleTrendsCollector(self.config),
            "youtube": YouTubeGeoCollector(
                self.runtime.youtube_api_key, 
                self.config
            ) if self.runtime.youtube_api_key else None,
            "naver": NaverDataLabCollector(
                self.runtime.naver_client_id,
                self.runtime.naver_client_secret,
                self.config
            ) if self.runtime.naver_client_id else None,
            "gmaps_busyness": GoogleMapsBusynessCollector(self.config),
        }
        
        self.processor = SignalProcessor(self.config)
        
    def _load_config(self, path: str) -> Dict[str, Any]:
        """Load YAML configuration"""
        with open(path, "r", encoding="utf-8") as f:
            return yaml.safe_load(f)
            
    def _init_database(self):
        """Initialize database connection"""
        if not self.runtime.postgres_dsn:
            raise ValueError("POSTGRES_DSN not configured")
            
        self.engine = create_engine(self.runtime.postgres_dsn)
        self.tables = create_tables(self.engine)
        
    def run(self):
        """Execute one collection cycle"""
        run_id = None
        started_at = datetime.utcnow()
        
        try:
            self._init_database()
            
            # Log run start
            with self.engine.begin() as conn:
                result = conn.execute(
                    self.tables["runs_log"].insert().values(
                        started_at=started_at,
                        status="running"
                    )
                )
                run_id = result.inserted_primary_key[0]
                
            log.info("run_started", run_id=run_id)
            
            # Collect all signals
            all_signals = []
            
            # 1. Google Trends
            keywords = self._get_all_keywords()
            if self.collectors["google_trends"]:
                trends_df = self.collectors["google_trends"].fetch(keywords)
                if not trends_df.empty:
                    all_signals.append(self._format_signals(trends_df, "google_trends"))
                    log.info("collected_google_trends", rows=len(trends_df))
                    
            # 2. YouTube Geo
            if self.collectors["youtube"]:
                queries = list(set(["성수 카페", "성수 빵집"] + keywords[:5]))
                youtube_df = self.collectors["youtube"].fetch(queries)
                if not youtube_df.empty:
                    all_signals.append(self._format_signals(youtube_df, "youtube"))
                    log.info("collected_youtube", rows=len(youtube_df))
                    
            # 3. Naver DataLab (if configured)
            if self.collectors["naver"]:
                naver_df = self.collectors["naver"].fetch(keywords)
                if not naver_df.empty:
                    all_signals.append(self._format_signals(naver_df, "naver"))
                    log.info("collected_naver", rows=len(naver_df))
                    
            # 4. Google Maps Busyness
            venues = self.config.get("venues", [])
            if self.collectors["gmaps_busyness"] and venues:
                busyness_df = self.collectors["gmaps_busyness"].fetch(venues)
                if not busyness_df.empty:
                    all_signals.append(self._format_signals(busyness_df, "gmaps_busyness"))
                    log.info("collected_gmaps_busyness", rows=len(busyness_df))
                    
            # Combine and normalize signals
            if all_signals:
                combined_df = pd.concat(all_signals, ignore_index=True)
                normalized_df = self.processor.normalize_signals(combined_df)
                
                # Store in database
                rows_inserted = self._store_signals(normalized_df)
                
                # Compute daily features
                self._compute_daily_features(normalized_df)
                
                # Update run log
                with self.engine.begin() as conn:
                    conn.execute(
                        self.tables["runs_log"].update()
                        .where(self.tables["runs_log"].c.id == run_id)
                        .values(
                            finished_at=datetime.utcnow(),
                            status="success",
                            rows_inserted=rows_inserted
                        )
                    )
                    
                log.info("run_completed", 
                    run_id=run_id, 
                    rows_inserted=rows_inserted,
                    duration_seconds=(datetime.utcnow() - started_at).total_seconds()
                )
                
            else:
                log.warning("no_signals_collected")
                
        except Exception as e:
            log.error("run_failed", error=str(e), exc_info=True)
            
            if run_id and self.engine:
                try:
                    with self.engine.begin() as conn:
                        conn.execute(
                            self.tables["runs_log"].update()
                            .where(self.tables["runs_log"].c.id == run_id)
                            .values(
                                finished_at=datetime.utcnow(),
                                status="failed",
                                errors=json.dumps({"error": str(e)})
                            )
                        )
                except:
                    pass
                    
            raise
            
    def _get_all_keywords(self) -> List[str]:
        """Get all keywords from config"""
        keywords = []
        kw_config = self.config.get("keywords", {})
        
        for category in ["general", "items", "trends"]:
            keywords.extend(kw_config.get(category, []))
            
        return list(set(keywords))
        
    def _format_signals(self, df: pd.DataFrame, source: str) -> pd.DataFrame:
        """Format signals for database storage"""
        if df.empty:
            return pd.DataFrame()
            
        formatted = pd.DataFrame(index=df.index)
        
        if source in ["google_trends", "google_trends_web", "google_trends_youtube"]:
            formatted["source"] = df["source"] if "source" in df.columns else source
            formatted["entity_type"] = "keyword"
            formatted["entity_id"] = df["keyword"]
            formatted["timestamp"] = pd.to_datetime(df["date"])
            formatted["metric"] = "search_index"
            formatted["value"] = df["value"].astype(float)
            formatted["metadata"] = None
            
        elif source == "youtube":
            formatted["source"] = "youtube_geo"
            formatted["entity_type"] = "area"  
            formatted["entity_id"] = self.config["area"]["id"]
            formatted["timestamp"] = pd.to_datetime(df["timestamp"])
            formatted["metric"] = "video_views"
            formatted["value"] = df["value"].astype(float)
            formatted["metadata"] = df.apply(
                lambda x: json.dumps({
                    "video_id": str(x.get("video_id", "")),
                    "title": str(x.get("title", ""))[:200],  # Truncate long titles
                    "query": str(x.get("query", ""))
                }), axis=1
            )
            
        elif source == "gmaps_busyness":
            formatted["source"] = df["source"] if "source" in df.columns else "gmaps_live"
            formatted["entity_type"] = "venue"
            formatted["entity_id"] = df["venue_id"]
            formatted["timestamp"] = pd.to_datetime(df["timestamp"])
            formatted["metric"] = df["metric"] if "metric" in df.columns else "live_busyness"
            formatted["value"] = df["value"].astype(float)
            formatted["metadata"] = df.apply(
                lambda x: json.dumps({
                    "confidence": x.get("confidence", "unknown"),
                    "raw_percent": x.get("raw_percent")
                }), axis=1
            )
            
        return formatted
        
    def _store_signals(self, df: pd.DataFrame) -> int:
        """Store signals in database"""
        if self.runtime.dry_run:
            log.info("dry_run_mode", would_insert=len(df))
            return 0
            
        records = df.to_dict("records")
        
        with self.engine.begin() as conn:
            conn.execute(self.tables["signals_raw"].insert(), records)
            
        return len(records)
        
    def _compute_daily_features(self, signals_df: pd.DataFrame):
        """Compute and store daily features"""
        today = datetime.utcnow().date()
        
        for venue in self.config.get("venues", []):
            venue_id = venue["venue_id"]
            
            # Compute indices
            indices = self.processor.compute_indices(signals_df, venue_id, today)
            
            # Add metadata
            indices.update({
                "venue_id": venue_id,
                "date": today,
                "weekday": today.weekday(),
                "is_holiday": 0,  # Would check holiday calendar
                "created_at": datetime.utcnow()
            })
            
            # Upsert to database
            if not self.runtime.dry_run:
                with self.engine.begin() as conn:
                    stmt = pg_insert(self.tables["features_daily"]).values(**indices)
                    stmt = stmt.on_conflict_do_update(
                        index_elements=["venue_id", "date"],
                        set_=indices
                    )
                    conn.execute(stmt)

# ============= CLI =============

def main():
    """Main entry point"""
    import argparse
    
    parser = argparse.ArgumentParser(description="Seongsu Coffee Forecast Agent")
    parser.add_argument(
        "config", 
        nargs="?", 
        default="config.yaml",
        help="Path to configuration file"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Run without writing to database"
    )
    parser.add_argument(
        "--log-level",
        choices=["DEBUG", "INFO", "WARNING", "ERROR"],
        default="INFO",
        help="Logging level"
    )
    
    args = parser.parse_args()
    
    # Update environment
    if args.dry_run:
        os.environ["DRY_RUN"] = "true"
    if args.log_level:
        os.environ["LOG_LEVEL"] = args.log_level
        
    # Configure logging
    logging.basicConfig(level=getattr(logging, args.log_level))
    
    # Run agent
    agent = ForecastAgent(args.config)
    agent.run()

if __name__ == "__main__":
    main()