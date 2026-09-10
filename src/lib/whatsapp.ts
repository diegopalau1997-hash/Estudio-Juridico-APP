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
  /** Matrícula profesional (colegio, tomo y folio). TODO: falta el dato de Gisele — pedir a Diego. */
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
    // TODO: matrícula (tomo y folio) de Gisele — falta el dato, no inventar. Ver [slug]/whatsapp.ts.
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
      'También presta acompañamiento en trámites de ciudadanía y migración, con precisión y sensibilidad a nivel legal. Cuenta además con trayectoria en derecho administrativo y regulatorio, con experiencia en asuntos vinculados a los sistemas de salud, transporte y justicia, y en trámites ante la Inspección General de Justicia (IGJ) y el Registro de la Propiedad Inmueble (RPI).',
    ],
  },
};

export const EMAIL_ESTUDIO = 'estudiojapp@gmail.com';

/**
 * Responsable por defecto (server-side, antes de que corra JS) para el botón "otra consulta" /
 * general. En el cliente, `area-search.js`/el picker alternan este valor por dispositivo
 * (localStorage) para repartir parejo entre Gisele y Diego — ver WhatsAppPicker.astro.
 */
export const RESPONSABLE_GENERAL: Responsable = 'diego';

export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

/**
 * Contenido completo de una página de área (Etapa 5). Opcional: mientras no esté, la página
 * muestra el stub mínimo (resumen + CTA). Todo el contenido debe salir de material real
 * (propuestas de servicios, mails, mensajes directos) — nunca inventado. No incluir honorarios
 * ni datos de casos/clientes puntuales.
 */
export interface ContenidoArea {
  problema: string;
  situaciones: string[];
  servicios: string[];
  comoTrabaja: string[];
  documentacionInicial: string[];
  faq: FaqItem[];
  /** Slugs de otras TEMAS_WHATSAPP relacionadas. */
  relacionados: string[];
}

export interface TemaWhatsApp {
  slug: string;
  etiqueta: string;
  responsable: Responsable;
  /**
   * Frase que completa "Buen día {Nombre}; quisiera hacer una consulta sobre {temaFrase}."
   * Si no hay (p. ej. TEMA_OTRA_CONSULTA), el mensaje queda genérico sin tema — ver mensajeTema().
   */
  temaFrase?: string;
  /** Bajada de una línea, honesta y no inventada, para el card de Home y el H1 de la página de área. */
  resumenBreve: string;
  /** Palabras/sinónimos que una persona podría tipear en el buscador para llegar a este tema. */
  keywords?: string[];
  /** true = la asignación de responsable todavía no fue confirmada por los socios (default temporal). */
  responsablePendiente?: boolean;
  contenido?: ContenidoArea;
}

