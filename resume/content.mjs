// Single source for the résumé PDFs and the portfolio's experience section.
// Every fact comes from ../work-inventory-2026-11.md. Plain sentences; few numbers.

const PORTFOLIO = 'https://imran-react-portfolio.netlify.app';

export const resume = {
  name: 'Mohammad Imran Hossain',
  headline: 'Senior Full-Stack Engineer · PHP/Laravel · TypeScript (Next.js, Fastify) · Python (FastAPI)',
  location: 'Dhaka, Bangladesh · Open to relocation',
  contact: {
    email: 'imranhossain16.ctg@gmail.com',
    phone: '+880 1866 803833',
    linkedin: 'linkedin.com/in/mohammad-imran-hossain-783803135',
    portfolio: 'imran-react-portfolio.netlify.app',
  },
  // Used by the site only. The PDFs ignore it.
  site: {
    tagline: 'I think like a product owner and build like an engineer, from the database to the screen.',
    availability: 'Open to relocation',
    flutter: 'Outside work I build Flutter apps. Quran Keeper, a Quran reader for Bangla speakers, is live on Google Play.',
    github: 'github.com/imranctg16',
  },
  gulfDetails: 'Nationality: Bangladeshi · Open to relocation · Requires visa sponsorship · Notice period: 3 months',

  summary: [
    "I'm a senior full-stack engineer with almost eight years of building web products. I started with Laravel and Vue, and today I also work in TypeScript with Next.js and Fastify, and in Python with FastAPI. Today I work through Cefalo inside two Norwegian product teams, Zymfonix and Uppercase. Before that I spent over seven years at Brain Station 23, the last years as Technical Lead on Grameenphone's workflow platform.",
    "I work best as a product engineer. I like owning the whole thing, from the database and API to the front end. I've also built AI features that run in production, such as CV parsing, illustrated story books and narration.",
    'I also coach developers at Cefalo on working with Claude Code.',
  ],

  skills: [
    { label: 'Backend', items: 'PHP and Laravel, TypeScript and Node.js (Fastify, Drizzle), Python (FastAPI), REST APIs' },
    { label: 'Frontend', items: 'Vue, Quasar, React, Next.js, TanStack Query' },
    { label: 'Flutter', items: 'My own apps, one of them live on Google Play' },
    { label: 'Data', items: 'PostgreSQL, MySQL, Redis, DuckDB' },
    { label: 'Python', items: 'FastAPI, Scrapy, Playwright, Pytest' },
    { label: 'Cloud and delivery', items: 'AWS (Lambda, S3, SES), Laravel Cloud, Docker, GitHub Actions, GitLab CI' },
    { label: 'AI in products', items: 'OpenAI, Anthropic, Gemini and Mistral APIs, structured extraction, image and speech generation' },
    { label: 'Practices', items: 'Security review (OWASP Top 10), performance tuning, automated testing, mentoring' },
  ],

  experience: [
    {
      company: 'Cefalo',
      title: 'Senior Software Engineer',
      period: 'Mar 2026 – present',
      context: 'Working inside Norwegian client teams',
      sections: [
        {
          heading: 'Zymfonix · Aviyond, an aviation job board',
          note: 'Sole engineer from July to October 2026, lead developer since · Laravel, PostgreSQL, Python, AWS Lambda',
          link: 'aviyond.com',
          bullets: [
            'Built Aviyond from an empty repository to a public job board that now lists over 48,000 aviation jobs.',
            'Wrote the crawlers that collect jobs from airline and recruiter career sites, and run them on AWS Lambda.',
            "Found that most of the crawlers' AWS cost came from jobs timing out, and fixed it.",
          ],
        },
        {
          heading: 'Zymfonix · Uno, a crew and recruitment platform',
          note: 'Laravel 11, Vue 2, Quasar, MySQL',
          bullets: [
            'Built the AI CV parsing that turns an uploaded résumé into a candidate profile, with a choice of AI providers and a cost view for admins.',
            'Found and fixed the cause of slow and costly CV parsing in production.',
            'Closed authorization holes in 9 modules after an external security scan, and removed slow database queries across the platform.',
          ],
        },
        {
          heading: 'Uppercase · Signalist 2.0, media monitoring and analytics',
          note: 'Next.js, TypeScript, Fastify, Drizzle, PostgreSQL, Python (FastAPI), DuckDB',
          bullets: [
            'Picked up a new stack in my first weeks and now deliver features across the front end and API.',
            'Built scheduled email alerts, English and Norwegian language settings, and PDF reports.',
            'Added search and debate filters to the Python search API, written in FastAPI with DuckDB queries.',
          ],
        },
        {
          heading: 'Cefalo · AI Coach, internal Claude Code programme',
          note: '',
          bullets: [
            'Coached a development team through the eight-class programme and wrote the class material.',
          ],
        },
      ],
    },
    {
      company: 'Grameenphone, via Brain Station 23',
      title: 'Technical Lead',
      period: 'Jan 2025 – Mar 2026',
      context: 'Senior Software Engineer from Jul 2022 to Dec 2024 · Bangladesh’s largest mobile operator, 82 million subscribers',
      sections: [
        {
          heading: '',
          note: 'Laravel, Vue 3, MySQL, Redis, RabbitMQ, Docker',
          bullets: [
            'Was part of the five-person team that moved a legacy CakePHP system to eleven services, and set the API conventions the services share.',
            'Built the reporting module that processes millions of records a day, and made its slowest reports fast enough to run on demand.',
            'Set up logging and monitoring with Grafana and Loki, standardised Docker deployments, and mentored engineers across three teams.',
          ],
        },
      ],
    },
    {
      company: 'Brain Station 23',
      title: 'Senior Software Engineer',
      period: 'Nov 2018 – Jun 2022',
      context: 'Joined as Associate Software Engineer',
      sections: [
        {
          heading: '',
          note: 'Laravel, Vue.js, MySQL, Redis',
          bullets: [
            'Built accounting, HR, training and vehicle-management modules of a government ERP system.',
            'Sped up the busiest pages with query tuning and Redis caching.',
          ],
        },
      ],
    },
  ],

  products: [
    {
      name: 'Quran Keeper',
      role: 'Founder and developer',
      stack: 'Flutter, Laravel, PostgreSQL',
      status: 'Live on Google Play',
      link: 'play.google.com/store/apps/details?id=com.qurankeeper.app',
      bullets: [
        'A daily Quran reader for Bangla speakers, with reading sync, subscriptions and bKash payments.',
        'Automated checks confirm every verse matches the source text and displays correctly in every font.',
      ],
    },
    {
      name: 'Sellora',
      role: 'Founder and developer',
      stack: 'Laravel, Vue 3, Quasar, Flutter',
      status: 'Live beta',
      link: `${PORTFOLIO.replace('https://', '')}/project/10`,
      bullets: [
        'Turns a product photo into a marketing poster and an order page for small online sellers.',
        'Generates images with OpenAI or Gemini, and charges per use through a credit system.',
      ],
    },
    {
      name: 'Kinderfable',
      role: 'Co-founder and lead developer',
      stack: 'Laravel, React, Flutter',
      status: 'Live on the web',
      link: 'bangla-storybook-production-5yw3cv.laravel.cloud',
      bullets: [
        'Bangla picture books illustrated with the child as the hero and read aloud, using image and speech generation.',
      ],
    },
  ],

  education: {
    degree: 'B.Sc. in Computer Science and Engineering',
    school: 'International Islamic University Chittagong, Bangladesh',
    period: '2014 – 2018',
    detail: 'CGPA 3.69 / 4.00',
  },
  certifications: [
    'OWASP Top 10:2025 in PHP, SecureFlag, 2026',
    'Intermediate Secure Coding in PHP, SecureFlag, 2026',
  ],
  achievements: [
    'Co-author, “nameGist: A Phonetic Algorithm”, Springer, 2019',
    'Grameenphone Innovation Lab Q4 award',
    'Winner, Inter-University App Contest, 2017',
  ],
  languages: 'Bangla (native) · English (fluent) · Hindi and Urdu (conversational)',
  references: 'References available on request',
};
