# Estudio Jurídico APP — sitio web

Sitio institucional de Estudio Jurídico APP (Abogados Paoletti y Palau), construido con
[Astro](https://astro.build) como sitio estático. Sin backend, sin base de datos: HTML/CSS
generados en build, con el mínimo JS posible.

> Estado actual: **Etapa 2** (sistema visual, header, footer, selector de WhatsApp y home
> funcionando, con todas las páginas navegables). El contenido detallado de cada área de
> servicio (FAQ, documentación, situaciones frecuentes) se completa en una etapa posterior.
> Ver `../00_DIAGNOSTICO.md` para el diagnóstico completo y las decisiones tomadas.

## Instalación

Requiere Node.js 18 o superior.

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre `http://localhost:4321`. Los cambios en `src/` se recargan solos.

## Build de producción

```bash
npm run build
```

Genera el sitio estático en `dist/`. `npm run preview` sirve ese build localmente para
verificarlo antes de publicar.

## Estructura

```
website/
├── src/
│   ├── components/       Header, Footer, Logo, botones y selector de WhatsApp
│   ├── layouts/           BaseLayout.astro (head, meta tags, header/footer comunes)
│   ├── lib/
│   │   └── whatsapp.ts   ÚNICA fuente de números, mensajes y ruteo por área — ver abajo
│   ├── pages/
│   │   ├── index.astro                Home
│   │   ├── el-estudio/, equipo/, contacto/
│   │   ├── empresas/, personas/, propiedad-intelectual/   índices de categoría
│   │   └── [slug]/index.astro          Genera automáticamente una página por cada
│   │                                   área definida en whatsapp.ts (jubilaciones,
│   │                                   marcas, etc.)
│   └── styles/global.css  Paleta, tipografía y componentes base (design tokens)
└── public/                favicon y estáticos servidos tal cual
```

## Cómo modificar las áreas de práctica

Todas las áreas (nombre, slug/URL, resumen, mensaje de WhatsApp y a qué socio deriva) están
en **`src/lib/whatsapp.ts`**, en el arreglo `TEMAS_WHATSAPP`. Agregar un área nueva es agregar
un objeto a ese arreglo — la página `/su-slug/` se genera sola, y aparece automáticamente en
los índices de categoría que la incluyan (`src/pages/empresas|personas|propiedad-intelectual/index.astro`,
en el array `temaSlugs`) y en la grilla de la Home si corresponde.

## Cómo modificar teléfonos y emails

También en **`src/lib/whatsapp.ts`**, objeto `SOCIOS` (Gisele/Diego) y constante
`EMAIL_ESTUDIO`. Un solo lugar; ningún componente tiene un número hardcodeado. Los números de
WhatsApp llevan el "9" de celular argentino en el campo `numeroWa` (formato que exige wa.me);
`numeroVisible` es solo lo que se muestra a las personas.

## Cómo reemplazar fotografías del equipo

Hoy `/equipo/` y la Home muestran un avatar con iniciales (no hay fotos reales todavía — ver
`03_EQUIPO/bios.txt` en la carpeta del proyecto). Cuando estén las fotos:
1. Colocarlas en `src/assets/equipo/` (crear la carpeta) como `gisele-paoletti.jpg` y
   `diego-palau.jpg`.
2. En `src/pages/equipo/index.astro` (y en el bloque "Equipo" de `src/pages/index.astro`),
   reemplazar el `<div class="equipo-card__avatar">` por `<Image src={...} alt="..." />` usando
   `astro:assets` para que se optimicen automáticamente (WebP, tamaños responsive).

## Cómo cambiar metadata (SEO)

Cada página pasa `title`, `description` y `path` a `BaseLayout` — son los únicos tres valores
que hay que tocar por página. El `<title>`, meta description, canonical y Open Graph se generan
solos a partir de esos tres datos en `src/layouts/BaseLayout.astro`.

## Analytics / Google Ads

Todavía no está instalado ningún tracker (a propósito: no hay IDs de GA4/GTM/Ads reales
todavía). Cuando el estudio tenga los IDs, se agregan en `BaseLayout.astro` dentro de un
`<slot name="head">` o directamente en el `<head>`, condicionados a una variable de entorno
(`PUBLIC_GA_ID`, etc.) para no commitear IDs de terceros al repo. Eventos a instrumentar cuando
se agregue Analytics: `whatsapp_click` (ya se puede disparar desde los `<a href="wa.me/...">`),
`email_click`, `area_click`, `contact_submit`.

## Publicar / deployment

El build (`npm run build`) genera un sitio 100% estático en `dist/` — se puede publicar en
cualquier hosting estático (Netlify, Vercel, GitHub Pages, Cloudflare Pages, un hosting
tradicional por FTP, etc.) sin necesidad de Node.js corriendo en el servidor. Configurar el
dominio `www.estudiojapp.com.ar` para apuntar al hosting elegido y, del lado de Astro, no hace
falta ningún cambio adicional (ya está seteado el `site` correcto en `astro.config.mjs`).
