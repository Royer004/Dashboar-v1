import React, { useState } from 'react';
import { ActivityItem } from '../types';

interface OverviewTabProps {
  activities: ActivityItem[];
  onOpenNewProject: () => void;
  onOpenInvite: () => void;
  onExport: () => void;
  onCopyLink: () => void;
  onViewAllActivity: () => void;
}

type TimeRange = 'Hoy' | '7D' | '30D';

export const OverviewTab: React.FC<OverviewTabProps> = ({
  activities,
  onOpenNewProject,
  onOpenInvite,
  onExport,
  onCopyLink,
  onViewAllActivity
}) => {
  const [range, setRange] = useState<TimeRange>('30D');
  const [activePoint, setActivePoint] = useState<{ cx: number; cy: number; label: string; date: string }>({
    cx: 300,
    cy: 28,
    label: '$48.2k',
    date: 'Hoy'
  });

  // Range specific data
  const metricsData: Record<TimeRange, {
    mrr: string;
    mrrDelta: string;
    mrrSub: string;
    dau: string;
    dauDelta: string;
    dauSub: string;
    conversion: string;
    conversionDelta: string;
    conversionSub: string;
    churn: string;
    churnDelta: string;
    churnSub: string;
    chartLabel: string;
  }> = {
    'Hoy': {
      mrr: '$48,250',
      mrrDelta: '+$1.4k',
      mrrSub: 'ingresos de hoy',
      dau: '3,840',
      dauDelta: '+12.4%',
      dauSub: 'pico activo 14:00',
      conversion: '4.15%',
      conversionDelta: '+0.8%',
      conversionSub: 'Objetivo: 3.5%',
      churn: '0.95%',
      churnDelta: '-0.2%',
      churnSub: 'Muy saludable',
      chartLabel: '+$1,450 hoy'
    },
    '7D': {
      mrr: '$45,100',
      mrrDelta: '+5.4%',
      mrrSub: 'vs. $42.8k semana ant.',
      dau: '11,890',
      dauDelta: '+6.1%',
      dauSub: '98.1% retención',
      conversion: '3.65%',
      conversionDelta: '+0.2%',
      conversionSub: 'Objetivo: 3.5%',
      churn: '1.20%',
      churnDelta: '-0.1%',
      churnSub: 'Saludable',
      chartLabel: '+$2,100 esta semana'
    },
    '30D': {
      mrr: '$48,250',
      mrrDelta: '14.2%',
      mrrSub: 'vs. $42.2k mes ant.',
      dau: '12,480',
      dauDelta: '8.6%',
      dauSub: '98.4% retención',
      conversion: '3.82%',
      conversionDelta: '0.4%',
      conversionSub: 'Objetivo: 3.5%',
      churn: '1.15%',
      churnDelta: '0.3%',
      churnSub: 'Saludable',
      chartLabel: '+$5,800 este mes'
    }
  };

  const currentMetrics = metricsData[range];

  const chartPoints = [
    { cx: 80, cy: 95, label: '$42.2k', date: '08 Oct' },
    { cx: 160, cy: 82, label: '$44.5k', date: '15 Oct' },
    { cx: 240, cy: 48, label: '$46.8k', date: '22 Oct' },
    { cx: 300, cy: 28, label: '$48.2k', date: 'Hoy' }
  ];

  return (
    <div className="flex flex-col w-full gap-space-lg animate-in fade-in duration-200">
      {/* Welcome & Date Scope Selector */}
      <section className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Hola, Alex
              </span>
              <span className="inline-block animate-bounce text-[20px]">👋</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.8)]"></span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Workspace Pro • Cloud EMEA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-space-xs py-1 bg-surface-container-high rounded-full shadow-inner">
            {(['Hoy', '7D', '30D'] as TimeRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`font-label-badge text-label-badge px-2.5 py-1 rounded-full transition-all duration-200 ${
                  range === r
                    ? 'bg-surface-bright text-on-surface shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics Bento Grid (2x2) */}
      <section className="grid grid-cols-2 gap-gutter">
        {/* Card 1: MRR */}
        <div className="flex flex-col p-3 rounded-xl bg-surface-container-low shadow-sm hover:bg-surface-container transition-colors border border-outline-variant/10">
          <div className="flex items-center justify-between mb-1">
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">MRR</span>
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-badge text-label-badge">
              <span className="material-symbols-outlined text-[13px] leading-none">arrow_upward</span>
              {currentMetrics.mrrDelta}
            </span>
          </div>
          <div className="font-metric-stat text-metric-stat text-on-surface tracking-tight">
            {currentMetrics.mrr}
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="font-label-code text-label-code text-on-surface-variant/80">
              {currentMetrics.mrrSub}
            </span>
            <span className="material-symbols-outlined text-primary text-[18px]">payments</span>
          </div>
        </div>

        {/* Card 2: DAU */}
        <div className="flex flex-col p-3 rounded-xl bg-surface-container-low shadow-sm hover:bg-surface-container transition-colors border border-outline-variant/10">
          <div className="flex items-center justify-between mb-1">
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">DAU Activos</span>
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-badge text-label-badge">
              <span className="material-symbols-outlined text-[13px] leading-none">arrow_upward</span>
              {currentMetrics.dauDelta}
            </span>
          </div>
          <div className="font-metric-stat text-metric-stat text-on-surface tracking-tight">
            {currentMetrics.dau}
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="font-label-code text-label-code text-on-surface-variant/80">
              {currentMetrics.dauSub}
            </span>
            <span className="material-symbols-outlined text-tertiary text-[18px]">group</span>
          </div>
        </div>

        {/* Card 3: Conversion Rate */}
        <div className="flex flex-col p-3 rounded-xl bg-surface-container-low shadow-sm hover:bg-surface-container transition-colors border border-outline-variant/10">
          <div className="flex items-center justify-between mb-1">
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Conversión</span>
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-badge text-label-badge">
              <span className="material-symbols-outlined text-[13px] leading-none">arrow_upward</span>
              {currentMetrics.conversionDelta}
            </span>
          </div>
          <div className="font-metric-stat text-metric-stat text-on-surface tracking-tight">
            {currentMetrics.conversion}
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="font-label-code text-label-code text-on-surface-variant/80">
              {currentMetrics.conversionSub}
            </span>
            <span className="material-symbols-outlined text-secondary text-[18px]">bolt</span>
          </div>
        </div>

        {/* Card 4: Churn Rate */}
        <div className="flex flex-col p-3 rounded-xl bg-surface-container-low shadow-sm hover:bg-surface-container transition-colors border border-outline-variant/10">
          <div className="flex items-center justify-between mb-1">
            <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Churn Rate</span>
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-badge text-label-badge">
              <span className="material-symbols-outlined text-[13px] leading-none">arrow_downward</span>
              {currentMetrics.churnDelta}
            </span>
          </div>
          <div className="font-metric-stat text-metric-stat text-on-surface tracking-tight">
            {currentMetrics.churn}
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="font-label-code text-label-code text-secondary">
              {currentMetrics.churnSub}
            </span>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">verified_user</span>
          </div>
        </div>
      </section>

      {/* Interactive MRR Evolution Chart Card */}
      <section className="flex flex-col p-space-md rounded-xl bg-surface-container-low shadow-md relative overflow-hidden border border-outline-variant/15">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex flex-col">
            <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
              Curva de Ingresos Recurrentes
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                {currentMetrics.mrr}
              </span>
              <span className="font-label-code text-label-code text-secondary font-medium">
                {currentMetrics.chartLabel}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-surface-container px-2 py-1 rounded-full border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-code text-label-code text-on-surface-variant">Live</span>
          </div>
        </div>

        {/* Chart Canvas Area (SVG) */}
        <div className="relative w-full h-44 mt-1 select-none">
          {/* Dynamic Tooltip */}
          <div 
            className="absolute z-10 flex flex-col items-center pointer-events-none transition-all duration-200"
            style={{
              left: `${(activePoint.cx / 340) * 100}%`,
              top: `${Math.max(2, (activePoint.cy / 140) * 100 - 24)}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="px-2.5 py-1 rounded-lg bg-surface-bright text-on-surface shadow-xl flex items-center gap-1.5 border border-outline-variant/30">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              <span className="font-label-code text-label-code font-semibold">{activePoint.label}</span>
              <span className="font-label-badge text-label-badge text-secondary font-medium">{activePoint.date}</span>
            </div>
            <div className="w-2 h-2 bg-surface-bright rotate-45 -mt-1 shadow-sm border-r border-b border-outline-variant/30"></div>
          </div>

          <svg className="w-full h-full overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 340 140">
            <defs>
              <linearGradient id="mrrGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                <stop offset="0%" stopColor="#8083ff" stopOpacity="0.38"></stop>
                <stop offset="60%" stopColor="#8083ff" stopOpacity="0.08"></stop>
                <stop offset="100%" stopColor="#8083ff" stopOpacity="0.0"></stop>
              </linearGradient>
              <linearGradient id="strokeGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#7c87f3"></stop>
                <stop offset="50%" stopColor="#8083ff"></stop>
                <stop offset="100%" stopColor="#4edea3"></stop>
              </linearGradient>
              <filter height="140%" id="glow" width="140%" x="-20%" y="-20%">
                <feDropShadow dx="0" dy="2" floodColor="#8083ff" floodOpacity="0.4" stdDeviation="3"></feDropShadow>
              </filter>
            </defs>
            {/* Horizontal guideline tracks */}
            <line stroke="#313540" strokeDasharray="3 3" strokeOpacity="0.45" x1="0" x2="340" y1="30" y2="30"></line>
            <line stroke="#313540" strokeDasharray="3 3" strokeOpacity="0.45" x1="0" x2="340" y1="75" y2="75"></line>
            <line stroke="#313540" strokeOpacity="0.45" x1="0" x2="340" y1="120" y2="120"></line>

            {/* Area fill */}
            <path d="M 0,115 Q 40,105 80,95 T 160,82 T 240,48 T 300,28 L 340,18 L 340,135 L 0,135 Z" fill="url(#mrrGradient)"></path>
            
            {/* High-precision vector line */}
            <path d="M 0,115 Q 40,105 80,95 T 160,82 T 240,48 T 300,28 L 340,18" fill="none" filter="url(#glow)" stroke="url(#strokeGradient)" strokeLinecap="round" strokeWidth="2.5"></path>

            {/* Historical interactive keypoints */}
            {chartPoints.map((pt) => {
              const isSelected = activePoint.date === pt.date;
              return (
                <g key={pt.date} className="cursor-pointer" onClick={() => setActivePoint(pt)}>
                  <circle
                    cx={pt.cx}
                    cy={pt.cy}
                    fill="#1c1f2a"
                    r={isSelected ? 5.5 : 3.5}
                    stroke={isSelected ? '#4edea3' : '#8083ff'}
                    strokeWidth={isSelected ? 3 : 2}
                    className="transition-all hover:scale-125"
                  />
                  {/* Invisible larger hit target for easy touch interaction */}
                  <circle cx={pt.cx} cy={pt.cy} r={16} fill="transparent" />
                </g>
              );
            })}

            {/* Current position indicator pulse */}
            <circle className="animate-ping pointer-events-none" cx="300" cy="28" fill="#8083ff" fillOpacity="0.3" r="8"></circle>
            <circle cx="300" cy="28" fill="#4edea3" r="4.5" stroke="#0f131d" strokeWidth="2"></circle>
          </svg>
        </div>

        {/* Timeline X-Axis Labels */}
        <div className="flex items-center justify-between text-on-surface-variant font-label-code text-label-code pt-1 px-1">
          <span className="hover:text-primary cursor-pointer" onClick={() => setActivePoint({ cx: 10, cy: 115, label: '$40.1k', date: '01 Oct' })}>01 Oct</span>
          <span className="hover:text-primary cursor-pointer" onClick={() => setActivePoint(chartPoints[0])}>08 Oct</span>
          <span className="hover:text-primary cursor-pointer" onClick={() => setActivePoint(chartPoints[1])}>15 Oct</span>
          <span className="hover:text-primary cursor-pointer" onClick={() => setActivePoint(chartPoints[2])}>22 Oct</span>
          <span className="text-on-surface font-semibold hover:text-secondary cursor-pointer" onClick={() => setActivePoint(chartPoints[3])}>Actual</span>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <span className="font-headline-sm text-headline-sm text-on-surface">Accesos Rápidos</span>
          <span className="font-label-badge text-label-badge text-on-surface-variant">4 atajos</span>
        </div>
        <div className="grid grid-cols-4 gap-space-sm">
          {/* Action 1: Proyecto */}
          <button 
            onClick={onOpenNewProject}
            className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container active:scale-95 transition-all duration-150 min-h-[72px] border border-outline-variant/10"
          >
            <div className="w-10 h-10 rounded-full bg-primary-container/20 group-hover:bg-primary-container/30 flex items-center justify-center text-primary transition-colors mb-1.5">
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
            </div>
            <span className="font-label-code text-label-code text-on-surface text-center leading-tight">Proyecto</span>
          </button>

          {/* Action 2: Invitar */}
          <button 
            onClick={onOpenInvite}
            className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container active:scale-95 transition-all duration-150 min-h-[72px] border border-outline-variant/10"
          >
            <div className="w-10 h-10 rounded-full bg-secondary-container/20 group-hover:bg-secondary-container/30 flex items-center justify-center text-secondary transition-colors mb-1.5">
              <span className="material-symbols-outlined text-[20px]">person_add</span>
            </div>
            <span className="font-label-code text-label-code text-on-surface text-center leading-tight">Invitar</span>
          </button>

          {/* Action 3: Exportar */}
          <button 
            onClick={onExport}
            className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container active:scale-95 transition-all duration-150 min-h-[72px] border border-outline-variant/10"
          >
            <div className="w-10 h-10 rounded-full bg-tertiary-container/20 group-hover:bg-tertiary-container/30 flex items-center justify-center text-tertiary transition-colors mb-1.5">
              <span className="material-symbols-outlined text-[20px]">ios_share</span>
            </div>
            <span className="font-label-code text-label-code text-on-surface text-center leading-tight">Exportar</span>
          </button>

          {/* Action 4: Enlace */}
          <button 
            onClick={onCopyLink}
            className="group flex flex-col items-center justify-center p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container active:scale-95 transition-all duration-150 min-h-[72px] border border-outline-variant/10"
          >
            <div className="w-10 h-10 rounded-full bg-surface-container-high group-hover:bg-surface-bright flex items-center justify-center text-on-surface-variant group-hover:text-on-surface transition-colors mb-1.5">
              <span className="material-symbols-outlined text-[20px]">link</span>
            </div>
            <span className="font-label-code text-label-code text-on-surface text-center leading-tight">Enlace</span>
          </button>
        </div>
      </section>

      {/* Live Activity Telemetry Feed */}
      <section className="flex flex-col gap-space-sm mb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-sm text-headline-sm text-on-surface">Actividad en Tiempo Real</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
          </div>
          <button 
            onClick={onViewAllActivity}
            className="font-label-badge text-label-badge text-primary hover:text-primary-fixed transition-colors"
          >
            Ver Todo
          </button>
        </div>

        {/* Feed Container */}
        <div className="flex flex-col gap-2">
          {activities.slice(0, 3).map((act) => (
            <div 
              key={act.id}
              className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all border border-outline-variant/10 cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  act.iconColor === 'secondary' ? 'bg-secondary-container/20 text-secondary' :
                  act.iconColor === 'primary' ? 'bg-primary-container/20 text-primary' :
                  'bg-tertiary-container/20 text-tertiary'
                }`}>
                  <span className="material-symbols-outlined text-[20px]">{act.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-body-md text-body-md text-on-surface font-medium truncate">
                    {act.title}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    {act.subtitle}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 pl-2">
                {act.amount && (
                  <span className={`font-label-code text-label-code font-semibold ${
                    act.iconColor === 'secondary' ? 'text-secondary' : 'text-primary'
                  }`}>
                    {act.amount}
                  </span>
                )}
                {act.badge && (
                  <span className="font-label-badge text-label-badge px-2 py-0.5 rounded-full bg-surface-bright text-on-surface font-medium">
                    {act.badge}
                  </span>
                )}
                <span className="font-label-badge text-label-badge text-on-surface-variant/80 mt-0.5">
                  {act.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
