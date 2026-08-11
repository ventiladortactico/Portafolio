import React, { useState } from 'react';
import { Code, Layout, Server, Database, Terminal, Cpu, Layers, CheckCircle, ShoppingCart, Users, Wrench, Globe, Zap, Shield, Monitor } from 'lucide-react';

interface Skill {
  name: string;
  icon: React.ReactNode;
  description: string;
  projects: string[];
}

interface SkillCategory {
  name: string;
  color: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend & Lenguajes',
    color: 'from-blue-500 to-cyan-500',
    skills: [
      { name: 'JavaScript ES6+', icon: <Code className="w-5 h-5" />, description: 'Lógica vanilla, DOM, async/await, módulos', projects: ['SumaMente', 'NexoStock', 'PlataHoy'] },
      { name: 'HTML5 & CSS3', icon: <Layout className="w-5 h-5" />, description: 'Maquetación responsive, CSS Grid, Flexbox, animaciones', projects: ['SumaMente', 'PlataHoy'] },
      { name: 'TypeScript', icon: <Code className="w-5 h-5" />, description: 'Tipado fuerte, interfaces, proyectos con testing', projects: ['SumaMente'] },
      { name: 'React', icon: <Globe className="w-5 h-5" />, description: 'Hooks, componentes, arquitectura SPA', projects: ['Este portafolio'] }
    ]
  },
  {
    name: 'Backend & Bases de Datos',
    color: 'from-emerald-500 to-teal-500',
    skills: [
      { name: 'PHP', icon: <Server className="w-5 h-5" />, description: 'Backend NexoStock, APIs REST, arquitectura cliente-servidor', projects: ['NexoStock'] },
      { name: 'MySQL', icon: <Database className="w-5 h-5" />, description: 'Diseño de esquemas, índices, transacciones atómicas', projects: ['NexoStock'] },
      { name: 'Node.js', icon: <Cpu className="w-5 h-5" />, description: 'Servidores backend, MCP Blog Server, ES modules', projects: ['PlataHoy'] },
      { name: 'Python', icon: <Terminal className="w-5 h-5" />, description: 'Scripts de automatización, herramientas de diagnóstico', projects: ['Hardware Diagnostic'] }
    ]
  },
  {
    name: 'Sistemas & Producción',
    color: 'from-purple-500 to-pink-500',
    skills: [
      { name: 'Sistemas POS', icon: <ShoppingCart className="w-5 h-5" />, description: 'Lógica de cobro, códigos de barras, impresoras térmicas', projects: ['NexoStock'] },
      { name: 'Implementación', icon: <Zap className="w-5 h-5" />, description: 'Despliegue en producción real, configuración en punto de venta', projects: ['NexoStock'] },
      { name: 'PWA & Web Apps', icon: <Monitor className="w-5 h-5" />, description: 'Service workers, offline-first, Canvas API, Chart.js', projects: ['SumaMente', 'PlataHoy'] },
      { name: 'Capacitación', icon: <Users className="w-5 h-5" />, description: 'Entrenamiento de cajeros, manuales operativos', projects: ['NexoStock'] }
    ]
  },
  {
    name: 'Hardware & Redes',
    color: 'from-amber-500 to-orange-500',
    skills: [
      { name: 'Armado de PCs', icon: <Wrench className="w-5 h-5" />, description: 'Reconocimiento de componentes, banco de prueba, ensamble', projects: ['Certificación IESA'] },
      { name: 'Diagnóstico', icon: <CheckCircle className="w-5 h-5" />, description: 'Fallas hardware/software, mantenimiento preventivo', projects: ['Certificación IESA'] },
      { name: 'Redes', icon: <Shield className="w-5 h-5" />, description: 'Nociones de comunicaciones y redes', projects: ['Certificación IESA'] }
    ]
  }
];

export const SkillsSection: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  return (
    <section id="habilidades" className="py-20 bg-slate-50/50 dark:bg-slate-950/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Habilidades & Tecnologías
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Stack Técnico & Capacidades
          </h2>
          <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Desarrollo full stack, sistemas POS en producción, PWA y hardware.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === idx
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg`
                  : darkMode
                  ? 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SKILL_CATEGORIES[selectedCategory].skills.map((skill, idx) => (
            <div
              key={idx}
              className={`group p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                darkMode
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-lg'
              }`}
            >
              {/* Icon */}
              <div className={`p-2.5 rounded-xl bg-gradient-to-r ${SKILL_CATEGORIES[selectedCategory].color} text-white w-fit mb-3`}>
                {skill.icon}
              </div>

              {/* Name */}
              <h4 className={`text-sm font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {skill.name}
              </h4>

              {/* Description */}
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                {skill.description}
              </p>

              {/* Projects Tags */}
              <div className="flex flex-wrap gap-1">
                {skill.projects.map((proj, pIdx) => (
                  <span
                    key={pIdx}
                    className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${
                      darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: 'Proyectos en Producción', value: '3', icon: <CheckCircle className="w-5 h-5 text-emerald-500" /> },
            { label: 'Tecnologías Dominadas', value: '15+', icon: <Layers className="w-5 h-5 text-blue-500" /> },
            { label: 'Sistema POS Real', value: '1', icon: <ShoppingCart className="w-5 h-5 text-purple-500" /> },
            { label: 'Certificación Hardware', value: 'IESA', icon: <Wrench className="w-5 h-5 text-amber-500" /> }
          ].map((stat, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border text-center ${
                darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-900'}`}>{stat.value}</div>
              <div className="text-[10px] text-slate-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
