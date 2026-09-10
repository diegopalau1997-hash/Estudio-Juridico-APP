import { TEMAS_WHATSAPP } from '../lib/whatsapp';

const SITE = 'https://www.estudiojapp.com.ar';

const staticPaths = [
  '/',
  '/el-estudio/',
  '/equipo/',
  '/empresas/',
  '/personas/',
  '/propiedad-intelectual/',
  '/contacto/',
];

const areaPaths = TEMAS_WHATSAPP.map((tema) => `/${tema.slug}/`);

export async function GET() {
  const paths = [...staticPaths, ...areaPaths];
  const urls = paths
    .map((path) => `  <url><loc>${SITE}${path}</loc></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
