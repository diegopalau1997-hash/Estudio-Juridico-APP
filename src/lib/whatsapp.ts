/**
 * Punto único de configuración de WhatsApp para todo el sitio.
 * Ningún componente ni página debe escribir un número o mensaje a mano:
 * todos importan de aquí. Fuente de estos datos: 04_CONTENIDO/datos_contacto.txt
 * y 04_CONTENIDO/whatsapp.txt (fuera del repo publicable).
 */

export type Responsable = 'gisele' | 'diego';

interface Socio {
  nombre: string;
  /** Número tal como se muestra a las personas (formato argentino "humano"). */
  numeroVisible: string;
  /** Número en formato E.164 sin "+", con el "9" de celular argentino, para wa.me. */
  numeroWa: string;
  email: string;
  rol: string;
  /** Título(s) y matrícula, tal como figuran en su propia firma de mail o bio publicada. */
  formacion: string[];
  matricula?: string;
  /** Bio corta, texto ya publicado y aprobado por el estudio en su Instagram (@estudiojapp). */
  bio: string[];
}

export const SOCIOS: Record<Responsable, Socio> = {
  gisele: {
    nombre: 'Gisele Paoletti',
    numeroVisible: '+54 9 11 3628-5550',
    numeroWa: '5491136285550',
    email: 'giselepaoletti@gmail.com',
    rol: 'Socia',
    formacion: ['Abogada (UBA)', 'Magíster en Administración y Políticas Públicas (UDESA)'],
    bio: [
      'Aporta una visión integral, técnica y sensible que se adapta a cada contexto, con experiencia en asesoramiento jurídico y gestión pública, acompañando procesos vinculados a decisiones patrimoniales, derechos y relaciones de consumo.',
      'Trabaja también en jubilaciones y pensiones, y en el seguimiento de trámites administrativos y judiciales, con una mirada atenta al recorrido de cada persona y organización.',
    ],
  },
  diego: {
    nombre: 'Diego Palau',
    numeroVisible: '+54 11 5464-3910',
    numeroWa: '5491154643910',
    email: 'diego.palau1997@gmail.com',
    rol: 'Socio',
    formacion: [
      'Abogado (UNLaM)',
      'Magíster en Derecho y Economía (Universidad Torcuato Di Tella)',
      'Agente de la Propiedad Industrial (INPI)',
    ],
    matricula: 'Tº139 Fº952 C.P.A.C.F.',
    bio: [
      'Aporta una mirada estratégica y rigurosa al momento de pensar y ordenar decisiones legales que requieren claridad. Su trabajo combina experiencia en procesos legales, análisis de normas y lectura del contexto, tanto para marcas y patentes como para la protección de ideas y activos intangibles.',
      'También presta acompañamiento en trámites de ciudadanía y migración, con precisión y sensibilidad a nivel legal.',
    ],
  },
};

export const EMAIL_ESTUDIO = 'estudiojapp@gmail.com';

/** Responsable por defecto para el botón "otra consulta" / general. TODO: confirmar con los socios si prefieren otro criterio. */
export const RESPONSABLE_GENERAL: Responsable = 'diego';

export interface TemaWhatsApp {
  slug: string;
  etiqueta: string;
  responsable: Responsable;
  mensaje: string;
  /** Bajada de una línea, honesta y no inventada, para el card de Home y el H1 de la página de área. */
  resumenBreve: string;
  /** true = la asignación de responsable todavía no fue confirmada por los socios (default temporal). */
  responsablePendiente?: boolean;
}

