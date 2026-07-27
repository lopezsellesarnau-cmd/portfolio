/**
 * Copy — fuente única de verdad. Los 3 casos de estudio llevan contenido
 * técnico real (no relleno): lo que Arnau ya dio en el brief. Lo que falta
 * de verdad (capturas, links, métricas exactas) se pide al final del build,
 * no se inventa aquí.
 */

export const PERFIL = {
  nombre: 'Arnau Lopez',
  rol: 'Full-Stack AI Product Engineer',
  eyebrow: '[ 22 años · autodidacta ]',
  hero: 'Construyo productos de IA de punta a punta — de la idea a producción — y entiendo su gobernanza, no solo su código.',
  sub: 'El 78% de las ofertas de IA en España no piden título. Piden portfolio real. Este es el mío.',
}

// El mismo árbol "largo" del hero de StackD y Aithority (su DotTree usa SEED
// 315): unifica la identidad entre las tres superficies de Arnau.
export const HERO_PLANT_SEED = 315

export const STATS = [
  { v: '5', l: 'productos shippeados' },
  { v: '3', l: 'en producción o App Store' },
  { v: '0', l: 'títulos universitarios' },
]

export type CaseStudy = {
  slug: string
  index: string
  nombre: string
  tagline: string
  estado: { texto: string; tono: 'ok' | 'accent' }
  problema: string
  enfoque: string[]
  decisiones: { titulo: string; detalle: string }[]
  resultado: string
  stack: string[]
  seed: number
}

