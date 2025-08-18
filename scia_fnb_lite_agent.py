#!/usr/bin/env python3
"""
SCIA-F&B Lite MVP Agent
F&B 트렌드 조기 탐지 + 광고 크리에이티브 자동 생성

스코프: Matcha·성수 카페/디저트 (LA Koreatown 중심)
신호: TikTok 증가율 + Google Trends CA
출력: Daily Brief + 광고 카피 (B2B+B2C)

4주 목표: 카페 업주 2-3명이 신메뉴/팝업 테스트 → 케이스 스터디 확보
"""

import os
import json
import logging
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass, asdict
from flask import Flask, jsonify, request
import numpy as np
import requests

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s | SCIA-F&B | %(levelname)s | %(message)s'
)
logger = logging.getLogger(__name__)

@dataclass
class FnBSignal:
    """F&B 트렌드 신호 데이터"""
    keyword: str
    platform: str  # 'tiktok' | 'google_trends'
    current_value: float
    previous_value: float
    growth_rate: float  # 7d vs 28d or 14d MoM
    confidence: str  # '높음' | '보통' | '낮음'
    timestamp: str
    region: str  # 'LA_Koreatown' | 'CA'

@dataclass 
class DailyBriefFnB:
    """Daily Brief 출력 형식"""
    date: str
    top_signal: Dict
    so_what: str
    action_for_owner: Dict  # {action, who, what, when, confidence}
    ad_copy_b2b: str
    ad_copy_b2c: str
    next_check: str

@dataclass
class WeeklyOnePageFnB:
    """Weekly One-Pager 출력 형식"""
    week_ending: str
    executive_oneliner: str
    signals: List[Dict]  # TikTok/Trends 그래프 데이터
    what_to_do: List[str]  # 체크리스트 3-5개
    ad_creative_seeds: Dict  # {graph_data, headlines, b2b_copy, b2c_copy}
    timing_window: str
    risks_unknowns: List[str]
    next_checkin: str

