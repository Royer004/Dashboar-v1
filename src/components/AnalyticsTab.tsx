import React, { useState } from 'react';
import { FUNNEL_STEPS, ACQUISITION_CHANNELS } from '../data/mockData';

interface AnalyticsTabProps {
  onExportReport: () => void;
}

type TimeRangeKey = '7d' | '30d' | '90d' | '1y';

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ onExportReport }) => {
  const [range, setRange] = useState<TimeRangeKey>('30d');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState<'percent' | 'alpha'>('percent');
  const [exportToast, setExportToast] = useState(false);

  const datasets: Record<TimeRangeKey, {
    sessions: string;
    sessionsDelta: string;
    signups: string;
    signupsDelta: string;
    cac: string;
    cacDelta: string;
    ltv: string;
    ratio: string;
    sparkline1: string;
    sparkline2: string;
  }> = {
    '7d': {
      sessions: '48,210',
      sessionsDelta: '+14.2%',
      signups: '1,120',
      signupsDelta: '+9.4%',
      cac: '$22.80',
      cacDelta: '-12.0%',
      ltv: '$860',
      ratio: '37.7x',
      sparkline1: 'M0 22 Q 25 12, 50 14 T 75 7 T 100 2',
      sparkline2: 'M0 20 Q 30 18, 55 11 T 80 5 T 100 2'
    },
    '30d': {
      sessions: '184,920',
      sessionsDelta: '+22.4%',
      signups: '4,310',
      signupsDelta: '+18.1%',
      cac: '$24.50',
      cacDelta: '-8.2%',
      ltv: '$840',
      ratio: '34.2x',
      sparkline1: 'M0 20 Q 20 18, 35 12 T 70 8 T 100 2',
      sparkline2: 'M0 22 Q 25 15, 50 16 T 75 9 T 100 3'
    },
    '90d': {
      sessions: '532,100',
      sessionsDelta: '+31.8%',
      signups: '12,940',
      signupsDelta: '+24.5%',
      cac: '$26.10',
      cacDelta: '-4.6%',
      ltv: '$820',
      ratio: '31.4x',
      sparkline1: 'M0 24 Q 20 19, 45 13 T 70 6 T 100 1',
      sparkline2: 'M0 23 Q 30 17, 60 12 T 85 4 T 100 2'
    },
    '1y': {
      sessions: '2,180,450',
      sessionsDelta: '+48.0%',
      signups: '51,300',
      signupsDelta: '+38.2%',
      cac: '$28.40',
      cacDelta: '-1.8%',
      ltv: '$890',
      ratio: '31.3x',
      sparkline1: 'M0 23 Q 30 18, 55 10 T 80 6 T 100 1',
      sparkline2: 'M0 21 Q 25 16, 50 13 T 75 6 T 100 2'
    }
  };

  const currentData = datasets[range];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleExport = () => {
    setExportToast(true);
    onExportReport();
    setTimeout(() => {
      setExportToast(false);
    }, 3200);
  };

  const channels = [...ACQUISITION_CHANNELS].sort((a, b) => {
    if (sortBy === 'alpha') return a.name.localeCompare(b.name);
    return b.percentage - a.percentage;
  });

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-200">
      {/* Sub-header & Live Telemetry Badge */}
      <div className="flex items-center justify-between pt-space-xs">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.8)]"></span>
            <span className="font-label-code text-label-code text-secondary uppercase tracking-widest">
              Motor Telemetría Activo
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
            Rendimiento y Embudo
          </h1>
        </div>

        {/* Live Sync Mini Action Button */}
        <button
          onClick={handleRefresh}
          aria-label="Actualizar datos"
          className="w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-center text-on-surface-variant active:scale-95 shadow-sm border border-outline-variant/15"
        >
          <span
            className={`material-symbols-outlined text-[20px] transition-transform duration-500 ${
              isRefreshing ? 'rotate-180 text-secondary' : ''
            }`}
          >
            sync
          </span>
        </button>
      </div>

      {/* Time Range Segmented Pills Control */}
      <div className="bg-surface-container-lowest p-1 rounded-xl flex items-center justify-between gap-1 shadow-inner border border-outline-variant/10">
        {[
          { key: '7d', label: '7 Días' },
          { key: '30d', label: '30 Días' },
          { key: '90d', label: '90 Días' },
          { key: '1y', label: 'Año' }
        ].map((tab) => {
          const isActive = range === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setRange(tab.key as TimeRangeKey)}
              className={`time-tab flex-1 py-1.5 px-space-xs rounded-lg text-center font-label-badge text-label-badge transition-all ${
                isActive
                  ? 'bg-surface-container-high text-primary shadow-[0_0_12px_rgba(192,193,255,0.2)] font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Primary Metric Grid (2x2 Mobile Spine) */}
      <div className="grid grid-cols-2 gap-gutter">
        {/* Card 1: Total Sesiones */}
        <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between shadow-sm relative overflow-hidden group border border-outline-variant/15">
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Sesiones</span>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-code text-[10px]">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>
              {currentData.sessionsDelta}
            </span>
          </div>
          <div className="mt-space-sm">
            <span className="font-metric-stat text-metric-stat text-on-surface tracking-tight">
              {currentData.sessions}
            </span>
            {/* Mini Sparkline inline svg */}
            <div className="w-full h-7 mt-1">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 24">
                <defs>
                  <linearGradient id="grad-spark-1" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#4edea3" stopOpacity="0.35"></stop>
                    <stop offset="100%" stopColor="#4edea3" stopOpacity="0.0"></stop>
                  </linearGradient>
                </defs>
                <path d={`${currentData.sparkline1} L 100 24 L 0 24 Z`} fill="url(#grad-spark-1)"></path>
                <path d={currentData.sparkline1} fill="none" stroke="#4edea3" strokeLinecap="round" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2: Nuevos Registros */}
        <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between shadow-sm relative overflow-hidden border border-outline-variant/15">
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-surface-variant">Signups</span>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-code text-[10px]">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>
              {currentData.signupsDelta}
            </span>
          </div>
          <div className="mt-space-sm">
            <span className="font-metric-stat text-metric-stat text-on-surface tracking-tight">
              {currentData.signups}
            </span>
            <div className="w-full h-7 mt-1">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 24">
                <defs>
                  <linearGradient id="grad-spark-2" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#c0c1ff" stopOpacity="0.4"></stop>
                    <stop offset="100%" stopColor="#c0c1ff" stopOpacity="0.0"></stop>
                  </linearGradient>
                </defs>
                <path d={`${currentData.sparkline2} L 100 24 L 0 24 Z`} fill="url(#grad-spark-2)"></path>
                <path d={currentData.sparkline2} fill="none" stroke="#c0c1ff" strokeLinecap="round" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3: CAC */}
        <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between shadow-sm border border-outline-variant/15">
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-surface-variant">CAC Promedio</span>
            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-code text-[10px]">
              <span className="material-symbols-outlined text-[12px]">trending_down</span>
              {currentData.cacDelta}
            </span>
          </div>
          <div className="mt-space-sm">
            <span className="font-metric-stat text-metric-stat text-on-surface tracking-tight">
              {currentData.cac}
            </span>
            <span className="font-label-code text-label-code text-outline block mt-1">
              Objetivo: &lt; $30.00
            </span>
          </div>
        </div>

        {/* Card 4: LTV */}
        <div className="bg-surface-container-low rounded-xl p-space-md flex flex-col justify-between shadow-sm relative overflow-hidden border border-outline-variant/15">
          <div className="flex items-center justify-between">
            <span className="font-body-sm text-body-sm text-on-surface-variant">LTV Estimado</span>
            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
          </div>
          <div className="mt-space-sm">
            <span className="font-metric-stat text-metric-stat text-primary-fixed-dim tracking-tight">
              {currentData.ltv}
            </span>
            <span className="font-label-code text-label-code text-secondary block mt-1">
              Ratio LTV/CAC: {currentData.ratio}
            </span>
          </div>
        </div>
      </div>

      {/* Funnel Analytics Section */}
      <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-outline-variant/15">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Embudo de Conversión</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Rendimiento integral desde visita a cliente pago
            </p>
          </div>
          <span className="font-label-code text-label-code px-2 py-1 rounded-md bg-surface-container-high text-primary border border-outline-variant/20">
            1.14% Global
          </span>
        </div>

        <div className="flex flex-col gap-3.5 mt-space-xs">
          {FUNNEL_STEPS.map((step) => {
            const isLast = step.step === 4;
            return (
              <React.Fragment key={step.step}>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-body-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center font-label-code text-[10px] ${
                          isLast
                            ? 'bg-secondary/20 text-secondary font-bold'
                            : 'bg-surface-container-highest text-on-surface'
                        }`}
                      >
                        {isLast ? '✓' : step.step}
                      </span>
                      <span className={`font-medium ${isLast ? 'text-secondary' : 'text-on-surface'}`}>
                        {step.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-label-code text-label-code ${
                          isLast ? 'text-secondary font-medium' : 'text-on-surface-variant'
                        }`}
                      >
                        {step.count}
                      </span>
                      <span
                        className={`font-label-code text-label-code font-semibold ${
                          isLast ? 'text-secondary font-bold' : 'text-on-surface'
                        }`}
                      >
                        {step.percentage}
                      </span>
                    </div>
                  </div>

                  <div className={`w-full bg-surface-container rounded-full overflow-hidden ${isLast ? 'h-2.5 p-0.5' : 'h-2'}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        step.step === 1
                          ? 'bg-gradient-to-r from-primary-container to-primary'
                          : step.step === 2
                          ? 'bg-gradient-to-r from-tertiary-container to-tertiary'
                          : step.step === 3
                          ? 'bg-gradient-to-r from-secondary-container to-secondary'
                          : 'bg-secondary shadow-[0_0_10px_rgba(78,222,163,0.7)]'
                      }`}
                      style={{ width: step.barWidth }}
                    ></div>
                  </div>
                </div>

                {step.dropoff && (
                  <div className="flex items-center gap-2 pl-3 -my-1 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px]">arrow_downward</span>
                    <span className="font-label-code text-[10px] text-outline">{step.dropoff}</span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Acquisition Channels (Top Sources) */}
      <div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-outline-variant/15">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Canales de Adquisición</h2>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Distribución del tráfico atribuido</span>
          </div>
          <button
            onClick={() => setSortBy(sortBy === 'percent' ? 'alpha' : 'percent')}
            title="Alternar orden"
            className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
          </button>
        </div>

        <div className="flex flex-col gap-space-md mt-space-xs">
          {channels.map((ch) => (
            <div key={ch.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 ${
                      ch.color === 'primary' ? 'text-primary' :
                      ch.color === 'secondary' ? 'text-secondary' :
                      ch.color === 'tertiary' ? 'text-tertiary' : 'text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">{ch.icon}</span>
                  </div>
                  <span className="font-body-md text-body-md text-on-surface truncate">{ch.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="font-label-code text-label-code text-on-surface font-semibold">
                    {ch.percentage}%
                  </span>
                  <span className="font-label-code text-label-code text-outline text-[11px]">
                    ({ch.count})
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${ch.barColor}`} style={{ width: `${ch.percentage}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operational Insights Banner */}
      <div className="bg-surface-container-high rounded-xl p-space-md flex items-start gap-space-md shadow-sm border border-outline-variant/15">
        <div className="w-9 h-9 rounded-xl bg-primary-container/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[20px]">insights</span>
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-label-badge text-label-badge text-primary uppercase tracking-wide">
            Hallazgo de Crecimiento
          </span>
          <p className="font-body-sm text-body-sm text-on-surface mt-0.5">
            La tasa de activación en referidos es{' '}
            <span className="text-secondary font-semibold">+34% superior</span> a la media. Se aconseja priorizar el programa de embajadores.
          </p>
        </div>
      </div>

      {/* Export Secondary CTA Button */}
      <div className="pt-space-xs pb-space-sm">
        <button
          onClick={handleExport}
          id="export-report-btn"
          className="w-full min-h-[46px] rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-on-surface font-body-md text-body-md shadow-sm group border border-outline-variant/20"
        >
          <span className="material-symbols-outlined text-[20px] text-primary group-hover:-translate-y-0.5 transition-transform">
            download
          </span>
          <span className="font-medium">Exportar Reporte Completo (PDF / CSV)</span>
        </button>

        {exportToast && (
          <div className="text-center mt-2 font-label-code text-label-code text-secondary animate-pulse">
            ✓ Generando reporte cifrado con datos actuales ({range.toUpperCase()})...
          </div>
        )}
      </div>
    </div>
  );
};
