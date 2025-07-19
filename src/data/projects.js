export const projects = [
  {
    id: 1,
    title: 'CyberCommerce Platform',
    subtitle: 'Next-Gen E-commerce with Microservices',
    description: 'A highly scalable, cloud-native e-commerce platform built with microservices architecture, featuring real-time inventory management, AI-powered recommendations, and advanced security protocols.',
    image: '/project-images/ecommerce.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Kubernetes', 'GraphQL'],
    liveUrl: 'https://cybercommerce-demo.netlify.app',
    githubUrl: 'https://github.com/alexchen/cybercommerce-platform',
    featured: true,
    category: 'Full-Stack',
    duration: '6 months',
    teamSize: '5 developers',
    status: 'Production',
    overview: 'Revolutionary e-commerce platform designed for the next generation of online retail, featuring cutting-edge microservices architecture and AI-driven user experiences.',
    problemStatement: 'Traditional e-commerce platforms struggle with scalability, real-time inventory management, and personalized user experiences. Monolithic architectures become bottlenecks as traffic scales.',
    solution: 'Built a cloud-native microservices platform with event-driven architecture, real-time data synchronization, and AI-powered personalization engine.',
    keyFeatures: [
      'Microservices architecture with independent scaling',
      'Real-time inventory synchronization across multiple channels',
      'AI-powered product recommendations and search',
      'Advanced fraud detection system',
      'Multi-tenant architecture supporting white-label deployments',
      'Real-time analytics dashboard',
      'Progressive Web App with offline capabilities',
      'Advanced caching strategies with Redis clusters'
    ],
    technicalHighlights: [
      'Event-driven architecture using Apache Kafka',
      'Container orchestration with Kubernetes',
      'CI/CD pipeline with GitLab and AWS CodePipeline',
      'Monitoring with Prometheus and Grafana',
      'Security scanning with OWASP ZAP integration',
      'Load testing with K6 achieving 10,000+ concurrent users'
    ],
    architecture: {
      frontend: ['React 18', 'TypeScript', 'Tailwind CSS', 'PWA', 'Webpack 5'],
      backend: ['Node.js', 'Express.js', 'GraphQL', 'REST APIs', 'WebSocket'],
      database: ['MongoDB Atlas', 'Redis Cluster', 'ElasticSearch'],
      infrastructure: ['AWS EKS', 'Docker', 'Kubernetes', 'Terraform'],
      monitoring: ['Prometheus', 'Grafana', 'ELK Stack', 'AWS CloudWatch'],
      security: ['OAuth 2.0', 'JWT', 'Rate Limiting', 'OWASP Security']
    },
    metrics: {
      performance: '99.9% uptime',
      scalability: '10,000+ concurrent users',
      responseTime: '< 200ms average',
      coverage: '95% test coverage'
    },
    challenges: [
      'Implementing distributed transaction management',
      'Ensuring data consistency across microservices',
      'Managing inter-service communication latency',
      'Implementing real-time inventory synchronization'
    ],
    learnings: [
      'Importance of event sourcing in distributed systems',
      'CQRS pattern for scalable read/write operations',
      'Circuit breaker pattern for fault tolerance',
      'Implementing saga pattern for distributed transactions'
    ]
  },
  {
    id: 2,
    title: 'NeuroTask AI',
    subtitle: 'AI-Powered Project Management',
    description: 'Revolutionary project management platform leveraging machine learning for intelligent task allocation, deadline prediction, and team productivity optimization.',
    image: '/project-images/taskmanager.jpg',
    technologies: ['React', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Redis', 'AWS'],
    liveUrl: 'https://neurotask-ai.netlify.app',
    githubUrl: 'https://github.com/alexchen/neurotask-ai',
    featured: true,
    category: 'AI/ML',
    duration: '8 months',
    teamSize: '4 developers + 2 ML engineers',
    status: 'Production',
    overview: 'Next-generation project management platform that uses artificial intelligence to optimize team productivity and predict project outcomes.',
    problemStatement: 'Traditional project management tools lack intelligence, leading to poor resource allocation, missed deadlines, and suboptimal team performance.',
    solution: 'Developed an AI-powered platform that learns from historical data to make intelligent predictions and recommendations for optimal project execution.',
    keyFeatures: [
      'AI-powered task allocation based on team member skills and availability',
      'Machine learning models for deadline prediction',
      'Intelligent workload balancing across team members',
      'Automated risk assessment and mitigation suggestions',
      'Natural language processing for requirement analysis',
      'Predictive analytics for project success probability',
      'Real-time collaboration with WebSocket integration',
      'Advanced reporting with data visualization'
    ],
    technicalHighlights: [
      'Custom neural networks for task complexity estimation',
      'NLP pipeline for automatic requirement extraction',
      'Real-time recommendation engine using collaborative filtering',
      'MLOps pipeline for continuous model improvement',
      'A/B testing framework for feature optimization',
      'Advanced caching with Redis for sub-100ms response times'
    ],
    architecture: {
      frontend: ['React 18', 'TypeScript', 'D3.js', 'WebSocket', 'Redux Toolkit'],
      backend: ['Python', 'FastAPI', 'Celery', 'WebSocket', 'REST APIs'],
      database: ['PostgreSQL', 'Redis', 'Vector Database (Pinecone)'],
      ml: ['TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy', 'MLflow'],
      infrastructure: ['AWS ECS', 'Docker', 'Terraform', 'AWS Lambda'],
      monitoring: ['Prometheus', 'Grafana', 'AWS CloudWatch', 'MLflow Tracking']
    },
    metrics: {
      accuracy: '92% deadline prediction accuracy',
      performance: '< 100ms API response time',
      productivity: '35% improvement in team productivity',
      satisfaction: '4.8/5 user satisfaction score'
    },
    challenges: [
      'Training models with limited historical project data',
      'Handling real-time model inference at scale',
      'Balancing model complexity with performance requirements',
      'Implementing explainable AI for business stakeholders'
    ],
    learnings: [
      'Importance of feature engineering in ML success',
      'Benefits of continuous learning systems',
      'Value of A/B testing in ML product development',
      'Critical role of data quality in model performance'
    ]
  },
  {
    id: 3,
    title: 'CyberWeather Network',
    subtitle: 'Real-time Weather Intelligence',
    description: 'Advanced weather analytics platform with IoT sensor integration, predictive modeling, and real-time visualization for enterprise weather intelligence.',
    image: '/project-images/weather.jpg',
    technologies: ['Vue.js', 'Node.js', 'InfluxDB', 'MQTT', 'AWS IoT', 'D3.js', 'WebSocket'],
    liveUrl: 'https://cyberweather-network.netlify.app',
    githubUrl: 'https://github.com/alexchen/cyberweather-network',
    featured: false,
    category: 'IoT/Analytics',
    duration: '4 months',
    teamSize: '3 developers',
    status: 'Production',
    overview: 'Enterprise-grade weather intelligence platform integrating IoT sensors with advanced analytics for real-time weather monitoring and prediction.',
    problemStatement: 'Existing weather services lack real-time granular data and fail to provide actionable insights for enterprise decision-making.',
    solution: 'Built a comprehensive weather network combining IoT sensors, satellite data, and machine learning for hyper-local weather intelligence.',
    keyFeatures: [
      'Real-time IoT sensor data collection and processing',
      'Advanced weather prediction models',
      'Interactive 3D weather visualizations',
      'Alert system for extreme weather conditions',
      'API for third-party integrations',
      'Historical weather data analysis',
      'Mobile-responsive dashboard',
      'Geospatial analysis and mapping'
    ],
    technicalHighlights: [
      'MQTT protocol for IoT device communication',
      'Time-series database optimization with InfluxDB',
      'Real-time data streaming with WebSocket',
      'Advanced data visualization with D3.js',
      'Geospatial queries with PostGIS',
      'Edge computing for sensor data preprocessing'
    ],
    architecture: {
      frontend: ['Vue.js 3', 'TypeScript', 'D3.js', 'Mapbox', 'PWA'],
      backend: ['Node.js', 'Express.js', 'MQTT', 'WebSocket', 'REST APIs'],
      database: ['InfluxDB', 'PostgreSQL', 'PostGIS', 'Redis'],
      iot: ['AWS IoT Core', 'MQTT', 'Edge Computing', 'Sensor Networks'],
      infrastructure: ['AWS EC2', 'Docker', 'Kubernetes', 'Terraform'],
      monitoring: ['Grafana', 'InfluxDB', 'AWS CloudWatch', 'Custom Dashboards']
    },
    metrics: {
      accuracy: '96% prediction accuracy',
      latency: '< 50ms sensor data processing',
      coverage: '1000+ IoT sensors deployed',
      uptime: '99.95% system availability'
    },
    challenges: [
      'Handling massive volumes of sensor data in real-time',
      'Ensuring data accuracy across distributed sensors',
      'Optimizing time-series database performance',
      'Managing IoT device connectivity and reliability'
    ],
    learnings: [
      'Importance of edge computing in IoT architectures',
      'Benefits of time-series databases for sensor data',
      'Value of real-time data visualization',
      'Critical role of data validation in sensor networks'
    ]
  }
];

// Helper function to get project by ID
export const getProjectById = (id) => {
  return projects.find(project => project.id === parseInt(id));
};