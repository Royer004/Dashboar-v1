import React, { useState } from 'react';
import { USER_AVATAR_LARGE } from '../data/mockData';

interface SettingsTabProps {
  onOpenEditProfile: () => void;
  onOpenUpgradePlan: () => void;
  onOpenBillingReceipts: () => void;
  onOpenTeamMembers: () => void;
  onOpenApiKeys: () => void;
  onOpenIntegrations: () => void;
  onOpenTwoFactor: () => void;
  onOpenVipSupport: () => void;
  onOpenSignOutConfirm: () => void;
  onOpenDocs: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  onOpenEditProfile,
  onOpenUpgradePlan,
  onOpenBillingReceipts,
  onOpenTeamMembers,
  onOpenApiKeys,
  onOpenIntegrations,
  onOpenTwoFactor,
  onOpenVipSupport,
  onOpenSignOutConfirm,
  onOpenDocs,
}) => {
  const [pushAlerts, setPushAlerts] = useState(true);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  return (
    <div className="flex flex-col w-full pb-8 space-y-space-lg animate-in fade-in duration-200">
      {/* Cabecera de Perfil de Usuario */}
      <section className="bg-surface-container rounded-xl p-space-md shadow-md flex items-center justify-between gap-space-md border border-outline-variant/15">
        <div className="flex items-center gap-space-md min-w-0">
          <div className="relative shrink-0">
            <img
              alt="Alex Morgan"
              className="w-14 h-14 rounded-full object-cover bg-surface-container-high ring-1 ring-outline-variant/30"
              src={USER_AVATAR_LARGE}
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(78,222,163,0.85)]"></span>
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="font-headline-sm text-headline-sm text-on-surface truncate">Alex Morgan</h2>
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0" title="Verificado">
                verified
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
              alex@nexusanalytics.io
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-code text-label-code tracking-wide">
                OWNER · ADMIN
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenEditProfile}
          title="Editar perfil"
          className="shrink-0 p-2 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface active:scale-95 transition-all border border-outline-variant/10"
        >
          <span className="material-symbols-outlined text-[20px]">edit</span>
        </button>
      </section>

      {/* Tarjeta de Suscripción (Plan Card) */}
      <section className="bg-surface-container rounded-xl p-space-md shadow-md space-y-space-md relative overflow-hidden border border-outline-variant/15">
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">workspace_premium</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Plan Scale Enterprise</h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Próxima renovación: 18 Jun, 2025</p>
          </div>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/30 text-secondary font-label-badge text-label-badge">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.9)] animate-pulse"></span>
            Activo
          </span>
        </div>

        {/* Consumos / Medidores */}
        <div className="grid grid-cols-2 gap-gutter pt-1">
          <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-between border border-outline-variant/10">
            <div className="flex justify-between items-center mb-1">
              <span className="font-label-code text-label-code text-on-surface-variant">ASIENTOS</span>
              <span className="font-label-code text-label-code text-on-surface font-semibold">18/25</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div className="bg-primary h-full rounded-full" style={{ width: '72%' }}></div>
            </div>
            <span className="font-body-sm text-[11px] text-on-surface-variant mt-1.5">7 disponibles</span>
          </div>

          <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col justify-between border border-outline-variant/10">
            <div className="flex justify-between items-center mb-1">
              <span className="font-label-code text-label-code text-on-surface-variant">CUOTA API</span>
              <span className="font-label-code text-label-code text-secondary font-semibold">82%</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-secondary h-full rounded-full shadow-[0_0_8px_rgba(78,222,163,0.6)]"
                style={{ width: '82%' }}
              ></div>
            </div>
            <span className="font-body-sm text-[11px] text-on-surface-variant mt-1.5">4.1M / 5M reqs</span>
          </div>
        </div>

        {/* Acciones de Facturación */}
        <div className="flex gap-space-sm pt-1">
          <button
            onClick={onOpenUpgradePlan}
            className="flex-1 py-2.5 px-space-sm bg-primary-container hover:bg-primary transition-colors text-on-primary font-body-md text-body-md rounded-lg font-medium flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(128,131,255,0.3)] active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">upgrade</span>
            <span>Mejorar Plan</span>
          </button>
          <button
            onClick={onOpenBillingReceipts}
            title="Historial de facturas"
            className="p-2.5 px-space-md bg-surface-container-high hover:bg-surface-container-highest transition-colors text-on-surface font-body-md text-body-md rounded-lg font-medium flex items-center justify-center gap-1.5 active:scale-95 border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[18px]">receipt_long</span>
          </button>
        </div>
      </section>

      {/* Categoría 1: Espacio de Trabajo */}
      <section className="space-y-space-xs">
        <div className="px-space-xs flex items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">domain</span>
          <h4 className="font-label-badge text-label-badge uppercase tracking-wider">Espacio de Trabajo</h4>
        </div>
        <div className="bg-surface-container rounded-xl overflow-hidden shadow-sm divide-y divide-surface-container-high border border-outline-variant/15">
          {/* Item: Miembros */}
          <button
            onClick={onOpenTeamMembers}
            className="w-full flex items-center justify-between p-space-md hover:bg-surface-container-high/40 transition-colors text-left"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">groups</span>
              </div>
              <div className="min-w-0">
                <p className="font-body-md text-body-md text-on-surface">Miembros del equipo</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">5 miembros con acceso activo</p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <div className="flex -space-x-1.5 overflow-hidden">
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkDd90hdoqDpMBOpzCJ8hKqFyb6xIj_zihWEB54zqMIi5j5Wxxl3R2tCRjk6DHCkhcHKVcBU99u2F26TnaRDwRbgVHtQOPze0rDlDGEK6pfKVRxQaeSgioawVh5_OUI4UEXQdE8Clz2mzKVvGu8XrlHdhQKlZ5OunNG20s0vybbQtDRJR08kjGKaEAHSnXVImlzg42p7HoO5A09oO7_jKWlui6gxHi21-zbm4jWSR0tK4B_pYBCFI"
                  alt="Member"
                />
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-surface-container object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4LZAo6kioCk9d5RjzS3RkVyHwyWr2xHAmbUuMpLHqPq4vbfQwB6kFX9gvuCAtBEXriGYK9gs8a-NfwLX-zLGnUkXEmp49Dz67HheN5nOe7azmpJk7uIPfTkwXJUlSC5DwYtBSsvIGjYa20lFkck0WM0adcYJx0PH22NkhNRE2LbbwwxrAB-6uG_Frkk2XHRrOuKI3SEaBABqHmZV7z4_DXKkOR0CnuJ1gYVjo6ANpfBQuyjlI6jU"
                  alt="Member"
                />
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-surface-container-highest text-on-surface-variant font-label-code text-[10px] ring-2 ring-surface-container">
                  +3
                </span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
            </div>
          </button>

          {/* Item: API & Webhooks */}
          <button
            onClick={onOpenApiKeys}
            className="w-full flex items-center justify-between p-space-md hover:bg-surface-container-high/40 transition-colors text-left"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[20px]">terminal</span>
              </div>
              <div className="min-w-0">
                <p className="font-body-md text-body-md text-on-surface">Claves de API &amp; Webhooks</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  2 activas · 1 webhook sincronizado
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0">chevron_right</span>
          </button>

          {/* Item: Integraciones */}
          <button
            onClick={onOpenIntegrations}
            className="w-full flex items-center justify-between p-space-md hover:bg-surface-container-high/40 transition-colors text-left"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </div>
              <div className="min-w-0">
                <p className="font-body-md text-body-md text-on-surface">Integraciones</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Slack, GitHub, Stripe conectados
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary font-label-code text-label-code">
                3 activas
              </span>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
            </div>
          </button>
        </div>
      </section>

      {/* Categoría 2: Preferencias */}
      <section className="space-y-space-xs">
        <div className="px-space-xs flex items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">tune</span>
          <h4 className="font-label-badge text-label-badge uppercase tracking-wider">Preferencias</h4>
        </div>
        <div className="bg-surface-container rounded-xl overflow-hidden shadow-sm divide-y divide-surface-container-high border border-outline-variant/15">
          {/* Item: Apariencia */}
          <div className="flex items-center justify-between p-space-md">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">dark_mode</span>
              </div>
              <div className="min-w-0">
                <p className="font-body-md text-body-md text-on-surface">Apariencia</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  {themeMode === 'dark' ? 'Modo Oscuro Obsidian' : 'Modo Claro Minimalista'}
                </p>
              </div>
            </div>
            <div className="flex items-center p-0.5 rounded-lg bg-surface-container-low shrink-0 border border-outline-variant/20">
              <button
                onClick={() => setThemeMode('dark')}
                className={`p-1.5 rounded-md transition-all ${
                  themeMode === 'dark' ? 'bg-surface-container text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title="Oscuro"
              >
                <span className="material-symbols-outlined text-[18px]">dark_mode</span>
              </button>
              <button
                onClick={() => setThemeMode('light')}
                className={`p-1.5 rounded-md transition-all ${
                  themeMode === 'light' ? 'bg-surface-container text-secondary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
                title="Claro"
              >
                <span className="material-symbols-outlined text-[18px]">light_mode</span>
              </button>
            </div>
          </div>

          {/* Item: Notificaciones Push (Toggle) */}
          <div className="flex items-center justify-between p-space-md">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[20px]">notifications_active</span>
              </div>
              <div className="min-w-0">
                <p className="font-body-md text-body-md text-on-surface">Alertas críticas &amp; Push</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Picos de latencia y anomalías</p>
              </div>
            </div>
            <button
              id="toggle-notifs"
              onClick={() => setPushAlerts(!pushAlerts)}
              aria-pressed={pushAlerts}
              className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 flex items-center ${
                pushAlerts ? 'bg-primary-container justify-end' : 'bg-surface-container-highest justify-start'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-on-primary shadow-md block transition-transform"></span>
            </button>
          </div>

          {/* Item: Autenticación 2FA */}
          <button
            onClick={onOpenTwoFactor}
            className="w-full flex items-center justify-between p-space-md hover:bg-surface-container-high/40 transition-colors text-left"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined text-[20px]">security</span>
              </div>
              <div className="min-w-0">
                <p className="font-body-md text-body-md text-on-surface">Autenticación en 2 Pasos</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Llave de seguridad FIDO2 activa
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
              <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
            </div>
          </button>
        </div>
      </section>

      {/* Categoría 3: Soporte y Cuenta */}
      <section className="space-y-space-xs">
        <div className="px-space-xs flex items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px]">support_agent</span>
          <h4 className="font-label-badge text-label-badge uppercase tracking-wider">Soporte y Cuenta</h4>
        </div>
        <div className="bg-surface-container rounded-xl overflow-hidden shadow-sm divide-y divide-surface-container-high border border-outline-variant/15">
          {/* Item: Documentación */}
          <button
            onClick={onOpenDocs}
            className="w-full flex items-center justify-between p-space-md hover:bg-surface-container-high/40 transition-colors text-left"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
              </div>
              <div className="min-w-0">
                <p className="font-body-md text-body-md text-on-surface">Documentación de API</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Guías para desarrolladores v2.4</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0">open_in_new</span>
          </button>

          {/* Item: Soporte Dedicado */}
          <button
            onClick={onOpenVipSupport}
            className="w-full flex items-center justify-between p-space-md hover:bg-surface-container-high/40 transition-colors text-left"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant shrink-0">
                <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
              </div>
              <div className="min-w-0">
                <p className="font-body-md text-body-md text-on-surface">Canal de Soporte VIP</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Tiempo de respuesta &lt; 15 min</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] shrink-0">chevron_right</span>
          </button>

          {/* Item: Cerrar Sesión */}
          <button
            onClick={onOpenSignOutConfirm}
            className="w-full flex items-center justify-between p-space-md hover:bg-error-container/20 text-error transition-colors text-left"
          >
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-9 h-9 rounded-lg bg-error-container/30 flex items-center justify-center text-error shrink-0">
                <span className="material-symbols-outlined text-[20px]">logout</span>
              </div>
              <div className="min-w-0">
                <p className="font-body-md text-body-md font-medium">Cerrar sesión</p>
                <p className="font-body-sm text-body-sm text-error/80">Salir de este dispositivo</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-error/70 text-[20px] shrink-0">power_settings_new</span>
          </button>
        </div>
      </section>

      {/* Versión del Espacio de Trabajo */}
      <div className="flex flex-col items-center justify-center pt-2 pb-4 text-center">
        <div className="flex items-center gap-1.5 text-on-surface-variant/60 font-label-code text-label-code">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary/80"></span>
          <span>Nexus Telemetry Client v3.12.4</span>
        </div>
        <p className="font-body-sm text-[11px] text-on-surface-variant/40 mt-1">
          Conectado a nodo primario: eu-central-1
        </p>
      </div>
    </div>
  );
};
