/**
 * Copy — single source of truth, English. The case studies carry real
 * technical content (not filler). What's genuinely missing (users, metrics) is
 * left out, not invented.
 *
 * Positioning since 5 oct 2026 — Software Developer · Full-Stack · UX/UI.
 * Arnau's own job tracker showed "software developer" and "full-stack" have the
 * most openings and the fewest senior-only roles; UX/UI is the differentiator,
 * not the search title. Every project answers three questions: why it was
 * built, who uses it, and which problems it solved. Same story on the CV,
 * LinkedIn and in applications. EU citizen: no sponsorship needed.
 */

export const PROFILE = {
  name: 'Arnau Lopez',
  role: 'Software Developer · Full-Stack · UX/UI',
  eyebrow: '[ 22 · Alcoy, Spain · EU citizen, open to relocation ]',
  hero: 'Cofounded and developed Aithority, an EU AI Act compliance SaaS (May to Oct 2026). Founder of Kiblo, live on the App Store in the US and Canada. Dross, a notarized Mac app that catches frontend/backend drift. F1 Strategy Agent, open-sourced after viewers asked for the code. Dev Job Tracker EU, the data behind my own job search.',
  sub: 'TypeScript · React · React Native · Next.js · Python · FastAPI · SQL · Figma. I design the interface and write the code, and I use AI in loops: conditions first, then rebuild what failed. ~2 years at Deutsche Post / DHL in Germany; based in Spain, EU citizen, open to full-stack and software developer roles across the EU.',
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
  /** Why it was built. */
  why: string
  /** Who uses it. Omitted when not known yet — never invented. */
  usedBy?: string
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
    tagline: 'Pet-food iOS — full consumer loop, live on the App Store',
    status: { text: 'Founder · live US & Canada', tone: 'ok' },
    blurb:
      'A weekly habit app for dog owners: scan the food bag already in the cupboard, portion the meal from the dog’s weight, and reorder before it runs out.',
    why:
      'Food-scanner apps stop at a score and trackers stop at a log. None connected the bag in the cupboard to the right portion and the next order.',
    usedBy: 'Live on the App Store in the US and Canada.',
    what:
      'A weekly habit product: scan the bag already in the cupboard, portion from the dog, reorder before it runs out. Live on the App Store in the US and Canada. I am getting the first users through social media and building in public — not waiting for the listing to do the distribution.',
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
    link: 'https://apps.apple.com/app/id6802237827',
    linkLabel: 'Open on the App Store',
  },
  {
    slug: 'aithority',
    index: '02',
    name: 'Aithority',
    role: 'Cofounder & developer',
    tagline: 'EU AI Act compliance SaaS · May to Oct 2026',
    status: { text: 'Cofounder · May–Oct 2026', tone: 'accent' },
    blurb:
      'EU AI Act compliance for companies using AI in hiring, credit or biometrics. It inventories every system, classifies its risk, and produces dated evidence a client will accept.',
    why:
      'Startups and scale-ups using AI need to audit their AI systems and know whether they comply with the EU AI Act. Our audits flagged tools like Cursor and Chinese AI models as compliance risks.',
    usedBy:
      'Tested with companies in the Lanzadera accelerator, such as LaiaDesk. I ran the conversations with founders about their problems myself.',
    what:
      'EU AI Act compliance for companies using AI in HR, credit or biometrics: inventory, Annex III risk, dated evidence. The company was accepted into Lanzadera in Spain. I built backend, frontend, integrations, classification and UI.',
    built:
      'I built product, UI, classification and backend. Next.js, Node, Microsoft 365 / Google Workspace / provider admin APIs, Claude Haiku for a suggested class, Turso after Render’s disk kept wiping state.',
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
    link: 'https://www.aithority.com.es',
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
    why:
      'To learn ML on data I actually care about, and to film the build for social media.',
    usedBy:
      'People watching the build videos asked for the code in the comments, so I open-sourced the repo.',
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
    why:
      'My own projects kept shipping bugs that were valid code with the wrong meaning: a dead endpoint, demo data in production, a backend that required a token the app never sent.',
    usedBy:
      'Me, on TRACE and Aithority, where it caught real drift. Open source and shared on social media.',
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
    slug: 'dev-job-tracker',
    index: '05',
    name: 'Dev Job Tracker EU',
    role: 'Founder',
    tagline: 'Junior dev job market in Spain, NL, Germany and Belgium',
    status: { text: 'Open source · public repo', tone: 'ok' },
    blurb:
      'Counts live developer job postings by role and country from the Adzuna API, stores them daily in SQLite, and serves them through FastAPI to a plain HTML/CSS/JS page.',
    why:
      'I wanted real numbers for my own job search instead of US articles, and a project where every decision is written down and I can explain every file.',
    usedBy:
      'Me. Its data changed my search: generic titles (software developer, full-stack) have the most openings and fewer senior-only roles than frontend or backend.',
    what:
      'Seven roles across Spain, the Netherlands, Germany and Belgium. A DECISIONS file records what was chosen, why, and what was rejected.',
    built:
      'Python fetcher, SQLite, FastAPI, HTML/CSS/JS. Written to be explained, not just to run.',
    decisions: [
      {
        title: 'The API was searching job descriptions',
        detail:
          'Frontend in Germany returned 4,405 jobs because the query matched descriptions. Searching titles only gave 575, the real number.',
      },
      {
        title: 'Job titles change with the language',
        detail:
          'Frontend-Entwickler only exists in Germany, Desarrollador front only in Spain. Each role is a list of local variants that get summed.',
      },
      {
        title: 'Some roles cannot be measured honestly',
        detail:
          'Product engineer in Germany is mostly hardware jobs. I left it out of v1 instead of showing a wrong number.',
      },
    ],
    stack: ['Python', 'FastAPI', 'SQLite', 'HTML / CSS / JS', 'Adzuna API'],
    seed: 537,
    link: 'https://github.com/lopezsellesarnau-cmd/Dev-Job-Tracking-EU',
    linkLabel: 'Open repository',
  },
  {
    slug: 'ukraine-war-tracker',
    index: '06',
    name: 'Ukraine War Tracker',
    role: 'Founder',
    tagline: 'Daily Russian losses in the war in Ukraine, as a quiet report',
    status: { text: 'Live · updated daily', tone: 'ok' },
    blurb:
      'A daily tracker of Russian equipment and personnel losses in the war in Ukraine. The figures are claimed by Ukraine’s General Staff, not independently verified, and the site labels them that way.',
    why:
      'My passion for geopolitics and the need to know what is happening and why. I want people in Europe to see the scale of this war, and what we could face if it stops being someone else’s problem.',
    what:
      'Fetches the daily report from the russianwarship.rip API, stores it in SQLite, serves it with FastAPI and shows it on a minimal HTML/CSS/JS page with a Chart.js line chart. A GitHub Action updates it every day.',
    built:
      'Python, FastAPI, SQLite, HTML/CSS/JS, Chart.js, GitHub Actions, Vercel. Every decision is in DECISIONS.md.',
    decisions: [
      {
        title: 'Vercel cannot write to disk',
        detail:
          'A GitHub Action runs the fetch every day at 12:00 UTC and commits the database, so the data arrives with the code and Vercel only reads it.',
      },
      {
        title: 'No duplicates from the start',
        detail:
          'One row per day and category with (date, category) as the primary key and INSERT OR REPLACE. Running the fetch twice never duplicates a day, a bug I had to fix later in the job tracker.',
      },
      {
        title: 'The history came 50 days at a time',
        detail:
          'The history endpoint is paginated, so the backfill moves the offset forward until a page comes back with fewer than 50 days.',
      },
      {
        title: 'Total, not daily noise',
        detail:
          'I store both the total and the daily increase, because recalculating increases breaks on days the source skipped. The chart shows the cumulative total: four years of daily numbers are unreadable, the total shows the trend.',
      },
    ],
    stack: ['Python', 'FastAPI', 'SQLite', 'Chart.js', 'GitHub Actions'],
    seed: 612,
    link: 'https://ukraine-war-tracker.vercel.app',
    linkLabel: 'Open live site',
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
    name: 'Claude Code in Action',
    issuer: 'Anthropic',
    date: 'Aug 2026',
  },
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

