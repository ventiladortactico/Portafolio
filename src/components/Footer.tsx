import React from 'react';
import { Mail, MapPin, Code2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  return (
    <footer className={`border-t transition-colors ${darkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-500 flex items-center justify-center font-mono font-black text-white text-sm">
                JS
              </div>
              <span className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-md">
              Analista en Sistemas de Información. Desarrollador Frontend & Full Stack especializado en interfaces rápidas y sistemas que resuelven problemas reales.
            </p>
            <p className="text-xs text-emerald-500 font-mono flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> {PERSONAL_INFO.location}
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-2">
            <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Navegación
            </h3>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#inicio" className="hover:text-blue-500 transition-colors py-1 block min-h-[24px] flex items-center">Inicio</a></li>
                <li><a href="#proyectos" className="hover:text-blue-500 transition-colors py-1 block min-h-[24px] flex items-center">Proyectos</a></li>
                <li><a href="#habilidades" className="hover:text-blue-500 transition-colors py-1 block min-h-[24px] flex items-center">Habilidades</a></li>
                <li><a href="#contacto" className="hover:text-blue-500 transition-colors py-1 block min-h-[24px] flex items-center">Contacto</a></li>
              </ul>
          </div>

          {/* Col 3: Contacto */}
          <div className="space-y-2">
            <h3 className={`text-xs font-mono font-bold uppercase tracking-wider ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Contacto
            </h3>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="mailto:joaquinsalgueiro15@gmail.com" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 py-1 min-h-[24px]">
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/joaquin-salgueiro" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 py-1 min-h-[24px]">
                  <Code2 className="w-3.5 h-3.5" /> LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/joaquinsalgueiro" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors flex items-center gap-1.5 py-1 min-h-[24px]">
                  <Code2 className="w-3.5 h-3.5" /> GitHub
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800/80 text-center text-xs">
          <p>© 2026 {PERSONAL_INFO.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
