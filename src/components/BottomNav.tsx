import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'proyectos', label: 'Proyectos', icon: 'view_kanban' },
    { id: 'analitica', label: 'Analítica', icon: 'trending_up' },
    { id: 'ajustes', label: 'Ajustes', icon: 'tune' },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/80 backdrop-blur-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.4)] border-t border-[#262a35]/40">
      <div className="max-w-md mx-auto h-16 px-space-sm flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-1 min-w-[56px] min-h-[44px] transition-all select-none active:scale-95 ${
                isActive
                  ? 'text-secondary [filter:drop-shadow(0_0_12px_rgba(78,222,163,0.45))] font-medium'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[24px] transition-transform ${isActive ? 'scale-110' : ''}`}>
                {tab.icon}
              </span>
              <span className="font-label-badge text-label-badge tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