export type Education = { school: string; program: string; detail: string; date: string; link?: string }

export const EDUCATION: Education[] = [
  {
    school: 'University of Helsinki',
    program: 'Programming MOOC (Python) — in progress',
    detail: 'Self-paced, university-affiliated introductory CS curriculum.',
    date: '2026',
    link: 'https://programming-26.mooc.fi',
  },
  {
    school: 'EASD Alcoy',
    program: 'Plastic Arts Technician and Layout Assistant for Printed Graphic Products',
    detail: 'Design school — where the visual-design half of the work comes from.',
    date: 'Sept 2021 – June 2023',
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
        'Solo shipping is proof I can carry a surface. On Aithority I owned product and engineering and talked to founders about their problems. The job I want is the same split on a team: design and code, same person, shipped software.',
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
  eyebrow: 'Spain · EU citizen, open to relocation',
  title: "Let's talk",
  cta: 'Email me',
  note: 'Software Developer · Full-Stack · UX/UI. GitHub, LinkedIn, and CV below.',
}

/* ── Skills · Abilities · Milestones — one section, three registers ──────────
   Skills: the concrete stack. Abilities: what I can carry end to end.
   Milestones: dated proof, newest first. Kept honest — see the vault. */

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Top skills', items: ['Python', 'JavaScript', 'TypeScript', 'HTML / CSS', 'React', 'React Native / Expo', 'Next.js', 'FastAPI', 'SQL / SQLite', 'Firebase'] },
  { group: 'Design', items: ['UX / UI', 'Figma', 'Design systems', 'Figma → code'] },
  { group: 'AI tools', items: ['Claude (Anthropic)', 'Cursor', 'Codex'] },
]