export const TEMAS_WHATSAPP: TemaWhatsApp[] = [
  {
    slug: 'jubilaciones',
    etiqueta: 'Jubilaciones',
    responsable: 'gisele',
    temaFrase: 'un trámite de jubilación',
    resumenBreve: 'Asesoramiento y representación en trámites y reclamos previsionales.',
    keywords: ['jubilación', 'jubilaciones', 'pami', 'anses', 'aportes', 'retiro', 'pensión', 'moratoria previsional', 'beneficio previsional', 'reajuste de haberes'],
  },
  {
    slug: 'amparos-de-salud',
    etiqueta: 'Amparos de salud',
    responsable: 'diego',
    temaFrase: 'un amparo de salud',
    resumenBreve: 'Acciones de amparo ante situaciones que requieren tutela judicial urgente en salud.',
    keywords: ['amparo de salud', 'obra social', 'prepaga', 'medicamento', 'tratamiento médico', 'cobertura médica', 'discapacidad', 'urgencia médica'],
  },
  {
    slug: 'accidentes-de-trabajo',
    etiqueta: 'Accidentes de trabajo',
    responsable: 'diego',
    temaFrase: 'un accidente de trabajo',
    resumenBreve: 'Asistencia y asesoramiento frente a accidentes de trabajo y enfermedades profesionales.',
    keywords: ['accidente de trabajo', 'art', 'enfermedad profesional', 'incapacidad laboral', 'accidente in itinere'],
    contenido: {
      problema:
        'Después de un accidente de trabajo o una enfermedad profesional, no siempre queda claro qué cobertura corresponde ni cómo seguir si la ART no reconoce lo que debería.',
      situaciones: [
        'Accidentes de trabajo, incluidos los accidentes in itínere (en el trayecto entre el domicilio y el trabajo).',
        'Enfermedades profesionales derivadas de la actividad laboral.',
        'Incapacidad total o parcial derivada de un accidente o enfermedad laboral.',
        'Desacuerdos con la ART sobre la cobertura otorgada o el grado de incapacidad reconocido.',
      ],
      servicios: [
        'Asesoramiento sobre la cobertura que corresponde según cada caso.',
        'Representación en reclamos ante la ART.',
        'Representación en reclamos judiciales cuando la vía administrativa no da una respuesta adecuada.',
        'Seguimiento del proceso de determinación de incapacidad.',
      ],
      comoTrabaja: [
        'Relevamos lo sucedido y la documentación médica y laboral disponible.',
        'Analizamos qué cobertura corresponde y en qué estado está el trámite ante la ART.',
        'Te acompañamos en el reclamo, sea administrativo o judicial.',
        'Seguimos el caso hasta su resolución.',
      ],
      documentacionInicial: [
        'Denuncia del accidente ante la ART, si ya se hizo.',
        'Informes o certificados médicos relacionados.',
        'Recibos de sueldo recientes.',
        'Datos del empleador y de la ART correspondiente.',
      ],
      faq: [
        {
          pregunta: '¿Un accidente en el trayecto al trabajo también está cubierto?',
          respuesta:
            'Sí, los accidentes in itínere (en el trayecto entre el domicilio y el trabajo) están comprendidos por el sistema de riesgos del trabajo, cumpliendo determinados requisitos que evaluamos según tu caso.',
        },
        {
          pregunta: '¿Qué hago si la ART no me reconoce la incapacidad que tengo?',
          respuesta:
            'Podés cuestionar esa decisión. Te asesoramos sobre el camino administrativo y, si corresponde, judicial para reclamarlo.',
        },
        {
          pregunta: '¿Puedo reclamar aunque haya pasado tiempo desde el accidente?',
          respuesta:
            'Depende del caso: existen plazos legales para reclamar. Contanos cuándo ocurrió y cómo sigue tu situación para evaluar si el reclamo sigue vigente.',
        },
      ],
      relacionados: ['acuerdos-de-desvinculacion-laboral', 'danos-y-perjuicios', 'derecho-administrativo-y-regulatorio'],
    },
  },
  {
    slug: 'accidentes-de-transito',
    etiqueta: 'Accidentes de tránsito',
    responsable: 'gisele',
    temaFrase: 'un accidente de tránsito',
    resumenBreve: 'Asesoramiento legal ante accidentes de tránsito y sus consecuencias.',
    keywords: ['accidente de tránsito', 'choque', 'siniestro vial', 'seguro automotor', 'lesiones', 'accidente de auto', 'accidente de moto'],
    responsablePendiente: true,
  },
  {
    slug: 'divorcios',
    etiqueta: 'Divorcios',
    responsable: 'gisele',
    temaFrase: 'un divorcio',
    resumenBreve: 'Acompañamiento legal durante el proceso de divorcio y sus cuestiones vinculadas.',
    keywords: ['divorcio', 'separación', 'convenio regulador', 'división de bienes', 'alimentos', 'cuidado personal', 'tenencia de hijos'],
    responsablePendiente: true,
    contenido: {
      problema:
        'Un divorcio implica tanto la decisión de separarse como, en la mayoría de los casos, resolver la situación de los bienes en común y de los hijos, si los hay. Son decisiones que conviene tomar con información clara sobre las opciones y los tiempos.',
      situaciones: [
        'Parejas que deciden separarse, de común acuerdo o por decisión de una sola de las partes.',
        'Necesidad de resolver la división de bienes en común.',
        'Cuestiones vinculadas a hijos en común (cuidado personal, alimentos).',
      ],
      servicios: [
        'Asesoramiento y representación en el proceso de divorcio.',
        'Acompañamiento en la división de bienes.',
        'Redacción y gestión del convenio regulador.',
      ],
      comoTrabaja: [
        'Relevamos la situación familiar y patrimonial.',
        'Te explicamos con claridad las opciones disponibles y sus tiempos.',
        'Si hay bienes en común, ordenamos su división.',
        'Acompañamos el trámite hasta la resolución definitiva.',
      ],
      documentacionInicial: [
        'DNI de ambas partes.',
        'Acta de matrimonio.',
        'Datos de los bienes en común (inmuebles, cuentas, vehículos).',
        'Datos de los hijos en común, si los hay.',
      ],
      faq: [
        {
          pregunta: '¿Necesito el consentimiento de mi pareja para divorciarme?',
          respuesta:
            'No. En Argentina, el divorcio puede solicitarse por decisión de uno solo de los cónyuges, sin necesidad de acuerdo de la otra parte.',
        },
        {
          pregunta: '¿El divorcio implica dividir los bienes automáticamente?',
          respuesta:
            'No necesariamente en el mismo trámite. La división de bienes puede resolverse junto con el divorcio o en una instancia posterior, según cada caso.',
        },
        {
          pregunta: '¿Qué pasa con los hijos en común?',
          respuesta:
            'Las cuestiones de cuidado personal y alimentos se abordan como parte del proceso, priorizando siempre el interés de los chicos.',
        },
      ],
      relacionados: ['sucesiones', 'danos-y-perjuicios', 'redaccion-de-contratos'],
    },
  },
  {
    slug: 'ciudadanias',
    etiqueta: 'Ciudadanías',
    responsable: 'diego',
    temaFrase: 'un trámite de ciudadanía',
    resumenBreve: 'Asistencia en procesos y trámites vinculados con ciudadanía y migración.',
    keywords: ['ciudadanía', 'ciudadanía italiana', 'ciudadanía española', 'migraciones', 'radicación', 'residencia', 'naturalización', 'pasaporte'],
  },
  {
    slug: 'sucesiones',
    etiqueta: 'Sucesiones',
    responsable: 'gisele',
    temaFrase: 'una sucesión',
    resumenBreve: 'Asesoramiento jurídico para procesos sucesorios y cuestiones relacionadas.',
    keywords: ['sucesión', 'sucesiones', 'herencia', 'herederos', 'declaratoria de herederos', 'testamento', 'partición de bienes', 'cesión de derechos hereditarios'],
    responsablePendiente: true,
    contenido: {
      problema:
        'Cuando fallece un familiar, o incluso antes, surge la necesidad de organizar cómo se transmite su patrimonio a los herederos. Hacerlo con información clara evita conflictos familiares y simplifica los trámites.',
      situaciones: [
        'Fallecimiento de un familiar y necesidad de iniciar la sucesión.',
        'Personas que quieren organizar en vida cómo se va a repartir su patrimonio.',
        'Dudas o desacuerdos entre herederos sobre cómo seguir.',
      ],
      servicios: [
        'Inicio y tramitación de la sucesión.',
        'Asesoramiento sobre la cesión de bienes con reserva de usufructo.',
        'Asesoramiento sobre testamentos y sus alcances.',
      ],
      comoTrabaja: [
        'Análisis inicial: relevamos domicilio, vínculos familiares, existencia de testamento, bienes y objetivos.',
        'Reunimos la documentación necesaria (partidas, títulos, certificados).',
        'Iniciamos la sucesión ante el juzgado competente y acreditamos el vínculo con el fallecido.',
        'Gestionamos edictos y oficios cuando el proceso los requiere.',
        'Tramitamos la declaratoria de herederos o la aprobación del testamento.',
        'Cerramos el proceso: inscripción registral de los bienes, partición y adjudicación entre los herederos.',
      ],
      documentacionInicial: [
        'Partida de defunción, si ya ocurrió el fallecimiento.',
        'DNI de los herederos.',
        'Documentación de los bienes (títulos de propiedad, resúmenes de cuentas, etc.).',
        'Partidas de nacimiento o matrimonio que acrediten el vínculo con el fallecido.',
      ],
      faq: [
        {
          pregunta: '¿Qué es la cesión con reserva de usufructo?',
          respuesta:
            'Es un contrato entre una persona y sus herederos por el cual se transfiere un bien —por ejemplo, una propiedad— pero reservando su uso y goce vitalicio: los herederos no pueden vender ni alquilar el bien mientras esa persona esté viva. Sirve para ordenar la sucesión y ahorrar tiempo en los trámites futuros.',
        },
        {
          pregunta: '¿Puedo repartir mis bienes como quiera con un testamento?',
          respuesta:
            'El testamento permite decidir sobre parte del patrimonio, pero en Argentina tiene límites legales en favor de ciertos herederos. Te explicamos qué margen real existe en tu caso.',
        },
        {
          pregunta: '¿Cuándo conviene iniciar la sucesión?',
          respuesta:
            'Apenas sea posible después del fallecimiento, para poder disponer de los bienes (venderlos, cobrar cuentas, etc.). Cuanto antes se ordene la documentación, más simple resulta el trámite.',
        },
        {
          pregunta: '¿Qué gastos tiene un proceso sucesorio, además de los honorarios?',
          respuesta:
            'Además de los honorarios profesionales, que se acuerdan por escrito desde el inicio, suele haber tasa de justicia (su monto depende del patrimonio y la etapa del proceso), eventuales edictos, certificados registrales sobre los bienes y gastos de inscripción vinculados a la declaratoria o la partición. Los conceptos concretos varían según el patrimonio y las particularidades de cada caso — te los detallamos en la primera consulta.',
        },
      ],
      relacionados: ['usucapiones-y-tramites-registrales', 'divorcios', 'danos-y-perjuicios'],
    },
  },
  {
    slug: 'marcas',
    etiqueta: 'Marcas',
    responsable: 'diego',
    temaFrase: 'el registro de una marca',
    resumenBreve: 'Asesoramiento en protección y gestión de activos marcarios.',
    keywords: ['marca', 'registro de marca', 'inpi', 'propiedad industrial', 'nombre comercial', 'logo'],
  },
  {
    slug: 'patentes',
    etiqueta: 'Patentes',
    responsable: 'diego',
    temaFrase: 'una patente',
    resumenBreve: 'Orientación jurídica para la protección de invenciones.',
    keywords: ['patente', 'invento', 'invención', 'modelo de utilidad', 'propiedad industrial', 'inpi'],
  },
  {
    slug: 'derecho-de-autor',
    etiqueta: 'Derecho de autor',
    responsable: 'diego',
    temaFrase: 'derecho de autor',
    resumenBreve: 'Orientación jurídica para la protección de creaciones y derechos intelectuales.',
    keywords: ['derecho de autor', 'propiedad intelectual', 'obra', 'copyright', 'registro de obra'],
  },
  {
    slug: 'derecho-administrativo-y-regulatorio',
    etiqueta: 'Derecho administrativo, regulatorio y relaciones institucionales',
    responsable: 'gisele',
    temaFrase: 'un trámite administrativo/regulatorio ante un organismo público',
    resumenBreve: 'Procedimientos administrativos, trámites, relaciones institucionales y con organismos públicos y el Estado Nacional.',
    keywords: ['trámite administrativo', 'organismo público', 'expediente administrativo', 'igj', 'rpi', 'regulatorio', 'relaciones institucionales', 'estado'],
    contenido: {
      problema:
        'Interactuar con la Administración Pública tiene su propia lógica y sus propios tiempos: expedientes, actos administrativos, normativa sectorial y organismos de control. Cuando una persona o una empresa necesita resolver algo frente al Estado, o enfrenta un conflicto regulatorio, esa lógica administrativa pesa tanto como el derecho de fondo.',
      situaciones: [
        'Trámites y gestiones ante organismos de la Administración Pública Nacional y provincial.',
        'Análisis del marco normativo y regulatorio aplicable a un proyecto, una actividad o una decisión empresarial.',
        'Cuestiones regulatorias en sectores con fuerte intervención estatal, como el sistema de salud y el sistema de transporte.',
        'Gestiones ante organismos de contralor y relaciones institucionales con reparticiones públicas.',
        'Trámites registrales ante la Inspección General de Justicia (IGJ) y el Registro de la Propiedad Inmueble (RPI).',
      ],
      servicios: [
        'Asesoramiento en procedimientos administrativos y análisis de riesgo regulatorio.',
        'Seguimiento y gestión de expedientes administrativos hasta su resolución.',
        'Elaboración de presentaciones, descargos y recursos administrativos.',
        'Trámites registrales ante IGJ y RPI.',
        'Relaciones institucionales con organismos públicos en representación del cliente.',
      ],
      comoTrabaja: [
        'Relevamos el expediente o la situación concreta y el organismo involucrado.',
        'Analizamos la normativa aplicable y el estado real del trámite o conflicto.',
        'Definimos la estrategia y los pasos frente al organismo correspondiente.',
        'Hacemos seguimiento del expediente hasta su resolución, informando cada novedad.',
      ],
      documentacionInicial: [
        'Toda notificación, cédula o resolución recibida del organismo involucrado.',
        'Número de expediente o trámite, si ya existe uno iniciado.',
        'Documentación que acredite la situación a resolver (contratos, habilitaciones, constancias).',
      ],
      faq: [
        {
          pregunta: '¿Trabajan con trámites ante el Estado Nacional?',
          respuesta:
            'Sí. Tenemos trayectoria en procedimientos administrativos y cuestiones regulatorias vinculadas, entre otros, a los sistemas de salud, transporte y justicia, además de trámites registrales ante IGJ y RPI.',
        },
        {
          pregunta: '¿Cuánto tarda un trámite administrativo?',
          respuesta:
            'Depende del organismo y del tipo de expediente — no hay un plazo único. En la primera consulta te damos una estimación realista según el caso.',
        },
        {
          pregunta: '¿Pueden representarme frente a un organismo público en un conflicto ya iniciado?',
          respuesta:
            'Sí, podemos tomar un expediente en curso. Contanos en qué instancia está y el organismo involucrado para evaluar cómo seguir.',
        },
      ],
      relacionados: ['constitucion-de-sociedades', 'usucapiones-y-tramites-registrales', 'asesoramiento-a-empresas'],
    },
  },
  {
    slug: 'constitucion-de-sociedades',
    etiqueta: 'Constitución de sociedades',
    responsable: 'diego',
    temaFrase: 'la constitución de una sociedad',
    resumenBreve: 'Constitución y puesta en marcha de sociedades comerciales.',
    keywords: ['constituir una sociedad', 'srl', 'sociedad', 'contrato social', 'igj', 'persona jurídica'],
    contenido: {
      problema:
        'Cuando dos o más personas deciden asociarse para desarrollar una actividad comercial, necesitan un marco legal formal que ordene la relación entre los socios y separe el patrimonio del emprendimiento del patrimonio personal.',
      situaciones: [
        'Un proyecto o emprendimiento que empieza a operar y necesita un marco societario formal.',
        'Socios que quieren dejar por escrito, desde el inicio, las reglas de la sociedad.',
        'Actividades que vienen funcionando de manera informal y buscan regularizarse.',
      ],
      servicios: [
        'Asesoramiento legal sobre la sociedad de responsabilidad limitada (SRL) y su funcionamiento.',
        'Redacción del contrato social a medida del proyecto.',
        'Gestión registral ante la Inspección General de Justicia (IGJ) o la Dirección de Personas Jurídicas de la Provincia de Buenos Aires, incluidas las publicaciones y declaraciones juradas que correspondan.',
        'Puesta en funcionamiento de la sociedad: obtención de CUIT y rúbrica de los libros sociales.',
      ],
      comoTrabaja: [
        'Arrancamos con una reunión informativa para entender el proyecto y los socios involucrados.',
        'Definimos junto con ustedes el contenido del contrato social.',
        'Hacemos la gestión registral completa ante el organismo que corresponda.',
        'Acompañamos hasta que la sociedad queda operativa (CUIT y libros).',
      ],
      documentacionInicial: [
        'Datos de los socios (DNI y CUIT/CUIL de cada uno).',
        'Objeto social: a qué actividad se va a dedicar la sociedad.',
        'Capital social a aportar y forma de aporte (dinero o bienes).',
        'Domicilio de la sociedad.',
      ],
      faq: [
        {
          pregunta: '¿Cuánto tarda la constitución de una SRL?',
          respuesta:
            'El plazo estimado, una vez firmado el acuerdo de honorarios, es de 45 a 60 días hábiles, sujeto a los tiempos propios del organismo registral.',
        },
        {
          pregunta: '¿Puedo aportar un bien en lugar de dinero?',
          respuesta:
            'Sí, pero si el aporte es un inmueble u otro bien registrable, la transferencia a la sociedad se debe instrumentar por escritura pública, con honorarios notariales aparte.',
        },
        {
          pregunta: '¿El presupuesto incluye al escribano?',
          respuesta:
            'No. Los honorarios del escribano que certifica las firmas del contrato social (o que interviene si se opta por escritura pública) están fuera del servicio y se cotizan aparte.',
        },
      ],
      relacionados: ['redaccion-de-contratos', 'formalizacion-de-proyectos', 'asesoramiento-a-empresas'],
    },
  },
  {
    slug: 'redaccion-de-contratos',
    etiqueta: 'Redacción de contratos',
    responsable: 'diego',
    temaFrase: 'la redacción de un contrato',
    resumenBreve: 'Redacción y revisión de contratos a medida de cada proyecto o actividad.',
    keywords: ['contrato', 'redacción de contrato', 'revisión de contrato', 'acuerdo comercial'],
  },
  {
    slug: 'formalizacion-de-proyectos',
    etiqueta: 'Formalización de proyectos',
    responsable: 'gisele',
    temaFrase: 'la formalización de un proyecto',
    resumenBreve: 'Estructuración legal de proyectos y emprendimientos desde su inicio.',
    keywords: ['formalizar un proyecto', 'emprendimiento', 'startup', 'proyecto'],
  },
  {
    slug: 'asesoramiento-a-empresas',
    etiqueta: 'Asesoramiento a empresas',
    responsable: 'diego',
    temaFrase: 'asesoramiento legal para una empresa',
    resumenBreve: 'Asesoramiento jurídico integral para empresas en su operación diaria.',
    keywords: ['asesoramiento empresas', 'asesoramiento legal empresarial', 'pyme'],
  },
  {
    slug: 'danos-y-perjuicios',
    etiqueta: 'Daños y perjuicios',
    responsable: 'gisele',
    temaFrase: 'un reclamo por daños y perjuicios',
    resumenBreve: 'Siniestros, responsabilidad civil y evaluación jurídica de contingencias.',
    keywords: ['daños y perjuicios', 'siniestro', 'responsabilidad civil', 'indemnización'],
  },
  {
    slug: 'acuerdos-de-desvinculacion-laboral',
    etiqueta: 'Acuerdos de desvinculación laboral',
    responsable: 'diego',
    temaFrase: 'un acuerdo de desvinculación laboral',
    resumenBreve: 'Asesoramos a empleadores en el cierre de vínculos laborales, incluido el personal de casas particulares.',
    keywords: ['despido', 'desvinculación', 'acuerdo laboral', 'empleada doméstica', 'personal de casas particulares', 'indemnización laboral'],
    responsablePendiente: true,
  },
  {
    slug: 'usucapiones-y-tramites-registrales',
    etiqueta: 'Usucapiones y trámites registrales (RPI)',
    responsable: 'diego',
    temaFrase: 'una usucapión / un trámite ante el Registro de la Propiedad Inmueble',
    resumenBreve: 'Soluciones registrales sobre inmuebles: usucapiones y trámites ante el Registro de la Propiedad Inmueble.',
    keywords: ['usucapión', 'prescripción adquisitiva', 'registro de la propiedad inmueble', 'rpi', 'título de propiedad'],
    responsablePendiente: true,
    contenido: {
      problema:
        'Es habitual encontrarse con un inmueble que se posee y ocupa desde hace años, de forma pacífica y continua, pero cuyo dominio no está inscripto a nombre de quien realmente lo tiene. Sin ese título, no se puede vender, hipotecar ni dejar en herencia con seguridad jurídica.',
      situaciones: [
        'Posesión prolongada y pacífica de un inmueble sin escritura a nombre del poseedor.',
        'Título de propiedad extraviado, inexistente o a nombre de una persona que ya no tiene relación con el inmueble.',
        'Necesidad de regularizar el dominio para poder vender, hipotecar o transmitir el inmueble.',
        'Trámites de inscripción ante el Registro de la Propiedad Inmueble (RPI) en general.',
      ],
      servicios: [
        'Análisis y ordenamiento de la documentación y antecedentes del inmueble.',
        'Definición de la estrategia del caso, incluyendo una eventual mediación prejudicial.',
        'Redacción, presentación y dirección integral de la demanda de usucapión.',
        'Gestión de la inscripción definitiva del dominio a favor del cliente una vez obtenido un título firme.',
      ],
      comoTrabaja: [
        'Preparación integral del caso: revisamos la documentación disponible, pedimos los informes que falten e identificamos qué antecedentes hay que reunir.',
        'Definimos la estrategia y, si corresponde, evaluamos una instancia prejudicial antes de demandar.',
        'Iniciamos y llevamos adelante el proceso judicial: demanda, prueba y audiencias, hasta la sentencia.',
        'Una vez firme la sentencia, gestionamos la inscripción definitiva del inmueble ante el Registro de la Propiedad Inmueble.',
      ],
      documentacionInicial: [
        'Cualquier comprobante que acredite la posesión: boletas de impuestos o servicios a nombre del poseedor, constancias de mejoras realizadas, etc.',
        'Título anterior del inmueble, si existe, aunque esté a nombre de otra persona.',
        'Datos catastrales del inmueble, si se cuenta con ellos.',
      ],
      faq: [
        {
          pregunta: '¿Qué es una usucapión?',
          respuesta:
            'Es la vía legal para que quien posee un inmueble de forma pacífica, continua y durante el tiempo que exige la ley, obtenga el reconocimiento judicial de su dominio e inscriba el inmueble a su nombre.',
        },
        {
          pregunta: '¿Cuánto tiempo lleva el proceso?',
          respuesta:
            'Varía según el caso: la documentación disponible, si hay oposición de terceros y los tiempos del juzgado interviniente. En la etapa de preparación te damos una estimación más precisa según tu situación.',
        },
        {
          pregunta: 'No tengo toda la documentación del inmueble, ¿puedo iniciar igual?',
          respuesta:
            'Sí. La primera etapa del trabajo es justamente identificar qué antecedentes faltan y ayudarte a reunirlos antes de iniciar la acción judicial.',
        },
      ],
      relacionados: ['sucesiones', 'danos-y-perjuicios', 'derecho-administrativo-y-regulatorio'],
    },
  },
];