class SCIAFnBLiteAgent:
    """
    SCIA-F&B Lite MVP Agent
    
    Focus: Matcha·성수 카페/디저트 in CA (LA Koreatown 우선)
    Signals: TikTok views/uploads + Google Trends CA
    Output: Daily Brief + Ad Copy + Weekly One-Pager
    """
    
    def __init__(self):
        # 고정 키워드 (Week 1)
        self.focus_keywords = [
            "matcha latte",
            "matcha croissant", 
            "성수 브런치",
            "seongsu café",
            "korean dessert",
            "korean bakery"
        ]
        
        # 지역 포커스
        self.target_regions = {
            'LA_Koreatown': {'priority': 1, 'korean_density': 'high'},
            'Orange_County': {'priority': 2, 'korean_density': 'medium'},
            'San_Francisco': {'priority': 3, 'korean_density': 'medium'}
        }
        
        # 신호 임계값 (단순 규칙)
        self.signal_thresholds = {
            'tiktok_growth_significant': 15,  # 7d vs 28d >= +15%
            'trends_growth_significant': 10   # 14d vs baseline >= +10%
        }
        
        logger.info("SCIA-F&B Lite Agent initialized - Focus: Matcha/성수 café in CA")
    
    def collect_fnb_signals(self, keyword: str, region: str = 'LA_Koreatown') -> List[FnBSignal]:
        """
        F&B 관련 2개 신호 수집
        1. TikTok 증가율 (7d vs 28d)
        2. Google Trends CA (14d MoM)
        """
        signals = []
        
        try:
            # TikTok 신호 (시뮬레이션 - 실제로는 TikTok API/스크래핑)
            tiktok_signal = self._get_tiktok_signal(keyword, region)
            if tiktok_signal:
                signals.append(tiktok_signal)
            
            # Google Trends 신호 (시뮬레이션 - 실제로는 pytrends 사용)
            trends_signal = self._get_trends_signal(keyword, region)
            if trends_signal:
                signals.append(trends_signal)
            
            logger.info(f"Collected {len(signals)} signals for {keyword} in {region}")
            return signals
            
        except Exception as e:
            logger.error(f"Signal collection failed for {keyword}/{region}: {e}")
            return []
    
    def _get_tiktok_signal(self, keyword: str, region: str) -> Optional[FnBSignal]:
        """TikTok 뷰/업로드 증가율 시뮬레이션"""
        # 실제 구현에서는 TikTok API 또는 웹스크래핑
        # 현재는 리얼리스틱한 시뮬레이션 데이터
        
        baseline_values = {
            'matcha latte': {'views_7d': 125000, 'views_28d': 98000},
            'matcha croissant': {'views_7d': 45000, 'views_28d': 32000},
            '성수 브런치': {'views_7d': 15000, 'views_28d': 12000},
            'seongsu café': {'views_7d': 8500, 'views_28d': 7200}
        }
        
        base = baseline_values.get(keyword, {'views_7d': 10000, 'views_28d': 8500})
        
        # 성장률에 약간의 변동성 추가
        noise = np.random.normal(0, 5)
        
        if keyword == 'matcha latte':
            growth_rate = 22.5 + noise  # 높은 성장
        elif keyword == 'matcha croissant':
            growth_rate = 18.2 + noise  # 중간 성장
        else:
            growth_rate = 8.5 + noise   # 낮은 성장
            
        current_value = base['views_7d']
        previous_value = base['views_28d']
        
        # 확신도 계산
        if growth_rate >= self.signal_thresholds['tiktok_growth_significant']:
            confidence = '높음'
        elif growth_rate >= 10:
            confidence = '보통'
        else:
            confidence = '낮음'
        
        return FnBSignal(
            keyword=keyword,
            platform='tiktok',
            current_value=current_value,
            previous_value=previous_value,
            growth_rate=round(growth_rate, 1),
            confidence=confidence,
            timestamp=datetime.now().isoformat(),
            region=region
        )
    
    def _get_trends_signal(self, keyword: str, region: str) -> Optional[FnBSignal]:
        """Google Trends CA 증가율 시뮬레이션"""
        # 실제 구현에서는 pytrends 라이브러리 사용
        
        baseline_trends = {
            'matcha latte': {'current': 78, 'previous': 65},
            'matcha croissant': {'current': 45, 'previous': 38},
            '성수 브런치': {'current': 25, 'previous': 22},
            'seongsu café': {'current': 18, 'previous': 16}
        }
        
        base = baseline_trends.get(keyword, {'current': 30, 'previous': 28})
        
        current_value = base['current']
        previous_value = base['previous']
        growth_rate = ((current_value - previous_value) / previous_value) * 100
        
        # 확신도 계산
        if growth_rate >= self.signal_thresholds['trends_growth_significant']:
            confidence = '높음'
        elif growth_rate >= 5:
            confidence = '보통'
        else:
            confidence = '낮음'
        
        return FnBSignal(
            keyword=keyword,
            platform='google_trends',
            current_value=current_value,
            previous_value=previous_value,
            growth_rate=round(growth_rate, 1),
            confidence=confidence,
            timestamp=datetime.now().isoformat(),
            region='CA'
        )
    
    def calculate_combined_confidence(self, signals: List[FnBSignal]) -> str:
        """
        통합 확신도 계산
        - 두 조건 모두 충족 → 높음
        - 한쪽만 충족 → 보통  
        - 불일치 → 낮음
        """
        if len(signals) < 2:
            return '낮음'
        
        tiktok_high = any(s.platform == 'tiktok' and s.confidence == '높음' for s in signals)
        trends_high = any(s.platform == 'google_trends' and s.confidence == '높음' for s in signals)
        
        tiktok_medium = any(s.platform == 'tiktok' and s.confidence in ['높음', '보통'] for s in signals)
        trends_medium = any(s.platform == 'google_trends' and s.confidence in ['높음', '보통'] for s in signals)
        
        if tiktok_high and trends_high:
            return '높음'
        elif tiktok_medium and trends_medium:
            return '보통'
        else:
            return '낮음'
    
    def generate_daily_brief(self, target_region: str = 'LA_Koreatown') -> DailyBriefFnB:
        """
        Daily Brief 생성 (3줄, 간결·실행 가능)
        + B2B/B2C 광고 카피 포함
        """
        # 모든 키워드에 대해 신호 수집
        all_signals = []
        for keyword in self.focus_keywords:
            signals = self.collect_fnb_signals(keyword, target_region)
            for signal in signals:
                all_signals.append((keyword, signal))
        
        # 가장 강한 신호 찾기
        top_keyword, top_signals = self._find_top_trending_keyword(all_signals)
        
        if not top_signals:
            return self._generate_no_signal_brief()
        
        # Top Signal 정리
        tiktok_signal = next((s for s in top_signals if s.platform == 'tiktok'), None)
        trends_signal = next((s for s in top_signals if s.platform == 'google_trends'), None)
        
        combined_confidence = self.calculate_combined_confidence(top_signals)
        
        top_signal = {
            'keyword': top_keyword,
            'tiktok_growth': f"+{tiktok_signal.growth_rate}%" if tiktok_signal else "N/A",
            'trends_growth': f"+{trends_signal.growth_rate}%" if trends_signal else "N/A",
            'region': target_region,
            'timeframe': '7d vs 28d'
        }
        
        # So-What 요약
        so_what = self._generate_so_what(top_keyword, top_signals, combined_confidence)
        
        # 업주용 액션
        action = self._generate_owner_action(top_keyword, combined_confidence, target_region)
        
        # 광고 카피 생성
        b2b_copy = self._generate_b2b_ad_copy(top_keyword, tiktok_signal, trends_signal)
        b2c_copy = self._generate_b2c_ad_copy(top_keyword, target_region)
        
        return DailyBriefFnB(
            date=datetime.now().strftime('%Y-%m-%d'),
            top_signal=top_signal,
            so_what=so_what,
            action_for_owner=action,
            ad_copy_b2b=b2b_copy,
            ad_copy_b2c=b2c_copy,
            next_check=(datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
        )
    
    def _find_top_trending_keyword(self, all_signals: List[Tuple[str, FnBSignal]]) -> Tuple[str, List[FnBSignal]]:
        """가장 강한 트렌드 신호를 가진 키워드 찾기"""
        keyword_signals = {}
        
        for keyword, signal in all_signals:
            if keyword not in keyword_signals:
                keyword_signals[keyword] = []
            keyword_signals[keyword].append(signal)
        
        # 각 키워드의 평균 성장률 계산
        keyword_scores = {}
        for keyword, signals in keyword_signals.items():
            avg_growth = np.mean([s.growth_rate for s in signals])
            keyword_scores[keyword] = avg_growth
        
        # 가장 높은 점수의 키워드
        if keyword_scores:
            top_keyword = max(keyword_scores.items(), key=lambda x: x[1])[0]
            return top_keyword, keyword_signals[top_keyword]
        
        return "", []
    
    def _generate_so_what(self, keyword: str, signals: List[FnBSignal], confidence: str) -> str:
        """So-What 요약 생성"""
        tiktok_growth = next((s.growth_rate for s in signals if s.platform == 'tiktok'), 0)
        trends_growth = next((s.growth_rate for s in signals if s.platform == 'google_trends'), 0)
        
        if confidence == '높음':
            return f"{keyword} 트렌드가 TikTok (+{tiktok_growth}%), Google Trends (+{trends_growth}%) 모두에서 급상승. LA 한인타운 소비자 관심 집중."
        elif confidence == '보통':
            return f"{keyword} 관련 소셜미디어 활동 증가. 조기 채택자들 사이에서 관심 확산 중."
        else:
            return f"{keyword} 약한 신호 감지. 추가 모니터링 필요."
    
    def _generate_owner_action(self, keyword: str, confidence: str, region: str) -> Dict:
        """업주용 실행 가능한 액션 생성"""
        if confidence == '높음':
            if 'matcha' in keyword:
                action = f"{keyword} 메뉴 추가 또는 한정 판매 팝업 진행"
                who = "카페/베이커리 사장"
                what = f"{keyword} 기반 신메뉴 2-3개 개발 및 테스트"
                when = "2주 이내"
            else:
                action = f"{keyword} 컨셉 브런치 메뉴 테스트"
                who = "한식/카페 사장"  
                what = f"{keyword} 스타일 메뉴 3-5개 시범 운영"
                when = "3주 이내"
        elif confidence == '보통':
            action = f"{keyword} 관련 소규모 테스트 고려"
            who = "카페 운영자"
            what = f"{keyword} 메뉴 1-2개 제한적 출시"
            when = "4주 이내"
        else:
            action = f"{keyword} 트렌드 지속 모니터링"
            who = "F&B 사업자"
            what = "주간 트렌드 리포트 확인"
            when = "매주"
        
        return {
            'action': action,
            'who': who,
            'what': what,
            'when': when,
            'confidence': confidence
        }
    
    def _generate_b2b_ad_copy(self, keyword: str, tiktok_signal: Optional[FnBSignal], trends_signal: Optional[FnBSignal]) -> str:
        """B2B 업주용 광고 카피 생성"""
        tiktok_growth = f"+{tiktok_signal.growth_rate}%" if tiktok_signal else "상승세"
        
        b2b_templates = {
            'matcha latte': f"LA TikTok에서 매치라 라떼가 {tiktok_growth}. 지금 메뉴에 추가하세요.",
            'matcha croissant': f"매치라 크루아상 트렌드 {tiktok_growth} 급상승. 경쟁업체보다 먼저 출시하세요.",
            '성수 브런치': f"성수 감성 브런치가 LA에서 {tiktok_growth} 성장. 지금이 진출 타이밍입니다.",
            'seongsu café': f"성수 카페 컨셉이 {tiktok_growth} 인기 증가. 인테리어 리뉴얼 고려하세요."
        }
        
        return b2b_templates.get(keyword, f"{keyword} 트렌드 상승세. 메뉴 개발 기회입니다.")
    
    def _generate_b2c_ad_copy(self, keyword: str, region: str) -> str:
        """B2C 소비자용 광고 카피 생성"""
        region_text = "LA" if "LA" in region else "캘리포니아"
        
        b2c_templates = {
            'matcha latte': f"진짜 일본식 매치라 라떼, 이제 {region_text}에서 즐기세요.",
            'matcha croissant': f"성수 감성 매치라 크루아상, {region_text} 첫 출시.",
            '성수 브런치': f"서울 성수동 그 브런치, {region_text}서 만나보세요.",
            'seongsu café': f"성수 카페 감성 그대로, {region_text} 신상 카페."
        }
        
        return b2c_templates.get(keyword, f"트렌디한 {keyword}, {region_text}에서 만나보세요.")
    
    def _generate_no_signal_brief(self) -> DailyBriefFnB:
        """신호가 없을 때 기본 Brief"""
        return DailyBriefFnB(
            date=datetime.now().strftime('%Y-%m-%d'),
            top_signal={'message': '근거가 부족합니다'},
            so_what="오늘은 유의미한 F&B 트렌드 신호가 감지되지 않았습니다.",
            action_for_owner={
                'action': '기존 메뉴 최적화 집중',
                'who': 'F&B 사업자',
                'what': '현재 인기 메뉴 분석 및 개선',
                'when': '이번 주',
                'confidence': '보통'
            },
            ad_copy_b2b="안정적인 운영이 최고의 전략입니다.",
            ad_copy_b2c="언제나 믿을 수 있는 맛, 여기 있습니다.",
            next_check=(datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
        )
    
    def generate_weekly_onepager(self, region: str = 'LA_Koreatown') -> WeeklyOnePageFnB:
        """Weekly One-Pager 생성 (1장 PDF/Notion 형식)"""
        week_ending = datetime.now().strftime('%Y-%m-%d')
        
        # 주간 신호 수집
        weekly_signals = []
        for keyword in self.focus_keywords:
            signals = self.collect_fnb_signals(keyword, region)
            weekly_signals.extend(signals)
        
        # Executive One-Liner (45-60일 행동창)
        top_keyword = 'matcha latte'  # 시뮬레이션
        executive_oneliner = f"다음 45-60일: {top_keyword} 트렌드 LA 확산 예상. 지금 메뉴 준비하면 경쟁 우위 확보 가능."
        
        # 신호 그래프 데이터
        signals_data = [
            {
                'platform': 'TikTok',
                'keyword': 'matcha latte',
                'growth': '+22.5%',
                'chart_data': [85, 95, 110, 125, 135],  # 5주간 추이
                'confidence': '높음'
            },
            {
                'platform': 'Google Trends',
                'keyword': 'matcha latte', 
                'growth': '+20.0%',
                'chart_data': [65, 68, 72, 75, 78],
                'confidence': '높음'
            }
        ]
        
        # What to Do 체크리스트
        what_to_do = [
            "✅ 매치라 라떼 레시피 개발 (프리미엄 말차 원료 확보)",
            "✅ 매치라 크루아상 베이커리 파트너십 검토", 
            "✅ 성수 감성 인테리어 요소 3가지 선정",
            "✅ TikTok/Instagram 매치라 컨텐츠 제작 (주 2회)",
            "✅ 한정판 출시 마케팅 계획 수립 (4주 캠페인)"
        ]
        
        # 광고 크리에이티브 시드
        ad_creative_seeds = {
            'graph_data': signals_data[0],  # TikTok 그래프를 광고 이미지로
            'headlines': [
                "매치라 라떼 열풍, LA 상륙!",
                "성수 감성 디저트, 이제 여기서"
            ],
            'b2b_copy': "LA TikTok에서 매치라 크루아상이 +22%. 지금 메뉴에 추가하세요.",
            'b2c_copy': "성수 감성 매치라 크루아상, 이제 LA에서 즐기세요."
        }
        
        # 리스크 & 불확실성
        risks_unknowns = [
            "원료 공급망 안정성 (일본 말차 수급)",
            "경쟁업체 빠른 모방 가능성",
            "근거가 부족합니다: 실제 매출 전환율 데이터 없음"
        ]
        
        return WeeklyOnePageFnB(
            week_ending=week_ending,
            executive_oneliner=executive_oneliner,
            signals=signals_data,
            what_to_do=what_to_do,
            ad_creative_seeds=ad_creative_seeds,
            timing_window="30-60일",
            risks_unknowns=risks_unknowns,
            next_checkin=(datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d')
        )

# Flask API for SCIA-F&B Lite
app = Flask(__name__)
scia_fnb = SCIAFnBLiteAgent()

@app.route('/scia-fnb/daily-brief')
def daily_brief():
    """Daily Brief + 광고 카피 (3줄 + B2B/B2C)"""
    try:
        region = request.args.get('region', 'LA_Koreatown')
        brief = scia_fnb.generate_daily_brief(region)
        
        return jsonify({
            'status': 'success',
            'brief': asdict(brief),
            'mvp_focus': 'F&B trends + ad copy generation',
            'target_users': 'CA cafe/bakery owners'
        })
    except Exception as e:
        logger.error(f"Daily brief generation failed: {e}")
        return jsonify({'status': 'error', 'error': str(e)}), 500

@app.route('/scia-fnb/weekly-onepager')  
def weekly_onepager():
    """Weekly One-Pager (PDF/Notion 형식)"""
    try:
        region = request.args.get('region', 'LA_Koreatown')
        onepager = scia_fnb.generate_weekly_onepager(region)
        
        return jsonify({
            'status': 'success',
            'onepager': asdict(onepager),
            'format': 'Ready for PDF/Notion export',
            'includes_ad_creative': True
        })
    except Exception as e:
        logger.error(f"Weekly onepager generation failed: {e}")
        return jsonify({'status': 'error', 'error': str(e)}), 500

@app.route('/scia-fnb/signals/<keyword>')
def get_signals(keyword):
    """특정 키워드의 신호 상세 조회"""
    try:
        region = request.args.get('region', 'LA_Koreatown')
        signals = scia_fnb.collect_fnb_signals(keyword, region)
        
        return jsonify({
            'status': 'success',
            'keyword': keyword,
            'region': region,
            'signals': [asdict(s) for s in signals],
            'signal_count': len(signals),
            'confidence': scia_fnb.calculate_combined_confidence(signals)
        })
    except Exception as e:
        logger.error(f"Signal retrieval failed for {keyword}: {e}")
        return jsonify({'status': 'error', 'error': str(e)}), 500

@app.route('/scia-fnb/health')
def health():
    """SCIA-F&B Agent 상태 확인"""
    return jsonify({
        'status': 'healthy',
        'agent': 'SCIA-F&B Lite MVP',
        'focus': 'Matcha·성수 카페/디저트 trends in CA',
        'signals': '2-signal (TikTok + Google Trends)',
        'output': 'Daily Brief + Ad Copy + Weekly One-Pager',
        'target_users': 'CA F&B owners (카페/베이커리)',
        'success_goal': '4주 내 2-3명 업주 신메뉴/팝업 테스트',
        'keywords': scia_fnb.focus_keywords,
        'regions': list(scia_fnb.target_regions.keys()),
        'last_updated': datetime.now().isoformat()
    })

if __name__ == '__main__':
    logger.info("Starting SCIA-F&B Lite Agent...")
    logger.info("Mission: F&B 트렌드 조기 탐지 + 광고 크리에이티브 자동 생성")
    logger.info("Target: CA 카페/베이커리 업주 → 신메뉴/팝업 테스트 유도")
    app.run(debug=False, host='0.0.0.0', port=5002)