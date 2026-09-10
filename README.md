# Estudio Jurídico APP — sitio web

Sitio institucional de Estudio Jurídico APP (Abogados Paoletti & Palau), construido con
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

Las fotos están en `src/assets/equipo/` (`gisele-paoletti.png`, `diego-palau.jpeg`) e importadas
con `astro:assets` en `src/pages/equipo/index.astro` y en el bloque "Equipo" de
`src/pages/index.astro` — Astro las optimiza solo (WebP, tamaños). Para reemplazarlas, pisar esos
archivos (o cambiar el nombre y actualizar el `import` en ambos lugares).

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

El build (`npm run build`) genera un sitio 100% estático en `dist/` — no necesita Node.js
corriendo en el servidor. Deployment elegido: **GitHub + Cloudflare Pages**.

1. **GitHub**: crear un repo vacío (sin README) en github.com, agregar como remoto y pushear:
   ```bash
   git remote add origin https://github.com/<usuario>/estudio-app-web.git
   git push -u origin master
   ```
2. **Cloudflare Pages**: Dashboard → *Workers & Pages* → *Create* → *Pages* → *Connect to Git* →
   elegir el repo. Build settings:
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Output directory: `dist`

   Cloudflare Pages queda con deploy automático en cada push a `master`.
3. **Dominio** (`estudiojapp.com.ar`, registrado en NIC Argentina — vence 1/9/2027): en Cloudflare
   Pages → *Custom domains* → agregar `www.estudiojapp.com.ar`. Cloudflare indica qué registro DNS
   agregar; como el dominio vive en NIC (no en Cloudflare), esto se agrega desde el panel de NIC
   Argentina (TAD) — o, para que Cloudflare maneje todo el DNS, delegar el dominio a los
   nameservers de Cloudflare desde la sección "Delegación" de NIC. HTTPS se activa solo una vez
   que el DNS propaga.
4. **Search Console**: agregar la propiedad `https://www.estudiojapp.com.ar` en
   search.google.com/search-console y cargar `https://www.estudiojapp.com.ar/sitemap.xml`.
