export type TabType = 'overview' | 'proyectos' | 'analitica' | 'ajustes';

export interface Project {
  id: string;
  title: string;
  category: 'UI/UX' | 'Backend' | 'Finanzas' | 'Data';
  status: 'progress' | 'review' | 'done';
  statusLabel: string;
  tag?: string;
  tagColor?: string;
  description: string;
  progress: number;
  completedTasks: number;
  totalTasks: number;
  dueDate: string;
  assignees: {
    name: string;
    avatar: string;
  }[];
  extraAssigneesCount?: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  amount?: string;
  time: string;
  icon: string;
  iconColor: string;
  type: 'sale' | 'deploy' | 'ticket';
  badge?: string;
}

export interface FunnelStep {
  step: number;
  label: string;
  count: string;
  percentage: string;
  barWidth: string;
  dropoff?: string;
}

export interface AcquisitionChannel {
  name: string;
  percentage: number;
  count: string;
  icon: string;
  color: string;
  barColor: string;
}