export const TEMA_OTRA_CONSULTA: TemaWhatsApp = {
  slug: 'otra-consulta',
  etiqueta: 'Otra consulta',
  responsable: RESPONSABLE_GENERAL,
  resumenBreve: 'Para cualquier otra consulta que no encuentres en la lista.',
};

/** Primer nombre de pila de un socio, para saludos personalizados. */
export function primerNombre(responsable: Responsable): string {
  return SOCIOS[responsable].nombre.split(' ')[0];
}

/**
 * Mensaje de WhatsApp con saludo personalizado: "Buen día {Nombre}; quisiera hacer una consulta
 * sobre {tema}." Si el tema no tiene temaFrase (p. ej. "Otra consulta"), queda genérico.
 */
export function mensajeTema(tema: TemaWhatsApp): string {
  const nombre = primerNombre(tema.responsable);
  return tema.temaFrase
    ? `Buen día ${nombre}; quisiera hacer una consulta sobre ${tema.temaFrase}.`
    : `Buen día ${nombre}; quisiera hacer una consulta.`;
}

/** Mensaje para cuando la persona elige directamente a un socio (sin pasar por un tema). */
export function mensajePersona(responsable: Responsable): string {
  return `Buen día ${primerNombre(responsable)}; quisiera hacer una consulta.`;
}

