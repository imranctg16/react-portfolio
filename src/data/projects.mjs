// Text for every project page. Facts come from ../../../work-inventory-2026-11.md and the résumé.
// No images here so node can test it (projects.test.mjs). Images live in projectImages.js.
import { resume } from '../../resume/content.mjs';

const product = (name) => resume.products.find((p) => p.name === name);
const fromProduct = (name) => {
  const p = product(name);
  return { title: p.name, line: p.bullets[0], role: p.role, status: p.status };
};
const grameenphone = resume.experience[1];

export const GROUPS = [
  { key: 'work', label: 'Client work' },
  { key: 'product', label: 'My own products' },
  { key: 'earlier', label: 'Earlier projects' },
];

// Order is priority. IDs are public URLs: never renumber.
export const projects = [
  {
    id: 6,
    group: 'work',
    title: 'Aviyond',
    line: 'An aviation job board that collects open jobs from airline and recruiter career sites.',
    org: 'Zymfonix, Norway',
    role: 'Sole engineer from July to October 2026, lead developer since',
    period: 'Jul 2026 – present',
    status: 'Live',
    stack: [
      'Laravel',
      'PostgreSQL',
      'Python',
      'Scrapy',
      'Playwright',
      'AWS Lambda',
      'Amazon SES',
      'Next.js',
      'Laravel Cloud',
    ],
    links: [{ label: 'aviyond.com', href: 'https://aviyond.com' }],
    body: [
      {
        h: 'What it is',
        p: [
          'Aviyond is a job board for aviation. It collects open jobs from airline and recruiter career sites and puts them in one place you can search. It now lists over 48,000 aviation jobs.',
          'Zymfonix owns it. They are a Norwegian company that makes HR software for aviation and maritime. I work in their team through Cefalo.',
        ],
      },
      {
        h: 'My part',
        p: [
          'I started from an empty repository in July 2026 and was the only engineer until late October. The site went live on 24 July. A second developer has joined since, and I lead the work.',
        ],
      },
      {
        h: 'What I built',
        list: [
          'The Laravel and PostgreSQL backend that stores the jobs and serves the board.',
          'The crawlers, written in Python with Scrapy and Playwright. There is one adapter per applicant tracking system, so one adapter covers many career sites.',
          'The setup that runs the crawlers as container images on AWS Lambda.',
          'Email job alerts, sent through Amazon SES.',
          'Career Hub, with its own CMS.',
          'Job pages that search engines can read, with structured data and sitemaps.',
          'A classifier that sorts jobs into categories, and a lookup for employer logos.',
          'Crawlers that follow the robots.txt rules of every site they visit.',
        ],
      },
      {
        h: 'The Lambda bill',
        p: [
          'The crawlers cost more to run than they should have. I measured where the compute time went and found that most of it was spent on jobs that timed out and were then retried. I fixed the timeouts and the retries. Later I moved crawling into the client’s own AWS account.',
        ],
      },
      {
        h: 'Changing hosts',
        p: [
          'The first version ran on Netlify and Neon. In September 2026 I moved it to Laravel Cloud, which is where it runs today.',
        ],
      },
    ],
  },
  {
    id: 7,
    group: 'work',
    title: 'AI CV parsing in Uno',
    line: 'A candidate uploads a CV and the platform fills in their profile from it.',
    org: 'Zymfonix, Norway',
    role: 'Senior Software Engineer',
    period: 'Mar – Sep 2026',
    status: 'In production',
    stack: [
      'Laravel 11',
      'Vue 2',
      'Quasar',
      'MySQL',
      'OpenAI',
      'Anthropic',
      'DeepSeek',
      'Mistral',
    ],
    links: [],
    body: [
      {
        h: 'What it is',
        p: [
          'Uno is Zymfonix’s crew and recruitment platform. A candidate uploads a CV, and Uno reads it and fills in their profile. I built that feature.',
        ],
      },
      {
        h: 'What I built',
        list: [
          'One layer that can send a CV to OpenAI, Anthropic, DeepSeek or Mistral. The team can change model without touching the feature.',
          'Parsing runs in a background queue, and the candidate sees the progress.',
          'Every parse records what it cost. Admins have a cost view.',
          'A console for comparing models on the same CV.',
          'The front end for it in the candidate portal, in Vue and Quasar.',
        ],
      },
      {
        h: 'The production fix',
        p: [
          'CV parsing was slow and costly in production. I went through the job logs and the AI logs to find the cause, fixed it, and parsing became much faster and cheaper.',
        ],
      },
      {
        h: 'Other work on Uno',
        list: [
          'Closed authorization holes in 9 modules after an external security scan.',
          'Found and removed slow database queries in several modules.',
          'Built a spreadsheet export that runs in the background, shows progress and can be cancelled.',
        ],
      },
      {
        h: 'Screenshots',
        p: [
          'Uno is a client’s product for its own customers, so I don’t show screenshots of it.',
        ],
      },
    ],
  },
  {
    id: 8,
    group: 'work',
    title: 'Signalist 2.0',
    line: 'Media monitoring and analytics. I build features across the front end and the API.',
    org: 'Uppercase, Norway',
    role: 'Senior Software Engineer',
    period: 'Sep 2026 – present',
    stack: [
      'Next.js',
      'TypeScript',
      'Fastify',
      'Drizzle',
      'PostgreSQL',
      'Python',
      'FastAPI',
      'DuckDB',
      'AWS',
    ],
    links: [],
    body: [
      {
        h: 'What it is',
        p: [
          'Signalist is a media monitoring and analytics product from Uppercase, a Norwegian company. I joined the work on version 2.0 in September 2026.',
          'The stack was new to me: Next.js, Fastify and Drizzle on PostgreSQL, with Python services on AWS. I picked it up in my first weeks and now build features across the front end and the API.',
        ],
      },
      {
        h: 'What I built',
        list: [
          'Scheduled email alerts, including fixes to the backend bugs that stood in their way.',
          'Search filters where you can include or exclude several values at once.',
          'Search and debate filters in the Python search API, written in FastAPI with DuckDB queries.',
          'A language setting for English and Norwegian, with a fallback.',
          'Search profiles, and sharing them.',
          'PDF and email export, and full-text PDF reports.',
          'The Debate Development view.',
        ],
      },
      {
        h: 'Screenshots',
        p: [
          'Signalist is a client’s product, so I don’t show screenshots of it.',
        ],
      },
    ],
  },
  {
    id: 4,
    group: 'work',
    title: 'Dynamic Workflow Engine',
    line: 'Grameenphone’s internal platform for forms, approvals and tickets.',
    org: 'Grameenphone, via Brain Station 23',
    role: 'Senior Software Engineer, then Technical Lead',
    status: 'In production',
    stack: [
      'Laravel',
      'Vue 3',
      'MySQL',
      'Redis',
      'RabbitMQ',
      'Docker',
      'Grafana',
      'Loki',
    ],
    links: [],
    body: [
      {
        h: 'What it is',
        p: [
          'Grameenphone is Bangladesh’s largest mobile operator, with 82 million subscribers. The Dynamic Workflow Engine is the platform its staff use to build forms, run approval workflows, track tickets and pull reports.',
        ],
      },
      {
        h: 'My part',
        p: [
          'I worked on it through Brain Station 23, first as Senior Software Engineer and from January 2025 as Technical Lead.',
        ],
        list: grameenphone.sections[0].bullets,
      },
      {
        h: 'Written up',
        p: [
          'Some of the problems we solved on this platform are in the writing section: the database errors, the slow reports, the Docker setup and the logging.',
        ],
        link: { label: 'Read the write-ups', to: '/blog' },
      },
    ],
  },
  {
    id: 9,
    group: 'product',
    ...fromProduct('Quran Keeper'),
    stack: [
      'Flutter',
      'Laravel',
      'PostgreSQL',
      'Google Play Billing',
      'bKash',
      'Firebase Cloud Messaging',
    ],
    links: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.qurankeeper.app',
      },
      { label: 'qurankeeper.com', href: 'https://qurankeeper.com' },
    ],
    body: [
      {
        h: 'What it is',
        p: [
          'Quran Keeper is a daily Quran reader for Bangla speakers. The Android app is live on Google Play. I am the founder and the developer.',
        ],
      },
      {
        h: 'What is in it',
        list: [
          'The Android app, built with Flutter.',
          'A Laravel API on PostgreSQL that keeps your reading in sync.',
          'Subscriptions through Google Play Billing and bKash, a mobile wallet people use in Bangladesh.',
          'Push notifications through Firebase Cloud Messaging.',
        ],
      },
      {
        h: 'Getting the text right',
        p: [
          'The text of the Quran has to be exactly right. So the build runs automated checks that every verse matches the source text and displays correctly in every font the app offers.',
        ],
      },
    ],
  },
  {
    id: 10,
    group: 'product',
    ...fromProduct('Sellora'),
    stack: ['Laravel', 'Vue 3', 'Quasar', 'Flutter', 'OpenAI', 'Gemini'],
    links: [],
    body: [
      {
        h: 'What it is',
        p: [
          'Sellora is for small online sellers. The seller takes a photo of a product. Sellora turns it into a marketing poster and gives them an order page to share with buyers.',
          'I am the founder and the developer. Sellora is in live beta, so there is no public link yet.',
        ],
      },
      {
        h: 'What is in it',
        list: [
          'A Laravel API behind everything.',
          'The web app, in Vue 3 and Quasar.',
          'The mobile app, in Flutter.',
          'Poster generation with OpenAI or Gemini image models. Both sit behind one interface, so I can change provider.',
          'A credit system. Sellers buy credits, each poster uses some, and a ledger keeps the record.',
        ],
      },
    ],
  },
  {
    id: 11,
    group: 'product',
    ...fromProduct('Kinderfable'),
    period: 'Oct 2026 – present',
    stack: [
      'Laravel 13',
      'React',
      'Flutter',
      'OpenAI',
      'Gemini',
      'ElevenLabs',
      'Firebase Auth',
    ],
    links: [
      {
        label: 'Open Kinderfable',
        href: 'https://bangla-storybook-production-5yw3cv.laravel.cloud',
      },
    ],
    body: [
      {
        h: 'What it is',
        p: [
          'Kinderfable makes personalised picture books in Bangla. A parent adds a photo of their child. The book is then illustrated with the child as the hero, and it can be read aloud.',
          'I started the project in October 2026 and lead the development. Two teammates build it with me.',
        ],
      },
      {
        h: 'What I built',
        list: [
          'The Laravel API, with sign-in through Firebase.',
          'The Flutter app and the React web app.',
          'The illustration pipeline. A parent uploads a photo, the app checks it, and OpenAI or Gemini image models paint every page with the child as the hero. A face check keeps the child recognisable from page to page, and pages are painted in parallel so the book appears as it is made.',
          'Narration with generated voices from Gemini and ElevenLabs, and the option to have a book read in a parent’s own voice.',
          'Family members in the story, and writing your own story.',
        ],
      },
      {
        h: 'What my teammates built',
        p: [
          'The landing page, payments, notifications, and the region and language picker.',
        ],
      },
    ],
  },
  {
    id: 12,
    group: 'product',
    title: 'Iqamah',
    line: 'Mosque prayer times that the people who pray there can correct.',
    role: 'Co-developer',
    status: 'Heading to closed testing on Google Play',
    stack: ['Flutter', 'Laravel'],
    links: [],
    body: [
      {
        h: 'What it is',
        p: [
          'Iqamah shows the prayer times of mosques. When a time is wrong, the people who pray there can correct it.',
          'It is a Flutter app with a Laravel backend. I build it together with another developer. The backend is live, and the app is heading to closed testing on Google Play.',
        ],
      },
    ],
  },
  {
    id: 13,
    group: 'product',
    title: 'Salah Assistance',
    line: 'A Wear OS watch app with its own watch faces.',
    role: 'Developer',
    status: 'Working, not published yet',
    stack: ['Kotlin', 'Jetpack Compose', 'Wear OS', 'Watch Face Format'],
    links: [],
    body: [
      {
        h: 'What it is',
        p: [
          'Salah Assistance is a Wear OS watch app, with watch faces made in the Watch Face Format. I wrote it in Kotlin with Compose. It works, and it is not published yet.',
        ],
      },
    ],
  },
  {
    id: 1,
    group: 'earlier',
    title: 'SQL Playground',
    line: 'A place to practise SQL with challenges that get harder as you go.',
    role: 'Developer',
    status: 'Side project',
    stack: ['Laravel', 'React', 'TypeScript', 'MySQL', 'Docker'],
    links: [
      { label: 'Live site', href: 'https://imran-sql-playground.netlify.app/' },
      { label: 'GitHub', href: 'https://github.com/imranctg16/sql-playground' },
    ],
    body: [
      {
        h: 'What it is',
        p: [
          'When you use an ORM every day you rarely write raw SQL, and the skill gets rusty. I built SQL Playground to practise. It has challenges that get harder, checks your query as soon as you run it, shows the database schema as a diagram, and keeps a daily streak.',
        ],
      },
    ],
  },
  {
    id: 2,
    group: 'earlier',
    title: 'AWS Exam Prep',
    line: 'Practice questions for the AWS Solutions Architect exam, grouped by topic.',
    role: 'Developer',
    status: 'Side project',
    stack: ['Laravel', 'Vue 3', 'MongoDB', 'Docker', 'Nginx'],
    links: [
      { label: 'Live site', href: 'https://aws-exam-prep-frontend.fly.dev/' },
      {
        label: 'GitHub, front end',
        href: 'https://github.com/imranctg16/aws-exam-prep-frontend',
      },
      {
        label: 'GitHub, backend',
        href: 'https://github.com/imranctg16/aws-exam-prep-backend',
      },
    ],
    body: [
      {
        h: 'What it is',
        p: [
          'While I prepared for the AWS Solutions Architect exam I could not find a good free tool for practising one topic at a time. So I built one. It has topic quizzes, mock exams, personal notes and progress tracking.',
        ],
      },
    ],
  },
  {
    id: 3,
    group: 'earlier',
    title: 'README Reader',
    line: 'A Markdown viewer for reading several documents side by side.',
    role: 'Developer',
    status: 'Side project',
    stack: ['React', 'TypeScript', 'Vite', 'Mermaid'],
    links: [
      { label: 'Live site', href: 'https://readme-reader.netlify.app/' },
      { label: 'GitHub', href: 'https://github.com/imranctg16/readme-reader' },
    ],
    body: [
      {
        h: 'What it is',
        p: [
          'I read a lot of documentation and often need several files open at once. README Reader opens Markdown files in tabs, shows a live preview while you edit, and renders Mermaid diagrams and highlighted code.',
        ],
      },
    ],
  },
];

