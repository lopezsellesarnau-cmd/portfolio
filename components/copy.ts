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
  hero: 'I design the interface and write the software — one person, live products, not prototypes. TRACE is live on the App Store in the US; Kiblo is in App Store review for the US and Canada; Dross ships as a notarized Mac app; Aithority is EU AI Act compliance, as technical cofounder. BlockFlow’s voice agent is in production (built to run, not sold like Kiblo). I show the builds on social as I ship.',
  sub: 'TypeScript · React Native · Next.js · Node · SwiftUI. ~2 years in Paderborn at Deutsche Post / DHL. Open to the Netherlands and Germany; UK when the role sponsors.',
}

// The same "long" hero tree as StackD and Aithority (their DotTree uses SEED
// 315): it ties Arnau's three surfaces into one identity.
export const HERO_PLANT_SEED = 315

export type CaseLayout = 'lead' | 'constraints' | 'surface' | 'quiet'

export type CaseStudy = {
  slug: string
  index: string
  name: string
  tagline: string
  status: { text: string; tone: 'ok' | 'accent' }
  /** Visual weight — the four featured cases are not a equal gallery. */
  layout: CaseLayout
  problem: string
  approach: string[]
  decisions: { title: string; detail: string }[]
  result: string
  stack: string[]
  seed: number
  link?: string
  /** Extra datasheet rows — used on Kiblo to lead with pace / why / how. */
  pace?: string
  why?: string
  how?: string
}

