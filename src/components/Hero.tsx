import React from 'react';
import { MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  darkMode: boolean;
}

export const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const handleOpenGmail = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=Consulta%20desde%20Portafolio&body=Hola%20Joaqu%C3%ADn,%20te%20escribo%20desde%20tu%20portafolio...`,
      '_blank'
    );
  };

  return (
    <section id="inicio" className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden relative">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-emerald-500/10 dark:bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text Info & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{PERSONAL_INFO.status}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                <span className="block">JOAQUÍN EMILIANO</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 dark:from-blue-400 dark:via-indigo-400 dark:to-emerald-400">
                  SALGUEIRO
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
                {PERSONAL_INFO.title}
              </p>
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
                {PERSONAL_INFO.subtitle}
              </p>
            </div>

            {/* Location */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800">
                <MapPin className="w-4 h-4 text-emerald-500" /> {PERSONAL_INFO.location}
              </span>
            </div>

            {/* Summary Text */}
            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
              {PERSONAL_INFO.summary}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#proyectos"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                Ver Proyectos
              </a>
              <a
                href="#contacto"
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                Contactarme
              </a>
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                Stack Principal & Herramientas:
              </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                  {['JavaScript', 'React', 'TypeScript', 'HTML5/CSS3', 'PHP', 'MySQL', 'Node.js'].map((tech) => (
                  <span
                    key={tech}
                    className={`text-xs px-2.5 py-1 rounded-md font-mono font-medium ${
                      darkMode ? 'bg-slate-900 text-slate-300 border border-slate-800' : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Avatar Display & Key Credential Cards */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-2 bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-500 shadow-2xl shadow-blue-500/20">
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-slate-950 relative group">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800 text-center">
                  <p className="text-xs font-bold text-white">IESA Misiones (Marzo 2026)</p>
                  <p className="text-[10px] text-emerald-400 font-mono">Analista en Sistemas de Información</p>
                  <p className="text-[9px] text-blue-300 font-mono mt-0.5">+ Certificación en Hardware</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