export const openSource = [
  {
    title: 'claude-pull-session',
    line: 'A public plugin for Claude Code, MIT licensed.',
    meta: 'Open source',
    href: 'https://github.com/imranctg16/claude-pull-session',
  },
];

// Home page "AI in my work": AI features built into products first, then using AI tools well.
export const aiWork = [
  {
    id: 7,
    title: 'AI CV parsing in Uno',
    line: 'Turns an uploaded CV into a candidate profile, with a choice of AI providers and a cost view for admins. Running in production.',
  },
  {
    id: 11,
    title: 'Kinderfable',
    line: 'Illustrates a whole picture book with the child as the hero, and reads it aloud with generated voices.',
  },
  {
    id: 10,
    title: 'Sellora',
    line: 'Generates a marketing poster from a product photo with OpenAI or Gemini, paid for with credits.',
  },
  {
    title: 'AI Coach at Cefalo',
    line: 'I coach a development team on working with Claude Code, and wrote the class material.',
    to: '/resume',
  },
  {
    title: 'claude-pull-session',
    line: 'A public plugin for Claude Code, MIT licensed.',
    href: 'https://github.com/imranctg16/claude-pull-session',
  },
];

// /project/5 was the old portfolio's page about itself.
export const RETIRED_IDS = [5];

export const getProjectById = (id) =>
  projects.find((p) => String(p.id) === String(id));
