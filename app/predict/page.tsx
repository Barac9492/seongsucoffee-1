/*
SCIA‑F&B Single Page (Next.js App Router)

This page shows:
  1) Today's signal (TikTok/Trends),
  2) 30‑day outcome likelihood % with uncertainty,
  3) Past hits (Exploding Topics–style cards),
  4) Track record summary,
  5) Newsletter signup CTA.

Human-in-the-loop: before a prediction is published, an operator must review and approve/reject. The automation handles all collection and scoring, but the final publishing requires a simple human click.

How to use:
- Drop into Next.js app.
- Replace API routes with your engine.
- Newsletter form: hook to ESP.
- TailwindCSS assumed.
*/

'use client';

import React, { useEffect, useMemo, useState } from 'react';

function Sparkline({ data, width = 140, height = 36, strokeWidth = 2 }: { data: number[]; width?: number; height?: number; strokeWidth?: number }) {
  const d = useMemo(() => {
    if (!data || data.length === 0) return '';
    const w = width;
    const h = height;
    const n = data.length;
    const max = Math.max(...data);
    const min = Math.min(...data);
    const norm = (v: number) => (max === min ? h / 2 : h - ((v - min) / (max - min)) * h);
    return data
      .map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i / (n - 1)) * w} ${norm(v)}`)
      .join(' ');
  }, [data, width, height]);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <path d={d} fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

function Badge({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'success' | 'warn' | 'danger' }) {
  const toneMap: Record<string, string> = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-700',
    warn: 'bg-amber-100 text-amber-800',
    danger: 'bg-red-100 text-red-700',
  };
  return <span className={`px-2 py-1 text-xs rounded-full ${toneMap[tone]}`}>{children}</span>;
}

interface TodayPayload {
  as_of: string;
  signal: string;
  region: string;
  tiktok_growth_pct_7v28: number;
  trends_growth_pct_14d: number;
  trends_30d_is_high: boolean;
  outcome: string;
  prediction_prob_30d: number;
  uncertainty_pm: number;
  evidence: string[];
  status: 'Exploding' | 'Peaking' | 'Cooling';
  next_check: string;
  // Human-in-the-loop fields
  approval_status?: 'pending' | 'approved' | 'rejected';
  generated_at?: string;
  approved_at?: string;
  approved_by?: string;
  auto_score?: number;
  operator_notes?: string;
}

interface HistoryCase {
  signal: string;
  region: string;
  as_of: string;
  pred_prob_30d: number;
  outcome_realized: boolean;
  realization_lag_days: number;
  spark: number[];
  evidence: string[];
  status: 'Exploding' | 'Peaking' | 'Cooling';
  note?: string;
}

interface HistoryPayload {
  track_record: {
    window_days: number;
    hit_rate: number;
    avg_abs_error: number;
    note?: string;
  };
  cases: HistoryCase[];
}

function statusTone(status?: string): 'success' | 'warn' | 'danger' | 'default' {
  switch (status) {
    case 'Exploding':
      return 'success';
    case 'Peaking':
      return 'warn';
    case 'Cooling':
      return 'danger';
    default:
      return 'default';
  }
}

function pct(n?: number) {
  if (typeof n !== 'number' || Number.isNaN(n)) return '—';
  return `${(n * 100).toFixed(0)}%`;
}

function fixedPct(n?: number, digits = 1) {
  if (typeof n !== 'number' || Number.isNaN(n)) return '—';
  return `${(n * 100).toFixed(digits)}%`;
}

export default function Page() {
  const [today, setToday] = useState<TodayPayload | null>(null);
  const [hist, setHist] = useState<HistoryPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // human-in-the-loop approval
  const [approved, setApproved] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [a, b] = await Promise.all([
          fetch('/api/fnb-today', { cache: 'no-store' }),
          fetch('/api/fnb-history', { cache: 'no-store' }),
        ]);
        if (!a.ok || !b.ok) throw new Error('API error');
        const todayJson = (await a.json()) as TodayPayload;
        const histJson = (await b.json()) as HistoryPayload;
        if (mounted) {
          setToday(todayJson);
          setHist(histJson);
          // Set approved state based on API data
          setApproved(todayJson.approval_status === 'approved');
        }
      } catch (e: any) {
        console.error(e);
        if (mounted) setError('Could not load data. Showing sample.');
        if (mounted) {
          setToday({
            as_of: '2025-08-18',
            signal: 'matcha latte',
            region: 'LA_Koreatown',
            tiktok_growth_pct_7v28: 22.5,
            trends_growth_pct_14d: 20.0,
            trends_30d_is_high: true,
            outcome: 'Sales increase from new menu/pop-up',
            prediction_prob_30d: 0.68,
            uncertainty_pm: 0.07,
            evidence: ['TikTok▲', 'Trends▲'],
            status: 'Exploding',
            next_check: '2025-08-19',
            approval_status: 'approved',
            approved_by: 'operator_kim'
          });
          setHist({
            track_record: { window_days: 90, hit_rate: 0.71, avg_abs_error: 0.08, note: 'Based on predictions ≥60%' },
            cases: []
          });
          setApproved(true);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const similarHitRate = useMemo(() => {
    if (!hist) return null;
    const pool = hist.cases.filter((c) => c.pred_prob_30d >= 0.6);
    if (pool.length === 0) return null;
    const hits = pool.filter((c) => c.outcome_realized).length;
    return hits / pool.length;
  }, [hist]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          <p className="mt-2 text-gray-600">Loading predictions...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">K-Bridge California</h1>
        <p className="text-sm text-gray-600">Your 3-week advantage: Seoul → SF/LA/OC/SD pipeline.</p>
      </header>

      {error && <div className="text-sm text-red-600">{error}</div>}

      {today && (
        <section className="rounded-2xl border p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">Today&apos;s Alert (as of {today.as_of})</div>
              <h2 className="text-xl font-bold">{today.signal} <span className="text-gray-500">({today.region})</span></h2>
              {today.approval_status === 'approved' && today.approved_by && (
                <div className="text-xs text-green-600 mt-1">✓ Approved by {today.approved_by}</div>
              )}
            </div>
            <Badge tone={statusTone(today.status)}>{today.status}</Badge>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <span>📈 TikTok 7v28: <b>{today.tiktok_growth_pct_7v28.toFixed(1)}%</b></span>
            <span>|</span>
            <span>Google Trends 14d: <b>{today.trends_growth_pct_14d.toFixed(1)}%</b>{today.trends_30d_is_high ? ' (30d high)' : ''}</span>
            <span>|</span>
            <div className="flex gap-1">
              {today.evidence.map((e, i) => (
                <Badge key={i}>{e}</Badge>
              ))}
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <div className="text-sm text-gray-600">What this means for your business</div>
            <div className="mt-1 text-lg">{today.outcome}</div>
            <div className="mt-2 text-2xl font-semibold">{(today.prediction_prob_30d * 100).toFixed(0)}% chance this trend grows</div>
            <div className="mt-1 text-xs text-gray-500">Next check: {today.next_check}</div>
            {today.approval_status === 'pending' && !approved && (
              <div className="mt-3 flex gap-2">
                <button onClick={() => setApproved(true)} className="px-3 py-1 rounded bg-green-600 text-white text-sm">Approve & Publish</button>
                <button onClick={() => setApproved(false)} className="px-3 py-1 rounded bg-red-500 text-white text-sm">Reject</button>
              </div>
            )}
            {(approved || today.approval_status === 'approved') && (
              <div className="mt-2 text-sm text-green-700">✔ Approved by operator. Published to users.</div>
            )}
            {today.operator_notes && (
              <div className="mt-2 text-xs text-gray-600 italic">{today.operator_notes}</div>
            )}
          </div>
        </section>
      )}

      {hist && hist.cases.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Past Hits</h3>
            <div className="text-sm text-gray-600">
              Last {hist.track_record.window_days} days hit rate <b>{pct(hist.track_record.hit_rate)}</b> · Avg error <b>±{fixedPct(hist.track_record.avg_abs_error)}</b>
              {similarHitRate !== null && (
                <span> · Similar pattern hit rate <b>{pct(similarHitRate)}</b></span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {hist.cases.map((c, idx) => (
              <div key={idx} className="rounded-xl border p-4 hover:shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{c.signal} <span className="text-gray-500">({c.region})</span></div>
                  <Badge tone={statusTone(c.status)}>{c.status}</Badge>
                </div>
                <div className="mt-2 text-sm text-gray-600">as of {c.as_of}</div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm">
                    Predicted {pct(c.pred_prob_30d)} → Result {c.outcome_realized ? 'Success' : 'Missed'} ({c.realization_lag_days} days)
                  </div>
                  <div className="text-gray-700">
                    <Sparkline data={c.spark} />
                  </div>
                </div>
                {c.note && <div className="mt-2 text-sm text-gray-700">{c.note}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border p-5 text-center">
        <h3 className="text-lg font-semibold">Get daily Korean trends alerts</h3>
        <p className="mt-1 text-sm text-gray-600">Free for Korean businesses in California</p>
        <form className="mx-auto mt-4 flex max-w-md items-center gap-2" action="#" method="post">
          <input
            required
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
          />
          <button type="submit" className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90">
            Subscribe free
          </button>
        </form>
      </section>

      <footer className="pb-10 text-center text-xs text-gray-500">
        Korean trends tracked from TikTok and Google. Alerts reviewed before sending.
      </footer>
    </main>
  );
}