export const TEMAS_WHATSAPP: TemaWhatsApp[] = [
  {
    slug: 'jubilaciones',
    etiqueta: 'Jubilaciones',
    responsable: 'gisele',
    mensaje: 'Hola, quisiera hacer una consulta sobre un trámite de jubilación.',
    resumenBreve: 'Asesoramiento y representación en trámites y reclamos previsionales.',
  },
  {
    slug: 'amparos-de-salud',
    etiqueta: 'Amparos de salud',
    responsable: 'diego',
    mensaje: 'Hola, quisiera hacer una consulta sobre un amparo de salud.',
    resumenBreve: 'Acciones de amparo ante situaciones que requieren tutela judicial urgente en salud.',
  },
  {
    slug: 'accidentes-de-trabajo',
    etiqueta: 'Accidentes de trabajo',
    responsable: 'diego',
    mensaje: 'Hola, quisiera hacer una consulta por un accidente de trabajo.',
    resumenBreve: 'Asistencia y asesoramiento frente a accidentes de trabajo y enfermedades profesionales.',
  },
  {
    slug: 'divorcios',
    etiqueta: 'Divorcios',
    responsable: 'gisele',
    mensaje: 'Hola, quisiera hacer una consulta sobre un divorcio.',
    resumenBreve: 'Acompañamiento legal durante el proceso de divorcio y sus cuestiones vinculadas.',
    responsablePendiente: true,
  },
  {
    slug: 'ciudadanias',
    etiqueta: 'Ciudadanías',
    responsable: 'diego',
    mensaje: 'Hola, quisiera hacer una consulta sobre un trámite de ciudadanía.',
    resumenBreve: 'Asistencia en procesos y trámites vinculados con ciudadanía y migración.',
  },
  {
    slug: 'sucesiones',
    etiqueta: 'Sucesiones',
    responsable: 'gisele',
    mensaje: 'Hola, quisiera hacer una consulta sobre una sucesión.',
    resumenBreve: 'Asesoramiento jurídico para procesos sucesorios y cuestiones relacionadas.',
    responsablePendiente: true,
  },
  {
    slug: 'marcas',
    etiqueta: 'Marcas',
    responsable: 'diego',
    mensaje: 'Hola, quisiera consultar por el registro de una marca.',
    resumenBreve: 'Asesoramiento en protección y gestión de activos marcarios.',
  },
  {
    slug: 'patentes',
    etiqueta: 'Patentes',
    responsable: 'diego',
    mensaje: 'Hola, quisiera hacer una consulta sobre una patente.',
    resumenBreve: 'Orientación jurídica para la protección de invenciones.',
  },
  {
    slug: 'derecho-de-autor',
    etiqueta: 'Derecho de autor',
    responsable: 'diego',
    mensaje: 'Hola, quisiera hacer una consulta sobre derecho de autor.',
    resumenBreve: 'Orientación jurídica para la protección de creaciones y derechos intelectuales.',
  },
  {
    slug: 'derecho-administrativo-y-regulatorio',
    etiqueta: 'Derecho administrativo, regulatorio y relaciones institucionales',
    responsable: 'diego',
    mensaje:
      'Hola, quisiera hacer una consulta sobre un trámite administrativo/regulatorio ante un organismo público.',
    resumenBreve: 'Procedimientos administrativos, trámites, relaciones institucionales y con organismos públicos y el Estado Nacional.',
  },
  {
    slug: 'constitucion-de-sociedades',
    etiqueta: 'Constitución de sociedades',
    responsable: 'diego',
    mensaje: 'Hola, quisiera hacer una consulta sobre la constitución de una sociedad.',
    resumenBreve: 'Constitución y puesta en marcha de sociedades comerciales.',
  },
  {
    slug: 'redaccion-de-contratos',
    etiqueta: 'Redacción de contratos',
    responsable: 'diego',
    mensaje: 'Hola, quisiera hacer una consulta sobre la redacción de un contrato.',
    resumenBreve: 'Redacción y revisión de contratos a medida de cada proyecto o actividad.',
  },
  {
    slug: 'formalizacion-de-proyectos',
    etiqueta: 'Formalización de proyectos',
    responsable: 'diego',
    mensaje: 'Hola, quisiera hacer una consulta sobre la formalización de un proyecto.',
    resumenBreve: 'Estructuración legal de proyectos y emprendimientos desde su inicio.',
  },
  {
    slug: 'asesoramiento-a-empresas',
    etiqueta: 'Asesoramiento a empresas',
    responsable: 'diego',
    mensaje: 'Hola, quisiera hacer una consulta sobre asesoramiento legal para una empresa.',
    resumenBreve: 'Asesoramiento jurídico integral para empresas en su operación diaria.',
  },
  {
    slug: 'danos-y-perjuicios',
    etiqueta: 'Daños y perjuicios',
    responsable: 'gisele',
    mensaje: 'Hola, quisiera hacer una consulta sobre un reclamo por daños y perjuicios.',
    resumenBreve: 'Siniestros, responsabilidad civil y evaluación jurídica de contingencias.',
  },
  {
    slug: 'acuerdos-de-desvinculacion-laboral',
    etiqueta: 'Acuerdos de desvinculación laboral',
    responsable: 'diego',
    mensaje: 'Hola, quisiera hacer una consulta sobre un acuerdo de desvinculación laboral.',
    resumenBreve: 'Asesoramos a empleadores en el cierre de vínculos laborales, incluido el personal de casas particulares.',
    responsablePendiente: true,
  },
  {
    slug: 'usucapiones-y-tramites-registrales',
    etiqueta: 'Usucapiones y trámites registrales (RPI)',
    responsable: 'diego',
    mensaje:
      'Hola, quisiera hacer una consulta sobre una usucapión / un trámite ante el Registro de la Propiedad Inmueble.',
    resumenBreve: 'Soluciones registrales sobre inmuebles: usucapiones y trámites ante el Registro de la Propiedad Inmueble.',
    responsablePendiente: true,
  },
];

export const TEMA_OTRA_CONSULTA: TemaWhatsApp = {
  slug: 'otra-consulta',
  etiqueta: 'Otra consulta',
  responsable: RESPONSABLE_GENERAL,
  mensaje: 'Hola, quisiera hacer una consulta con Estudio Jurídico APP.',
};

/** Construye el link wa.me para un socio + mensaje dado. */
export function waLink(responsable: Responsable, mensaje: string): string {
  const socio = SOCIOS[responsable];
  return `https://wa.me/${socio.numeroWa}?text=${encodeURIComponent(mensaje)}`;
}

/** Link directo para un tema del listado (o el fallback "otra consulta"). */
export function waLinkForTema(slug: string): string {
  const tema = TEMAS_WHATSAPP.find((t) => t.slug === slug) ?? TEMA_OTRA_CONSULTA;
  return waLink(tema.responsable, tema.mensaje);
}

export function getTemaBySlug(slug: string): TemaWhatsApp | undefined {
  return TEMAS_WHATSAPP.find((t) => t.slug === slug);
}
