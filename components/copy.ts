/**
 * Copy — single source of truth, English. The three case studies carry real
 * technical content (not filler): what Arnau gave in the brief. What's genuinely
 * missing (screenshots, links, exact metrics) is asked for at the end of the
 * build, not invented here.
 */

export const PROFILE = {
  name: 'Arnau Lopez',
  role: 'AI Engineer · Compliance-First',
  eyebrow: '[ 22 · self-taught ]',
  hero: 'I build AI systems end to end — agents, voice, ML, dashboards — and ship them with the governance the EU AI Act is asking for: inventory, risk classification, documentation and evidence.',
  sub: "Most AI roles don't ask for a degree. They ask for a real portfolio. The EU AI Act is why mine is built the way it is.",
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
    slug: 'blockflow',
    index: '01',
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
    index: '02',
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
  {
    slug: 'rostry',
    index: '03',
    name: 'Rostry',
    tagline: 'Amateur sports leagues, with real payments between players',
    status: { text: 'App Store approved · build 7', tone: 'accent' },
    problem:
      'Running an amateur league (padel, 7-a-side, whatever) by hand is a WhatsApp group, a spreadsheet and someone collecting cash. Rostry turns it into a real app, with payments built in and without the organizer being the one who holds the money.',
    approach: [
      'Flutter + Riverpod for the app, with a repository pattern (RostryRepository) defining a single abstract interface — one real implementation today, but the data layer never couples directly to the widget tree.',
      'Firebase as the backend (data, auth).',
      'Stripe Connect with destination charges: money goes straight to the league organizer\'s account, with a 5% platform fee withheld automatically on each charge — no manual money movement, no separate invoicing for the organizer.',
    ],
    decisions: [
      {
        title: 'Destination charges, not own-collect + manual split',
        detail:
          'With destination charges, Stripe moves the money straight to the organizer and withholds Rostry\'s fee in the same charge — it avoids the platform holding third-party money as its own, with all the regulatory weight that implies.',
      },
      {
        title: 'Repository interface from day one',
        detail:
          'Even with only one real RostryRepository implementation today, the abstract interface was there from the start — cheap to define, and it keeps the app logic from coupling to Firebase if the backend ever changes.',
      },
      {
        title: 'The review process as part of the work',
        detail:
          'Build 7 approved: six iterations before parts got rejected or change-requested (in-app payment guidelines, metadata, account flows) — the app in production is also the app that survived Apple\'s real review.',
      },
    ],
    result: 'Approved on the App Store at build 7, with real payments between players already working.',
    stack: ['Flutter', 'Riverpod', 'Firebase', 'Stripe Connect', 'App Store'],
    seed: 507,
  },
]

/**
 * Aithority sits apart from the archive: it's the cofounder project, with its
 * own section (dashboard + info tree) and doesn't share weight with the closed
 * work.
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
      'A full booking SaaS for padel clubs: a real-time court timeline that spots peak and off-peak hours, league management, and public booking with no login. Each club connects its own bank through Stripe Connect, so reservations are charged straight to the club — Volea never touches the money. Built end to end and deployed; it’s where SMASH’s club bookings point.',
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
      'A TikTok-style feed built for one sport: padel highlights, squads to organize matches, and real clubs where you can book a court (through Volea). Live on the App Store — shipped end to end through Apple’s review, with UGC moderation (block, report, EULA), in-app purchases and DAC7 compliance all handled solo.',
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
  { group: 'Languages', items: ['TypeScript', 'Python', 'Dart', 'JavaScript', 'SQL'] },
  { group: 'Frameworks', items: ['Next.js', 'React', 'Flutter', 'Node / Express', 'Riverpod'] },
  { group: 'AI', items: ['Claude API', 'LLM orchestration', 'RAG', 'Voice AI', 'Eval design', 'LLM-as-judge'] },
  { group: 'Governance', items: ['EU AI Act', 'Risk classification · Annex III', 'Auditability', 'Evidence logs', 'Deterministic rules over LLM'] },
  { group: 'ML', items: ['scikit-learn', 'RandomForest', 'Evaluation', 'Feature engineering', 'Reproducible reports'] },
  { group: 'Data & infra', items: ['Firebase', 'SQLite', 'Vercel', 'Render', 'Make.com'] },
  { group: 'Integrations', items: ['Stripe Connect', 'Meta Ads API', 'Microsoft Graph', 'OAuth', 'OpenAI / Anthropic Admin APIs'] },
  { group: 'Craft', items: ['Product design', 'Dashboards', 'App Store shipping', 'AI governance'] },
]

export const CONTACT = {
  eyebrow: 'Building something?',
  title: "Let's talk",
  cta: 'Email me',
}
