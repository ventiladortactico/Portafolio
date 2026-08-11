import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, MapPin, CheckCircle, GraduationCap, Briefcase, Code } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose, darkMode }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOpenGmail = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=Consulta%20desde%20Portafolio&body=Hola%20Joaqu%C3%ADn,%20te%20escribo%20desde%20tu%20portafolio...`,
      '_blank'
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl my-8 max-h-[92vh] flex flex-col overflow-y-auto ${
          darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
          <div className="flex items-center space-x-2">
            <span className="font-mono text-xs font-bold px-2.5 py-1 bg-blue-500/10 text-blue-500 rounded-full border border-blue-500/20">
              Curriculum Vitae Oficial
            </span>
            <span className="text-xs text-slate-400 font-mono">Actualizado 2026</span>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/cv-joaquin-salgueiro.pdf"
              download
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" /> Descargar PDF Oficial
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: CV Content Document */}
        <div className="p-6 sm:p-10 overflow-y-auto flex-1 space-y-8 print:p-0 print:overflow-visible">
          
          {/* Header CV */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">{PERSONAL_INFO.name}</h1>
            <p className="text-base font-bold text-blue-500 dark:text-blue-400">{PERSONAL_INFO.title}</p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-1">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> {PERSONAL_INFO.location}</span>
              <button
                onClick={handleOpenGmail}
                className="flex items-center gap-1.5 text-blue-500 hover:underline font-bold"
              >
                <Mail className="w-3.5 h-3.5" /> Enviar Mensaje a Gmail
              </button>
            </div>
          </div>

          {/* Perfil Profesional */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500 flex items-center gap-1.5">
              <Code className="w-4 h-4" /> Perfil Profesional
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {PERSONAL_INFO.summary}
            </p>
          </div>

          {/* Proyectos Destacados */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" /> Proyectos Destacados
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="font-bold">
                  • SumaMente (<span className="text-blue-500 font-mono">suma-mente.vercel.app</span>)
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Calculadora científica y técnica avanzada con más de 40 módulos (finanzas, medicina, ingeniería, programación, etc.).
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="font-bold">
                  • PlataHoy (<span className="text-blue-500 font-mono">platahoy.vercel.app</span>)
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Blog educativo sobre finanzas personales, inversiones, criptomonedas y tecnología.
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="font-bold">
                  • NexoStock (POS)
                </p>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  Sistema POS completo para supermercados desarrollado e implementado en producción. Participé también en capacitación de cajeros y selección de personal.
                </p>
              </div>
            </div>
          </div>

          {/* Experiencia Laboral */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-500 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4" /> Experiencia Laboral
            </h2>
            <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex justify-between items-baseline">
                <p className="font-bold text-sm">Desarrollador Independiente & Implementación - Supermercado</p>
                <span className="text-xs font-mono text-slate-400">2026 - Actualidad</span>
              </div>
              <ul className="list-disc list-inside text-xs space-y-1 text-slate-600 dark:text-slate-300">
                <li>Desarrollo completo del sistema NexoStock (POS).</li>
                <li>Implementación, pruebas y capacitación de personal.</li>
                <li>Revisión de currículums y selección de cajeros.</li>
              </ul>
            </div>
          </div>

          {/* Formación Académica */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> Formación Académica
            </h2>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between">
                <div>
                  <p className="font-bold">Analista en Sistemas</p>
                  <p className="text-xs text-slate-500">Instituto de Estudios Superiores Argentino (IESA)</p>
                </div>
                <span className="font-mono text-xs text-emerald-500 font-bold">Marzo 2026</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between">
                <div>
                  <p className="font-bold">Certificado: Armado y Configuración de Computadoras</p>
                  <p className="text-xs text-slate-500">IESA</p>
                </div>
                <span className="font-mono text-xs text-slate-400">2025</span>
              </div>
            </div>
          </div>

          {/* Habilidades Técnicas */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-blue-500">
              Habilidades Técnicas
            </h2>
            <ul className="list-disc list-inside text-xs sm:text-sm space-y-1 text-slate-700 dark:text-slate-300 font-mono">
              <li>HTML, CSS, JavaScript, PHP, Python, MySQL</li>
              <li>Desarrollo Full Stack (proyectos propios completos)</li>
              <li>Creación de herramientas web y calculadoras complejas</li>
              <li>Implementación y capacitación de sistemas en producción</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