export const ABILITIES: { title: string; detail: string }[] = [
  {
    title: 'Build both sides: interface and backend',
    detail: 'From the Figma screen to the API and the database behind it, and the move off a platform when it fights the product (Render → Turso on Aithority).',
  },
  {
    title: 'Run AI in loops against locked constraints',
    detail: 'Conditions first — tests, a visual lock, a rule that must not be faked — then rebuild what failed. I own the constraints and the ship; the model does not.',
  },
  {
    title: 'Ship to the App Store solo',
    detail: 'IAP, subscriptions, privacy manifests, DAC7, UGC moderation, and Apple review — carried end to end on TRACE, SMASH and Kiblo.',
  },
  {
    title: 'Design the product and its visual system — no handoff',
    detail: 'Interface, identity, typography and motion, then the code that ships it. I do not need a designer to put a product in front of users.',
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

// Oldest first: the milestones row reads left to right like a timeline.
export const MILESTONES: Milestone[] = [
  { date: '2024–2026', title: '~2 years at Deutsche Post / DHL, Paderborn', detail: 'Full-time logistics operations in the DACH region. Alongside it, my own Shopify store for the Netherlands and Germany.' },
  { date: 'May 2026', title: 'Cofounded and developed Aithority', detail: 'EU AI Act compliance SaaS, accepted into Lanzadera. Tested with accelerator companies such as LaiaDesk. Until Oct 2026.' },
  { date: 'Aug 2026', title: 'TRACE live on the App Store (US)', detail: 'Privacy app: breach scan, exposure score, broker removals.' },
  { date: 'Sep 2026', title: 'Kiblo live on the App Store (US & Canada)', detail: 'Approved and released after one revision.' },
  { date: 'Oct 2026', title: 'Dev Job Tracker EU shipped', detail: 'Python, FastAPI and SQLite. Its data reshaped my own job search.' },
]