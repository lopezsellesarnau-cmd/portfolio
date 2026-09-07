/**
 * Copy — single source of truth, English. The case studies carry real
 * technical content (not filler): what Arnau gave in the brief. What's genuinely
 * missing (screenshots, links, exact metrics) is asked for at the end of the
 * build, not invented here.
 *
 * Positioning since 22 aug 2026 — product engineer / full-stack software.
 * Recruiter titles: Software Engineer, Product Engineer, Full-stack Developer.
 * AI and design stay in the work (Kiblo, Aithority, visual system) but are not
 * the job title. Lead: Kiblo, Dross, TRACE, Aithority (cofounder), then
 * BlockFlow. NL / DE first; UK if they sponsor.
 */

export const PROFILE = {
  name: 'Arnau Lopez',
  role: 'Product Engineer · Full-stack',
  eyebrow: '[ 22 · Alcoy · NL / DE · UK if sponsored ]',
  hero: 'Founder of Kiblo — pet-food iOS, in App Store review for the US and Canada. Technical cofounder of Aithority (EU AI Act); the company is in Lanzadera, Spain. F1 Strategy Agent open-sourced after viewers asked for the code. Dross notarized Mac. BlockFlow’s voice agent is in production, not sold like Kiblo.',
  sub: 'TypeScript · React Native · Next.js · Node · SwiftUI. I use AI in loops: conditions first, then rebuild what failed — not one long prompt. ~2 years in Paderborn at Deutsche Post / DHL; interested in product engineering roles in Germany (DE).',
}

// The same "long" hero tree as StackD and Aithority (their DotTree uses SEED
// 315): it ties Arnau's three surfaces into one identity.
export const HERO_PLANT_SEED = 315

export type CaseStudy = {
  slug: string
  index: string
  name: string
  role: string
  tagline: string
  status: { text: string; tone: 'ok' | 'accent' }
  /** Three lines, plain: what the product is. Shown above "problems solved". */
  blurb: string
  what: string
  built: string
  decisions: { title: string; detail: string }[]
  stack: string[]
  seed: number
  link?: string
  linkLabel?: string
}