export const CASOS: CaseStudy[] = [
  {
    slug: 'blockflow',
    index: '01',
    nombre: 'BlockFlow',
    tagline: 'Agente de voz IA para administradores de fincas',
    estado: { texto: 'En producción', tono: 'ok' },
    problema:
      'Un administrador de fincas recibe llamadas todo el día por las mismas incidencias — una fuga, un ascensor parado, una queja de ruido — y cada una interrumpe lo que sea que esté haciendo. Contestar bien cuesta tiempo que no sobra; no contestar cuesta clientes.',
    enfoque: [
      'Un agente de voz que descuelga, entiende la incidencia por conversación natural (no un árbol de "pulse 1"), y decide qué hacer con ella.',
      'Triaje automático: clasifica la urgencia y el tipo de incidencia según lo que se ha dicho en la llamada, sin intervención humana en el camino feliz.',
      'Crea el ticket ya estructurado (propiedad, tipo, urgencia, resumen) en el sistema de gestión, listo para que el administrador solo tenga que decidir, no transcribir.',
    ],
    decisiones: [
      {
        titulo: 'Conversación, no árbol de decisión',
        detalle:
          'El reto no era "hacer que hable", era que la llamada se resolviera igual de bien si el vecino describe el problema en cualquier orden, con cualquier nivel de detalle — la extracción de campos estructurados tiene que sobrevivir a una conversación real, no a un guion.',
      },
      {
        titulo: 'Sin intervención humana como objetivo, no como opción',
        detalle:
          'El sistema está diseñado para que el camino feliz (incidencia clara, no urgente) no toque a nadie del equipo — el humano entra solo en la excepción, no en cada llamada.',
      },
    ],
    resultado:
      'En producción, atendiendo llamadas reales de administradores de fincas sin intervención humana en el camino feliz.',
    stack: ['Voice AI', 'LLM', 'Automatización de tickets', 'Producción'],
    seed: 100,
  },
  {
    slug: 'louvr-labs',
    index: '02',
    nombre: 'Louvr Labs',
    tagline: 'Plataforma de ranking y reporting para Meta Ads',
    estado: { texto: 'En producción', tono: 'ok' },
    problema:
      'Un gestor de campañas de Meta Ads mira decenas de anuncios a la semana y decide a mano cuáles escalar, pausar, mantener o refrescar — un juicio que se repite, es medible, y consume tiempo que debería ir a estrategia, no a mirar tablas.',
    enfoque: [
      'Conexión OAuth con la API de Meta Ads: el cliente autoriza acceso de solo lectura a sus cuentas publicitarias, sin compartir credenciales.',
      'Capa 1 — reglas y heurística: cada anuncio se rankea contra umbrales concretos (CPA, frecuencia, CTR, gasto) y se le asigna un badge — Scale, Pause, Hold o Refresh. Determinista y explicable: el motivo de cada badge se puede señalar.',
      'Capa 2 — Claude (Sonnet) vía API razona SOBRE los datos ya rankeados, no en su lugar: genera el insight en lenguaje natural que explica el patrón detrás de los números, ya con el ranking hecho por reglas.',
      'Automatización con Make.com que dispara el pipeline y entrega un reporte semanal por email — cero intervención manual entre "se cierra la semana" y "el cliente lo tiene en el correo".',
    ],
    decisiones: [
      {
        titulo: 'Arquitectura de dos capas, a propósito',
        detalle:
          'El ranking de negocio (qué anuncio se escala) sale de reglas y umbrales, no de un LLM — es la parte que tiene que ser determinista, auditable y barata de ejecutar en cada anuncio. El LLM se reserva para lo que un LLM hace mejor que una regla: explicar el patrón en lenguaje natural, no decidir la clasificación.',
      },
      {
        titulo: 'Backend Python, orquestación con Make.com',
        detalle:
          'La lógica de negocio (llamadas a la API de Meta, ranking, generación del insight) vive en Python; Make.com orquesta el disparo semanal y el envío — separar "qué calcula" de "cuándo se dispara" hizo que cambiar la cadencia de reporting no tocara ni una línea de la lógica.',
      },
    ],
    resultado: 'Reporte semanal automático por email, cero intervención manual, en producción con clientes reales.',
    stack: ['OAuth', 'Meta Ads API', 'Python', 'Claude (Sonnet) API', 'Make.com'],
    seed: 322,
  },
  {
    slug: 'rostry',
    index: '03',
    nombre: 'Rostry',
    tagline: 'Ligas deportivas amateur, con pagos reales entre jugadores',
    estado: { texto: 'Aprobada en App Store · build 7', tono: 'accent' },
    problema:
      'Organizar una liga amateur (pádel, fútbol 7, lo que sea) a mano es un grupo de WhatsApp, una hoja de cálculo y alguien cobrando en efectivo. Rostry lo convierte en una app real, con cobro integrado y sin que el organizador tenga que ser quien retiene el dinero.',
    enfoque: [
      'Flutter + Riverpod para la app, con un patrón de repositorio (RostryRepository) que define una interfaz abstracta única — hoy con una sola implementación real, pero la capa de datos nunca se acopla directamente al widget tree.',
      'Firebase como backend (datos, auth).',
      'Stripe Connect con destination charges: el dinero va directo a la cuenta del organizador de la liga, con una comisión de plataforma del 5% retenida automáticamente en cada cobro — sin que Rostry tenga que mover el dinero manualmente ni el organizador gestionar facturación aparte.',
    ],
    decisiones: [
      {
        titulo: 'Destination charges, no cobro propio + reparto manual',
        detalle:
          'Con destination charges, Stripe mueve el dinero directo al organizador y retiene la comisión de Rostry en el mismo cobro — evita que la plataforma tenga que sostener el dinero de terceros como si fuera propio, con toda la carga regulatoria que eso implicaría.',
      },
      {
        titulo: 'Interfaz de repositorio desde el día uno',
        detalle:
          'Aunque hoy solo hay una implementación real de RostryRepository, la interfaz abstracta estaba desde el principio — el coste de definirla es bajo y evita que la lógica de la app quede acoplada a Firebase si algún día cambia el backend.',
      },
      {
        titulo: 'El proceso de aprobación como parte del trabajo, no un trámite',
        detalle:
          'Build 7 aprobada: seis iteraciones antes que se rechazaran o pidieran cambios (revisión de guidelines de pagos in-app, metadata, flujos de cuenta) — la app en producción es también la app que sobrevivió a la revisión real de Apple.',
      },
    ],
    resultado: 'Aprobada en la App Store en la build 7, con pagos reales entre jugadores ya funcionando.',
    stack: ['Flutter', 'Riverpod', 'Firebase', 'Stripe Connect', 'App Store'],
    seed: 507,
  },
]

