# byelias • Digital Business Card & Developer Credential

Tarjeta de presentación personal y credencial interactiva para **Oscar Mateo Elías López (@byelias)**, Lead Software Developer & Tech Builder en OlaLabs.

Diseñado bajo los principios estéticos de **Apple Human Interface Guidelines (HIG)** y el **OlaStudio Design System**, con soporte para temas Claro/Oscuro, internacionalización (ES / EN) y una tarjeta física interactiva para impresión y exportación en `/card`.

🌐 **Sitio en Producción:** [https://me.olabsv.com](https://me.olabsv.com)

---

## ✨ Características Principales

- **🎨 Diseño Bento & Glassmorphism Premium:**
  - Superficies translúcidas con `backdrop-blur` y bordes finos de alta precisión.
  - Matriz técnica de micro-puntos (*dot grid texture*) en fondo de página y tarjetas.
  - Halo ambiental con acento azul OlaStudio (`#0071e3` / `#2997ff`) optimizado tanto en modo claro como en modo oscuro.

- **🌐 Internacionalización Completa (i18n):**
  - Selector flotante superior con cambio instantáneo entre Español e Inglés sin recargar la página.

- **📱 Layout Adaptativo y Responsivo:**
  - **Mobile (< 1024px):** Estructura secuencial fluida sin huecos muertos: Identidad → Proyectos → Canales → Módulo de Correo → Footer.
  - **Desktop (≥ 1024px):** Disposición Bento de dos columnas (columna izquierda fija de perfil de 5 columnas + columna derecha de contenido de 7 columnas).

- **💳 Developer Credential / Tech Pass (`/card`):**
  - Proporción estándar de tarjeta física (3.5″ × 2″ = 1.75:1).
  - Foto de alta resolución, titulación académica dual y bloque balanceado de stacks técnicos.
  - Código QR generado dinámicamente apuntando a `https://me.olabsv.com`.
  - Botón **"Copiar Imagen"**: Captura y exporta la tarjeta directamente al portapapeles en resolución Retina (@2x) usando la Clipboard API.
  - Botón **"Imprimir / PDF"**: Estilos optimizados con `@media print` para impresión física nítida sin barras de navegación ni fondos residuales.

- **📬 Módulo de Correo Eficiente:**
  - Accesos directos para copiado con un clic (Trabajo / OlaLabs, Personal, iCloud) con feedback visual inmediato.

- **📲 Contacto Directo vCard:**
  - Descarga de archivo `.vcf` formateado para agregar instantáneamente el contacto a dispositivos iOS / Android / macOS.

---

## 🛠️ Stack Tecnológico

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Librería UI:** [React 19](https://react.dev/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Tema:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Generación QR:** [qrcode](https://github.com/soldair/node-qrcode)
- **Exportación a Imagen:** [html-to-image](https://github.com/bubkoo/html-to-image)

---

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18.18+ o superior
- npm, pnpm o yarn

### Instalación

```bash
git clone https://github.com/MatMT/byelias.git
cd byelias
npm install
```

### Servidor de Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para la tarjeta principal o [http://localhost:3000/card](http://localhost:3000/card) para el Tech Pass físico.

### Build de Producción

```bash
npm run build
npm run start
```

---

## 📄 Licencia

© 2026 Oscar Mateo Elías López (@byelias). Todos los derechos reservados.
