import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle, Play, Layers, Code2, Camera } from 'lucide-react';
import { Project } from '../types';
import { NexoStockDemo } from './Demos/NexoStockDemo';
import { SumaMenteDemo } from './Demos/SumaMenteDemo';
import { PlataHoyDemo } from './Demos/PlataHoyDemo';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  darkMode: boolean;
  initialTab?: 'info' | 'demo' | 'gallery';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, darkMode, initialTab }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'demo' | 'gallery'>(initialTab || 'info');

  useEffect(() => {
    setActiveTab(initialTab || 'info');
  }, [project?.id, initialTab]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  // Prevent scroll propagation
  const handleModalScroll = (e: React.WheelEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      onWheel={handleModalScroll}
    >
      <div
        className={`relative w-full max-w-4xl rounded-2xl border shadow-2xl my-8 max-h-[90vh] flex flex-col overflow-y-auto ${
          darkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                {project.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                {project.status}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black">{project.title}</h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{project.tagline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50 dark:bg-slate-950/50">
          <button
            onClick={() => setActiveTab('info')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
              activeTab === 'info'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Detalles del Proyecto</span>
          </button>

          {project.demoType && (
            <button
              onClick={() => setActiveTab('demo')}
              className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
                activeTab === 'demo'
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Play className="w-4 h-4 text-emerald-500 fill-emerald-500" />
              <span>Probador / Demo Interactivo</span>
            </button>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <button
              onClick={() => setActiveTab('gallery')}
              className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center space-x-2 transition-colors ${
                activeTab === 'gallery'
                  ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Camera className="w-4 h-4 text-purple-500" />
              <span>Imágenes</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'info' ? (
            <div className="space-y-6">
              {/* Cover Banner */}
              <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                <img
                  src={project.image}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                 <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <p className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                      Métrica Destacada
                    </p>
                    <p className="text-lg font-black text-white">{project.metrics || 'Proyecto Desarrollado de Cero'}</p>
                    {project.clientLocation && (
                      <a
                        href={project.clientLocation}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 mt-1 text-[10px] text-blue-400 hover:text-blue-300 font-mono"
                      >
                        Ver ubicación del cliente
                      </a>
                    )}
                  </div>

                  <div className="flex gap-2">
                    {project.url && project.id !== 'sumamente' && project.id !== 'platahoy' && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-lg"
                      >
                        Visitar Sitio Web <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Long Description */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Descripción General
                </h3>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {project.longDescription}
                </p>
              </div>

              {/* Technical Highlights */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Puntos Clave de Implementación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start space-x-2.5"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-blue-500" />
                    Stack Tecnológico
                  </h3>
                  {project.id === 'sumamente' && (
                    <span className="text-[10px] px-2.5 py-1 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full font-bold border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Próximamente en Play Store
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {project.id === 'sumamente' ? (
                    <>
                      {[
                        { name: 'JavaScript', desc: 'Lógica vanilla ES6+', color: 'text-yellow-500 dark:text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20' },
                        { name: 'HTML5 / CSS3', desc: 'Interfaz responsive', color: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
                        { name: 'Capacitor 7', desc: 'Wrapper app Android', color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
                        { name: 'Service Workers', desc: 'PWA offline-first', color: 'text-purple-500 dark:text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
                        { name: 'Canvas API', desc: 'Visualizaciones animadas', color: 'text-pink-500 dark:text-pink-400', bg: 'bg-pink-500/10 border-pink-500/20' },
                        { name: 'Vercel', desc: 'Hosting & analytics', color: 'text-emerald-500 dark:text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                      ].map((tech) => (
                        <div key={tech.name} className={`p-3 rounded-lg border ${tech.bg}`}>
                          <span className={`text-xs font-bold ${tech.color} block`}>{tech.name}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400">{tech.desc}</span>
                        </div>
                      ))}
                    </>
                  ) : (
                    project.technologies.map((tech) => (
                      <div key={tech} className="p-3 rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">{tech}</span>
                      </div>
                    ))
                  )}
                </div>

                {project.id === 'sumamente' && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    {['16 módulos', '340+ fórmulas', '100% client-side', 'Sin backend', 'PWA'].map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300 rounded font-mono border border-slate-200 dark:border-slate-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === 'demo' ? (
            <div className="space-y-4">
              {project.demoType === 'nexostock' && <NexoStockDemo />}
              {project.demoType === 'sumamente' && <SumaMenteDemo />}
              {project.demoType === 'platahoy' && <PlataHoyDemo />}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Camera className="w-4 h-4" />
                <span>Imágenes reales del sistema en producción</span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {project.gallery?.map((img, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-950">
                    <img
                      src={img.src}
                      alt={img.caption}
                      className="w-full h-auto object-contain max-h-[500px]"
                    />
                    <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                      <p className="text-xs text-slate-600 dark:text-slate-300">{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
