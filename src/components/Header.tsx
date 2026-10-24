import React, { useState } from 'react';
import { LOGO_URL, USER_AVATAR } from '../data/mockData';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenNotifications: () => void;
  notificationCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onTabChange,
  onOpenNotifications,
  notificationCount
}) => {
  const [env, setEnv] = useState<'Prod-V2' | 'Staging-EU' | 'Dev-Sandbox'>('Prod-V2');
  const [showEnvMenu, setShowEnvMenu] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.35)] border-b border-[#262a35]/40">
      <div className="max-w-md mx-auto h-16 px-margin flex items-center justify-between gap-space-sm relative">
        {/* Left: Logo & Environment */}
        <div className="flex items-center gap-space-sm min-w-0">
          <div 
            onClick={() => onTabChange('overview')}
            className="flex items-center gap-space-xs cursor-pointer select-none group"
          >
            <img 
              alt="Nexus Analytics Logo" 
              className="h-8 w-auto object-contain shrink-0 transition-transform group-hover:scale-105" 
              src={LOGO_URL}
            />
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight hidden xs:inline">
              Nexus
            </span>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowEnvMenu(!showEnvMenu)}
              className="flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container-high/70 hover:bg-surface-container-highest transition-colors min-h-[32px] max-w-[130px] active:scale-95 text-left"
              title="Cambiar entorno"
            >
              <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.6)] shrink-0 animate-pulse"></span>
              <span className="font-label-code text-label-code text-on-surface truncate">{env}</span>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant shrink-0">unfold_more</span>
            </button>

            {/* Dropdown for environment */}
            {showEnvMenu && (
              <div 
                className="absolute top-10 left-0 mt-1 w-44 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
              >
                <div className="px-3 py-1 font-label-code text-[10px] text-on-surface-variant uppercase tracking-wider">
                  Entorno de Red
                </div>
                {(['Prod-V2', 'Staging-EU', 'Dev-Sandbox'] as const).map((e) => (
                  <button
                    key={e}
                    onClick={() => {
                      setEnv(e);
                      setShowEnvMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-body-sm hover:bg-surface-bright transition-colors ${
                      env === e ? 'text-secondary font-medium' : 'text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${env === e ? 'bg-secondary' : 'bg-outline-variant'}`} />
                      <span>{e}</span>
                    </div>
                    {env === e && (
                      <span className="material-symbols-outlined text-[16px] text-secondary">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Notifications & User profile avatar */}
        <div className="flex items-center gap-space-xs shrink-0">
          <button 
            onClick={onOpenNotifications}
            aria-label="Notificaciones"
            className="relative w-11 h-11 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {notificationCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-secondary ring-2 ring-surface shadow-[0_0_8px_rgba(78,222,163,0.8)]"></span>
            )}
          </button>

          <button 
            onClick={() => onTabChange('ajustes')}
            aria-label="Perfil y Ajustes"
            className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-surface-container-high/40 active:scale-95 transition-all"
          >
            <img 
              alt="Alex Morgan Profile" 
              className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant/40 hover:ring-primary/60 transition-all" 
              src={USER_AVATAR}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
