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
    numeroVisible: '+54 9 11 7236-2504',
    numeroWa: '5491172362504',
    email: 'giselepaoletti@gmail.com',
    rol: 'Socia',
    formacion: ['Abogada (UBA)', 'Magíster en Administración y Políticas Públicas (UDESA)'],
    matricula: 'Tº 121 Fº 345 C.P.A.C.F.',
    bio: [
      'Aporta una visión integral, técnica y sensible que se adapta a cada contexto, con experiencia en asesoramiento jurídico y gestión pública, acompañando procesos vinculados a decisiones patrimoniales, derechos y relaciones de consumo.',
      'Trabaja también en jubilaciones y pensiones, y en el seguimiento de trámites administrativos y judiciales, con una mirada atenta al recorrido de cada persona y organización.',
    ],
  },
  diego: {
    nombre: 'Diego Palau',
    numeroVisible: '+54 9 11 7236-2504',
    numeroWa: '5491172362504',
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
    keywords: [
      'jubilación',
      'jubilaciones',
      'pami',
      'anses',
      'aportes',
      'retiro',
      'pensión',
      'moratoria previsional',
      'beneficio previsional',
      'reajuste de haberes',
      'reajuste de haber jubilatorio',
      'haber jubilatorio mal calculado',
      'mi anses',
      'mi argentina',
      'años de aportes faltantes',
      'abogado previsional',
      'cómo saber si me corresponde jubilarme',
    ],
    contenido: {
      problema:
        'Un trámite de jubilación es el proceso ante ANSES para obtener el beneficio previsional que corresponde según los aportes realizados; un reajuste de haberes es el reclamo para corregir un beneficio ya otorgado que no refleja esos aportes. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, analiza la situación previsional y representa al interesado en ambos casos.',
      situaciones: [
        'Personas en edad de jubilarse que no completan los años de aporte exigidos (moratoria previsional / prestación por edad avanzada).',
        'Jubilados que consideran que su haber fue mal calculado o quedó desactualizado (reajuste de haberes).',
        'Necesidad de mantener la cobertura de una prepaga u obra social al pasar a PAMI.',
        'Trámites de pensión por fallecimiento del cónyuge o familiar aportante.',
        'Reclamos ante ANSES por demoras o rechazos en el trámite.',
      ],
      servicios: [
        'Análisis de la situación previsional y de los años de aporte disponibles.',
        'Asesoramiento y gestión de moratorias previsionales cuando corresponda.',
        'Representación en reclamos y reajustes de haberes ante ANSES y la Justicia.',
        'Asesoramiento sobre la continuidad de la cobertura médica (prepaga u obra social) al jubilarse.',
        'Trámites de pensión por fallecimiento.',
      ],
      comoTrabaja: [
        'Verificamos tu acceso a "Mi ANSES" y "Mi Argentina" (te ayudamos a crearlo si todavía no lo tenés) y revisamos con esos accesos tus años de aportes antes de avanzar.',
        'Evaluamos qué vía corresponde: jubilación ordinaria, moratoria, pensión, o reajuste de un beneficio ya otorgado.',
        'Preparamos la documentación: completamos por vos el formulario de ANSES y la historia laboral, y te decimos exactamente qué papeles juntar de tu lado.',
        'Te acompañamos personalmente el día de la presentación inicial en ANSES.',
        'Hacemos seguimiento periódico del expediente (cada dos o tres semanas aproximadamente) hasta la resolución, incluyendo la gestión de la cobertura médica durante la transición.',
      ],
      documentacionInicial: [
        'DNI y fotocopia.',
        'Libreta de casamiento y partidas de nacimiento de los hijos, si corresponde (con sus fotocopias).',
        'Recibos de sueldo o certificación de servicios disponibles.',
        'Datos bancarios (CBU o alias) de la cuenta donde se van a percibir los haberes.',
        'Última resolución de ANSES, si ya hay un trámite en curso o un beneficio otorgado que se quiere cuestionar.',
      ],
      faq: [
        {
          pregunta: '¿Puedo jubilarme si no llegué a los años de aportes exigidos?',
          respuesta:
            'Sí, existen moratorias previsionales para completar los años faltantes; te asesoramos si tu caso puede acceder a alguna de ellas.',
        },
        {
          pregunta: '¿Puedo mantener mi prepaga en lugar de pasar a PAMI cuando me jubilo?',
          respuesta:
            'En determinados casos es posible mantener la cobertura de la prepaga u obra social al jubilarte, gestionando el cambio de plan correspondiente. Depende de tu situación particular y de la entidad — te acompañamos en esa gestión para que no se interrumpa tu cobertura médica.',
        },
        {
          pregunta: '¿Tengo que ir personalmente a ANSES?',
          respuesta:
            'Para la presentación inicial del trámite, sí, y te acompañamos ese día. Los pasos posteriores los gestionamos nosotros, salvo alguna diligencia puntual que requiera tu presencia.',
        },
        {
          pregunta: '¿Cuánto tarda el trámite y cómo se cobra lo adeudado mientras tanto?',
          respuesta:
            'Un trámite presencial ante ANSES suele demorar un par de meses una vez presentada toda la documentación. El beneficio se reconoce con retroactividad desde el inicio del trámite, así que no se pierde ese período.',
        },
        {
          pregunta: '¿Qué es un reajuste de haberes?',
          respuesta:
            'Es el reclamo para actualizar o corregir un beneficio ya otorgado, cuando el cálculo no refleja correctamente los aportes realizados.',
        },
      ],
      relacionados: ['amparos-de-salud', 'danos-y-perjuicios', 'derecho-administrativo-y-regulatorio'],
    },
  },
  {
    slug: 'amparos-de-salud',
    etiqueta: 'Amparos de salud',
    responsable: 'diego',
    temaFrase: 'un amparo de salud',
    resumenBreve: 'Acciones de amparo ante situaciones que requieren tutela judicial urgente en salud.',
    keywords: [
      'amparo de salud',
      'obra social',
      'prepaga',
      'medicamento',
      'tratamiento médico',
      'cobertura médica',
      'discapacidad',
      'urgencia médica',
      'cambio de obra social',
      'cambio de prepaga',
      'portabilidad',
      'promesa',
      'mediación prejudicial en salud',
      'medida cautelar de salud',
      'negativa de cobertura',
      'rechazo de obra social',
      'obra social no cubre tratamiento',
      'abogado amparo de salud',
    ],
    contenido: {
      problema:
        'Un amparo de salud es la acción judicial para obligar a una obra social o prepaga a cubrir un tratamiento, medicamento o cirugía que negó o demoró, incluyendo la solicitud de medidas cautelares urgentes. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, evalúa cada caso y presenta la acción cuando corresponde.',
      situaciones: [
        'Negativa o demora de una prepaga u obra social en cubrir un tratamiento, medicamento o prestación.',
        'Discapacidad: negativa a cubrir prestaciones previstas por la normativa vigente.',
        'Urgencias médicas donde la demora administrativa pone en riesgo la salud del paciente.',
        'Rechazo de una cirugía, estudio o internación ya indicada por el médico tratante.',
        'Rechazo de la nueva obra social o prepaga a reconocer un tratamiento en curso o una preexistencia al cambiarte de entidad (portabilidad).',
      ],
      servicios: [
        'Evaluación de la negativa y del marco normativo aplicable (normativa de discapacidad, de obras sociales, PMO).',
        'Asesoramiento en cambios de obra social o de prepaga, incluyendo el análisis de coberturas y preexistencias que la nueva entidad debe reconocer.',
        'Evaluación de la vía más conveniente: mediación prejudicial (PROMESA) o amparo directo, según la urgencia del caso.',
        'Redacción y presentación de la acción de amparo.',
        'Solicitud de medidas cautelares para lograr la cobertura mientras dura el proceso.',
        'Seguimiento hasta el cumplimiento efectivo de la prestación.',
      ],
      comoTrabaja: [
        'Relevamos la negativa recibida y la indicación médica correspondiente.',
        'Analizamos si corresponde un amparo y, de ser así, si hay lugar a solicitar una medida cautelar urgente.',
        'Presentamos la acción judicial y solicitamos la cautelar.',
        'Seguimos el cumplimiento de la orden judicial hasta que la prestación se efectiviza.',
      ],
      documentacionInicial: [
        'DNI y carnet de la prepaga u obra social.',
        'Indicación médica del tratamiento, medicamento o prestación solicitada.',
        'Nota o comunicación formal de rechazo de la prepaga/obra social, si la dieron por escrito.',
        'Historia clínica o informes médicos relevantes.',
      ],
      faq: [
        {
          pregunta: '¿Cuánto tarda un amparo de salud?',
          respuesta:
            'Al tratarse de un derecho urgente, suelen solicitarse medidas cautelares que pueden resolverse en pocos días, aunque el proceso completo demora más — te damos una estimación según tu situación concreta.',
        },
        {
          pregunta: '¿Necesito que el rechazo sea por escrito?',
          respuesta:
            'No es imprescindible, pero ayuda. Si solo te lo comunicaron verbalmente, te asesoramos sobre cómo dejar constancia de la negativa antes de iniciar la acción.',
        },
        {
          pregunta: '¿El amparo cubre medicamentos de alto costo?',
          respuesta: 'Puede aplicar cuando la cobertura correspondiente no se cumple. Contanos qué te negaron para evaluar el caso.',
        },
        {
          pregunta: '¿Qué pasa si cambio de obra social o de prepaga y me rechazan la cobertura de un tratamiento que ya tenía?',
          respuesta:
            'La normativa limita lo que la nueva entidad puede invocar como preexistencia cuando venís de otra cobertura, así que en muchos casos no puede negarse a cubrir un tratamiento en curso o una enfermedad ya cubierta antes. Si igual te la rechazan, evaluamos el caso para reclamarlo, incluyendo la vía del amparo si corresponde.',
        },
        {
          pregunta: '¿Tengo que pasar por una mediación antes de hacer el amparo?',
          respuesta:
            'Desde 2025 existe PROMESA (Procedimiento de Mediación Prejudicial en Materia de Salud, creado por el Decreto 379/2025), una instancia para intentar resolver el conflicto con la obra social o prepaga antes de ir a la Justicia. Es optativa, no obligatoria: en casos urgentes, donde la demora pone en riesgo la salud, se puede ir directamente al amparo y pedir una medida cautelar. Te asesoramos sobre cuál camino conviene según tu situación.',
        },
      ],
      relacionados: ['jubilaciones', 'danos-y-perjuicios', 'derecho-administrativo-y-regulatorio'],
    },
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
        'Un accidente de trabajo, incluido el que ocurre en el trayecto al trabajo, y las enfermedades profesionales están cubiertos por el sistema de riesgos del trabajo, que la ART correspondiente debe reconocer. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, asesora y representa cuando la ART no reconoce lo que corresponde.',
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
    contenido: {
      problema:
        'Ante un accidente de tránsito con lesiones o daños materiales, corresponde reclamar a la aseguradora propia, a la de la contraparte o al responsable del hecho, sin obligación de aceptar un monto que resulte insuficiente. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, evalúa el caso y lleva adelante ese reclamo.',
      situaciones: [
        'Choques o siniestros viales con lesiones a las personas involucradas.',
        'Daños materiales al vehículo no reconocidos, o reconocidos parcialmente, por la aseguradora.',
        'Desacuerdos con la aseguradora propia o de la contraparte sobre la cobertura o el monto ofrecido.',
        'Necesidad de reclamar a un tercero responsable del accidente.',
      ],
      servicios: [
        'Asesoramiento sobre la vía más conveniente: reclamo administrativo ante la aseguradora o acción judicial.',
        'Representación en el reclamo por daños materiales y por lesiones.',
        'Seguimiento de la denuncia policial y de la actuación de los seguros involucrados.',
        'Evaluación del monto del reclamo según el daño acreditado.',
      ],
      comoTrabaja: [
        'Relevamos cómo ocurrió el accidente y la documentación disponible (denuncia, fotos, testigos, partes de seguro).',
        'Analizamos la cobertura de los seguros involucrados y la responsabilidad de cada parte.',
        'Iniciamos el reclamo correspondiente, administrativo o judicial según el caso.',
        'Seguimos el proceso hasta su resolución.',
      ],
      documentacionInicial: [
        'Denuncia policial o exposición del accidente, si se hizo.',
        'Datos del otro vehículo/conductor y de las aseguradoras involucradas.',
        'Informes o certificados médicos, si hubo lesiones.',
        'Presupuestos o facturas de reparación del vehículo, si corresponde.',
      ],
      faq: [
        {
          pregunta: '¿Puedo reclamar si el accidente fue hace varios meses?',
          respuesta: 'Depende del caso: existen plazos legales para reclamar. Contanos cuándo ocurrió para evaluar si tu reclamo sigue vigente.',
        },
        {
          pregunta: '¿Qué pasa si la aseguradora ofrece un monto que me parece bajo?',
          respuesta: 'No estás obligado a aceptarlo. Podemos evaluar tu caso y asesorarte sobre si conviene negociar o iniciar una acción judicial.',
        },
        {
          pregunta: '¿Puedo reclamar aunque no haya hecho la denuncia policial en el momento?',
          respuesta: 'Puede ser más difícil probar el hecho, pero no necesariamente imposible. Contanos con qué documentación contás.',
        },
      ],
      relacionados: ['danos-y-perjuicios', 'accidentes-de-trabajo', 'amparos-de-salud'],
    },
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
        'En Argentina, el divorcio puede pedirse por decisión de uno solo de los cónyuges, sin necesidad de acuerdo con la otra parte, y puede incluir la división de bienes en común y las cuestiones sobre los hijos. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, acompaña todo el proceso.',
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
    contenido: {
      problema:
        'Un trámite de ciudadanía por opción, descendencia o naturalización, o un trámite migratorio de radicación o residencia, tiene requisitos y tiempos distintos según el país y la vía elegida. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, ordena la documentación y hace el seguimiento hasta la resolución.',
      situaciones: [
        'Descendientes de italianos, españoles u otras nacionalidades que quieren tramitar la ciudadanía por vía consular o judicial.',
        'Personas que necesitan resolver su situación migratoria en Argentina (radicación, residencia).',
        'Extranjeros que buscan la naturalización argentina.',
        'Armado o corrección de la documentación y partidas necesarias para un trámite de ciudadanía.',
      ],
      servicios: [
        'Asesoramiento sobre la vía más conveniente según el caso (consular, judicial, administrativa).',
        'Relevamiento y ordenamiento de la documentación y partidas necesarias.',
        'Gestión y seguimiento del trámite ante el organismo o consulado correspondiente.',
        'Asesoramiento en trámites de radicación y residencia en Argentina.',
      ],
      comoTrabaja: [
        'Relevamos tu árbol genealógico o situación migratoria y la documentación disponible.',
        'Identificamos qué partidas o documentos faltan y cómo obtenerlos.',
        'Iniciamos y hacemos seguimiento del trámite ante el organismo correspondiente.',
        'Te mantenemos informado de cada novedad hasta la resolución.',
      ],
      documentacionInicial: [
        'DNI y partidas de nacimiento propias y de los ascendientes vinculados al trámite.',
        'Actas de matrimonio de los ascendientes, si corresponde.',
        'Documentación del país de origen del ascendiente (partida de nacimiento extranjera, si la hay).',
        'Pasaporte o documentación migratoria vigente, si el trámite es de radicación.',
      ],
      faq: [
        {
          pregunta: '¿Cuánto tarda un trámite de ciudadanía italiana?',
          respuesta:
            'Varía mucho según la vía (consular o judicial) y, en el caso consular, según la comuna italiana involucrada — puede ir de meses a varios años. Te damos una estimación más precisa según tu caso.',
        },
        {
          pregunta: '¿Necesito viajar para tramitar la ciudadanía?',
          respuesta: 'Depende de la vía elegida. Hay alternativas que se pueden avanzar desde Argentina; te asesoramos sobre la que mejor se adapte a tu situación.',
        },
        {
          pregunta: 'No tengo todas las partidas de mis ascendientes, ¿puedo iniciar igual?',
          respuesta: 'Sí. Identificar y conseguir la documentación faltante es parte del trabajo inicial.',
        },
      ],
      relacionados: ['derecho-administrativo-y-regulatorio', 'sucesiones'],
    },
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
        'Cuando fallece un familiar, la sucesión es el proceso judicial para acreditar quiénes son los herederos y transmitirles el patrimonio; también puede organizarse en vida, por ejemplo mediante una cesión con reserva de usufructo. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, tramita el proceso completo.',
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
    contenido: {
      problema:
        'Registrar una marca ante el INPI es lo que permite impedir que un tercero use el mismo nombre, logo o signo distintivo, y defenderlo frente a usos no autorizados; el registro dura diez años y es renovable. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, realiza la búsqueda de antecedentes y todo el trámite.',
      situaciones: [
        'Emprendimientos o empresas que lanzan un nombre, logo o signo distintivo y quieren protegerlo.',
        'Marcas ya registradas que enfrentan una oposición de un tercero, o que necesitan oponerse a la de otro.',
        'Renovación de marcas próximas a vencer.',
        'Uso no autorizado de una marca por parte de un tercero.',
      ],
      servicios: [
        'Búsqueda de antecedentes y viabilidad registral de la marca.',
        'Presentación y seguimiento de la solicitud de registro ante el INPI.',
        'Gestión de oposiciones, propias o de terceros.',
        'Renovación de marcas y asesoramiento ante usos no autorizados.',
      ],
      comoTrabaja: [
        'Analizamos la marca a registrar y hacemos una búsqueda de antecedentes.',
        'Presentamos la solicitud ante el INPI y hacemos seguimiento del expediente.',
        'Te informamos de cada novedad (observaciones, oposiciones) y actuamos frente a ellas.',
        'Acompañamos hasta la concesión del registro.',
      ],
      documentacionInicial: [
        'Datos del titular (persona física o jurídica) que va a registrar la marca.',
        'El signo a registrar: palabra, logo, o ambos.',
        'Detalle de los productos o servicios que la marca va a identificar.',
      ],
      faq: [
        {
          pregunta: '¿Cuánto dura el registro de una marca?',
          respuesta: 'Una vez concedida, el registro dura diez años y es renovable indefinidamente por períodos iguales.',
        },
        {
          pregunta: '¿Qué pasa si no registro mi marca?',
          respuesta:
            'Podés seguir usándola, pero tu protección legal frente a terceros es mucho más débil, y corrés el riesgo de que otro la registre antes.',
        },
        {
          pregunta: '¿Cuánto tarda el trámite?',
          respuesta: 'Depende del INPI y de si hay observaciones u oposiciones en el camino — te damos una estimación al iniciar el trámite.',
        },
      ],
      relacionados: ['patentes', 'derecho-de-autor', 'asesoramiento-a-empresas'],
    },
  },
  {
    slug: 'patentes',
    etiqueta: 'Patentes',
    responsable: 'diego',
    temaFrase: 'una patente',
    resumenBreve: 'Orientación jurídica para la protección de invenciones.',
    keywords: ['patente', 'invento', 'invención', 'modelo de utilidad', 'propiedad industrial', 'inpi'],
    contenido: {
      problema:
        'Patentar una invención, o protegerla como modelo de utilidad, es lo que permite explotarla en exclusiva ante el INPI; sin ese registro, un desarrollo técnico puede ser reproducido libremente por terceros. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, evalúa la patentabilidad y lleva adelante la solicitud.',
      situaciones: [
        'Inventores o empresas con un desarrollo técnico nuevo que quieren protegerlo antes de darlo a conocer.',
        'Dudas sobre si un desarrollo es patentable o corresponde a un modelo de utilidad.',
        'Necesidad de evaluar si una invención ya fue patentada por otro.',
        'Explotación o licenciamiento de una patente ya concedida.',
      ],
      servicios: [
        'Evaluación de la patentabilidad del desarrollo y búsqueda de antecedentes.',
        'Redacción y presentación de la solicitud de patente o modelo de utilidad ante el INPI.',
        'Seguimiento del expediente durante el examen.',
        'Asesoramiento sobre licenciamiento o cesión de derechos.',
      ],
      comoTrabaja: [
        'Relevamos el desarrollo técnico y evaluamos la vía de protección más adecuada.',
        'Hacemos una búsqueda de antecedentes para evaluar la novedad.',
        'Preparamos y presentamos la solicitud ante el INPI.',
        'Seguimos el expediente hasta su resolución, informando cada etapa del examen.',
      ],
      documentacionInicial: [
        'Descripción técnica del desarrollo o invención.',
        'Planos, esquemas o prototipos, si existen.',
        'Información sobre si el desarrollo ya fue divulgado públicamente (publicaciones, ferias, ventas).',
      ],
      faq: [
        {
          pregunta: '¿Cuál es la diferencia entre una patente y un modelo de utilidad?',
          respuesta:
            'La patente protege invenciones con mayor grado de novedad e implica un proceso de examen más extenso; el modelo de utilidad protege mejoras o disposiciones de objetos existentes, con un trámite más simple y una vigencia menor. Te asesoramos sobre cuál corresponde a tu caso.',
        },
        {
          pregunta: '¿Puedo patentar algo que ya mostré públicamente?',
          respuesta: 'Depende de cuándo y cómo se divulgó — la novedad es un requisito clave. Contanos los detalles para evaluarlo cuanto antes.',
        },
        {
          pregunta: '¿Cuánto tarda el trámite?',
          respuesta: 'El examen de patentes ante el INPI suele demorar varios años; te damos una estimación más ajustada según el tipo de solicitud.',
        },
      ],
      relacionados: ['marcas', 'derecho-de-autor', 'asesoramiento-a-empresas'],
    },
  },
  {
    slug: 'derecho-de-autor',
    etiqueta: 'Derecho de autor',
    responsable: 'diego',
    temaFrase: 'derecho de autor',
    resumenBreve: 'Orientación jurídica para la protección de creaciones y derechos intelectuales.',
    keywords: ['derecho de autor', 'propiedad intelectual', 'obra', 'copyright', 'registro de obra'],
    contenido: {
      problema:
        'Una obra literaria, artística, de software o de otro tipo está protegida por derecho de autor desde que se crea; registrarla ante la Dirección Nacional del Derecho de Autor facilita probar la autoría y la fecha. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, gestiona ese registro y actúa frente a usos no autorizados.',
      situaciones: [
        'Autores, artistas o desarrolladores que quieren registrar formalmente una obra.',
        'Uso no autorizado de una obra por parte de un tercero.',
        'Dudas sobre titularidad de derechos en obras creadas por encargo o en el marco de una relación laboral.',
        'Cesión o licenciamiento de derechos de autor sobre una obra.',
      ],
      servicios: [
        'Registro de obras ante la Dirección Nacional del Derecho de Autor.',
        'Asesoramiento frente a usos no autorizados de una obra.',
        'Redacción de contratos de cesión o licencia de derechos de autor.',
        'Asesoramiento sobre titularidad de derechos en obras por encargo.',
      ],
      comoTrabaja: [
        'Relevamos la obra y su situación de autoría/titularidad.',
        'Gestionamos el registro correspondiente cuando corresponde.',
        'Si hay un uso no autorizado, evaluamos la vía de reclamo más adecuada.',
        'Acompañamos hasta resolver la situación.',
      ],
      documentacionInicial: [
        'La obra (o una copia/soporte que la identifique) que se quiere registrar o proteger.',
        'Datos del autor o autores.',
        'En caso de reclamo, evidencia del uso no autorizado por parte del tercero.',
      ],
      faq: [
        {
          pregunta: '¿Necesito registrar mi obra para que esté protegida?',
          respuesta:
            'No, la protección nace con la creación de la obra. El registro es una herramienta que facilita probar la autoría y la fecha frente a un conflicto.',
        },
        {
          pregunta: '¿Quién es el titular de una obra hecha por encargo?',
          respuesta: 'Depende de lo acordado entre las partes. Te asesoramos para dejarlo claro por escrito antes de que surja un conflicto.',
        },
        {
          pregunta: '¿Qué puedo hacer si alguien usa mi obra sin autorización?',
          respuesta: 'Podés reclamar el cese del uso y, según el caso, una compensación. Contanos los detalles para evaluar la mejor vía.',
        },
      ],
      relacionados: ['marcas', 'patentes', 'asesoramiento-a-empresas'],
    },
  },
  {
    slug: 'derecho-administrativo-y-regulatorio',
    etiqueta: 'Derecho administrativo, regulatorio y relaciones institucionales',
    responsable: 'gisele',
    temaFrase: 'un trámite administrativo/regulatorio ante un organismo público',
    resumenBreve: 'Procedimientos administrativos, trámites y relaciones institucionales.',
    keywords: ['trámite administrativo', 'organismo público', 'expediente administrativo', 'igj', 'rpi', 'regulatorio', 'relaciones institucionales', 'estado'],
    contenido: {
      problema:
        'Un trámite o conflicto frente a la Administración Pública Nacional, provincial o municipal —expedientes, actos administrativos, normativa sectorial, recursos y descargos— tiene una lógica y tiempos propios que conviene conocer antes de avanzar. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, gestiona el expediente hasta su resolución.',
      situaciones: [
        'Trámites y gestiones ante organismos de la Administración Pública Nacional, provincial y municipal.',
        'Análisis del marco normativo y regulatorio aplicable a un proyecto, una actividad o una decisión empresarial.',
        'Cuestiones regulatorias en sectores con fuerte intervención estatal, como el sistema de salud y el sistema de transporte.',
        'Gestiones ante organismos de contralor.',
        'Trámites registrales ante la Inspección General de Justicia (IGJ) y el Registro de la Propiedad Inmueble (RPI).',
      ],
      servicios: [
        'Asesoramiento en procedimientos administrativos y análisis de riesgo regulatorio.',
        'Seguimiento y gestión de expedientes administrativos hasta su resolución.',
        'Elaboración de presentaciones, descargos y recursos administrativos.',
        'Trámites registrales ante IGJ y RPI.',
        'Relaciones institucionales.',
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
            'Sí, gestionamos trámites administrativos y regulatorios ante distintos organismos, incluidos los registros de IGJ y RPI.',
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
        'Constituir una sociedad —por ejemplo, una SRL— da un marco legal formal a un proyecto entre dos o más personas y separa el patrimonio de la actividad del patrimonio personal de cada socio. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, redacta el contrato social y realiza la gestión registral completa.',
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
    contenido: {
      problema:
        'Un contrato mal redactado, o inexistente, suele originar conflictos que se evitan dejando por escrito, desde el inicio, lo que cada parte espera y qué ocurre si algo no se cumple. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, redacta y revisa contratos a medida de cada acuerdo.',
      situaciones: [
        'Acuerdos comerciales o de prestación de servicios que todavía no están puestos por escrito.',
        'Contratos ya firmados que generan dudas sobre su interpretación o alcance.',
        'Necesidad de revisar un contrato antes de firmarlo.',
        'Relaciones comerciales informales que buscan formalizarse.',
      ],
      servicios: [
        'Redacción de contratos a medida (locación de servicios, compraventa, confidencialidad, entre otros).',
        'Revisión de contratos ya redactados por la otra parte antes de la firma.',
        'Asesoramiento sobre las cláusulas críticas de cada tipo de acuerdo.',
        'Renegociación o modificación de contratos vigentes.',
      ],
      comoTrabaja: [
        'Relevamos el acuerdo que se quiere formalizar o el contrato que se quiere revisar.',
        'Identificamos los puntos críticos a definir o corregir.',
        'Redactamos o ajustamos el contrato con las cláusulas necesarias para cada caso.',
        'Acompañamos la negociación con la otra parte hasta la firma.',
      ],
      documentacionInicial: [
        'Datos de las partes involucradas en el acuerdo.',
        'Términos ya conversados o acordados de palabra, si los hay.',
        'El contrato existente, si lo que se pide es una revisión.',
      ],
      faq: [
        {
          pregunta: '¿Pueden revisar un contrato que ya me mandó la otra parte?',
          respuesta: 'Sí, es una de las consultas más frecuentes. Te señalamos los puntos que convendría modificar antes de firmar.',
        },
        {
          pregunta: '¿Qué pasa si ya firmé un contrato y ahora tengo dudas?',
          respuesta: 'Podemos analizarlo igual y asesorarte sobre cómo interpretarlo o, si corresponde, cómo renegociarlo.',
        },
        {
          pregunta: '¿Cuánto tarda la redacción de un contrato?',
          respuesta: 'Depende de la complejidad del acuerdo; en la primera consulta te damos un estimado de tiempos.',
        },
      ],
      relacionados: ['constitucion-de-sociedades', 'formalizacion-de-proyectos', 'asesoramiento-a-empresas'],
    },
  },
  {
    slug: 'formalizacion-de-proyectos',
    etiqueta: 'Formalización de proyectos',
    responsable: 'gisele',
    temaFrase: 'la formalización de un proyecto',
    resumenBreve: 'Estructuración legal de proyectos y emprendimientos desde su inicio.',
    keywords: ['formalizar un proyecto', 'emprendimiento', 'startup', 'proyecto'],
    contenido: {
      problema:
        'Muchos proyectos y emprendimientos operan de manera informal durante un tiempo; darles un marco legal —una sociedad, un contrato entre las partes u otra estructura— ordena la relación entre quienes participan y reduce riesgos. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, define junto con cada proyecto la estructura más adecuada.',
      situaciones: [
        'Emprendimientos que empiezan a operar y necesitan definir su estructura legal.',
        'Proyectos con más de una persona involucrada que todavía no formalizaron su relación.',
        'Necesidad de elegir entre distintas figuras legales según la actividad y el riesgo.',
        'Proyectos informales que buscan regularizar su situación ante organismos públicos.',
      ],
      servicios: [
        'Asesoramiento sobre la figura legal más adecuada para el proyecto (sociedad, contrato entre partes, u otra estructura).',
        'Definición de las reglas entre las personas involucradas en el proyecto.',
        'Acompañamiento en la regularización de proyectos que ya vienen operando de manera informal.',
        'Coordinación con la constitución de sociedades cuando esa es la vía elegida.',
      ],
      comoTrabaja: [
        'Relevamos el proyecto, quiénes participan y en qué etapa está.',
        'Evaluamos qué estructura legal se ajusta mejor a la actividad y a los objetivos de cada uno.',
        'Formalizamos la relación mediante el instrumento legal que corresponda.',
        'Acompañamos la puesta en marcha formal del proyecto.',
      ],
      documentacionInicial: [
        'Descripción de la actividad y de quiénes participan en el proyecto.',
        'Acuerdos ya conversados entre las partes, aunque no estén formalizados.',
        'Documentación existente del proyecto, si ya viene operando de manera informal.',
      ],
      faq: [
        {
          pregunta: '¿Mi proyecto necesita una sociedad o alcanza con un contrato entre las partes?',
          respuesta: 'Depende de la actividad, el riesgo y los objetivos de cada uno. Te asesoramos sobre la opción más adecuada para tu caso.',
        },
        {
          pregunta: '¿Puedo formalizar un proyecto que ya viene funcionando hace tiempo?',
          respuesta: 'Sí. Es habitual que la formalización llegue después de que el proyecto ya está en marcha.',
        },
        {
          pregunta: '¿Qué pasa si más adelante queremos cambiar la estructura elegida?',
          respuesta: 'Es posible adaptarla a medida que el proyecto crece; te acompañamos también en esa instancia.',
        },
      ],
      relacionados: ['constitucion-de-sociedades', 'redaccion-de-contratos', 'asesoramiento-a-empresas'],
    },
  },
  {
    slug: 'asesoramiento-a-empresas',
    etiqueta: 'Asesoramiento a empresas',
    responsable: 'diego',
    temaFrase: 'asesoramiento legal para una empresa',
    resumenBreve: 'Asesoramiento jurídico integral para empresas en su operación diaria.',
    keywords: ['asesoramiento empresas', 'asesoramiento legal empresarial', 'pyme'],
    contenido: {
      problema:
        'Las empresas enfrentan de manera constante decisiones con impacto legal, desde su operación diaria hasta la relación con clientes y proveedores, que conviene resolver con acompañamiento jurídico continuo, no solo ante un conflicto puntual. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, brinda ese asesoramiento de forma continua o puntual.',
      situaciones: [
        'Empresas que necesitan asesoramiento legal continuo para su operación diaria.',
        'Dudas puntuales sobre la legalidad de una decisión comercial o societaria.',
        'Relación con clientes, proveedores u organismos públicos que requiere respaldo legal.',
        'Necesidad de coordinar distintas áreas legales (societaria, laboral, contractual) de manera integral.',
      ],
      servicios: [
        'Asesoramiento legal continuo para la operación de la empresa.',
        'Coordinación de cuestiones societarias, contractuales y regulatorias según las necesidades de cada empresa.',
        'Revisión y redacción de contratos comerciales.',
        'Representación frente a organismos públicos cuando la empresa lo requiere.',
      ],
      comoTrabaja: [
        'Relevamos la actividad de la empresa y sus necesidades legales actuales.',
        'Definimos junto con ustedes qué cuestiones requieren atención prioritaria.',
        'Brindamos asesoramiento continuo o puntual, según lo que necesite la empresa.',
        'Coordinamos con las demás áreas del estudio cuando el caso lo requiere (societario, laboral, contratos).',
      ],
      documentacionInicial: [
        'Información general de la empresa (actividad, estructura societaria).',
        'La cuestión concreta a resolver, si la consulta es puntual.',
        'Documentación relacionada con la consulta (contratos, notificaciones, etc.).',
      ],
      faq: [
        {
          pregunta: '¿Trabajan solo con consultas puntuales o también de manera continua?',
          respuesta: 'Ambas modalidades son posibles; lo definimos según lo que necesite tu empresa.',
        },
        {
          pregunta: '¿Qué tipo de empresas asesoran?',
          respuesta: 'Empresas y emprendimientos de distintos tamaños y actividades. Contanos tu caso para evaluar cómo podemos ayudarte.',
        },
        {
          pregunta: '¿Pueden representarnos frente a un organismo público?',
          respuesta: 'Sí, según el caso. Contanos la situación para evaluar cómo seguir.',
        },
      ],
      relacionados: ['constitucion-de-sociedades', 'redaccion-de-contratos', 'derecho-administrativo-y-regulatorio'],
    },
  },
  {
    slug: 'danos-y-perjuicios',
    etiqueta: 'Daños y perjuicios',
    responsable: 'gisele',
    temaFrase: 'un reclamo por daños y perjuicios',
    resumenBreve: 'Siniestros, responsabilidad civil y evaluación jurídica de contingencias.',
    keywords: ['daños y perjuicios', 'siniestro', 'responsabilidad civil', 'indemnización'],
    contenido: {
      problema:
        'Un siniestro o un hecho dañoso —un accidente, un daño a la propiedad, la negligencia de un tercero— genera consecuencias que muchas veces no son reconocidas espontáneamente por el responsable ni por su seguro. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, evalúa el hecho y lleva adelante el reclamo.',
      situaciones: [
        'Siniestros con daños materiales o lesiones a las personas.',
        'Responsabilidad civil de un tercero por un hecho dañoso.',
        'Desacuerdos con una aseguradora sobre el alcance de la cobertura.',
        'Necesidad de cuantificar y reclamar un daño sufrido.',
      ],
      servicios: [
        'Evaluación del hecho dañoso y de la responsabilidad involucrada.',
        'Cuantificación del daño (material, y cuando corresponde, moral) a reclamar.',
        'Representación en el reclamo, administrativo o judicial, ante el responsable y su seguro.',
        'Seguimiento del proceso hasta su resolución.',
      ],
      comoTrabaja: [
        'Relevamos el hecho y la documentación disponible sobre el daño sufrido.',
        'Analizamos la responsabilidad del tercero y la cobertura de los seguros involucrados.',
        'Iniciamos el reclamo correspondiente.',
        'Seguimos el proceso hasta la reparación del daño.',
      ],
      documentacionInicial: [
        'Denuncia o constancia del hecho, si se hizo.',
        'Informes médicos, presupuestos o facturas que acrediten el daño sufrido.',
        'Datos del responsable y de su seguro, si se conocen.',
      ],
      faq: [
        {
          pregunta: '¿Qué se puede reclamar en un caso de daños y perjuicios?',
          respuesta: 'El daño material sufrido y, según el caso, el daño moral. Te asesoramos sobre qué corresponde reclamar en tu situación concreta.',
        },
        {
          pregunta: '¿Puedo reclamar si todavía no sé el monto exacto del daño?',
          respuesta: 'Sí, la cuantificación es parte del trabajo inicial del caso.',
        },
        {
          pregunta: '¿Cuánto tarda un reclamo por daños y perjuicios?',
          respuesta: 'Depende de si se resuelve por la vía administrativa o judicial, y de la complejidad del caso. Te damos una estimación al evaluar tu situación.',
        },
      ],
      relacionados: ['accidentes-de-transito', 'accidentes-de-trabajo', 'amparos-de-salud'],
    },
  },
  {
    slug: 'acuerdos-de-desvinculacion-laboral',
    etiqueta: 'Acuerdos de desvinculación laboral',
    responsable: 'diego',
    temaFrase: 'un acuerdo de desvinculación laboral',
    resumenBreve: 'Asesoramos a empleadores en el cierre de vínculos laborales, incluido el personal de casas particulares.',
    keywords: [
      'despido',
      'desvinculación',
      'acuerdo laboral',
      'empleada doméstica',
      'personal de casas particulares',
      'indemnización laboral',
      'desvinculación de empleada doméstica',
      'cómo despedir a una empleada doméstica',
      'liquidación final empleada doméstica',
      'cálculo de indemnización por despido',
      'acuerdo de desvinculación laboral',
      'régimen de casas particulares',
    ],
    responsablePendiente: true,
    contenido: {
      problema:
        'Cerrar un vínculo laboral de forma prolija, ya sea con un empleado de una empresa o con personal de casas particulares, reduce el riesgo de reclamos posteriores y ordena la salida para ambas partes. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, calcula la liquidación y redacta el acuerdo correspondiente.',
      situaciones: [
        'Empleadores que necesitan desvincular a un empleado y buscan hacerlo de manera ordenada.',
        'Cierre del vínculo con personal de casas particulares (empleadas/os domésticos, cuidadores).',
        'Necesidad de acordar los términos de una indemnización o liquidación final.',
        'Dudas sobre cómo instrumentar legalmente un acuerdo de desvinculación.',
      ],
      servicios: [
        'Asesoramiento a empleadores sobre la forma más adecuada de desvincular a un trabajador.',
        'Redacción de acuerdos de desvinculación y liquidaciones finales.',
        'Asesoramiento específico para el cierre del vínculo con personal de casas particulares.',
        'Representación frente a reclamos posteriores al cese, si los hubiera.',
      ],
      comoTrabaja: [
        'Relevamos la relación laboral y los motivos de la desvinculación.',
        'Calculamos y ordenamos los conceptos a liquidar.',
        'Redactamos el acuerdo de desvinculación correspondiente.',
        'Acompañamos la instrumentación y, si surge, la respuesta a reclamos posteriores.',
      ],
      documentacionInicial: [
        'Datos de la relación laboral (fecha de inicio, categoría, remuneración).',
        'Recibos de sueldo recientes.',
        'Motivo de la desvinculación.',
      ],
      faq: [
        {
          pregunta: '¿Cómo se calcula la indemnización?',
          respuesta: 'Depende de la antigüedad, la remuneración y el motivo del cese. Te damos el cálculo concreto al evaluar tu caso.',
        },
        {
          pregunta: '¿Aplica lo mismo para personal de casas particulares?',
          respuesta: 'El régimen tiene sus propias reglas, distintas de las de un empleado de empresa; te asesoramos sobre las diferencias puntuales.',
        },
        {
          pregunta: '¿Un acuerdo de desvinculación evita reclamos posteriores?',
          respuesta: 'Reduce el riesgo cuando está bien instrumentado, aunque no lo elimina por completo. Te asesoramos para dejarlo lo más prolijo posible.',
        },
      ],
      relacionados: ['accidentes-de-trabajo', 'asesoramiento-a-empresas', 'redaccion-de-contratos'],
    },
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
        'Una usucapión es la vía judicial para que quien posee un inmueble de forma pacífica y continua, durante el tiempo que exige la ley, obtenga el reconocimiento de su dominio y lo inscriba a su nombre. Estudio Jurídico APP, con sede en Ciudad Autónoma de Buenos Aires, lleva el proceso hasta la inscripción definitiva.',
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
