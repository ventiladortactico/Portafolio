# Portafolio — Joaquín Salgueiro

Portafolio profesional interactivo de **Joaquín Salgueiro Emiliano**, Analista en Sistemas (IESA) y Desarrollador Full Stack. Incluye proyectos con filtros y búsqueda, demos interactivas, sección de experiencia, blog de desarrollo, habilidades, contacto directo y CV digital descargable.

## Stack

- **React 19 + TypeScript** + Vite
- **Tailwind CSS 4** (vía `@tailwindcss/vite`)
- **lucide-react** (iconos), **motion** (animaciones), **jsPDF** (generación de CV en PDF)

## Cómo ejecutar

Prerrequisitos: Node.js.

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Scripts

| Comando           | Descripción                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Servidor de desarrollo en `:3000`    |
| `npm run build`   | Compilación de producción (`dist/`)  |
| `npm run preview` | Previsualizar el build               |
| `npm run lint`    | Chequeo de tipos con `tsc --noEmit`  |

## Estructura

```
src/
├── components/     # Secciones, modales y demos interactivas
│   └── Demos/      # Demos embebidas de NexoStock, SumaMente y PlataHoy
├── data/           # Contenido centralizado (proyectos, blog, experiencia, skills)
├── utils/          # Generador de CV en PDF (jsPDF)
├── types.ts        # Tipos del dominio
└── App.tsx         # Composición raíz (modo oscuro, scroll spy, modales)
```

Todo el contenido editable (proyectos, posts, experiencia, habilidades, datos personales) vive en `src/data/portfolioData.ts`.

## Contacto

- Email: `joaquinsalgueiro15@gmail.com`
- Ubicación: Posadas, Misiones, Argentina
