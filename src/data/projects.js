// Import project images
import sqlDashboard from '../assets/images/sql/sql-dashboard.png';
import awsDashboard from '../assets/images/aws-exam-prep/aws-dashboard.png';
import readme1 from '../assets/images/readme-reader/readme-1.png';
import dweDashboard from '../assets/images/dwe/dwe-dashboard.png';
import portfolioImage from '../assets/images/readme-reader/readme-1.png'; // Using readme reader as portfolio demo

// Import GIFs
import dweGif from '../assets/images/dwe/dwe.gif';
import sqlGif from '../assets/images/sql/sql.gif';
import awsGif from '../assets/images/aws-exam-prep/aws.gif';
import readmeGif from '../assets/images/readme-reader/readme.gif';

// Import additional images for galleries
// DWE Project Images
import dweLogin from '../assets/images/dwe/dwe-login.png';
import dweOtpEnforce from '../assets/images/dwe/dwe-otp-enforce.png';
import dweReportPending from '../assets/images/dwe/dwe-report-pending.png';
import dweReportView from '../assets/images/dwe/dwe-report-view.png';
import dweTicketsIndex from '../assets/images/dwe/dwe-tickets-index.png';
import dweWorkflow from '../assets/images/dwe/dwe-workflow.png';

// SQL Project Images
import sqlAbout from '../assets/images/sql/sql-about.png';
import sqlDbSchema from '../assets/images/sql/sql-db-schema.png';
import sqlHelp from '../assets/images/sql/sql-help.png';
import sqlLogin from '../assets/images/sql/sql-login.png';
import sqlProgress from '../assets/images/sql/sql-progress.png';
import sqlSuccess from '../assets/images/sql/sql-success.png';
import sqlTableSchema from '../assets/images/sql/sql-table-schema.png';

// AWS Project Images
import awsLogin from '../assets/images/aws-exam-prep/aws-login.png';
import awsNotes from '../assets/images/aws-exam-prep/aws-notes.png';
import awsQuestion from '../assets/images/aws-exam-prep/aws-question.png';
import awsTopicQuiz from '../assets/images/aws-exam-prep/aws-topic-quiz.png';
import awsTopicQuiz2 from '../assets/images/aws-exam-prep/aws-topic-quiz-2.png';

// README Reader Images
import readme2 from '../assets/images/readme-reader/readme-2.png';
import readme3 from '../assets/images/readme-reader/readme-3.png';

