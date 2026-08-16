/**
 * Copy — single source of truth, English. The case studies carry real
 * technical content (not filler): what Arnau gave in the brief. What's genuinely
 * missing (screenshots, links, exact metrics) is asked for at the end of the
 * build, not invented here.
 *
 * Positioning since 16 aug 2026 — design-first, for the UK / Ireland /
 * Netherlands job market: the differentiator is a developer who also owns the
 * visual system, so no design handoff or dedicated UI designer is needed to
 * ship a polished product. AI + compliance stay as the second signal, not the
 * title. TRACE and Dross are the two interview talking points and lead the
 * archive.
 */

export const PROFILE = {
  name: 'Arnau Lopez',
  role: 'Full-Stack AI Engineer · Design-first',
  eyebrow: '[ 22 · self-taught ]',
  hero: "I design, build and ship software end to end — the interface, the backend, the App Store submission. The visual system is my job too, not a handoff: most teams have to stitch design and engineering together; here it's one person, and it ships.",
  sub: "Engineering roles don't ask for a degree — they ask for a real, shipped portfolio, and the rare developer who can also design it. Five products shipped solo, four in front of users or in review.",
}

// The same "long" hero tree as StackD and Aithority (their DotTree uses SEED
// 315): it ties Arnau's three surfaces into one identity.
export const HERO_PLANT_SEED = 315

export type CaseStudy = {
  slug: string
  index: string
  name: string
  tagline: string
  status: { text: string; tone: 'ok' | 'accent' }
  problem: string
  approach: string[]
  decisions: { title: string; detail: string }[]
  result: string
  stack: string[]
  seed: number
}