export const CASES: CaseStudy[] = [
  {
    slug: 'kiblo',
    index: '01',
    name: 'Kiblo',
    role: 'Founder',
    tagline: 'Pet-food iOS — full consumer loop, App Store review',
    status: { text: 'Founder · in review US & Canada', tone: 'accent' },
    blurb:
      'A weekly habit app for dog owners: scan the food bag already in the cupboard, portion the meal from the dog’s weight, and reorder before it runs out.',
    what:
      'A weekly habit product: scan the bag already in the cupboard, portion from the dog, reorder before it runs out. In App Store review for the US and Canada. Not live, no revenue. I am getting the first users through social media and building in public — not waiting for the listing to do the distribution.',
    built:
      'Solo. Expo 57, React Native, Firebase, RevenueCat. I lock product and constraints; AI implements in loops (conditions, then fix what failed); I reject and ship.',
    decisions: [
      {
        title: 'Feeding tips are a rule engine, not an LLM call',
        detail:
          'The first plan was an LLM for every tip. A wrong answer about a dog’s health is worse than a missing one, and it has a per-call cost. I built a deterministic engine instead.',
      },
      {
        title: 'Home stays a bowl — details live on the bowl',
        detail:
          'Home was getting noisy. I redesigned so the homepage stays clean. Feeding tips, details and extras sit on the bowl’s detail screen, not on home.',
      },
      {
        title: 'Plans use real US recipes, not generated meals',
        detail:
          'Creating a plan means choosing meals that already exist in a US dog-food catalogue. Not an LLM suggestion of a recipe.',
      },
      {
        title: 'Grams per day from the RER formula vets use',
        detail:
          'Daily amount comes from Resting Energy Requirement: age, weight, activity, meals per day. Not a model guess.',
      },
      {
        title: 'RevenueCat “valid credentials” was a bundle ID',
        detail:
          'The In-App Purchase key in App Store Connect was created and valid. RevenueCat said the credentials were valid and still could not connect. The App Bundle ID was not exactly the one on the app.',
      },
    ],
    stack: ['Cursor', 'Claude', 'React Native', 'Expo SDK 57', 'TypeScript', 'Firebase', 'RevenueCat'],
    seed: 418,
    link: 'https://kiblo-web.vercel.app',
    linkLabel: 'Open site',
  },
  {
    slug: 'aithority',
    index: '02',
    name: 'Aithority',
    role: 'Technical cofounder',
    tagline: 'EU AI Act compliance · Lanzadera (the company)',
    status: { text: 'Cofounder · Lanzadera · first client', tone: 'ok' },
    blurb:
      'EU AI Act compliance for companies using AI in hiring, credit or biometrics. It inventories every system, classifies its risk, and produces dated evidence a client will accept.',
    what:
      'EU AI Act compliance for companies using AI in HR, credit or biometrics: inventory, Annex III risk, dated evidence. The company is accepted into Lanzadera in Spain — not a personal solo admission. First paying client. I own backend, frontend, integrations, classification, and UI. Sales and legal stay with the commercial cofounder.',
    built:
      'I own product, UI, classification, and backend. Sales and legal stay with the commercial cofounder — I do not claim the commercial motion. Next.js, Node, Microsoft 365 / Google Workspace / provider admin APIs, Claude Haiku for a suggested class, Turso after Render’s disk kept wiping state.',
    decisions: [
      {
        title: 'Time-to-value was over seven minutes',
        detail:
          'Creating an AI system was a long, complex flow. I cut it to a three-step onboarding: connect Microsoft 365, Google Workspace, or an Anthropic / OpenAI admin API key; auto-create the system; suggest a classification (Claude Haiku); a human confirms; then the dashboard.',
      },
      {
        title: 'The engine suggests. A human confirms.',
        detail:
          'Haiku proposes the class via API. The customer confirms. Selling fully automatic compliance would fail the first serious legal question.',
      },
      {
        title: 'UI is a large popup, editorial-minimal',
        detail:
          'Intentional: one focused surface at a time, not a dense admin grid. Time-to-value and trust over chrome.',
      },
      {
        title: 'A PDF the customer can send',
        detail:
          'Classification alone does not close a deal. The product exports a PDF the company can send to their client as evidence they are working the Act.',
      },
      {
        title: 'Departments vanished on every reload',
        detail:
          'Render’s filesystem is wiped on cold start and redeploy. Data lived there, so created departments disappeared. I did not buy a higher Render tier — I moved the database to Turso.',
      },
    ],
    stack: ['Next.js', 'Node / Express', 'Turso', 'Microsoft Graph', 'Claude Haiku', 'AI Act · Annex III'],
    seed: 655,
    link: 'https://landing-claude-chi.vercel.app/#motor',
    linkLabel: 'Open landing',
  },
  {
    slug: 'f1-strategy-agent',
    index: '03',
    name: 'F1 Strategy Agent',
    role: 'Founder',
    tagline: 'ML race strategy — open-sourced after viewers asked for the code',
    status: { text: 'Open source · public repo', tone: 'ok' },
    blurb:
      'A race-strategy model trained on real F1 telemetry: it predicts lap time from tyre compound and wear, evaluated on a Grand Prix it never saw, then simulates pit strategy on a real-traced circuit.',
    what:
      'A RandomForest model trained on real FastF1 lap data (Jeddah + Bahrain), evaluated on Suzuka — a race the model never trained on. Renders a self-contained HTML report with an animated pit-strategy simulation on a real-traced Suzuka circuit, not a generic track shape. Built while filming the build in public; went open source because people watching asked for the repo.',
    built:
      'Python, FastF1 API, pandas, scikit-learn. Later extended into a companion data-engineering pipeline: real ingestion, SQLite staging and marts, automated data-quality checks, CI — turning the same real race data into a proper pipeline story, not just a model.',
    decisions: [
      {
        title: 'A naive model failed across circuits — MAE 3.49s',
        detail:
          'Raw lap time confuses "different circuit" with "tyre wear": Bahrain and Miami have very different base pace regardless of tyres. Predicting the delta over each circuit’s own baseline instead dropped the error to 0.73s.',
      },
      {
        title: 'Train on two races, test on one the model never saw',
        detail:
          'Trained on Jeddah and Bahrain, evaluated on Suzuka — a genuine generalization check, not the same race scored twice.',
      },
      {
        title: 'The track is real geometry, not a rounded blob',
        detail:
          'Suzuka’s centerline is sampled from a public track map via the SVG’s own getPointAtLength()/getScreenCTM(), including the real figure-8 crossover — not hand-drawn.',
      },
      {
        title: 'From a model to a pipeline',
        detail:
          'The same FastF1 data now also feeds a separate, tested SQL pipeline (staging → marts, 5 data-quality checks, CI) — one real dataset, two real projects.',
      },
    ],
    stack: ['Python', 'FastF1 API', 'scikit-learn', 'RandomForest', 'pandas', 'SQL / SQLite'],
    seed: 261,
    link: 'https://github.com/lopezsellesarnau-cmd/F1-Strategy-Agent',
    linkLabel: 'Open repository',
  },
  {
    slug: 'dross',
    index: '04',
    name: 'Dross',
    role: 'Founder',
    tagline: 'Mac app + CLI — notarized DMG',
    status: { text: 'Founder · notarized DMG', tone: 'ok' },
    blurb:
      'A Mac app and CLI that catches the moment your frontend and backend stop agreeing on their contract — built for a solo team shipping with AI, not another PR-time cloud linter.',
    what:
      'Finds when your client and your backend stop agreeing. Notarized Mac app plus CI CLI. Built for a solo/full-stack team deploying with AI assistance — not another PR-time cloud linter.',
    built:
      'SwiftUI + TypeScript CLI. Compiler API, not regex. Golden corpus: 100% precision and recall or CI fails. Ed25519 licences, verified offline. Caught real drift in TRACE and Aithority.',
    decisions: [
      {
        title: 'Contract drift is the one-liner',
        detail:
          'The failure is two sides of one system that stopped agreeing. That is what PR-time single-repo tools do not check.',
      },
      {
        title: 'AST over regex, eval over a demo',
        detail:
          'Compiler API killed a false-positive class. The corpus makes the improvement permanent instead of a vibes demo.',
      },
    ],
    stack: ['SwiftUI', 'macOS', 'TypeScript', 'TS compiler API', 'Ed25519'],
    seed: 222,
    link: 'https://github.com/lopezsellesarnau-cmd/dross',
    linkLabel: 'Open repository',
  },
  {
    slug: 'blockflow',
    index: '05',
    name: 'BlockFlow',
    role: 'Founder',
    tagline: 'UK proptech voice agent — in production',
    status: { text: 'In production · not selling', tone: 'ok' },
    blurb:
      'An out-of-hours voice agent for UK property managers: it holds a real conversation, triages the issue, and files a structured ticket. Only the edge case ever reaches a person.',
    what:
      'UK property ops. Out-of-hours voice agent: conversation, triage, structured ticket. In production. No paying customers. Unlike Kiblo, this is not a product I am distributing right now — the work is the live system.',
    built:
      'Happy path never touches a human. Not a press-1 tree. Next.js, voice AI, LLM, ticket automation.',
    decisions: [
      {
        title: 'Conversation, not a phone tree',
        detail:
          'The call has to resolve if the caller describes the leak in any order. Extraction has to survive a real conversation.',
      },
      {
        title: 'Human only on the exception',
        detail:
          'Clear, non-urgent incidents never hit the team. A person steps in on the edge case, not on every call.',
      },
    ],
    stack: ['Voice AI', 'LLM', 'Ticket automation', 'Next.js'],
    seed: 100,
    link: 'https://github.com/lopezsellesarnau-cmd/blockflow',
    linkLabel: 'Open repository',
  },
]

