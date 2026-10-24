import { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OverviewTab } from './components/OverviewTab';
import { ProjectsTab } from './components/ProjectsTab';
import { AnalyticsTab } from './components/AnalyticsTab';
import { SettingsTab } from './components/SettingsTab';
import {
  NewProjectDrawer,
  InviteModal,
  NotificationsModal,
  ApiKeysModal,
  IntegrationsModal,
} from './components/Modals';
import { INITIAL_PROJECTS, INITIAL_ACTIVITIES } from './data/mockData';
import { TabType, Project } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('overview');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [activities] = useState(INITIAL_ACTIVITIES);

  // Modals state
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isApiKeysOpen, setIsApiKeysOpen] = useState(false);
  const [isIntegrationsOpen, setIsIntegrationsOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleCreateProject = (projectData: Partial<Project>) => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      title: projectData.title || 'Nuevo Proyecto',
      category: projectData.category || 'UI/UX',
      status: 'progress',
      statusLabel: 'En progreso',
      description: projectData.description || 'Nuevo sprint iniciado en Nexus Workspace.',
      progress: projectData.progress || 10,
      completedTasks: projectData.completedTasks || 1,
      totalTasks: projectData.totalTasks || 10,
      dueDate: projectData.dueDate || '15 Nov',
      assignees: projectData.assignees || [
        {
          name: 'Alex Morgan',
          avatar:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuB8il_QPXeaRSsMkU1o2CeiSool_D1ZU0PlR9oHuTTPAOsE-d8SUwewSP_rhb7XL1PJxqrVtLKAWBmoSykcUsboViktr_ggwaqJ4vtM7vB4JAxBzo5OE4mul0tvK4HbVFB0fVA_-KLMtUwhEq9WN-b77KaJph1rObFsJHWdT88K5kP6oGJMQ_IIk3_cX2h3mVKmhrT4nB84KQ1opV2miU8MwN9xFeHr2ZJWeKF5QK4a7cuhfKxJs8c',
        },
      ],
    };
    setProjects([newProject, ...projects]);
    showToast(`Proyecto "${newProject.title}" inicializado con éxito`);
  };

  const handleUpdateProjectProgress = (id: string, newProgress: number) => {
    setProjects(
      projects.map((p) => {
        if (p.id === id) {
          const isDone = newProgress >= 100;
          return {
            ...p,
            progress: newProgress,
            status: isDone ? 'done' : p.status,
            statusLabel: isDone ? 'Completado' : p.statusLabel,
            completedTasks: isDone ? p.totalTasks : Math.min(p.totalTasks, p.completedTasks + 1),
          };
        }
        return p;
      })
    );
    showToast('Progreso del proyecto actualizado');
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    showToast('✓ Enlace copiado al portapapeles');
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container/30">
      {/* Sticky Top Header */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        notificationCount={3}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full px-margin pt-20 pb-24 bg-surface max-w-md mx-auto">
        {currentTab === 'overview' && (
          <OverviewTab
            activities={activities}
            onOpenNewProject={() => setIsNewProjectOpen(true)}
            onOpenInvite={() => setIsInviteOpen(true)}
            onExport={() => showToast('Exportando reporte del Overview (PDF)...')}
            onCopyLink={handleCopyLink}
            onViewAllActivity={() => setCurrentTab('analitica')}
          />
        )}

        {currentTab === 'proyectos' && (
          <ProjectsTab
            projects={projects}
            onOpenCreateModal={() => setIsNewProjectOpen(true)}
            onUpdateProjectProgress={handleUpdateProjectProgress}
          />
        )}

        {currentTab === 'analitica' && (
          <AnalyticsTab
            onExportReport={() => showToast('Generando reporte completo de telemetría...')}
          />
        )}

        {currentTab === 'ajustes' && (
          <SettingsTab
            onOpenEditProfile={() => showToast('Modo de edición de perfil activado')}
            onOpenUpgradePlan={() => setIsUpgradeModalOpen(true)}
            onOpenBillingReceipts={() => showToast('Cargando historial de facturación fiscal...')}
            onOpenTeamMembers={() => setIsInviteOpen(true)}
            onOpenApiKeys={() => setIsApiKeysOpen(true)}
            onOpenIntegrations={() => setIsIntegrationsOpen(true)}
            onOpenTwoFactor={() => showToast('Llave de seguridad FIDO2 verificada y activa')}
            onOpenVipSupport={() => setIsSupportModalOpen(true)}
            onOpenSignOutConfirm={() => showToast('Sesión segura cerrada. Redirigiendo a SSO...')}
            onOpenDocs={() => showToast('Abriendo documentación para desarrolladores v2.4')}
          />
        )}
      </main>

      {/* Sticky Bottom Navigation Bar */}
      <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />

      {/* Drawers and Modals */}
      <NewProjectDrawer
        isOpen={isNewProjectOpen}
        onClose={() => setIsNewProjectOpen(false)}
        onCreateProject={handleCreateProject}
      />

      <InviteModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <ApiKeysModal isOpen={isApiKeysOpen} onClose={() => setIsApiKeysOpen(false)} />

      <IntegrationsModal
        isOpen={isIntegrationsOpen}
        onClose={() => setIsIntegrationsOpen(false)}
      />

      {/* Upgrade Plan Modal */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-surface-container rounded-2xl p-space-lg border border-outline-variant/30 shadow-2xl relative">
            <button
              onClick={() => setIsUpgradeModalOpen(false)}
              className="absolute top-3 right-3 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="flex items-center gap-2 mb-2 text-primary">
              <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
              <h3 className="font-headline-sm text-on-surface">Mejorar Plan Enterprise</h3>
            </div>
            <p className="font-body-sm text-on-surface-variant mb-4">
              Aumenta los asientos de equipo y desbloquea cuotas ilimitadas de API y clustering multi-región.
            </p>
            <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 mb-4 space-y-2">
              <div className="flex justify-between text-body-sm">
                <span className="text-on-surface-variant">Cuota API Actual</span>
                <span className="text-secondary font-semibold font-label-code">5M reqs/mes</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-on-surface-variant">Nueva Cuota</span>
                <span className="text-primary font-semibold font-label-code">50M reqs/mes</span>
              </div>
              <div className="flex justify-between text-body-sm">
                <span className="text-on-surface-variant">Asientos Ilimitados</span>
                <span className="text-secondary font-semibold font-label-code">Incluido</span>
              </div>
            </div>
            <button
              onClick={() => {
                setIsUpgradeModalOpen(false);
                showToast('Solicitud de ampliación enviada al Account Manager');
              }}
              className="w-full py-2.5 rounded-xl bg-primary-container text-on-primary font-medium hover:bg-primary transition-colors text-center text-body-md shadow-lg shadow-primary-container/20"
            >
              Confirmar Solicitud de Upgrade
            </button>
          </div>
        </div>
      )}

      {/* VIP Support Chat Modal */}
      {isSupportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-surface-container rounded-2xl p-space-lg border border-outline-variant/30 shadow-2xl relative">
            <button
              onClick={() => setIsSupportModalOpen(false)}
              className="absolute top-3 right-3 text-on-surface-variant hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div className="flex items-center gap-2 mb-2 text-primary">
              <span className="material-symbols-outlined text-[24px]">support_agent</span>
              <h3 className="font-headline-sm text-on-surface">Canal de Soporte VIP</h3>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-code text-[11px] text-secondary">
                Tiempo de respuesta estimado: &lt; 8 minutos
              </span>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-surface-container-low rounded-xl text-body-sm text-on-surface-variant">
                Hola Alex, un ingeniero de guardia del equipo de Telemetría está asignado a tu cuenta. ¿En qué podemos ayudarte?
              </div>
              <textarea
                placeholder="Escribe tu consulta técnica o ticket..."
                rows={3}
                className="w-full p-2.5 bg-surface-container-low rounded-xl text-on-surface placeholder:text-outline font-body-sm border border-outline-variant/30 focus:outline-none focus:border-primary resize-none"
              ></textarea>
            </div>
            <button
              onClick={() => {
                setIsSupportModalOpen(false);
                showToast('Mensaje enviado. Recibirás respuesta vía Slack y correo.');
              }}
              className="w-full mt-3 py-2.5 rounded-xl bg-primary-container text-on-primary font-medium hover:bg-primary transition-colors text-center text-body-md"
            >
              Enviar al Ingeniero de Guardia
            </button>
          </div>
        </div>
      )}

      {/* Floating Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-surface-container-highest border border-secondary/40 rounded-xl shadow-2xl flex items-center gap-2 text-on-surface font-body-sm text-center animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
