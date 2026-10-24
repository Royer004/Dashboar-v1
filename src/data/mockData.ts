import { Project, ActivityItem, FunnelStep, AcquisitionChannel } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Rediseño Nexus v2.4',
    category: 'UI/UX',
    status: 'progress',
    statusLabel: 'En progreso',
    description: 'Refactorización del sistema de tokens y componentes móviles.',
    progress: 72,
    completedTasks: 14,
    totalTasks: 18,
    dueDate: '28 Oct',
    assignees: [
      {
        name: 'Sofia Chen',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmBJ_Jg8NPVYeAqPI82kW_DxWRoGfp7w5dxgirT3fmpae1DWINobSO8Egtn0dQbIpoO9YxKYCzgtuXUfqxMOCZGnaKAOIbI0zEqgjtZY_3u5FX73yTQgikmmF_q6RYJX1yTcNCJ4fsWzIBqfxsllAj7dN7YSLtyWgI6uHd-SUAVcEEfKZBoi0LFsUwQy_rt2U2LSOnZiReeU6Za4fGchmWdSlUObCbXlsiQECFzoKtPoSNU9jDBKQ'
      },
      {
        name: 'Marcus Bell',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgzQHjMNpPgx1DnPnasJttLe41X3arlWssrkJpFLnLVmuNeQ_myLoguRZvKuaugk-OYPKBgYeNinrQuaRqtN1G2foxi0oBPgcQGEaAJrh4a_nuLuX3P_1X-x38wGAWzr_HH_U5dkId_S9t1Ym6kmnS40HbuX1qvxoA1WPuQybCeF0RX5fs3GHGE1MoDZA7weE-S9ONT7_xOGPfxH0e8y4Bd1JT2FUQJT4z1gX7Ry4RnQPFgKnc36U'
      },
      {
        name: 'Leo Morales',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs5ZLocCQnVsdRtFQWNCZsdY-JXl9GmYk4jPd6V724j1tJx88mwBv1n-FYtIyPUXeQFixRMs-Icvhjc4bDP9Beojf-s67_1lUN1AUwScAHWrDRZkiR3KB2TBUAjhCWDT6nDDVCBl0TZibHzzV2o1iPrrjZr1DPLScd2kPpEc-JxcC_JjacTIfjIskRN-E4sfaQuaj3LszwAQfaKvF8Czj8_-QUziJBoTSRczvuO_buu3xgxBgafFg'
      }
    ],
    extraAssigneesCount: 1
  },
  {
    id: 'proj-2',
    title: 'Migración de API Gateway',
    category: 'Backend',
    status: 'review',
    statusLabel: 'En revisión',
    tag: 'Prioridad Alta',
    tagColor: 'error',
    description: 'Despliegue a Kubernetes multi-región con enrutamiento Edge Zero-Trust.',
    progress: 90,
    completedTasks: 21,
    totalTasks: 23,
    dueDate: '2 Nov',
    assignees: [
      {
        name: 'David Kim',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBidi_-DcyXLuPvN3jejL3_lh1hwkclCrWE16z9XLPGJbuMPbkQtE_Upjfo5zHJnWDWx8gbLeyg1N3zIR4amU87raBbREb2xRW08kFWU7P67NBmVwQkuQbHabyiWz0fXGyxeZI7f0V4WeHIrgxJLF1hHMavph5ii659XfnR0IG30pAHOPbM-7JMDOdG_jXmA-kCGtKrbowFKuD7tqbHEna1UplP54_DDv3ad3DjtbE2I58m8VXjmBY'
      },
      {
        name: 'Nadia Rossi',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqn3CvTXRohJm7WCCCfqDQC2rAxGMQJDjGJ0RfeNrVDEn0ufg9PcJxWtAeXrJQQh4ddZRvJJoDES8cX_RlFMxhh1FjFwaKtjzLdntOFrZuPT97Xdqh7C0eBXRDkAcwFgdUmTc_hj03EuC63SkJ_UrxOukqO4X-gkOYIEiEhIVV2y3zKTqLivC8rJLd5LdGFeHugJazUwhcn6oAyxrYyG9lTPiSt5yNTG_CHB8tLAw59N8Msdjw2eM'
      }
    ]
  },
  {
    id: 'proj-3',
    title: 'Integración Stripe Billing',
    category: 'Finanzas',
    status: 'done',
    statusLabel: 'Completado',
    description: 'Soporte para SEPA, tarjetas de crédito internacionales y retenciones fiscales.',
    progress: 100,
    completedTasks: 12,
    totalTasks: 12,
    dueDate: 'Ayer',
    assignees: [
      {
        name: 'Elena Vance',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAk1I3FKRsb622jrqbfQZlCvUEkL-9-jLZUqh9c6dLS7ka7fb2waJzcXv83h579xqE-l_-l218Jcoo3AXzC4M7i0DzDvVXPIof1KSCZq9GdMoiNExlrPy5s7vWJt3z1hhGN3C24zKnC3ksDYniVWkbVWTj_x_mJGeKIeqYrn5dgU4rzr1ivRr7AlQMa609SpkNBMeV88j1fZ7bHWJpM-LmQaHn_jyqoGzuFocJgHGE8G4awOpEW4tw'
      }
    ]
  },
  {
    id: 'proj-4',
    title: 'Optimización de Latencia DB',
    category: 'Backend',
    status: 'progress',
    statusLabel: 'En progreso',
    description: 'Indexación particionada en Timescale y cluster de caché Redis.',
    progress: 45,
    completedTasks: 6,
    totalTasks: 14,
    dueDate: '15 Nov',
    assignees: [
      {
        name: 'Carlos Mendez',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcGmRlW4L3wkUL4OdnVfh_ZX7jG-33VKRvJKmZZhziDRozfujWEPJWCCNVVVZivUgyulqvmqQu_jYMD6hed0DeAqEhzeb28ebI_cMxzSft1Hc_G9chVnS82cZsd0euNLe7dST9sZ31qZ8s8s77tTPv-1oKTLoXmWLi4lk9A8zb4MAFeYprop_36ixCJdkmwQ083LPlEl8J16-m9dicEsmSV4M_Yh7W-LqvchbmjDBDIbqpG2UGH7c'
      },
      {
        name: 'Aria Thorne',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxZav3yLLxel-CW3efrEpx-WEFJHUM0e5k0AHy0HAIALN-hlHtbaqtdStek7c-EpyfOf0sbYt39Lmq4SDbe3PQQHMBzbxi6WEKM7gTaJVxUZeHGRVM0iQUiZWMCsO4dbVjhHTtVivmRSZ5cjZFG8q9EeXsr9gdwidkVXSmrYF_HmjRkggV1DWQV_ODChnzwsaFWn6VZnPUzT1yAGMv2QV28nqSBY3CRdHyLWpUvHzccwBTel7758'
      }
    ]
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Suscripción Enterprise',
    subtitle: 'Acme Global • Plan Anual',
    amount: '+$14,400',
    time: 'Hace 5m',
    icon: 'loyalty',
    iconColor: 'secondary',
    type: 'sale'
  },
  {
    id: 'act-2',
    title: 'Deploy Staging v2.4.1',
    subtitle: 'Pipeline CI/CD completado (0 errores)',
    amount: 'OK • 42s',
    time: 'Hace 23m',
    icon: 'cloud_done',
    iconColor: 'primary',
    type: 'deploy'
  },
  {
    id: 'act-3',
    title: 'Ticket P0 Resuelto',
    subtitle: 'Latencia webhook resuelta por Elena',
    badge: 'SLA 100%',
    time: 'Hace 1h',
    icon: 'task_alt',
    iconColor: 'tertiary',
    type: 'ticket'
  },
  {
    id: 'act-4',
    title: 'Nuevo Token API generado',
    subtitle: 'Integración CI/CD GitHub Actions',
    badge: 'Activo',
    time: 'Hace 3h',
    icon: 'key',
    iconColor: 'secondary',
    type: 'deploy'
  }
];

