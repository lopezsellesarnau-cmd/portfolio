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
  hero: 'Founder of Kiblo — pet-food iOS, in App Store review for the US and Canada. Technical cofounder of Aithority (EU AI Act); the company is in Lanzadera, Spain. TRACE live on the App Store US. Dross notarized Mac. BlockFlow’s voice agent is in production, not sold like Kiblo.',
  sub: 'TypeScript · React Native · Next.js · Node · SwiftUI. ~2 years in Paderborn at Deutsche Post / DHL. NL / DE; UK when the role sponsors.',
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
    what:
      'A weekly habit product: scan the bag already in the cupboard, portion from the dog, reorder before it runs out. Built to prove I can ship a full consumer loop alone — onboarding, catalog, paywall, push, App Store. In review for the US and Canada. Not live, no revenue.',
    built:
      'Solo, 16–23 Aug 2026. I lock product and constraints; Cursor/Claude implement; I reject and ship. Expo 57, React Native, Firebase, RevenueCat. Speed is the case — a startup can see how I decide what to automate and what not to fake.',
    decisions: [
      {
        title: 'Never invent a barcode',
        detail:
          'Catalog matches GTIN exactly. Packs with no retail code stay unscannable. A wrong bag is worse than no scan — same bar as a checkout error.',
      },
      {
        title: 'Feeding tips are a rule engine, not an LLM',
        detail:
          'Treat budget vs a vet 10% guideline, food flags, one-tap extras. A wrong answer about a dog’s health is worse than a missing one, and it has no per-call cost.',
      },
      {
        title: 'The home screen stays a bowl',
        detail:
          'Geometry is locked; grade lives in copy, not a letter on the orbit. The screen has to stay a product, not a poster.',
      },
      {
        title: 'Plus is extra dogs, not a fake lock',
        detail:
          'Free is one dog on-device. Plus is multi-dog, 14-day trends, the tips engine. Custom paywall after RevenueCat’s default converted like a bare price list.',
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
    what:
      'EU AI Act compliance for companies using AI in HR, credit or biometrics: inventory, Annex III risk, dated evidence. The company is accepted into Lanzadera in Spain — not a personal solo admission. First paying client. I own backend, frontend, integrations, classification, and UI. Sales and legal stay with the commercial cofounder.',
    built:
      'Classification API and dashboard in Next.js. Microsoft Graph is read-only; no stored third-party tokens. Built for a team that has to survive counsel, not a demo that overclaims “fully automatic compliance.”',
    decisions: [
      {
        title: 'Discovery is not classification',
        detail:
          'Microsoft 365 can fill the inventory. “Notion AI showed up” does not mean high-risk — that depends on use. Selling fully automatic classification would fail in two questions from counsel.',
      },
      {
        title: 'The engine suggests. It does not certify.',
        detail:
          'Rules plus an LLM propose risk and remediation. The customer validates with their own legal counsel. We log what was declared, when, and by whom.',
      },
      {
        title: 'Split the company like a real startup',
        detail:
          'I own the product surface and the engine. The commercial cofounder owns sales and legal. Lanzadera is the company’s path, not a badge on my CV as a lone founder.',
      },
      {
        title: 'No Graph tokens on disk',
        detail:
          'App-only token per sync, read-only directory consent. Less surface to protect when the product is evidence for an audit.',
      },
    ],
    stack: ['Next.js', 'Node / Express', 'Microsoft Graph', 'OAuth', 'AI Act · Annex III'],
    seed: 655,
    link: 'https://landing-claude-chi.vercel.app/#motor',
    linkLabel: 'Open landing',
  },
  {
    slug: 'trace',
    index: '03',
    name: 'TRACE',
    role: 'Founder',
    tagline: 'Privacy iOS — live App Store US',
    status: { text: 'Founder · live US', tone: 'ok' },
    what:
      'Privacy iOS. Live on the App Store in the US — not Canada. Breach scan, Exposure Score from real severity, removal to 24 US brokers. The share object is a vertical report card, not an Incogni-style to-do list.',
    built:
      'React Native / Expo and Node. Two brokers get a real Resend email. The rest open the broker’s own opt-out. RevenueCat subscription. Status only moves when something actually happened.',
    decisions: [
      {
        title: 'The product people share is the report card',
        detail:
          'Growth is a screenshot people want to post. Removal is the paid second act, not a dashboard of chores.',
      },
      {
        title: 'Opening a form is not “submitted”',
        detail:
          'Optimistic “Submitted” on tap was a lie. Opening the page does nothing to status; only the user’s confirmation does.',
      },
      {
        title: 'Delete account means delete',
        detail:
          'Auth-only delete would have left Firestore PII. For a GDPR/CCPA product that would fail the premise. Record first, in the order the rules require.',
      },
    ],
    stack: ['React Native', 'Expo', 'Node/Express', 'Firebase', 'RevenueCat', 'Resend'],
    seed: 641,
    link: 'https://github.com/lopezsellesarnau-cmd/trace-app',
    linkLabel: 'Open repository',
  },
  {
    slug: 'dross',
    index: '04',
    name: 'Dross',
    role: 'Founder',
    tagline: 'Mac app + CLI — notarized DMG',
    status: { text: 'Founder · notarized DMG', tone: 'ok' },
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
    name: 'F1 Strategy Agent',
    tagline: 'ML + agentic — race strategy prediction',
    status: 'Open source · public repo',
    what: 'ML race strategy: lap times, pit simulations, a self-contained HTML report. Open because viewers asked for the code.',
    built: 'A simple model fails across circuits (MAE 3.49s) until the target is the delta over each circuit’s base pace — then 0.73s. Python, scikit-learn.',
    stack: ['Python', 'scikit-learn', 'RandomForest', 'Evaluation', 'Open source'],
    seed: 261,
    link: 'https://github.com/lopezsellesarnau-cmd/F1-Strategy-Agent',
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
  note: 'Product Engineer · Full-stack. GitHub, LinkedIn, and CV below.',
}