export type LightProject = {
  name: string
  tagline: string
  status: string
  what: string
  built: string
  stack: string[]
  seed: number
  link?: string
}

export const LIGHT: LightProject[] = [
  {
    name: 'Louvr Labs',
    tagline: 'Ranking & reporting platform for Meta Ads',
    status: 'In production',
    what: 'Weekly Meta Ads report by email. Rules rank ads (Scale / Pause / Hold / Refresh); Claude writes the insight on top of that ranking. In production with real clients.',
    built: 'Solo. OAuth, Meta Ads API, Python, Make.com. Rules first — the model does not replace the rank.',
    stack: ['OAuth', 'Meta Ads API', 'Python', 'Claude (Sonnet) API', 'Make.com'],
    seed: 322,
  },
  {
    name: 'ai-act-eval',
    tagline: 'Open, honestly-evaluated EU AI Act risk classifier',
    status: 'Open source · public repo',
    what: 'Two-layer EU AI Act risk classifier: deterministic rules, then an LLM-as-judge that degrades with no API key.',
    built: '43 labelled cases citing the article. Rules 86% overall, 0% on emotion-context; combined tier-acc 100%. TypeScript eval harness.',
    stack: ['TypeScript', 'LLM-as-judge', 'Eval harness', 'Open source'],
    seed: 419,
    link: 'https://github.com/lopezsellesarnau-cmd/ai-act-eval',
  },
  {
    name: 'Volea',
    tagline: 'Booking SaaS for padel clubs — courts, leagues, payments.',
    status: 'Live — deployed',
    what: 'Padel-club booking: court timeline, leagues, public booking. Stripe Connect so money goes to the club, not through Volea.',
    built: 'Solo. Next.js, Supabase, Stripe Connect, Vercel. SMASH books courts through this.',
    stack: ['Next.js', 'Supabase', 'Stripe Connect', 'TypeScript', 'Vercel'],
    seed: 803,
  },
  {
    name: 'SMASH',
    tagline: 'Social padel app — short-form video, squads, clubs.',
    status: 'Live on the App Store',
    what: 'TikTok-style padel feed, squads, club booking via Volea. Live on the App Store.',
    built: 'Flutter + Firebase. UGC moderation, IAP and DAC7 handled solo through Apple review.',
    stack: ['Flutter', 'Firebase', 'iOS'],
    seed: 951,
  },
]

