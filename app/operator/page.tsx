'use client';

import React, { useEffect, useState } from 'react';

interface PendingSignal {
  id: string;
  as_of: string;
  signal: string;
  region: string;
  tiktok_growth_pct_7v28: number;
  trends_growth_pct_14d: number;
  prediction_prob_30d: number;
  uncertainty_pm: number;
  evidence: string[];
  status: 'Exploding' | 'Peaking' | 'Cooling';
  auto_score: number;
  generated_at: string;
  confidence_level: 'high' | 'medium' | 'low';
  risk_flags: string[];
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

function statusTone(status?: string): 'success' | 'warn' | 'danger' | 'default' {
  switch (status) {
    case 'Exploding': return 'success';
    case 'Peaking': return 'warn';
    case 'Cooling': return 'danger';
    default: return 'default';
  }
}

function confidenceTone(level?: string): 'success' | 'warn' | 'danger' | 'default' {
  switch (level) {
    case 'high': return 'success';
    case 'medium': return 'warn';
    case 'low': return 'danger';
    default: return 'default';
  }
}

export default function OperatorDashboard() {
  const [pendingSignals, setPendingSignals] = useState<PendingSignal[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadPendingSignals();
  }, []);

  const loadPendingSignals = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fnb-pending', { cache: 'no-store' });
      if (response.ok) {
        const data = await response.json();
        setPendingSignals(data.pending_signals || []);
      } else {
        // Fallback sample data
        setPendingSignals([
          {
            id: 'signal_001',
            as_of: '2025-08-18',
            signal: 'matcha croissant',
            region: 'LA_Koreatown',
            tiktok_growth_pct_7v28: 18.2,
            trends_growth_pct_14d: 15.5,
            prediction_prob_30d: 0.72,
            uncertainty_pm: 0.08,
            evidence: ['TikTok▲', 'Trends▲'],
            status: 'Exploding',
            auto_score: 0.72,
            generated_at: '2025-08-18T04:30:00.000Z',
            confidence_level: 'high',
            risk_flags: []
          },
          {
            id: 'signal_002',
            as_of: '2025-08-18',
            signal: 'korean milk tea',
            region: 'LA_Koreatown',
            tiktok_growth_pct_7v28: 12.3,
            trends_growth_pct_14d: 8.1,
            prediction_prob_30d: 0.55,
            uncertainty_pm: 0.12,
            evidence: ['TikTok▲'],
            status: 'Peaking',
            auto_score: 0.55,
            generated_at: '2025-08-18T04:25:00.000Z',
            confidence_level: 'medium',
            risk_flags: ['Single signal only', 'High uncertainty']
          }
        ]);
      }
    } catch (error) {
      console.error('Failed to load pending signals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (signalId: string, action: 'approve' | 'reject', notes?: string) => {
    setProcessingIds(prev => new Set(prev).add(signalId));
    
    try {
      const response = await fetch('/api/fnb-approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signal_id: signalId,
          action,
          operator_notes: notes,
          operator_id: 'operator_kim' // In production, get from auth
        })
      });

      if (response.ok) {
        // Remove the processed signal from pending list
        setPendingSignals(prev => prev.filter(s => s.id !== signalId));
      } else {
        alert('Failed to process approval. Please try again.');
      }
    } catch (error) {
      console.error('Approval failed:', error);
      alert('Network error. Please try again.');
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(signalId);
        return newSet;
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          <p className="mt-2 text-gray-600">Loading pending signals...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">SCIA-F&B Operator Dashboard</h1>
        <p className="text-sm text-gray-600">
          Review and approve automatically generated trend predictions before publication.
        </p>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-600">Pending approvals:</span>
          <Badge tone={pendingSignals.length > 0 ? 'warn' : 'success'}>
            {pendingSignals.length} signals
          </Badge>
        </div>
      </header>

      {pendingSignals.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">✓ All signals reviewed</div>
          <p className="text-gray-600">No pending approvals at this time.</p>
          <button 
            onClick={loadPendingSignals}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Refresh
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {pendingSignals.map((signal) => (
            <section key={signal.id} className="rounded-2xl border p-6 shadow-sm bg-yellow-50 border-yellow-200">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-500">
                    Generated: {new Date(signal.generated_at).toLocaleString()} · ID: {signal.id}
                  </div>
                  <h2 className="text-xl font-bold">
                    {signal.signal} <span className="text-gray-500">({signal.region})</span>
                  </h2>
                </div>
                <div className="flex gap-2">
                  <Badge tone={statusTone(signal.status)}>{signal.status}</Badge>
                  <Badge tone={confidenceTone(signal.confidence_level)}>
                    {signal.confidence_level} confidence
                  </Badge>
                </div>
              </div>

              {/* Signal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Signal Strength</h4>
                  <div className="text-sm space-y-1">
                    <div>📈 TikTok 7v28: <b>+{signal.tiktok_growth_pct_7v28}%</b></div>
                    <div>🔍 Google Trends 14d: <b>+{signal.trends_growth_pct_14d}%</b></div>
                    <div>🎯 Auto Score: <b>{(signal.auto_score * 100).toFixed(0)}%</b></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Prediction</h4>
                  <div className="text-lg font-semibold">
                    {(signal.prediction_prob_30d * 100).toFixed(0)}% 
                    <span className="text-gray-500 text-sm ml-2">
                      (±{(signal.uncertainty_pm * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {signal.evidence.map((e, i) => (
                      <Badge key={i}>{e}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Risk Flags */}
              {signal.risk_flags.length > 0 && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">⚠️ Risk Flags</h4>
                  <ul className="text-sm text-red-700 space-y-1">
                    {signal.risk_flags.map((flag, i) => (
                      <li key={i}>• {flag}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Approval Actions */}
              <div className="flex items-center gap-3 pt-4 border-t">
                <button
                  onClick={() => handleApproval(signal.id, 'approve', 'Strong dual-signal confirmation')}
                  disabled={processingIds.has(signal.id)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {processingIds.has(signal.id) ? 'Processing...' : '✓ Approve & Publish'}
                </button>
                
                <button
                  onClick={() => handleApproval(signal.id, 'reject', 'Insufficient signal strength')}
                  disabled={processingIds.has(signal.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 transition-colors"
                >
                  {processingIds.has(signal.id) ? 'Processing...' : '✗ Reject'}
                </button>

                <input
                  type="text"
                  placeholder="Optional notes..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const notes = (e.target as HTMLInputElement).value;
                      handleApproval(signal.id, 'approve', notes);
                    }
                  }}
                />
              </div>
            </section>
          ))}
        </div>
      )}

      <footer className="text-center text-xs text-gray-500 pt-8 border-t">
        SCIA-F&B Human-in-the-Loop Approval System · 
        Only approved signals are published to users · 
        All actions are logged and auditable
      </footer>
    </main>
  );
}