/**
 * Aithority va aparte del archivador: es el proyecto de cofundador, tiene su
 * propia sección con dashboard + árbol de info y no comparte peso con los
 * trabajos ya cerrados.
 */
export const AITHORITY_CASO: CaseStudy = {
  slug: 'aithority',
  index: '—',
  nombre: 'Aithority',
  tagline: 'Cumplimiento del AI Act europeo — como cofundador técnico',
  estado: { texto: 'Cofundador · en construcción', tono: 'accent' },
  problema:
    'Una empresa que usa IA en RRHH, crédito o biometría tiene que cumplir el AI Act: inventariar cada sistema, clasificar su riesgo y documentarlo. Hoy lo hacen a mano, en hojas de cálculo, sin saber qué les aplica ni qué falta.',
  enfoque: [
    'Motor de clasificación real: entra la descripción de un sistema y sale su riesgo según el Anexo III y las obligaciones concretas que le tocan, con el razonamiento — no una caja negra.',
    'Descubrimiento automático del inventario: conecta Microsoft 365 por OAuth (consentimiento de admin, solo lectura) y detecta las herramientas de IA que la organización ya tiene autorizadas.',
    'Documentación del Art. 11 y registro de evidencias con fecha, para que el expediente de auditoría se componga solo y nunca describa un estado viejo.',
  ],
  decisiones: [
    {
      titulo: 'Detectar no es clasificar',
      detalle:
        'El descubrimiento rellena el inventario, pero no decide el riesgo: que aparezca "Notion AI" no dice si es de alto riesgo — eso depende del uso. Vender "clasificación automática total" sería la sobrepromesa que te pillan en dos preguntas.',
    },
    {
      titulo: 'Sin guardar tokens de terceros',
      detalle:
        'El flujo con Microsoft Graph pide un token app-only en cada sincronización en vez de persistirlo — menos superficie que proteger, y el consentimiento es de solo lectura sobre el directorio.',
    },
  ],
  resultado:
    'Backend propio (motor de clasificación + API) y dashboard en producción. La startup tiene su primer cliente de pago y entrada en Lanzadera.',
  stack: ['Next.js', 'Node / Express', 'Microsoft Graph', 'OAuth', 'AI Act'],
  seed: 655,
}

export type ProyectoLigero = {
  nombre: string
  tagline: string
  estado: string
  stack: string[]
  seed: number
}

export const LIGEROS: ProyectoLigero[] = [
  {
    nombre: 'Volea',
    tagline: 'SaaS de reservas en tiempo real para clubs de pádel.',
    estado: 'En producción',
    stack: ['SaaS', 'Reservas en tiempo real'],
    seed: 803,
  },
  {
    nombre: 'SMASH',
    tagline: 'App social de pádel — vídeos, squads, comunidad.',
    estado: 'Aprobada en App Store',
    stack: ['iOS', 'App Store'],
    seed: 951,
  },
]

export const AITHORITY = {
  eyebrow: 'Actualmente construyendo',
  nombre: 'Aithority',
  texto:
    'Cofundador técnico de Aithority, una startup de cumplimiento del AI Act europeo. No es solo otro producto: es la otra mitad del perfil — construir con IA no basta si no entiendes también sus implicaciones regulatorias y de gobernanza, y eso es exactamente lo que Aithority obliga a entender a fondo.',
}

export const CONTACTO = {
  eyebrow: '¿Construimos algo?',
  titulo: 'Hablemos',
  cta: 'Escríbeme',
}