export const projects = [
  {
    id: 4,
    title: 'Dynamic Workflow Engine (DWE) - Enterprise Microservices Platform',
    subtitle: 'Production-Grade Digital Workflow Automation System',
    description:
      "An enterprise workflow automation system I've been architecting for Grameenphone over the past 2 years. What started as a legacy CakePHP application has evolved into a robust microservices platform with 11 independent services, automating all workflows across the organization and winning multiple internal awards for efficiency improvements.",
    motivation:
      "As a solution architect, I led the transformation of a monolithic CakePHP application into a modern microservices architecture. The challenge was to modernize legacy systems while maintaining business continuity for one of Bangladesh's largest telecom operators. This project has automated critical workflows and significantly improved operational efficiency.",
    image: dweDashboard,
    gif: dweGif,
    gallery: [
      {
        src: dweDashboard,
        alt: 'DWE Dashboard - Main Interface',
        caption:
          'Comprehensive dashboard showing workflow statistics and key metrics',
      },
      {
        src: dweLogin,
        alt: 'DWE Login Interface',
        caption: 'Secure authentication system with enterprise-grade security',
      },
      {
        src: dweOtpEnforce,
        alt: 'OTP Enforcement',
        caption: 'Multi-factor authentication for enhanced security',
      },
      {
        src: dweWorkflow,
        alt: 'Workflow Management',
        caption: 'Dynamic workflow builder with configurable business logic',
      },
      {
        src: dweTicketsIndex,
        alt: 'Ticket Management System',
        caption: 'Issue tracking with SLA monitoring and performance metrics',
      },
      {
        src: dweReportPending,
        alt: 'Pending Reports View',
        caption: 'Real-time reporting system with advanced filtering',
      },
      {
        src: dweReportView,
        alt: 'Report Detail View',
        caption: 'Detailed report analysis with export capabilities',
      },
    ],
    technologies: [
      'Laravel 9+',
      'Vue.js 3',
      'MySQL 8.0',
      'Redis',
      'Docker',
      'MinIO',
      'RabbitMQ',
      'Nginx',
      'Laravel Sanctum',
    ],
    liveUrl: '#', // Internal enterprise system
    githubUrl: null, // Proprietary enterprise project - code not available for sharing
    blogPostId: null, // Blog is separate from projects
    featured: true,
    category: 'Enterprise Microservices',
    duration: '12 months',
    teamSize: '5 developers',
    status: 'Production',
    overview:
      'Enterprise-grade microservices platform designed for digital workflow automation, featuring 11 independent services with dynamic form building, workflow state machines, regulatory compliance, and multi-tenant architecture.',
    problemStatement:
      'Organizations needed flexible, compliant, and scalable digital workflow systems that could adapt to complex business processes while maintaining security standards and performance at enterprise scale.',
    solution:
      'Built a comprehensive microservices architecture with API gateway pattern, custom authentication extensions, advanced performance optimization, and container-first deployment supporting complex organizational workflows.',
    keyFeatures: [
      '11 Independent Microservices with dedicated databases and business logic',
      'Dynamic Form Builder with runtime generation and conditional logic',
      'Workflow State Machine with configurable business process automation',
      'Custom Laravel Sanctum Authentication with inactivity-based token expiration',
      'Enterprise Issue Tracking with performance optimization and SLA tracking',
      'Multi-channel Notification System (Email, SMS, Web) with template management',
      'Regulatory Compliance Integration (BTRC, eNothi) for government workflows',
      'Advanced Performance Optimization reducing query time from 20min to 30sec',
      'Role-Based Access Control (RBAC) with dynamic permissions and audit logging',
      'Multi-tenant Architecture supporting multiple organizations with data isolation',
      'MinIO Object Storage with S3-compatible API for scalable file management',
      'Real-time Analytics Dashboard with complex data aggregation and reporting',
    ],
    technicalHighlights: [
      'API Gateway Pattern with centralized authentication and request routing',
      'Service Mesh Communication with standardized interfaces and error handling',
      'Container-First Deployment with Docker Compose orchestration across 11 services',
      'Database Performance Tuning with custom indexing reducing query time by 95%',
      'Multi-layer Redis Caching with session management and application-level caching',
      'Asynchronous Processing with queue-based background job processing',
      'Custom Authentication Flow extending Laravel Sanctum with enterprise requirements',
      'Centralized Logging Prototype with PLG stack integration (Promtail/Loki/Grafana)',
      'Network Isolation and SSL termination with comprehensive security measures',
    ],
    architecture: {
      frontend: [
        'Vue.js 3',
        'Composition API',
        'Modern Build Tools',
        'Responsive Design',
        'Real-time WebSocket Updates',
      ],
      backend: [
        'Laravel 9+',
        'PHP 8+',
        'Laravel Sanctum',
        'RESTful APIs',
        'Queue Processing',
      ],
      microservices: [
        'API Gateway',
        'User Service',
        'Form Service',
        'Ticket Service',
        'Workflow Service',
        'Report Service',
        'Notification Service',
        'MinIO Service',
        'BTRC Service',
        'ATS Service',
        'RCMS',
      ],
      database: [
        'MySQL 8.0',
        'One Database Per Service',
        'Performance Optimization',
        'Custom Indexing',
      ],
      infrastructure: [
        'Docker Compose',
        'Nginx Reverse Proxy',
        'Redis Cache',
        'MinIO Object Storage',
        'RabbitMQ Message Queue',
      ],
      monitoring: [
        'Laravel Telescope',
        'Custom Logging',
        'Audit Trails',
        'Health Check Endpoints',
      ],
    },
    metrics: {
      scale: '11 microservices with 10+ optimized database schemas',
      performance:
        '95% reduction in complex query execution time (20min → 30sec)',
      architecture: 'Multi-tenant support with complete data isolation',
      security:
        'Enterprise-grade authentication with comprehensive audit logging',
      storage: 'Scalable object storage with S3-compatible MinIO API',
      communication:
        'Standardized service communication with unified API response formats',
    },
    challenges: [
      'Implementing enterprise-grade authentication across 11 microservices with custom timeout requirements',
      'Solving performance bottlenecks in complex reporting (20+ minute queries to sub-30 seconds)',
      'Managing microservice communication complexity with consistent patterns and error handling',
      'Orchestrating container deployment across multiple services with shared dependencies',
      'Designing flexible dynamic form engine with runtime generation and conditional logic',
      'Implementing workflow state machines for configurable business process automation',
    ],
    learnings: [
      'Microservices architecture patterns and service communication strategies',
      'Enterprise authentication and authorization with Laravel Sanctum extensions',
      'Database performance optimization techniques for large-scale data processing',
      'Container orchestration and deployment strategies with Docker Compose',
      'API Gateway patterns for centralized routing and authentication',
      'Event-driven architecture and asynchronous processing patterns',
      'Security compliance requirements for enterprise and government systems',
      'Multi-tenant architecture design with data isolation and scalability',
    ],
  },
  {
    id: 1,
    title: 'SQL Playground - Interactive Learning Platform',
    subtitle: 'Gamified Database Education with Advanced Analytics',
    description:
      'Ever felt like SQL skills were getting rusty in the ORM era? I built this interactive learning platform to make SQL practice fun and engaging. It features progressive challenges, real-time feedback, streak tracking, and points system to keep you motivated while mastering database queries.',
    motivation:
      "As we've shifted to the ORM era, writing raw SQL queries has become rare unless we hit performance bottlenecks. But SQL is incredibly powerful, and mastering it shouldn't be boring. I created this gamified platform where you can log in, choose categories, pick challenges, and solve them while tracking your progress and maintaining streaks.",
    image: sqlDashboard,
    gif: sqlGif,
    gallery: [
      {
        src: sqlDashboard,
        alt: 'SQL Playground Dashboard',
        caption:
          'Main dashboard showing progress tracking and challenge categories',
      },
      {
        src: sqlLogin,
        alt: 'Login Interface',
        caption: 'Clean authentication interface with progress tracking',
      },
      {
        src: sqlDbSchema,
        alt: 'Interactive Database Schema',
        caption:
          'ReactFlow-based interactive database visualization with zoom/pan',
      },
      {
        src: sqlTableSchema,
        alt: 'Table Schema Details',
        caption: 'Detailed table structure with relationships and constraints',
      },
      {
        src: sqlProgress,
        alt: 'Progress Tracking',
        caption:
          'Comprehensive progress tracking with streak system and points',
      },
      {
        src: sqlSuccess,
        alt: 'Success Celebration',
        caption:
          'Celebration effects with particle animations for achievements',
      },
      {
        src: sqlHelp,
        alt: 'Help Documentation',
        caption: 'Built-in help system with SQL syntax reference',
      },
      {
        src: sqlAbout,
        alt: 'About Page',
        caption: 'Platform overview and learning methodology explanation',
      },
    ],
    technologies: ['Laravel', 'React', 'TypeScript', 'MySQL', 'Docker', 'JWT'],
    liveUrl: 'https://imran-sql-playground.netlify.app/',
    githubUrl: 'https://github.com/imranctg16/sql-playground',
    blogPostId: null, // Blog is separate from projects
    featured: true,
    category: 'Full-Stack',
    duration: '3 months',
    teamSize: '1 developer',
    status: 'Production',
    overview:
      'Interactive SQL learning platform with gamification elements, real-time query evaluation, and comprehensive progress tracking designed for database education.',
    problemStatement:
      'Traditional SQL learning methods lack engagement and fail to provide hands-on experience with real database scenarios, making it difficult for students to master complex query concepts.',
    solution:
      'Built a comprehensive learning platform combining progressive challenges, real-time feedback, interactive database diagrams, and streak tracking to create an engaging educational experience.',
    keyFeatures: [
      'Progressive Difficulty Engine with 15 meticulously crafted questions (5-30pts)',
      'Real-time SQL Evaluation with secure query execution sandbox',
      'Interactive Database Diagrams using ReactFlow with zoom/pan capabilities',
      'Daily Streak System with sophisticated activity tracking',
      'Celebration Effects with custom particle animation system',
      'Syntax-Highlighted SQL Editor with intelligent formatting',
      'Multi-table JOINs and complex aggregation challenges',
      'Comprehensive testing suite with 95%+ coverage',
    ],
    technicalHighlights: [
      'Custom Query Evaluation Engine with secure SELECT-only execution',
      'Laravel Sanctum integration for token-based authentication',
      'ReactFlow-based interactive database schema visualization',
      'Real-time progress tracking with browser storage persistence',
      'Docker containerization with MySQL initialization scripts',
      'Sub-200ms query evaluation response times',
    ],
    architecture: {
      frontend: [
        'React 18',
        'TypeScript',
        'ReactFlow',
        'Tailwind CSS',
        'Custom Animations',
      ],
      backend: ['Laravel 8', 'PHP', 'RESTful APIs', 'Laravel Sanctum'],
      database: ['MySQL 8.0', 'Normalized Schema', 'Query Optimization'],
      infrastructure: ['Docker', 'Container Orchestration', 'Netlify'],
      testing: [
        'PHPUnit',
        'Jest',
        'Integration Testing',
        '19 comprehensive tests',
      ],
    },
    metrics: {
      performance: 'Sub-200ms query evaluation',
      testing: '95%+ test coverage',
      scalability: '1000+ requests/minute capability',
      education: '15 progressive SQL challenges',
    },
    challenges: [
      'Implementing secure SQL execution sandbox preventing data manipulation',
      'Designing intelligent result comparison algorithms with tolerance handling',
      'Creating engaging gamification without compromising educational value',
      'Building complex ReactFlow diagrams with optimal performance',
    ],
    learnings: [
      'Security-first approach in educational platforms',
      'Importance of progressive difficulty in learning systems',
      'Value of real-time feedback in skill development',
      'Gamification as a powerful engagement tool',
    ],
  },
  {
    id: 2,
    title: 'AWS Exam Prep - Full-Stack Learning Management',
    subtitle: 'Comprehensive AWS Certification Platform',
    description:
      "While preparing for my AWS Solutions Architect certification, I couldn't find a decent free platform for topic-wise practice. So I built one myself! This app contains 968+ carefully curated questions, topic-wise quizzes, mock exams, and note-taking features to make AWS exam prep more effective.",
    motivation:
      'During my AWS Solutions Architect certification preparation, I realized there were hardly any free applications providing comprehensive practice exams on different AWS topics. I collected around 968 questions from various sources and built this platform where you can practice questions by individual topics, save notes, and take both topic-specific quizzes and full mock exams.',
    image: awsDashboard,
    gif: awsGif,
    gallery: [
      {
        src: awsDashboard,
        alt: 'AWS Exam Prep Dashboard',
        caption:
          'Main dashboard with comprehensive question statistics and progress tracking',
      },
      {
        src: awsLogin,
        alt: 'Authentication System',
        caption: 'Secure login system with Laravel Sanctum integration',
      },
      {
        src: awsQuestion,
        alt: 'Practice Questions Interface',
        caption:
          'Clean question interface with detailed explanations and references',
      },
      {
        src: awsTopicQuiz,
        alt: 'Topic-Based Quiz Mode',
        caption: 'Organized practice by AWS service categories and topics',
      },
      {
        src: awsTopicQuiz2,
        alt: 'Quiz Results Analytics',
        caption:
          'Detailed performance analytics with strengths and improvement areas',
      },
      {
        src: awsNotes,
        alt: 'Personal Notes System',
        caption:
          'Topic-based note-taking system for effective study organization',
      },
    ],
    technologies: ['Laravel', 'Vue.js', 'MongoDB', 'Docker', 'Nginx', 'Vite'],
    liveUrl: '#',
    githubUrl: 'https://github.com/imranctg16/aws-exam-prep',
    blogPostId: null, // Blog is separate from projects
    featured: true,
    category: 'Full-Stack',
    duration: '4 months',
    teamSize: '1 developer',
    status: 'Development',
    overview:
      'Enterprise-grade learning management system for AWS certification preparation with comprehensive question banks, progress tracking, and performance analytics.',
    problemStatement:
      'Fragmented AWS study resources and lack of comprehensive progress tracking make certification preparation inefficient and difficult to measure.',
    solution:
      'Developed a unified platform consolidating AWS exam materials with detailed analytics, performance metrics, and targeted learning paths.',
    keyFeatures: [
      'Comprehensive Question Bank with 1000+ AWS SAA-C03 practice questions',
      'Topic-Based Organization by AWS services and concepts',
      'Multiple Quiz Types including Mock Exams and Topic-Specific Quizzes',
      'Performance Analytics with detailed statistics and progress tracking',
      'Personal Notes system for topic-based study materials',
      'Search Functionality across questions and topics',
      'Mobile Responsive design for study anywhere',
      'Secure Authentication with Laravel Sanctum',
    ],
    technicalHighlights: [
      'Microservices-ready containerized architecture',
      'MongoDB integration with Laravel for flexible data storage',
      'Vue.js 3.4 with modern composition API',
      'Custom Artisan commands for data management',
      'Docker Compose multi-container orchestration',
      'Nginx reverse proxy and static file serving',
    ],
    architecture: {
      frontend: [
        'Vue.js 3.4',
        'Vue Router 4.x',
        'Pinia 2.x',
        'Tailwind CSS',
        'Vite 5.x',
      ],
      backend: ['PHP 8.0+', 'Laravel 8.x', 'Laravel Sanctum', 'Eloquent ORM'],
      database: [
        'MongoDB 7.0',
        'Flexible Document Storage',
        'Custom Collections',
      ],
      infrastructure: ['Docker Compose', 'Nginx', 'Multi-container Setup'],
      tools: ['Artisan Commands', 'Git Version Control', 'Custom CLI Tools'],
    },
    metrics: {
      content: '1000+ practice questions',
      features: 'Multiple quiz types and analytics',
      architecture: 'Microservices-ready design',
      security: 'JWT-based authentication',
    },
    challenges: [
      'Designing flexible question categorization system',
      'Implementing comprehensive progress analytics',
      'Creating efficient search across large question datasets',
      'Building responsive design for mobile study sessions',
    ],
    learnings: [
      'MongoDB integration patterns with Laravel',
      'Importance of flexible data modeling in educational platforms',
      'User experience considerations for learning applications',
      'Containerization benefits for development and deployment',
    ],
  },
  {
    id: 3,
    title: 'README Reader Pro',
    subtitle: 'Modern Markdown Viewer with Advanced Features',
    description:
      'As someone who works with tons of documentation daily, I needed a solution to read multiple markdown files side by side without losing focus. This React app lets you open multiple docs in tabs, preview and edit live, supports Mermaid diagrams, and handles code snippets beautifully.',
    motivation:
      "I do a lot of documentation work and often need to read multiple doc files side by side without losing focus. I couldn't find a decent solution that met my needs, so I created this React project where you can read multiple notes simultaneously, preview and edit live, with full support for Mermaid diagrams and code snippets.",
    image: readme1,
    gif: readmeGif,
    gallery: [
      {
        src: readme1,
        alt: 'README Reader Main Interface',
        caption:
          'Clean markdown viewer with glassmorphism design and multi-tab support',
      },
      {
        src: readme2,
        alt: 'Mermaid Diagram Integration',
        caption:
          'Interactive Mermaid diagrams with zoom, pan, and fullscreen capabilities',
      },
      {
        src: readme3,
        alt: 'Code Syntax Highlighting',
        caption:
          'Beautiful syntax highlighting for 20+ programming languages with theme support',
      },
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'Mermaid', 'CSS3'],
    liveUrl: 'https://readme-reader.netlify.app/',
    githubUrl: 'https://github.com/imranctg16/readme-reader',
    blogPostId: null, // Blog is separate from projects
    featured: true,
    category: 'Frontend',
    duration: '2 months',
    teamSize: '1 developer',
    status: 'Production',
    overview:
      'Feature-rich markdown viewer with interactive Mermaid diagrams, multi-tab support, and modern glassmorphism design optimized for developers.',
    problemStatement:
      'Existing markdown viewers lack interactive features, proper diagram support, and modern user interfaces, making documentation review cumbersome.',
    solution:
      'Built a comprehensive markdown viewer with advanced Mermaid diagram support, multi-tab functionality, and modern UI design.',
    keyFeatures: [
      'Interactive Mermaid Diagrams with zoom, pan, and fullscreen support',
      'IDE-like Syntax Highlighting for 20+ programming languages',
      'Multi-tab Support for working with multiple files simultaneously',
      'Real-time Preview with instant markdown rendering',
      'Export Capabilities for downloading diagrams as SVG files',
      'Theme Switching with 5 different diagram themes',
      'Fully Responsive design optimized for all devices',
      'Modern Glassmorphism UI with smooth animations',
    ],
    technicalHighlights: [
      'React 19.1.0 with TypeScript for type safety',
      'Vite 7.0.4 for lightning-fast development and builds',
      'Custom CSS animations and glassmorphism effects',
      'Mermaid 11.9.0 integration with advanced controls',
      'React Syntax Highlighter for beautiful code display',
      'Responsive design with CSS Grid and Flexbox',
    ],
    architecture: {
      frontend: ['React 19.1.0', 'TypeScript', 'Custom CSS', 'CSS Variables'],
      libraries: [
        'react-markdown 10.1.0',
        'mermaid 11.9.0',
        'react-syntax-highlighter',
        'lucide-react',
      ],
      build: ['Vite 7.0.4', 'ESLint', 'Modern Build Pipeline'],
      design: ['Glassmorphism', 'CSS Animations', 'Responsive Layout'],
      fonts: ['Inter (Google Fonts)', 'JetBrains Mono', 'Modern Typography'],
    },
    metrics: {
      performance: 'Lighthouse score 95+ across all metrics',
      size: '~500KB production gzipped',
      features: '20+ programming languages supported',
      themes: '5 diagram themes available',
    },
    challenges: [
      'Implementing smooth diagram interactions with zoom and pan',
      'Creating responsive design that works across all devices',
      'Optimizing bundle size while maintaining rich features',
      'Building intuitive multi-tab interface',
    ],
    learnings: [
      'Advanced React patterns with TypeScript',
      'CSS-in-JS alternatives and custom CSS approaches',
      'Mermaid.js integration and customization',
      'Modern build tools and optimization techniques',
    ],
  },
  {
    id: 5,
    title: 'Personal Portfolio Website',
    subtitle: 'Modern Glassmorphism Design with Interactive Features',
    description:
      'My personal showcase built with React 18, featuring a modern glassmorphism design that balances aesthetics with functionality. This portfolio demonstrates my frontend skills while providing an engaging way to explore my projects, technical writing, and professional journey.',
    motivation:
      'I wanted to create a professional online presence that not only showcases my technical skills but also reflects my design sensibilities and attention to detail. This portfolio serves as both a demonstration of my frontend capabilities and a platform to share my projects and technical insights.',
    image: portfolioImage,
    gallery: [
      {
        src: portfolioImage,
        alt: 'Portfolio Homepage',
        caption:
          'Modern glassmorphism design with interactive animations and smooth transitions',
      },
    ],
    technologies: [
      'React 18',
      'Material-UI',
      'Framer Motion',
      'Vite',
      'Tailwind CSS',
      'React Router',
    ],
    liveUrl: '#', // Will be deployed soon
    githubUrl: '#', // Private repository
    blogPostId: null,
    featured: false,
    category: 'Frontend',
    duration: '2 months',
    teamSize: '1 developer',
    status: 'Production',
    overview:
      'Modern portfolio website showcasing technical projects, skills, and blog posts with glassmorphism design and interactive user experience.',
    problemStatement:
      'Need for a professional online presence that effectively showcases technical skills, projects, and provides engaging user experience across all devices.',
    solution:
      'Built a comprehensive portfolio with modern design trends, interactive animations, integrated blog system, and optimized performance for professional presentation.',
    keyFeatures: [
      'Glassmorphism Design with backdrop blur and transparency effects',
      'Interactive Animations with Framer Motion and micro-interactions',
      'Responsive Layout with mobile-first design approach',
      'Integrated Blog System with ReactMarkdown and syntax highlighting',
      'Project Gallery with modal viewing and image optimization',
      'Dynamic Theme System with light/dark mode persistence',
      'Performance Optimized with Vite and lazy loading',
      'SEO Optimized with meta tags and structured data',
    ],
    technicalHighlights: [
      'React 18 with modern hooks and context patterns',
      'Material-UI v7 with custom theme implementation',
      'Framer Motion for smooth animations and transitions',
      'Vite build system for optimal development experience',
      'Tailwind CSS for utility-first styling approach',
      'Responsive design with mobile-first approach',
    ],
    architecture: {
      frontend: ['React 18', 'JSX', 'Modern Hooks', 'Context API'],
      styling: [
        'Material-UI v7',
        'Tailwind CSS',
        'Custom Glassmorphism',
        'Responsive Design',
      ],
      animations: ['Framer Motion', 'CSS Transitions', 'Micro-interactions'],
      routing: ['React Router 7', 'Dynamic Routing', 'Page Transitions'],
      build: ['Vite 5', 'Hot Module Replacement', 'Optimized Bundling'],
    },
    metrics: {
      performance: 'Lighthouse score 98+ with sub-1s loading times',
      design: '100% responsive with 9 interactive background effects',
      codebase: '85%+ component reusability with TypeScript integration',
      accessibility: 'WCAG 2.1 AA compliant with full keyboard navigation',
    },
    challenges: [
      'Implementing performant glassmorphism effects',
      'Creating smooth animations without performance impact',
      'Ensuring cross-browser compatibility',
      'Optimizing images and assets for fast loading',
    ],
    learnings: [
      'Modern CSS techniques and glassmorphism implementation',
      'React 18 features and performance optimization',
      'Animation principles and user experience design',
      'Build tools and deployment optimization',
    ],
  },
];

// Helper function to get project by ID
export const getProjectById = (id) => {
  return projects.find((project) => project.id === parseInt(id));
};