export const CASES: CaseStudy[] = [
  {
    slug: 'trace',
    index: '01',
    name: 'TRACE',
    tagline: 'Privacy iOS app — find your exposed data, then get it removed',
    status: { text: 'Submitted for App Store review', tone: 'accent' },
    problem:
      'Personal data is already scattered across old breaches and dozens of US data-broker sites — most people never find out until it\'s used against them. Every "data removal" app on the market either scrapes to confirm a listing first (expensive, fragile) or fakes the confirmation step to look automated. TRACE does neither — and unlike an Incogni-style to-do list, it\'s designed to be shared, not buried in a dashboard.',
    approach: [
      'React Native/Expo app + Node/Express backend (Render): checks a user\'s email against real breach records and computes an Exposure Score from actual breach severity, not a black-box number.',
      'Proactive removal, not detected removal: instead of paying for a per-user broker-search API to confirm a listing before acting, TRACE requests removal from all 24 targeted US brokers directly — GDPR Art. 17 and CCPA don\'t require proof of listing first, so that cost doesn\'t need to exist.',
      'For the 2 brokers with a verified privacy-contact email (Spokeo, ZoomInfo — checked against their live policy pages, not a stale registry), the backend sends the removal request for real via Resend. The other 22 open the broker\'s own opt-out page with the request pre-drafted — no fake automation for what genuinely can\'t be automated yet.',
      'Designed around the share card: the report is a vertical, story-sized card (score + breach/broker counts) built for one tap to share. The growth engine is a screenshot people want to post, not a generic dashboard.',
    ],
    decisions: [
      {
        title: 'Two-step status, not optimistic UI',
        detail:
          'Tapping "Request deletion" on a form-only broker used to mark it "Submitted" immediately — before the user had actually filled anything in. Fixed to a real two-step flow: opening the page doesn\'t change status, only the user\'s own "I submitted this" confirmation does. Every status shown is something that actually happened.',
      },
      {
        title: 'Rate-limited by default, not after an incident',
        detail:
          'A security pass on the backend found every endpoint was unauthenticated by design (no login wall on scanning) and unlimited — usable as a free breach-lookup proxy, a push-notification spam relay, or a way to flood real brokers with junk email through the verified sending domain. Added per-route rate limits before shipping, tightest on the one route that sends a real email to a real company.',
      },
      {
        title: 'Delete account means delete, not mostly delete',
        detail:
          'Found — before shipping — that "Delete account" only removed the Firebase Auth login, leaving the Firestore record (name, email, breach data, broker history) orphaned. For an app built on GDPR/CCPA right-to-erasure messaging, that gap would have been the app failing its own premise. Fixed to delete the record first, in the order the security rules actually require.',
      },
      {
        title: 'The product is the share card, not the dashboard',
        detail:
          'Most data-removal products read like Incogni: a to-do list of brokers. TRACE\'s report is a forensically-styled share card people actually want to post, and removal is the paid second act behind it. The one-liner competitors can\'t copy without lying: "the breach you can screenshot."',
      },
    ],
    result:
      'Submitted for App Store review (build 21) with a working RevenueCat subscription, verified end-to-end email delivery to real brokers, and an activity log where every status is real — not simulated. v2 direction: share-card-first home, deletion as the paid second act.',
    stack: ['React Native', 'Expo', 'Node/Express', 'Firebase', 'RevenueCat', 'Resend'],
    seed: 641,
  },
  {
    slug: 'dross',
    index: '02',
    name: 'Dross',
    tagline: 'macOS app + CLI — detects when your app and your backend stop agreeing',
    status: { text: 'Notarized · v0.1 DMG', tone: 'accent' },
    problem:
      'The bugs that actually bite AI-written code aren\'t syntax errors — they\'re meaning errors: a live endpoint nobody calls anymore, demo data stamped into production, a client calling an API that suddenly demands a token it never sends. Static analysis can\'t catch these; they only surface when you read both sides of a system at once.',
    approach: [
      'Built as a native macOS app (SwiftUI) with the engine as an embedded TypeScript CLI. Deterministic checks run first — dead exports, env drift, TODO density, hardcoded demo data — free, fully offline, instant.',
      'Contract drift is the hook: scan a full-stack repo and it flags where the client\'s calls no longer match the routes the server actually serves. Parsed with the TypeScript compiler API, so string literals that only look like routes don\'t count.',
      'Shipped with its own eval harness instead of trusting demos: a golden corpus of fixtures whose precision AND recall must both hold at 100%, CI fails the build otherwise — every false positive found is locked in as a regression fixture.',
      'Monetized like the product it\'s for: Ed25519-signed license keys verified fully offline. The free tier never touches the network; the Pro LLM drift pass runs with your own Anthropic key, never proxying or reselling tokens.',
    ],
    decisions: [
      {
        title: 'Contract drift is the one-liner, not "another linter"',
        detail:
          'Three real production bugs in the creator\'s own repos all had the same shape: two sides of one system that stopped agreeing. That specific failure is what CodeRabbit, Augment, Factory and Code Metal don\'t check — they review single repos at PR time.',
      },
      {
        title: 'For the solo builder, not a PR-time team service',
        detail:
          'The funded competitors are cloud, team, PR-time products. Dross targets the developer deploying straight to main with heavy AI assistance — no PR process to hook into. A native app for the human, a CI-ready CLI for the pipeline.',
      },
      {
        title: 'AST over regex, eval over vibes',
        detail:
          'Moving contract-drift parsing to the TypeScript compiler API killed a whole false-positive class (precision 83% → 100% on the worst fixture), and the golden-corpus eval made the improvement permanent instead of a vibes-based demo.',
      },
      {
        title: 'Dogfooding was the pitch',
        detail:
          'Dross found real contract drift inside TRACE and Aithority during development — a backend demanding a Firebase token the client wasn\'t sending yet. The story it tells is literally something it caught on the creator\'s own shipped code.',
      },
    ],
    result:
      'v1 shipped as a notarized macOS DMG with an offline license system and a CI-ready CLI — validated against the exact kind of AI-written full-stack repos where this class of bug actually happens.',
    stack: ['SwiftUI', 'macOS', 'TypeScript', 'TS compiler API', 'Ed25519', 'Claude API', 'Eval harness'],
    seed: 222,
  },
  {
    slug: 'blockflow',
    index: '03',
    name: 'BlockFlow',
    tagline: 'AI voice agent for property managers',
    status: { text: 'In production', tone: 'ok' },
    problem:
      'A property manager fields calls all day about the same incidents — a leak, a stuck lift, a noise complaint — and each one interrupts whatever they were doing. Answering well costs time they don\'t have; not answering costs clients.',
    approach: [
      'A voice agent that picks up, understands the incident through natural conversation (not a "press 1" tree), and decides what to do with it.',
      'Automatic triage: it classifies urgency and incident type from what was said on the call, with no human in the happy path.',
      'It files the ticket already structured (property, type, urgency, summary) into the management system — ready for the manager to just decide, not transcribe.',
    ],
    decisions: [
      {
        title: 'Conversation, not a phone tree',
        detail:
          'The challenge wasn\'t "make it talk", it was making the call resolve just as well whether the caller describes the problem in any order, at any level of detail — structured field extraction has to survive a real conversation, not a script.',
      },
      {
        title: 'No human intervention as the goal, not an option',
        detail:
          'The system is built so the happy path (clear, non-urgent incident) never touches anyone on the team — a human steps in only on the exception, not on every call.',
      },
    ],
    result: 'In production, handling real property-manager calls with no human intervention on the happy path.',
    stack: ['Voice AI', 'LLM', 'Ticket automation', 'Production'],
    seed: 100,
  },
  {
    slug: 'louvr-labs',
    index: '04',
    name: 'Louvr Labs',
    tagline: 'Ranking & reporting platform for Meta Ads',
    status: { text: 'In production', tone: 'ok' },
    problem:
      'A Meta Ads manager reviews dozens of ads a week and decides by hand which to scale, pause, hold or refresh — a judgment that repeats, is measurable, and eats time that should go to strategy, not staring at tables.',
    approach: [
      'OAuth connection to the Meta Ads API: the client authorizes read-only access to their ad accounts, without sharing credentials.',
      'Layer 1 — rules & heuristics: each ad is ranked against concrete thresholds (CPA, frequency, CTR, spend) and given a badge — Scale, Pause, Hold or Refresh. Deterministic and explainable: the reason for each badge can be pointed to.',
      'Layer 2 — Claude (Sonnet) via API reasons OVER the already-ranked data, not in its place: it writes the natural-language insight that explains the pattern behind the numbers, with the ranking already done by rules.',
      'Make.com fires the pipeline and delivers a weekly report by email — zero manual work between "the week closes" and "the client has it in their inbox".',
    ],
    decisions: [
      {
        title: 'Two-layer architecture, on purpose',
        detail:
          'The business ranking (which ad gets scaled) comes from rules and thresholds, not an LLM — it\'s the part that has to be deterministic, auditable and cheap to run on every ad. The LLM is reserved for what it does better than a rule: explaining the pattern in words, not deciding the class.',
      },
      {
        title: 'Python backend, Make.com orchestration',
        detail:
          'The business logic (Meta API calls, ranking, insight generation) lives in Python; Make.com orchestrates the weekly trigger and delivery — separating "what it computes" from "when it fires" meant changing the reporting cadence never touched a line of logic.',
      },
    ],
    result: 'Automatic weekly report by email, zero manual work, in production with real clients.',
    stack: ['OAuth', 'Meta Ads API', 'Python', 'Claude (Sonnet) API', 'Make.com'],
    seed: 322,
  },
]

