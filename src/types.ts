export type ProjectCategory = 'Todos' | 'Sistemas & POS' | 'Herramientas Web' | 'Educación & Finanzas' | 'Proyectos Personales';

export type TechLanguage = 'Todos' | 'JavaScript' | 'PHP' | 'Python' | 'MySQL' | 'HTML/CSS' | 'React' | 'HTML5/CSS3' | 'Capacitor 7' | 'Service Workers' | 'Canvas API' | 'Vercel' | 'Node.js' | 'Chart.js' | 'MCP' | 'PWA' | 'Hardware' | 'Redes' | 'Software' | 'Diagnóstico';

export interface Education {
  title: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: ProjectCategory;
  technologies: TechLanguage[];
  tags: string[];
  image: string;
  url?: string;
  githubUrl?: string;
  featured: boolean;
  status: 'Producción' | 'En Vivo' | 'Proyecto Final';
  metrics?: string;
  demoType?: 'nexostock' | 'sumamente' | 'platahoy';
  highlights: string[];
  gallery?: { src: string; caption: string }[];
  clientLocation?: string;
}

export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: number;
    iconName: string;
    description: string;
    tag: 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'Systems';
  }[];
}
