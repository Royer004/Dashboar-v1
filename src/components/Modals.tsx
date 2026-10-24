import React, { useState } from 'react';
import { Project } from '../types';

interface NewProjectDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Partial<Project>) => void;
}

export const NewProjectDrawer: React.FC<NewProjectDrawerProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'UI/UX' | 'Backend' | 'Finanzas' | 'Data'>('UI/UX');
  const [dueDate, setDueDate] = useState('10 Nov');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onCreateProject({
      title: title.trim(),
      category,
      dueDate,
      description: description.trim() || 'Proyecto activo en desarrollo continuo.',
      progress: 10,
      completedTasks: 1,
      totalTasks: 10,
      status: 'progress',
      statusLabel: 'En progreso',
      assignees: [
        {
          name: 'Alex Morgan',
          avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB8il_QPXeaRSsMkU1o2CeiSool_D1ZU0PlR9oHuTTPAOsE-d8SUwewSP_rhb7XL1PJxqrVtLKAWBmoSykcUsboViktr_ggwaqJ4vtM7vB4JAxBzo5OE4mul0tvK4HbVFB0fVA_-KLMtUwhEq9WN-b77KaJph1rObFsJHWdT88K5kP6oGJMQ_IIk3_cX2h3mVKmhrT4nB84KQ1opV2miU8MwN9xFeHr2ZJWeKF5QK4a7cuhfKxJs8c',
        },
      ],
    });

    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-surface-container-low border border-outline-variant/30 rounded-t-3xl sm:rounded-2xl shadow-2xl p-space-md animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-outline-variant/60 rounded-full mx-auto mb-4"></div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">rocket_launch</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Crear Nuevo Proyecto</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-space-md">
          <div className="space-y-1">
            <label className="font-label-badge text-label-badge text-on-surface-variant uppercase">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="ej. Sync Engine v3"
              className="w-full h-11 px-3 bg-surface-container rounded-xl text-on-surface placeholder:text-outline font-body-md focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/20"
            />
          </div>

          <div className="space-y-1">
            <label className="font-label-badge text-label-badge text-on-surface-variant uppercase">
              Descripción Corta
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Objetivo principal del sprint"
              className="w-full h-11 px-3 bg-surface-container rounded-xl text-on-surface placeholder:text-outline font-body-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="space-y-1">
              <label className="font-label-badge text-label-badge text-on-surface-variant uppercase">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-11 px-3 bg-surface-container rounded-xl text-on-surface font-body-sm focus:outline-none border border-outline-variant/20"
              >
                <option value="UI/UX">UI/UX Core</option>
                <option value="Backend">Backend &amp; Infra</option>
                <option value="Finanzas">Billing &amp; Pagos</option>
                <option value="Data">Data &amp; Telemetría</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-label-badge text-label-badge text-on-surface-variant uppercase">
                Fecha límite
              </label>
              <input
                type="text"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="ej. 24 Nov"
                className="w-full h-11 px-3 bg-surface-container rounded-xl text-on-surface font-body-sm focus:outline-none border border-outline-variant/20"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary-container text-on-primary-container font-headline-sm text-[15px] font-semibold flex items-center justify-center gap-2 hover:bg-primary transition-all active:scale-[0.98] shadow-lg shadow-primary-container/20"
            >
              <span className="material-symbols-outlined text-[20px]">add_task</span>
              Inicializar Proyecto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Invite Colleague Modal