/**
 * Aithority sits apart from the archive: it's the cofounder project, with its
 * own section (dashboard + info tree) and doesn't share weight with the closed
 * work. It's also the credibility anchor behind the governance signal — the
 * reason compliance talk isn't empty.
 */
export const AITHORITY_CASE: CaseStudy = {
  slug: 'aithority',
  index: '—',
  name: 'Aithority',
  tagline: 'EU AI Act compliance — as technical cofounder',
  status: { text: 'Cofounder · building', tone: 'accent' },
  problem:
    'A company using AI in HR, credit or biometrics has to comply with the AI Act: inventory every system, classify its risk and document it. Today they do it by hand, in spreadsheets, without knowing what applies or what\'s missing.',
  approach: [
    'A real classification engine: feed in a system\'s description and out comes its risk under Annex III and the concrete obligations that apply, with the reasoning — not a black box.',
    'Automatic inventory discovery: connect Microsoft 365 over OAuth (admin consent, read-only) and detect the AI tools the organization has already authorized.',
    'Art. 11 documentation and a dated evidence log, so the audit file composes itself and never describes a stale state.',
  ],
  decisions: [
    {
      title: "Detecting isn't classifying",
      detail:
        'Discovery fills the inventory, but doesn\'t decide the risk: "Notion AI" showing up doesn\'t say whether it\'s high-risk — that depends on use. Selling "fully automatic classification" would be the overpromise you get caught on in two questions.',
    },
    {
      title: 'No third-party tokens stored',
      detail:
        'The Microsoft Graph flow requests an app-only token on each sync instead of persisting it — less surface to protect, and consent is read-only over the directory.',
    },
    {
      title: "Suggests, doesn't decide",
      detail:
        'The classification engine and remediation roadmaps are suggestions from a rules engine plus an LLM — the customer validates them with their own legal counsel. Aithority tracks evidence of what was declared, when and by whom; it does not certify compliance.',
    },
  ],
  result:
    'Own backend (classification engine + API) and dashboard in production, with the evidence system shipping. The startup has its first paying client and a place in Lanzadera.',
  stack: ['Next.js', 'Node / Express', 'Microsoft Graph', 'OAuth', 'AI Act · Annex III'],
  seed: 655,
}