export const TOOLKIT: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['TypeScript', 'Python', 'Dart', 'JavaScript', 'SQL'] },
  { group: 'Frameworks', items: ['Next.js', 'React', 'React Native', 'Flutter', 'Node / Express', 'SwiftUI'] },
  { group: 'Data & infra', items: ['Firebase', 'SQLite', 'Vercel', 'Render', 'Make.com'] },
  { group: 'Integrations', items: ['Stripe Connect', 'Meta Ads API', 'Microsoft Graph', 'OAuth', 'OpenAI / Anthropic Admin APIs'] },
  { group: 'Craft', items: ['Product design', 'App Store shipping', 'End-to-end ownership', 'Short-form content & distribution', 'Design · build · ship'] },
  { group: 'Design', items: ['Design systems', 'Visual identity', 'Typography', 'UI / Interaction', 'Figma → code', 'Motion', 'Procedural graphics'] },
  { group: 'AI', items: ['Claude API', 'Prompt Engineering', 'LLM orchestration', 'RAG', 'AI Agents', 'Voice AI', 'Eval design', 'LLM-as-judge'] },
  { group: 'Governance', items: ['EU AI Act', 'Risk classification · Annex III', 'Auditability', 'Evidence logs', 'Deterministic rules over LLM'] },
  { group: 'ML', items: ['scikit-learn', 'RandomForest', 'Evaluation', 'Feature engineering', 'Reproducible reports'] },
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

export const HOW_I_WORK = {
  eyebrow: 'How I work',
  title: 'Loop engineering. Lock the conditions. Own the product.',
  lead:
    'I do not send the model one long prompt and hope the result is right. I run loops with AI: build against explicit conditions; if they fail, inspect why, then rebuild. I own the constraints and the ship. The model does not.',
  points: [
    {
      title: 'Loops, not a lucky prompt',
      detail:
        'Each loop has conditions that must hold (tests, a visual lock, a rule that must not be faked). If they are not met, the next pass is “why did this fail?” then a correct build — not a longer prompt. Claude, Cursor, or whatever the job uses: same loop.',
    },
    {
      title: 'Problems first, then the stack',
      detail:
        'Kiblo: no LLM for feeding advice; RER for grams; real US recipes in the plan; home stays a bowl. Aithority: seven-minute setup down to a three-step confirm flow; Turso when Render’s disk wiped departments. Dross: compiler API, not regex.',
    },
    {
      title: 'Team outcomes, not a founder pitch',
      detail:
        'Solo shipping is proof I can carry a surface. On Aithority the commercial cofounder owns sales and legal; I own product and engineering. The job I want is the same split on a team: design and code, same person, shipped software.',
    },
  ],
}