/** Construye el link wa.me para un socio + mensaje dado. */
export function waLink(responsable: Responsable, mensaje: string): string {
  const socio = SOCIOS[responsable];
  return `https://wa.me/${socio.numeroWa}?text=${encodeURIComponent(mensaje)}`;
}

/** Link directo para un tema del listado (o el fallback "otra consulta"). */
export function waLinkForTema(slug: string): string {
  const tema = TEMAS_WHATSAPP.find((t) => t.slug === slug) ?? TEMA_OTRA_CONSULTA;
  return waLink(tema.responsable, mensajeTema(tema));
}

export function getTemaBySlug(slug: string): TemaWhatsApp | undefined {
  return TEMAS_WHATSAPP.find((t) => t.slug === slug);
}

/** Minúsculas y sin tildes, para comparar texto ingresado por el usuario contra el índice. */
export function normalizarBusqueda(s: string): string {
  return s
    .toLowerCase()
    .replace(/[áàâã]/g, 'a')
    .replace(/[éèê]/g, 'e')
    .replace(/[íìî]/g, 'i')
    .replace(/[óòôõ]/g, 'o')
    .replace(/[úùû]/g, 'u')
    .replace(/ñ/g, 'n');
}

/** Texto normalizado (minúsculas, sin tildes) para el buscador de temas por palabra clave. */
export function searchIndex(tema: TemaWhatsApp): string {
  return normalizarBusqueda([tema.etiqueta, ...(tema.keywords ?? [])].join(' '));
}