export const FUNNEL_STEPS: FunnelStep[] = [
  {
    step: 1,
    label: 'Visitas Web Únicas',
    count: '184,920',
    percentage: '100%',
    barWidth: '100%',
    dropoff: 'Drop-off: 90.0% (-166.5k sesiones)'
  },
  {
    step: 2,
    label: 'Prueba Gratuita Iniciada',
    count: '18,490',
    percentage: '10.0%',
    barWidth: '10%',
    dropoff: 'Drop-off: 55.6% (-10.2k pruebas)'
  },
  {
    step: 3,
    label: 'Onboarding Completado',
    count: '8,210',
    percentage: '4.4%',
    barWidth: '4.4%',
    dropoff: 'Drop-off: 74.4% (-6.1k registros)'
  },
  {
    step: 4,
    label: 'Suscripción de Pago',
    count: '2,110',
    percentage: '1.1%',
    barWidth: '1.1%'
  }
];

export const ACQUISITION_CHANNELS: AcquisitionChannel[] = [
  {
    name: 'Orgánico / Búsqueda SEO',
    percentage: 42,
    count: '77.6k',
    icon: 'travel_explore',
    color: 'primary',
    barColor: 'bg-primary'
  },
  {
    name: 'Referidos & Product-Led',
    percentage: 28,
    count: '51.7k',
    icon: 'share',
    color: 'secondary',
    barColor: 'bg-secondary'
  },
  {
    name: 'Campañas de Pago (Ads)',
    percentage: 18,
    count: '33.2k',
    icon: 'campaign',
    color: 'tertiary',
    barColor: 'bg-tertiary'
  },
  {
    name: 'Directo & Enlaces Externos',
    percentage: 12,
    count: '22.1k',
    icon: 'public',
    color: 'on-surface-variant',
    barColor: 'bg-surface-bright'
  }
];

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1XzISRW6OHGaOMPztO9zpEVDqcfnFTczSbHkGQfNVWV965gSNFCJR5C1GkZv1ndsu6iSzRK78kI4gk7hfwnH3J1KxcQHrefTBtpbrqFdh1rdnPCv24BsandiNBiB__-7itHS6mPTav2WdN8XkkuQJv5LisOFazHlVJ8ZuMwFS9zOKcJTatAyyFgfefxVm72-0wqqpZmDSo_jqGiC_WWZBWyfv-h40-6Af7FCfniv2Wt9SEVYjJgO4J7aw';
export const USER_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8il_QPXeaRSsMkU1o2CeiSool_D1ZU0PlR9oHuTTPAOsE-d8SUwewSP_rhb7XL1PJxqrVtLKAWBmoSykcUsboViktr_ggwaqJ4vtM7vB4JAxBzo5OE4mul0tvK4HbVFB0fVA_-KLMtUwhEq9WN-b77KaJph1rObFsJHWdT88K5kP6oGJMQ_IIk3_cX2h3mVKmhrT4nB84KQ1opV2miU8MwN9xFeHr2ZJWeKF5QK4a7cuhfKxJs8c';
export const USER_AVATAR_LARGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsAGqnEmy3oDqcV_s6yuJyDDPqmZoAxPKcTZnpMWVEYzUeKk_1QO21kP25kOuoqW_xIFqD06RKNUqtCVoZ7r-Xa7BD8EdNmYdtryFx-wtI5xUSlJdw9fNYs_CjwDSGeySj70iujknBcYAikqsIwm3IcYqSOV_fHiJOfICCNwrbSrps5zhiZUlvOSp-inU2a7ZBDNz6hCpAlXg-SLlEWdMWB7Msj77kFf5x3cuddUyrw0TabA8BVXo';
