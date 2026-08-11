import { Project, Education } from '../types';
import avatarImg from '../assets/images/perfil.jpg';
import nexostockLogo from '../../logo_NexoStock.jpg';
import sumamenteLogo from '../../logo_sumamente.jpg';
import platahoyLogo from '../../logo_platahoy.png';
import ejemploTicket from '../../ejemplo_ticket.jpg';

export const PERSONAL_INFO = {
  name: "Joaquín Emiliano Salgueiro",
  shortName: "Joaquín Salgueiro",
  title: "Analista en Sistemas de Información",
  subtitle: "Desarrollador Frontend & Full Stack",
  tagline: "Analista en Sistemas egresado del IESA. Especialista en frontend con capacidad full stack. Creo interfaces rápidas y sistemas que funcionan en el mundo real.",
  location: "Posadas, Misiones, Argentina",
  email: "joaquinsalgueiro15@gmail.com",
  avatar: avatarImg,
  status: "Disponible para proyectos & contrataciones",
  degree: "Analista en Sistemas - IESA (Marzo 2026)",
  summary: "Analista en Sistemas de Información egresado del IESA (marzo 2026). Desarrollador con fuerte enfoque en frontend y capacidad full stack. Apasionado por crear interfaces rápidas y sistemas que resuelven problemas reales. Llevo proyectos desde cero hasta producción, incluyendo un sistema POS completo que opera en un supermercado real.",
  education: [
    {
      title: "Analista en Sistemas de Información",
      institution: "IESA - Instituto de Estudios Superiores Argentino",
      period: "Marzo 2026 (Egreso)",
      location: "Posadas, Misiones"
    },
    {
      title: "Armado y Configuración de Computadoras",
      institution: "IESA",
      period: "2025",
      location: "Posadas, Misiones",
      details: "256 horas reloj - Nivel II. Avalado por S.P.E.P.M. - Ministerio de Educación de Misiones."
    }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 'sumamente',
    title: 'SumaMente',
    tagline: 'Calculadora científica y técnica avanzada con +40 módulos interdisciplinarios',
    description: 'Plataforma web interactiva con más de 40 calculadoras especializadas para finanzas, medicina, ingeniería, programación y vida cotidiana.',
    longDescription: 'SumaMente es un motor matemático y suite de calculadoras en línea diseñada para simplificar cálculos complejos. Desarrollada con un motor optimizado en JavaScript y una interfaz intuitiva, abarca finanzas (interés compuesto, amortizaciones), medicina (IMC, dosis), ingeniería (ley de Ohm, estructuras) y programación (conversor de bases numéricas, máscaras de red).',
    category: 'Herramientas Web',
    technologies: ['JavaScript', 'HTML5/CSS3', 'Capacitor 7', 'Service Workers', 'Canvas API', 'Vercel'],
    tags: ['Math Engine', 'Web App', 'Algoritmos', 'PWA', 'Play Store'],
    image: sumamenteLogo,
    url: 'https://suma-mente.vercel.app',
    featured: true,
    status: 'En Vivo',
    metrics: '+40 Módulos de Cálculo',
    demoType: 'sumamente',
    highlights: [
      'Más de 40 calculadoras agrupadas por áreas profesionales',
      'Algoritmos matemáticos optimizados para rendimiento instantáneo',
      'Diseño 100% responsivo adaptable a dispositivos móviles',
      'Historial de cálculos recientes y exportación de datos'
    ]
  },
  {
    id: 'nexostock',
    title: 'NexoStock',
    tagline: 'Sistema POS completo para supermercados implementado en producción real',
    description: 'Sistema Punto de Venta (POS) creado desde cero e implementado en El Puente Supermercado. Funciona de forma local en las máquinas del negocio, gestionando ventas, stock y cajas.',
    longDescription: 'NexoStock es un sistema completo de gestión comercial y punto de venta (POS) que desarrollé desde cero para El Puente Supermercado en El Soberbio, Misiones. Es un sistema local instalado en las máquinas del negocio, no es una aplicación web pública. Atiende múltiples cajas registradoras con diferentes empleados operando simultáneamente. Incluye lectura por código de barras, cobro multimodal, control de stock en tiempo real, sistema de promociones, cierres de caja y soporte para balanza.',
    category: 'Sistemas & POS',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS'],
    tags: ['POS', 'Supermercados', 'Producción', 'Inventario', 'Capacitación', 'Promociones', 'Balanza'],
    image: nexostockLogo,
    featured: true,
    status: 'Producción',
    metrics: 'Sistema Local en El Puente Supermercado',
    demoType: 'nexostock',
    highlights: [
      'Sistema local creado desde cero, instalado en las máquinas del supermercado',
      'Implementado en El Puente Supermercado - El Soberbio, Misiones',
      'Múltiples cajas registradoras operando simultáneamente',
      'Venta rápida con búsqueda por nombre o código de barras',
      'Carrito con cantidades y control de stock en tiempo real',
      'Sistema de promociones inteligente: porcentaje, monto fijo, 2x1, X por Y',
      'Control de cajas simultáneas con estados activa/inactiva y en uso/libre',
      'Liberación automática de caja después de 5 minutos de inactividad',
      'Cobro multimodal: efectivo, tarjeta o transferencia/QR',
      'Cierres de caja con desglose por hora y reportes automáticos',
      'Soporte para balanza: productos pesados con códigos especiales',
      'Tickets duales: HTML para pantalla y JSON/texto para almacenamiento',
      'Capacitación presencial del personal y manuales operativos',
      'Base de datos MySQL optimizada con índices de alta concurrencia'
    ],
    gallery: [
      { src: ejemploTicket, caption: 'Ticket térmico generado por el sistema en El Puente Supermercado, El Soberbio' }
    ],
    clientLocation: 'https://www.google.com/maps/place/El+Puente+SUPERMERCADO/@-27.2941867,-54.2028514,19z'
  },
  {
    id: 'platahoy',
    title: 'PlataHoy',
    tagline: 'Blog educativo y herramientas de finanzas personales, cripto y economía',
    description: 'Portal web informativo sobre finanzas personales, cotizaciones en tiempo real, inversiones en Argentina, criptomonedas y tecnología.',
    longDescription: 'PlataHoy combina contenido editorial sobre educación financiera con simuladores de rendimiento y calculadoras de inflación/dólar. Diseñado con foco en la legibilidad y la rapidez de carga para usuarios de Latinoamérica.',
    category: 'Educación & Finanzas',
    technologies: ['HTML5/CSS3', 'JavaScript', 'Node.js', 'Chart.js', 'MCP', 'PWA'],
    tags: ['Finanzas', 'Blog', 'Cripto', 'Simuladores', 'PWA'],
    image: platahoyLogo,
    url: 'https://platahoy.vercel.app',
    featured: true,
    status: 'En Vivo',
    metrics: 'Blog Educativo + Calculadora',
    demoType: 'platahoy',
    highlights: [
      'Blog en español sobre finanzas, cripto y tecnología con ~10 artículos',
      'Calculadora de interés compuesto con gráfico dinámico (Chart.js)',
      '3 escenarios preconfigurados: Conservador (5%), Moderado (8%), Agresivo (12%)',
      'PWA offline con Service Worker y modo oscuro',
      'MCP Blog Server con Node.js para gestión de contenido'
    ]
  }
];