export type LightProject = {
  name: string
  tagline: string
  status: string
  blurb: string
  fields: { label: string; value: string }[]
  stack: string[]
  seed: number
  link?: string
}

export const LIGHT: LightProject[] = [
  {
    name: 'F1 Strategy Agent',
    tagline: 'ML + agentic — race strategy prediction',
    status: 'Open source · public repo',
    blurb:
      'A machine-learning project on F1 race strategy: predicting lap times and simulating pit-stop strategies, with a self-contained HTML report (no server) and an animated SVG track. The lesson is the honest evaluation: a simple model fails to generalize across circuits (MAE 3.49s) until the objective changes from absolute lap time to the delta over each circuit\'s base pace — which drops error to 0.73s. Published open source because the community asked for the code.',
    fields: [
      { label: 'Role', value: 'Solo — ML, evaluation, content' },
      { label: 'Type', value: 'ML · prediction + simulation' },
      { label: 'Lesson', value: 'The right objective beats more features' },
      { label: 'Distribution', value: 'Vertical video → comments asked for the code' },
    ],
    stack: ['Python', 'scikit-learn', 'RandomForest', 'Evaluation', 'Open source'],
    seed: 261,
    link: 'https://github.com/lopezsellesarnau-cmd/F1-Strategy-Agent',
  },
  {
    name: 'ai-act-eval',
    tagline: 'Open, honestly-evaluated EU AI Act risk classifier',
    status: 'Open source · public repo',
    blurb:
      'A two-layer risk classifier for the EU AI Act — deterministic rules over Art. 5, Annex III and the Art. 6(3) carve-outs, corrected by an LLM-as-judge that degrades cleanly with no API key. The point isn\'t the classifier, it\'s the evaluation: 43 labelled cases, each citing the article that justifies its label, scored per "trap" so the weak spots are visible instead of averaged away. Rules alone score 86% overall but 0% on emotion-context — the judge closes that gap and pushes combined accuracy to 100%.',
    fields: [
      { label: 'Role', value: 'Solo — engine, eval harness, report' },
      { label: 'Type', value: 'Compliance · rules + LLM-as-judge' },
      { label: 'Result', value: '86% rules → 100% combined tier-acc' },
    ],
    stack: ['TypeScript', 'LLM-as-judge', 'Eval harness', 'Open source'],
    seed: 419,
    link: 'https://github.com/lopezsellesarnau-cmd/ai-act-eval',
  },
  {
    name: 'Volea',
    tagline: 'Booking SaaS for padel clubs — courts, leagues, payments.',
    status: 'Live — deployed',
    blurb:
      'A full booking SaaS for padel clubs: a real-time court timeline that spots peak and off-peak hours, league management, and public booking with no login. Each club connects its own bank through Stripe Connect, so reservations are charged straight to the club — Volea never touches the money. Built end to end and deployed; it\'s where SMASH\'s club bookings point.',
    fields: [
      { label: 'Role', value: 'Solo — product, backend, deploy' },
      { label: 'Type', value: 'B2B SaaS · booking + leagues' },
      { label: 'Payments', value: 'Stripe Connect · direct-to-club' },
    ],
    stack: ['Next.js', 'Supabase', 'Stripe Connect', 'TypeScript', 'Vercel'],
    seed: 803,
  },
  {
    name: 'SMASH',
    tagline: 'Social padel app — short-form video, squads, clubs.',
    status: 'Live on the App Store',
    blurb:
      'A TikTok-style feed built for one sport: padel highlights, squads to organize matches, and real clubs where you can book a court (through Volea). Live on the App Store — shipped end to end through Apple\'s review, with UGC moderation (block, report, EULA), in-app purchases and DAC7 compliance all handled solo.',
    fields: [
      { label: 'Role', value: 'Solo — product, design, build, submission' },
      { label: 'Platform', value: 'iOS · Flutter + Firebase' },
      { label: 'Cleared solo', value: 'UGC moderation · IAP · DAC7' },
    ],
    stack: ['Flutter', 'Firebase', 'iOS'],
    seed: 951,
  },
]