export const CASES: CaseStudy[] = [
  {
    slug: 'kiblo',
    index: '01',
    name: 'Kiblo',
    tagline: 'Pet-food iOS app — full consumer loop, in App Store review',
    status: { text: 'In review · US & Canada', tone: 'accent' },
    layout: 'lead',
    pace:
      'Concept locked 16 Aug 2026. By 18 Aug: onboarding → scan → portions → home bowl → reorder → multi-dog Plus (RevenueCat) → push reminders → deterministic feeding-tips engine → 14-day trends. One person, no designer, no backend team — speed is the point of the case.',
    why:
      'After TRACE went live on the US App Store I wanted a consumer product that can make money without B2B sales calls. Pet food is a weekly habit (bags empty, people repurchase). Kiblo is Mealia for dogs: scan what is in the cupboard, portion from the dog, reorder before the bag ends. Built to prove I can ship a full consumer loop fast — not a tutorial clone.',
    how:
      'Directed in Cursor with Claude as the pair-programmer: I set product, visual lock (circular home), and constraints (no invented UPCs, no home rescale, no LLM where a rule engine is safer). Claude/Cursor write and iterate the Expo app; I review, reject, and ship. Native-feeling iOS via Expo SDK 57, local-first then Firebase catalog + Auth, IAP through RevenueCat. The AI does not own the product — I do.',
    problem:
      'Pet food is guesswork: owners over-scoop, bags run out mid-week, and "good food" is marketing copy. Kiblo turns the cupboard into a bowl you can act on.',
    approach: [
      'Expo / React Native, expo-router, TypeScript: onboarding (Waltham RER/MER) → ~50-bag US catalog → camera barcode (exact GTIN) → extras swipe-plan → home bowl + share + Chewy/Amazon reorder.',
      'Firebase Auth (anonymous, then link email) and Firestore foods (public read, local catalog fallback). Free = one dog on-device; Plus = multi-dog + 14-day trends + a rule-based feeding-tips engine.',
      'Local push reminders (expo-notifications, no backend): a bag or extra 2 days from empty nudges straight to the reorder link instead of waiting for the user to notice a "5d" chip; daily meal-time reminders per dog. Reorder links prefer the verified UPC as the search query over a text name — lands closer to the exact product.',
      'IAP: RevenueCat entitlement plus, App Store bundle com.arnolop.goodbowl (display name Kiblo). Import was empty until that bundle matched Connect. Custom paywall (not RevenueCat\'s hosted template) after the default converted like a bare price list.',
    ],
    decisions: [
      {
        title: 'Exact barcodes, never invented UPCs',
        detail:
          'Catalog matches GTIN exactly (UPC-A ↔ EAN-13 with a leading zero). Fresh and subscription packs with no retail code stay unscannable rather than fake a hit — a wrong bag is worse than no scan. Same rule extended to ingredient panels: only real, sourced label text, cited, or left blank.',
      },
      {
        title: 'Feeding advice: deterministic, not an LLM call',
        detail:
          'Asked for Mealia-style "recipe advice." Built it as a rule engine instead of a wired-up LLM: treat-calorie budget vs a vet 10% guideline, food-flag surfacing, senior→joint-supplement and active→omega suggestions with a one-tap add. Same reasoning as Dross — deterministic-first where a wrong answer about a dog\'s health is worse than a missing one, and it ships free of per-call cost or a backend.',
      },
      {
        title: 'Home geometry is a product decision',
        detail:
          'The bowl, ring and four ingredient sats are sized once and not "fixed" with a global rescale. Grade lives in copy ("Great choice"), not as a letter on the orbit — the screen has to stay a bowl, not a poster.',
      },
      {
        title: 'Cursor + Claude, with me as the bottleneck on purpose',
        detail:
          'Speed comes from a tight loop: I specify (home geometry, exact barcodes, Plus = multi-dog not a fake lock, LLM vs. rule engine), the agent implements, I run the simulator and change what is wrong. Claiming "AI built it" would be false — claiming I typed every line by hand would also be false. The stack includes the tools.',
      },
    ],
    result:
      'In App Store review for the US and Canada: scan, portion, log, reorder (with push nudges before the bag runs out), Plus paywall, 14-day trends, deterministic feeding tips. Not a prototype. Not live on the store yet — territories are US & Canada. Pace plus judgment — what to automate, what to lock, what not to fake.',
    stack: [
      'Cursor',
      'Claude',
      'React Native',
      'Expo SDK 57',
      'TypeScript',
      'Firebase',
      'RevenueCat',
      'expo-camera',
      'expo-notifications',
    ],
    seed: 418,
  },
  {
    slug: 'dross',
    index: '02',
    name: 'Dross',
    tagline: 'macOS app + CLI — detects when your app and your backend stop agreeing',
    status: { text: 'Live · notarized DMG', tone: 'ok' },
    layout: 'constraints',
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
    link: 'https://github.com/lopezsellesarnau-cmd/dross',
  },
  {
    slug: 'trace',
    index: '03',
    name: 'TRACE',
    tagline: 'Privacy iOS app — find your exposed data, then get it removed',
    status: { text: 'Live · App Store US', tone: 'ok' },
    layout: 'surface',
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
      'Live on the App Store in the US: RevenueCat subscription, verified email to real brokers, activity log where every status is real — not a prototype. Not listed in Canada. v2: share-card-first home, deletion as the paid second act.',
    stack: ['React Native', 'Expo', 'Node/Express', 'Firebase', 'RevenueCat', 'Resend'],
    seed: 641,
  },
  {
    slug: 'aithority',
    index: '04',
    name: 'Aithority',
    tagline: 'EU AI Act compliance — technical cofounder',
    status: { text: 'Cofounder · in production', tone: 'ok' },
    layout: 'constraints',
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
      'Technical cofounder: own backend (classification engine + API) and dashboard in production, evidence system shipping. First paying client; accepted into Lanzadera. Building with AI is not enough if you do not also understand governance — that is the interview case.',
    stack: ['Next.js', 'Node / Express', 'Microsoft Graph', 'OAuth', 'AI Act · Annex III'],
    seed: 655,
  },
  {
    slug: 'blockflow',
    index: '05',
    name: 'BlockFlow',
    tagline: 'UK proptech — live voice agent (in production; not a sales push)',
    status: { text: 'In production · not selling', tone: 'ok' },
    layout: 'quiet',
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
    result:
      'In production: real out-of-hours calls, triage, structured tickets, no human on the happy path. No paying customers yet. Unlike Kiblo, this is not a product I am distributing or selling right now — the work is the live system.',
    stack: ['Voice AI', 'LLM', 'Ticket automation', 'Production'],
    seed: 100,
  },
]

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
    name: 'Louvr Labs',
    tagline: 'Ranking & reporting platform for Meta Ads',
    status: 'In production',
    blurb:
      'Automatic weekly report by email, zero manual work, in production with real clients. Rules rank ads (Scale / Pause / Hold / Refresh); Claude writes the insight over that ranking, not in its place.',
    fields: [
      { label: 'Role', value: 'Solo — product, ranking, reports' },
      { label: 'Type', value: 'B2B · Meta Ads + weekly email' },
      { label: 'Result', value: 'In production with real clients' },
    ],
    stack: ['OAuth', 'Meta Ads API', 'Python', 'Claude (Sonnet) API', 'Make.com'],
    seed: 322,
  },
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
  title: 'Pair with AI. Lock the constraints. Own the product.',
  lead:
    'I specify product, visual lock, and what must not be faked. Cursor and Claude write and iterate; I review, reject, and ship. The AI does not own the product — I do.',
  points: [
    {
      title: 'AI as pair, not owner',
      detail:
        'Speed comes from a tight loop: I set the constraints, the agent implements, I run the simulator and change what is wrong. Claiming “AI built it” would be false — claiming I typed every line by hand would also be false.',
    },
    {
      title: 'Constraints I lock first',
      detail:
        'Exact barcodes, never invented UPCs. Feeding advice as a rule engine, not an LLM call. Contract drift via the TypeScript compiler API, not regex. Status that only changes when something actually happened. Deterministic-first where a wrong answer is worse than a missing one.',
    },
    {
      title: 'Team outcomes, not a founder pitch',
      detail:
        'I want to own outcomes on a team product — design and code in the same person, shipped software, not a YC co-founder deck. Solo shipping is proof I can carry a surface; the job is to do that with a team.',
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
    name: 'F1 Strategy Agent',
    line: 'Open-source ML race strategy. Honest eval: MAE 3.49s → 0.73s after changing the objective to delta over base pace.',
    link: 'https://github.com/lopezsellesarnau-cmd/F1-Strategy-Agent',
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
  note: 'Product Engineer · Full-stack. GitHub and LinkedIn below.',
}