export const InviteModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Desarrollador');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setEmail('');
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-surface-container rounded-2xl p-space-lg border border-outline-variant/30 shadow-2xl relative animate-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-on-surface-variant hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-2 text-secondary">
          <span className="material-symbols-outlined text-[22px]">person_add</span>
          <h3 className="font-headline-sm text-on-surface">Invitar al Espacio</h3>
        </div>

        <p className="font-body-sm text-on-surface-variant mb-4">
          Concede acceso instantáneo a las analíticas y tableros en tiempo real.
        </p>

        {sent ? (
          <div className="p-4 rounded-xl bg-secondary-container/20 text-secondary text-center font-body-sm flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[28px]">check_circle</span>
            <span>Invitación enviada con éxito a {email}</span>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-3">
            <div>
              <label className="font-label-badge text-label-badge text-on-surface-variant uppercase">
                Email corporativo
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colega@nexusanalytics.io"
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-xl text-on-surface border border-outline-variant/30 font-body-sm focus:outline-none focus:border-secondary"
              />
            </div>

            <div>
              <label className="font-label-badge text-label-badge text-on-surface-variant uppercase">
                Permisos
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full h-10 px-3 mt-1 bg-surface-container-low rounded-xl text-on-surface border border-outline-variant/30 font-body-sm focus:outline-none"
              >
                <option>Desarrollador (Lectura y Despliegue)</option>
                <option>Analista (Métricas y Reportes)</option>
                <option>Admin (Control Total)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full h-11 mt-2 rounded-xl bg-secondary-container text-white font-medium flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              Enviar Invitación
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Notifications Drawer / Modal
export const NotificationsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const notifs = [
    {
      id: 'n1',
      title: 'Alerta de Anomalia Resuelta',
      desc: 'Latencia de API Gateway normalizada a 18ms en EMEA.',
      time: 'Hace 8m',
      icon: 'check_circle',
      color: 'text-secondary',
    },
    {
      id: 'n2',
      title: 'Cuota de API al 82%',
      desc: 'Has alcanzado 4.1M de las 5M solicitudes asignadas este ciclo.',
      time: 'Hace 45m',
      icon: 'warning',
      color: 'text-primary',
    },
    {
      id: 'n3',
      title: 'Nuevo Miembro Incorporado',
      desc: 'Elena Vance aceptó la invitación al proyecto Stripe Billing.',
      time: 'Hace 2h',
      icon: 'group_add',
      color: 'text-tertiary',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-xs p-4 pt-16 animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-surface-container rounded-2xl p-space-md border border-outline-variant/30 shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
            <h3 className="font-headline-sm text-on-surface">Notificaciones</h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <div className="divide-y divide-surface-container-high max-h-80 overflow-y-auto">
          {notifs.map((n) => (
            <div key={n.id} className="py-3 flex items-start gap-3">
              <span className={`material-symbols-outlined text-[20px] ${n.color} shrink-0 mt-0.5`}>
                {n.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-body-sm font-semibold text-on-surface">{n.title}</h4>
                  <span className="font-label-code text-[10px] text-on-surface-variant">{n.time}</span>
                </div>
                <p className="font-body-sm text-on-surface-variant text-[12px] mt-0.5">{n.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-3 py-2 rounded-xl bg-surface-container-high text-on-surface font-body-sm text-center hover:bg-surface-bright transition-colors"
        >
          Marcar todas como leídas
        </button>
      </div>
    </div>
  );
};

// API Keys & Webhooks Modal
export const ApiKeysModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyKey = (key: string) => {
    navigator.clipboard?.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-surface-container rounded-2xl p-space-md border border-outline-variant/30 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-on-surface-variant hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1 text-secondary">
          <span className="material-symbols-outlined text-[22px]">terminal</span>
          <h3 className="font-headline-sm text-on-surface">Claves de API Activas</h3>
        </div>
        <p className="font-body-sm text-on-surface-variant mb-4">
          Autentica solicitudes directas a los endpoints del telemetry core.
        </p>

        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-body-sm font-semibold text-on-surface">Prod Server Key (v2)</span>
              <span className="px-1.5 py-0.5 rounded bg-secondary-container/20 text-secondary font-label-code text-[10px]">
                Activo
              </span>
            </div>
            <div className="flex items-center justify-between bg-surface-container-lowest px-2.5 py-1.5 rounded-lg font-label-code text-[11px] text-on-surface">
              <span className="truncate">nx_live_920f...8a7b</span>
              <button
                onClick={() => copyKey('nx_live_920f4b39a0c1e8788a7b')}
                className="text-primary hover:text-white shrink-0 ml-2"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copiedKey === 'nx_live_920f4b39a0c1e8788a7b' ? 'done' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-body-sm font-semibold text-on-surface">Webhook Ingest Endpoint</span>
              <span className="px-1.5 py-0.5 rounded bg-secondary-container/20 text-secondary font-label-code text-[10px]">
                Sincronizado
              </span>
            </div>
            <div className="flex items-center justify-between bg-surface-container-lowest px-2.5 py-1.5 rounded-lg font-label-code text-[11px] text-on-surface">
              <span className="truncate">https://api.nexus.io/v2/events</span>
              <button
                onClick={() => copyKey('https://api.nexus.io/v2/events')}
                className="text-primary hover:text-white shrink-0 ml-2"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copiedKey === 'https://api.nexus.io/v2/events' ? 'done' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 rounded-xl bg-primary-container text-on-primary font-medium hover:bg-primary transition-colors text-center text-body-sm"
        >
          Generar Nueva Clave
        </button>
      </div>
    </div>
  );
};

// Integrations Modal
export const IntegrationsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [integrations, setIntegrations] = useState([
    { id: 'slack', name: 'Slack Bot', status: true, desc: 'Notificaciones en canal #ops-alerts' },
    { id: 'github', name: 'GitHub CI/CD', status: true, desc: 'Disparo de despliegues y sync de PRs' },
    { id: 'stripe', name: 'Stripe Billing', status: true, desc: 'Eventos de webhooks de suscripciones' },
    { id: 'datadog', name: 'Datadog APM', status: false, desc: 'Métricas de infraestructura en nube' },
  ]);

  if (!isOpen) return null;

  const toggle = (id: string) => {
    setIntegrations(integrations.map((i) => (i.id === id ? { ...i, status: !i.status } : i)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-sm bg-surface-container rounded-2xl p-space-md border border-outline-variant/30 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-on-surface-variant hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="flex items-center gap-2 mb-1 text-tertiary">
          <span className="material-symbols-outlined text-[22px]">hub</span>
          <h3 className="font-headline-sm text-on-surface">Integraciones Conectadas</h3>
        </div>
        <p className="font-body-sm text-on-surface-variant mb-4">
          Conexiones directas a tus servicios de desarrollo y pagos.
        </p>

        <div className="space-y-2.5 max-h-72 overflow-y-auto">
          {integrations.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/15 flex items-center justify-between"
            >
              <div>
                <h4 className="font-body-sm font-semibold text-on-surface">{item.name}</h4>
                <p className="font-body-sm text-[11px] text-on-surface-variant">{item.desc}</p>
              </div>
              <button
                onClick={() => toggle(item.id)}
                className={`w-10 h-5 rounded-full p-0.5 transition-colors shrink-0 flex items-center ${
                  item.status ? 'bg-secondary justify-end' : 'bg-surface-container-highest justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-surface shadow-sm"></span>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-medium hover:bg-surface-bright transition-colors text-center text-body-sm"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};
