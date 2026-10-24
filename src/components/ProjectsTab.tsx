import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectsTabProps {
  projects: Project[];
  onOpenCreateModal: () => void;
  onUpdateProjectProgress?: (id: string, newProgress: number) => void;
  onDeleteProject?: (id: string) => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  projects,
  onOpenCreateModal,
  onUpdateProjectProgress
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'progress' | 'review' | 'done'>('all');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Compute counts
  const progressCount = projects.filter((p) => p.status === 'progress').length;
  const reviewCount = projects.filter((p) => p.status === 'review').length;
  const doneCount = projects.filter((p) => p.status === 'done').length;

  const filteredProjects = projects.filter((p) => {
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.tag && p.tag.toLowerCase().includes(q));
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="flex flex-col w-full pb-6 space-y-space-lg animate-in fade-in duration-200">
      {/* Cabecera de la sección & Acción Rápida */}
      <div className="flex items-center justify-between pt-space-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container shadow-[0_0_10px_rgba(128,131,255,0.8)]"></span>
            <span className="font-label-code text-label-code text-primary tracking-wider uppercase">
              Workspace Core
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mt-0.5">
            Proyectos Activos
          </h1>
        </div>

        <button
          onClick={onOpenCreateModal}
          id="btn-new-project"
          className="group relative flex items-center justify-center gap-1.5 px-space-md py-2 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary transition-all duration-200 active:scale-95 shadow-[0_4px_16px_rgba(128,131,255,0.35)]"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span className="font-label-badge text-label-badge font-semibold">Nuevo</span>
        </button>
      </div>

      {/* Resumen de Carga de Trabajo (KPIs condensados) */}
      <div className="grid grid-cols-3 gap-space-xs p-space-sm rounded-xl bg-surface-container-low shadow-sm border border-outline-variant/15">
        <div className="flex flex-col p-2 rounded-lg bg-surface-container">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-badge text-label-badge uppercase">Activos</span>
            <span className="material-symbols-outlined text-[14px] text-primary">layers</span>
          </div>
          <div className="mt-1 font-headline-sm text-headline-sm text-on-surface font-semibold">
            {projects.length * 2}
          </div>
          <span className="font-label-code text-label-code text-secondary text-[10px] mt-0.5">2 en cola</span>
        </div>

        <div className="flex flex-col p-2 rounded-lg bg-surface-container">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-badge text-label-badge uppercase">Tareas</span>
            <span className="material-symbols-outlined text-[14px] text-tertiary">checklist</span>
          </div>
          <div className="mt-1 font-headline-sm text-headline-sm text-on-surface font-semibold">
            {projects.reduce((acc, p) => acc + (p.totalTasks - p.completedTasks), 0) || 24}
          </div>
          <span className="font-label-code text-label-code text-on-surface-variant text-[10px] mt-0.5">
            pendientes
          </span>
        </div>

        <div className="flex flex-col p-2 rounded-lg bg-surface-container">
          <div className="flex items-center justify-between text-on-surface-variant">
            <span className="font-label-badge text-label-badge uppercase">A tiempo</span>
            <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
          </div>
          <div className="mt-1 font-headline-sm text-headline-sm text-secondary font-semibold">94%</div>
          <span className="font-label-code text-label-code text-secondary text-[10px] mt-0.5">+3.2% vel</span>
        </div>
      </div>

      {/* Barra de Búsqueda Rápida & Filtros */}
      <div className="space-y-space-sm">
        <div className="flex items-center gap-space-sm">
          <div className="relative flex-1 flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-outline text-[18px] pointer-events-none">
              search
            </span>
            <input
              id="search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar proyecto o tag..."
              className="w-full h-10 pl-9 pr-8 bg-surface-container rounded-xl text-on-surface placeholder:text-outline font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-high transition-colors border border-outline-variant/20 focus:border-primary-container"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          <button
            onClick={() => {
              // Cycle status filters as quick toggle or clear
              const cycle: ('all' | 'progress' | 'review' | 'done')[] = ['all', 'progress', 'review', 'done'];
              const nextIndex = (cycle.indexOf(statusFilter) + 1) % cycle.length;
              setStatusFilter(cycle[nextIndex]);
            }}
            title="Filtrar proyectos"
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors shrink-0 border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[19px]">tune</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_6px_rgba(78,222,163,0.9)]"></span>
          </button>
        </div>

        {/* Segmented Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            onClick={() => setStatusFilter('all')}
            className={`filter-chip px-3 py-1.5 rounded-full font-label-badge text-label-badge whitespace-nowrap transition-all shadow-sm ${
              statusFilter === 'all'
                ? 'bg-surface-container-highest text-on-surface'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Todos <span className="ml-1 opacity-70 font-label-code text-[10px]">{projects.length}</span>
          </button>

          <button
            onClick={() => setStatusFilter('progress')}
            className={`filter-chip px-3 py-1.5 rounded-full font-label-badge text-label-badge whitespace-nowrap transition-all ${
              statusFilter === 'progress'
                ? 'bg-surface-container-highest text-on-surface'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            En curso <span className="ml-1 opacity-70 font-label-code text-[10px]">{progressCount}</span>
          </button>

          <button
            onClick={() => setStatusFilter('review')}
            className={`filter-chip px-3 py-1.5 rounded-full font-label-badge text-label-badge whitespace-nowrap transition-all ${
              statusFilter === 'review'
                ? 'bg-surface-container-highest text-on-surface'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            En revisión <span className="ml-1 opacity-70 font-label-code text-[10px]">{reviewCount}</span>
          </button>

          <button
            onClick={() => setStatusFilter('done')}
            className={`filter-chip px-3 py-1.5 rounded-full font-label-badge text-label-badge whitespace-nowrap transition-all ${
              statusFilter === 'done'
                ? 'bg-surface-container-highest text-on-surface'
                : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Completados <span className="ml-1 opacity-70 font-label-code text-[10px]">{doneCount}</span>
          </button>
        </div>
      </div>

      {/* Lista interactiva de Proyectos */}
      {filteredProjects.length > 0 ? (
        <div className="flex flex-col space-y-space-md">
          {filteredProjects.map((project) => {
            const isProgress = project.status === 'progress';
            const isReview = project.status === 'review';
            const isDone = project.status === 'done';

            return (
              <article
                key={project.id}
                className="project-card group relative p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-200 border border-outline-variant/15"
              >
                <div className="flex items-start justify-between gap-space-sm mb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                      {isProgress && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-container/20 text-primary font-label-code text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                          En progreso
                        </span>
                      )}
                      {isReview && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-code text-[10px]">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                          En revisión
                        </span>
                      )}
                      {isDone && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-code text-[10px]">
                          <span className="material-symbols-outlined text-[11px]">done_all</span>
                          Completado
                        </span>
                      )}

                      {project.tag && (
                        <span className="font-label-code text-[10px] text-error font-medium px-1.5 py-0.5 rounded bg-error-container/30">
                          {project.tag}
                        </span>
                      )}

                      <span className="font-label-code text-[10px] text-on-surface-variant px-1.5 py-0.5 rounded bg-surface-container-high">
                        {project.category}
                      </span>
                    </div>

                    <h2
                      className={`font-headline-sm text-headline-sm text-on-surface truncate transition-colors ${
                        isProgress ? 'group-hover:text-primary' : isReview ? 'group-hover:text-tertiary' : 'group-hover:text-secondary'
                      }`}
                    >
                      {project.title}
                    </h2>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => setActiveMenuId(activeMenuId === project.id ? null : project.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface bg-surface-container-high/40 hover:bg-surface-container-high transition-colors shrink-0"
                    >
                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                    </button>

                    {activeMenuId === project.id && (
                      <div className="absolute right-0 top-9 w-44 bg-surface-container-highest border border-outline-variant/30 rounded-xl shadow-xl py-1 z-30 animate-in fade-in zoom-in-95">
                        <button
                          onClick={() => {
                            if (onUpdateProjectProgress) {
                              const newP = Math.min(100, project.progress + 10);
                              onUpdateProjectProgress(project.id, newP);
                            }
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-3 py-2 text-body-sm text-on-surface hover:bg-surface-bright flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
                          +10% Progreso
                        </button>
                        <button
                          onClick={() => {
                            if (onUpdateProjectProgress) {
                              onUpdateProjectProgress(project.id, 100);
                            }
                            setActiveMenuId(null);
                          }}
                          className="w-full text-left px-3 py-2 text-body-sm text-on-surface hover:bg-surface-bright flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[16px] text-primary">done_all</span>
                          Marcar Completado
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 mb-3">
                  {project.description}
                </p>

                {/* Barra de progreso */}
                <div className="space-y-1.5 mb-3">
                  <div className="flex items-center justify-between font-label-code text-label-code">
                    <span className="text-on-surface-variant flex items-center gap-1">
                      {isDone && <span className="material-symbols-outlined text-[13px] text-secondary">verified</span>}
                      {isDone ? 'Objetivos cumplidos' : 'Progreso global'}
                    </span>
                    <span
                      className={`font-semibold ${
                        isDone ? 'text-secondary' : isReview ? 'text-tertiary' : 'text-primary'
                      }`}
                    >
                      {project.progress}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isDone
                          ? 'bg-secondary shadow-[0_0_8px_rgba(78,222,163,0.7)]'
                          : isReview
                          ? 'bg-tertiary shadow-[0_0_8px_rgba(189,194,255,0.7)]'
                          : 'bg-primary-container shadow-[0_0_8px_rgba(128,131,255,0.7)]'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Footer de Card: Metadata y Asignados */}
                <div className="flex items-center justify-between pt-2">
                  {/* Avatares Colaboradores */}
                  <div className="flex items-center -space-x-2">
                    {project.assignees.map((assignee, idx) => (
                      <img
                        key={idx}
                        src={assignee.avatar}
                        alt={assignee.name}
                        title={assignee.name}
                        className="w-7 h-7 rounded-full object-cover shadow-sm bg-surface-container-highest ring-1 ring-surface-container"
                      />
                    ))}
                    {project.extraAssigneesCount ? (
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-surface-container-highest text-on-surface-variant font-label-code text-[10px] shadow-sm ring-1 ring-surface-container">
                        +{project.extraAssigneesCount}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex items-center gap-space-sm text-on-surface-variant font-label-code text-label-code">
                    <span className={`flex items-center gap-1 ${isDone ? 'text-secondary' : ''}`}>
                      <span className="material-symbols-outlined text-[14px]">
                        {isDone ? 'task_alt' : 'check_circle'}
                      </span>
                      {project.completedTasks}/{project.totalTasks}
                    </span>
                    <span
                      className={`flex items-center gap-1 ${
                        isDone
                          ? 'text-on-surface-variant'
                          : isReview
                          ? 'text-tertiary font-medium'
                          : 'text-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {isDone ? 'history' : isReview ? 'event' : 'schedule'}
                      </span>
                      {project.dueDate}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Empty State Dinámico */
        <div className="flex flex-col items-center justify-center p-space-xl text-center rounded-2xl bg-surface-container-low mt-4 space-y-3 border border-outline-variant/15">
          <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[26px]">folder_off</span>
          </div>
          <div className="space-y-1">
            <p className="font-headline-sm text-headline-sm text-on-surface">No se encontraron proyectos</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-[240px] mx-auto">
              Prueba con otro término de búsqueda o cambia los filtros de estado.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}
            className="px-4 py-2 rounded-xl bg-surface-container-highest text-primary font-body-sm font-medium hover:bg-surface-bright transition-colors"
          >
            Restablecer filtros
          </button>
        </div>
      )}
    </div>
  );
};
