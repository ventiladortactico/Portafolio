import React from 'react';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactSectionProps {
  darkMode: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ darkMode }) => {
  const handleOpenGmail = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=Consulta%20desde%20Portafolio&body=Hola%20Joaqu%C3%ADn,%20te%20escribo%20desde%20tu%20portafolio...`,
      '_blank'
    );
  };

  const contactMethods = [
    {
      name: 'LinkedIn',
      description: 'Conectá profesionalmente',
      icon: <Linkedin className="w-6 h-6" />,
      color: 'from-blue-600 to-blue-700',
      action: () => window.open('https://linkedin.com/in/joaquin-salgueiro', '_blank'),
      label: 'Ir a LinkedIn'
    },
    {
      name: 'GitHub',
      description: 'Mis repositorios',
      icon: <Github className="w-6 h-6" />,
      color: 'from-slate-700 to-slate-900',
      action: () => window.open('https://github.com/joaquinsalgueiro', '_blank'),
      label: 'Ver GitHub'
    },
    {
      name: 'Email',
      description: 'Consultas formales',
      icon: <Mail className="w-6 h-6" />,
      color: 'from-blue-500 to-indigo-500',
      action: handleOpenGmail,
      label: 'Redactar'
    }
  ];

  return (
    <section id="contacto" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Contacto Directo
          </span>
          <h2 className={`text-3xl sm:text-4xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            ¿Tenés un proyecto en mente?
          </h2>
          <p className={`text-sm sm:text-base ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            Elegí cómo querés contactarme. Respondo en menos de 24hs.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {contactMethods.map((method, idx) => (
            <button
              key={idx}
              onClick={method.action}
              className={`group p-6 rounded-2xl border text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl w-full sm:w-64 ${
                darkMode
                  ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                  : 'bg-white border-slate-200 shadow-sm hover:shadow-lg'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${method.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                {method.icon}
              </div>
              <h3 className={`text-sm font-bold mb-1 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                {method.name}
              </h3>
              <p className="text-xs text-slate-400 mb-3 truncate">
                {method.description}
              </p>
              <span className={`text-xs font-bold bg-gradient-to-r ${method.color} bg-clip-text text-transparent flex items-center gap-1`}>
                {method.label} <ExternalLink className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>

        {/* Status */}
        <div className="text-center mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Disponible para nuevos proyectos
          </div>
        </div>
      </div>
    </section>
  );
};