export const TOOLKIT: { group: string; items: string[] }[] = [
  { group: 'Design', items: ['Design systems', 'Visual identity', 'Typography', 'UI / Interaction', 'Figma → code', 'Motion', 'Procedural graphics'] },
  { group: 'Languages', items: ['TypeScript', 'Python', 'Dart', 'JavaScript', 'SQL'] },
  { group: 'Frameworks', items: ['Next.js', 'React', 'React Native', 'Flutter', 'Node / Express', 'SwiftUI'] },
  { group: 'AI', items: ['Claude API', 'Prompt Engineering', 'LLM orchestration', 'RAG', 'AI Agents', 'Voice AI', 'Eval design', 'LLM-as-judge'] },
  { group: 'Governance', items: ['EU AI Act', 'Risk classification · Annex III', 'Auditability', 'Evidence logs', 'Deterministic rules over LLM'] },
  { group: 'ML', items: ['scikit-learn', 'RandomForest', 'Evaluation', 'Feature engineering', 'Reproducible reports'] },
  { group: 'Data & infra', items: ['Firebase', 'SQLite', 'Vercel', 'Render', 'Make.com'] },
  { group: 'Integrations', items: ['Stripe Connect', 'Meta Ads API', 'Microsoft Graph', 'OAuth', 'OpenAI / Anthropic Admin APIs'] },
  { group: 'Craft', items: ['Product design', 'App Store shipping', 'End-to-end ownership', 'Short-form content & distribution', 'Design · build · ship'] },
]

export type Credential = { name: string; issuer: string; date: string; link?: string }

export const CREDENTIALS: Credential[] = [
  {
    name: 'Introduction to Generative AI',
    issuer: 'Google Cloud',
    date: 'Aug 2026',
    link: 'https://www.skills.google/paths/118',
  },
  {
    name: 'Introduction to Large Language Models',
    issuer: 'Google Cloud',
    date: 'Aug 2026',
    link: 'https://www.skills.google/paths/118',
  },
  {
    name: 'Introduction to Responsible AI',
    issuer: 'Google Cloud',
    date: 'Aug 2026',
    link: 'https://www.skills.google/paths/118',
  },
]

export const CONTACT = {
  eyebrow: 'Building something?',
  title: "Let's talk",
  cta: 'Email me',
}