import { motion } from 'framer-motion';
import { Server, Database, Cloud, Shield, Zap, Cpu, Globe, Users } from 'lucide-react';

const ArchitectureDiagram = ({ projectId }) => {
  // Different architecture diagrams based on project
  const architectures = {
    1: { // CyberCommerce Platform
      title: 'Microservices E-commerce Architecture',
      components: [
        {
          id: 'frontend',
          name: 'React Frontend',
          icon: Globe,
          position: { x: 50, y: 10 },
          color: 'neon-cyan',
          connections: ['api-gateway'],
          description: 'PWA with offline capabilities'
        },
        {
          id: 'api-gateway',
          name: 'API Gateway',
          icon: Shield,
          position: { x: 50, y: 25 },
          color: 'neon-pink',
          connections: ['user-service', 'product-service', 'order-service'],
          description: 'Rate limiting & authentication'
        },
        {
          id: 'user-service',
          name: 'User Service',
          icon: Users,
          position: { x: 20, y: 45 },
          color: 'neon-green',
          connections: ['user-db'],
          description: 'Authentication & profiles'
        },
        {
          id: 'product-service',
          name: 'Product Service',
          icon: Server,
          position: { x: 50, y: 45 },
          color: 'neon-yellow',
          connections: ['product-db', 'search-engine'],
          description: 'Catalog management'
        },
        {
          id: 'order-service',
          name: 'Order Service',
          icon: Zap,
          position: { x: 80, y: 45 },
          color: 'neon-orange',
          connections: ['order-db', 'payment-service'],
          description: 'Order processing'
        },
        {
          id: 'payment-service',
          name: 'Payment Service',
          icon: Shield,
          position: { x: 80, y: 65 },
          color: 'neon-pink',
          connections: ['payment-db'],
          description: 'Secure payments'
        },
        {
          id: 'user-db',
          name: 'User DB',
          icon: Database,
          position: { x: 20, y: 70 },
          color: 'neon-cyan',
          connections: [],
          description: 'MongoDB'
        },
        {
          id: 'product-db',
          name: 'Product DB',
          icon: Database,
          position: { x: 35, y: 70 },
          color: 'neon-green',
          connections: [],
          description: 'MongoDB'
        },
        {
          id: 'order-db',
          name: 'Order DB',
          icon: Database,
          position: { x: 65, y: 70 },
          color: 'neon-yellow',
          connections: [],
          description: 'MongoDB'
        },
        {
          id: 'payment-db',
          name: 'Payment DB',
          icon: Database,
          position: { x: 80, y: 85 },
          color: 'neon-pink',
          connections: [],
          description: 'Encrypted storage'
        },
        {
          id: 'search-engine',
          name: 'ElasticSearch',
          icon: Cpu,
          position: { x: 35, y: 55 },
          color: 'neon-purple',
          connections: [],
          description: 'Product search'
        },
        {
          id: 'cache',
          name: 'Redis Cache',
          icon: Zap,
          position: { x: 10, y: 30 },
          color: 'neon-orange',
          connections: [],
          description: 'Session & data cache'
        },
        {
          id: 'cdn',
          name: 'CDN',
          icon: Cloud,
          position: { x: 20, y: 10 },
          color: 'neon-blue',
          connections: [],
          description: 'Global content delivery'
        }
      ]
    },
    2: { // NeuroTask AI
      title: 'AI-Powered Project Management Architecture',
      components: [
        {
          id: 'frontend',
          name: 'React Dashboard',
          icon: Globe,
          position: { x: 50, y: 10 },
          color: 'neon-cyan',
          connections: ['api-gateway'],
          description: 'Real-time analytics UI'
        },
        {
          id: 'api-gateway',
          name: 'FastAPI Gateway',
          icon: Shield,
          position: { x: 50, y: 25 },
          color: 'neon-pink',
          connections: ['ml-service', 'task-service', 'user-service'],
          description: 'Authentication & routing'
        },
        {
          id: 'ml-service',
          name: 'ML Service',
          icon: Cpu,
          position: { x: 25, y: 45 },
          color: 'neon-green',
          connections: ['model-store', 'vector-db'],
          description: 'TensorFlow models'
        },
        {
          id: 'task-service',
          name: 'Task Service',
          icon: Server,
          position: { x: 50, y: 45 },
          color: 'neon-yellow',
          connections: ['postgres'],
          description: 'Task management logic'
        },
        {
          id: 'user-service',
          name: 'User Service',
          icon: Users,
          position: { x: 75, y: 45 },
          color: 'neon-orange',
          connections: ['postgres'],
          description: 'User profiles & auth'
        },
        {
          id: 'model-store',
          name: 'Model Store',
          icon: Database,
          position: { x: 15, y: 65 },
          color: 'neon-purple',
          connections: [],
          description: 'MLflow registry'
        },
        {
          id: 'vector-db',
          name: 'Vector DB',
          icon: Database,
          position: { x: 35, y: 65 },
          color: 'neon-blue',
          connections: [],
          description: 'Pinecone embeddings'
        },
        {
          id: 'postgres',
          name: 'PostgreSQL',
          icon: Database,
          position: { x: 65, y: 65 },
          color: 'neon-cyan',
          connections: [],
          description: 'Primary database'
        },
        {
          id: 'redis',
          name: 'Redis Cache',
          icon: Zap,
          position: { x: 85, y: 65 },
          color: 'neon-pink',
          connections: [],
          description: 'Real-time cache'
        },
        {
          id: 'websocket',
          name: 'WebSocket',
          icon: Zap,
          position: { x: 75, y: 25 },
          color: 'neon-green',
          connections: [],
          description: 'Real-time updates'
        }
      ]
    },
    3: { // CyberWeather Network
      title: 'IoT Weather Intelligence Architecture',
      components: [
        {
          id: 'frontend',
          name: 'Vue.js Dashboard',
          icon: Globe,
          position: { x: 50, y: 10 },
          color: 'neon-cyan',
          connections: ['api-server'],
          description: '3D weather visualization'
        },
        {
          id: 'iot-sensors',
          name: 'IoT Sensors',
          icon: Cpu,
          position: { x: 10, y: 30 },
          color: 'neon-green',
          connections: ['mqtt-broker'],
          description: '1000+ weather sensors'
        },
        {
          id: 'mqtt-broker',
          name: 'MQTT Broker',
          icon: Server,
          position: { x: 30, y: 40 },
          color: 'neon-pink',
          connections: ['data-processor'],
          description: 'AWS IoT Core'
        },
        {
          id: 'data-processor',
          name: 'Data Processor',
          icon: Zap,
          position: { x: 50, y: 40 },
          color: 'neon-yellow',
          connections: ['timeseries-db', 'prediction-engine'],
          description: 'Real-time processing'
        },
        {
          id: 'api-server',
          name: 'API Server',
          icon: Server,
          position: { x: 70, y: 30 },
          color: 'neon-orange',
          connections: ['timeseries-db', 'postgres'],
          description: 'Node.js REST API'
        },
        {
          id: 'prediction-engine',
          name: 'ML Prediction',
          icon: Cpu,
          position: { x: 30, y: 60 },
          color: 'neon-purple',
          connections: ['model-store'],
          description: 'Weather forecasting'
        },
        {
          id: 'timeseries-db',
          name: 'InfluxDB',
          icon: Database,
          position: { x: 50, y: 70 },
          color: 'neon-blue',
          connections: [],
          description: 'Time-series data'
        },
        {
          id: 'postgres',
          name: 'PostgreSQL',
          icon: Database,
          position: { x: 70, y: 70 },
          color: 'neon-cyan',
          connections: [],
          description: 'Metadata storage'
        },
        {
          id: 'model-store',
          name: 'Model Store',
          icon: Database,
          position: { x: 30, y: 80 },
          color: 'neon-green',
          connections: [],
          description: 'ML models'
        },
        {
          id: 'edge-computing',
          name: 'Edge Computing',
          icon: Zap,
          position: { x: 10, y: 50 },
          color: 'neon-pink',
          connections: [],
          description: 'Local processing'
        }
      ]
    }
  };

  const arch = architectures[projectId] || architectures[1];

  const ConnectionLine = ({ from, to, components }) => {
    const fromComponent = components.find(c => c.id === from);
    const toComponent = components.find(c => c.id === to);
    
    if (!fromComponent || !toComponent) return null;

    return (
      <motion.line
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.6 }}
        transition={{ duration: 2, delay: 1 }}
        x1={`${fromComponent.position.x}%`}
        y1={`${fromComponent.position.y + 3}%`}
        x2={`${toComponent.position.x}%`}
        y2={`${toComponent.position.y + 3}%`}
        stroke="url(#connectionGradient)"
        strokeWidth="2"
        className="animate-pulse"
      />
    );
  };

  return (
    <div className="w-full h-96 bg-dark-900 rounded-2xl border border-neon-cyan/20 overflow-hidden relative">
      {/* Title */}
      <div className="absolute top-4 left-4 z-20">
        <h3 className="text-xl font-bold text-neon-cyan">{arch.title}</h3>
        <p className="text-sm text-gray-400">High-Level Design</p>
      </div>

      {/* SVG Container */}
      <svg className="w-full h-full relative z-10">
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#00ff41" stopOpacity="0.8"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Connection Lines */}
        {arch.components.map(component => 
          component.connections.map(connectionId => (
            <ConnectionLine 
              key={`${component.id}-${connectionId}`}
              from={component.id}
              to={connectionId}
              components={arch.components}
            />
          ))
        )}

        {/* Components */}
        {arch.components.map((component, index) => (
          <g key={component.id}>
            {/* Component Background */}
            <motion.circle
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              cx={`${component.position.x}%`}
              cy={`${component.position.y}%`}
              r="25"
              fill="rgba(10, 10, 15, 0.9)"
              stroke={`var(--${component.color})`}
              strokeWidth="2"
              filter="url(#glow)"
              className="animate-cyber-glow"
            />
            
            {/* Component Icon */}
            <foreignObject
              x={`${component.position.x - 1.5}%`}
              y={`${component.position.y - 1.5}%`}
              width="3%"
              height="6%"
            >
              <div className="flex items-center justify-center w-full h-full">
                <component.icon className={`w-6 h-6 text-${component.color}`} />
              </div>
            </foreignObject>
            
            {/* Component Label */}
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              x={`${component.position.x}%`}
              y={`${component.position.y + 8}%`}
              textAnchor="middle"
              className={`text-xs font-semibold fill-${component.color}`}
            >
              {component.name}
            </motion.text>
            
            {/* Description */}
            <motion.text
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              x={`${component.position.x}%`}
              y={`${component.position.y + 12}%`}
              textAnchor="middle"
              className="text-xs fill-gray-400"
            >
              {component.description}
            </motion.text>
          </g>
        ))}
      </svg>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Data Flow Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-cyan rounded-full opacity-60"
            animate={{
              x: ['0%', '100%'],
              y: ['20%', '80%', '20%'],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5,
            }}
            style={{
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;