/** One-liners — not a second gallery. Copy taken from existing case blurbs. */
export const OTHER_WORK: { name: string; line: string; link?: string }[] = [
  {
    name: 'Louvr Labs',
    line: 'Meta Ads ranking & weekly reports — rules first, Claude on the insight. In production with real clients.',
  },
  {
    name: 'SMASH',
    line: 'Social padel app — live on the App Store. UGC moderation, IAP and DAC7 handled solo.',
  },
  {
    name: 'Volea',
    line: 'Padel-club booking SaaS (courts, leagues, Stripe Connect to the club). Built end to end and deployed.',
  },
  {
    name: 'TRACE',
    line: 'Privacy iOS — breach scan, exposure score, broker removals. Live on the App Store, US only.',
    link: 'https://github.com/lopezsellesarnau-cmd/trace-app',
  },
  {
    name: 'ai-act-eval',
    line: 'Open AI Act risk classifier with a labelled eval (43 cases). Rules 86% overall; combined tier-acc 100%.',
    link: 'https://github.com/lopezsellesarnau-cmd/ai-act-eval',
  },
]

export const CONTACT = {
  eyebrow: 'NL · Germany · UK if sponsored',
  title: "Let's talk",
  cta: 'Email me',
  note: 'Product Engineer · Full-stack. GitHub, LinkedIn, and CV below.',
}

/* ── Skills · Abilities · Milestones — one section, three registers ──────────
   Skills: the concrete stack. Abilities: what I can carry end to end.
   Milestones: dated proof, newest first. Kept honest — see the vault. */

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['TypeScript', 'Python', 'Dart', 'SQL', 'Swift'] },
  { group: 'Frameworks', items: ['Next.js', 'React', 'React Native / Expo', 'Flutter', 'Node / Express', 'SwiftUI'] },
  { group: 'Data & infra', items: ['Firebase', 'Turso / SQLite', 'Supabase', 'Vercel', 'Render', 'RevenueCat'] },
  { group: 'Integrations', items: ['Stripe Connect', 'Microsoft Graph', 'Meta Ads API', 'OAuth', 'OpenAI / Anthropic admin APIs', 'Resend'] },
  { group: 'AI', items: ['Claude API', 'LLM orchestration', 'Eval design · LLM-as-judge', 'Voice AI', 'Deterministic rules over LLM', 'RAG'] },
]

export const ABILITIES: { title: string; detail: string }[] = [
  {
    title: 'Design the product and its visual system — no handoff',
    detail: 'Interface, identity, typography and motion, then the code that ships it. I do not need a designer to put a product in front of users.',
  },
  {
    title: 'Ship to the App Store solo',
    detail: 'IAP, subscriptions, privacy manifests, DAC7, UGC moderation, and Apple review — carried end to end on TRACE, SMASH and Kiblo.',
  },
  {
    title: 'Run AI in loops against locked constraints',
    detail: 'Conditions first — tests, a visual lock, a rule that must not be faked — then rebuild what failed. I own the constraints and the ship; the model does not.',
  },
  {
    title: 'Own the backend and the integrations',
    detail: 'Classification logic, admin-API connections, auth, data models, and the move off a platform when it fights the product (Render → Turso on Aithority).',
  },
  {
    title: 'Distribute what I build',
    detail: 'Short-form video, written, recorded and published solo. The F1 repo went public because viewers asked for the code.',
  },
]

/* ── Exploded-stack diagrams — each project (and the hero) as a layered
   blueprint, top layer first. `side` places the callout label; `texture`
   is the plate's surface treatment. ─────────────────────────────────────── */

export type StackLayer = {
  label: string
  desc: string
  side: 'left' | 'right'
  texture?: 'grid' | 'dots' | 'pins' | 'plain'
  href?: string
}

/* The exploded-stack illustration builds its layers from CASES (see work.tsx). */

export type Milestone = { date: string; title: string; detail?: string }

export const MILESTONES: Milestone[] = [
  { date: 'Aug 2026', title: 'TRACE live on the App Store (US)', detail: 'Privacy app — breach scan, exposure score, broker removals. Shipped and public.' },
  { date: 'Aug 2026', title: 'Kiblo submitted — in App Store review (US & Canada)', detail: 'Concept to review build in days, Cursor + Claude in loops.' },
  { date: '2026', title: 'Dross shipped — notarized Mac app + CLI', detail: 'Contract-drift checker with a golden corpus at 100% precision and recall.' },
  { date: '2026', title: 'Aithority accepted into Lanzadera, first paying client', detail: 'EU AI Act compliance. The company is in the accelerator — technical cofounder.' },
  { date: '2024–2026', title: '~2 years at Deutsche Post / DHL, Paderborn', detail: 'Building and shipping products end to end alongside the job.' },
  { date: 'Live', title: 'SMASH on the App Store · Volea and Louvr Labs in production', detail: 'Earlier products still running with real users and clients.' },
]