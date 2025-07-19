import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Clock, Users, Activity, Target, Zap, Shield, Award, BookOpen, Globe, Server, Database } from 'lucide-react';
import { getProjectById } from '../data/projects';
import ArchitectureDiagram from './ArchitectureDiagram';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = getProjectById(id);

  if (!project) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-neon-cyan mb-4">Project Not Found</h1>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const MetricCard = ({ icon: Icon, label, value, color = 'neon-cyan' }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-dark-800 border border-neon-cyan/20 rounded-xl p-6 text-center animate-cyber-glow"
    >
      <div className={`w-12 h-12 bg-gradient-to-r from-${color} to-neon-pink rounded-full flex items-center justify-center mx-auto mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className={`text-2xl font-bold text-${color} mb-2`}>{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </motion.div>
  );

  const TechBadge = ({ tech, index }) => (
    <motion.span
      key={tech}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-4 py-2 bg-dark-800 border border-neon-cyan/30 rounded-lg text-neon-cyan text-sm font-medium animate-cyber-glow cursor-pointer"
    >
      {tech}
    </motion.span>
  );

  const FeatureItem = ({ feature, index }) => (
    <motion.li
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex items-start space-x-3 text-gray-300"
    >
      <Zap className="w-5 h-5 text-neon-green mt-0.5 flex-shrink-0" />
      <span>{feature}</span>
    </motion.li>
  );

  const ArchitectureSection = ({ title, items, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-dark-800 border border-neon-cyan/20 rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-8 h-8 bg-gradient-to-r from-${color} to-neon-pink rounded-lg flex items-center justify-center`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h4 className="text-lg font-semibold text-white">{title}</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className={`px-3 py-1 bg-dark-700 border border-${color}/30 rounded-lg text-${color} text-sm`}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-dark-900 via-dark-800 to-dark-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        <div className="container-custom relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-neon-cyan hover:text-neon-pink transition-colors duration-300 mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Portfolio</span>
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className={`px-3 py-1 bg-dark-800 border border-neon-${project.category === 'AI/ML' ? 'pink' : 'cyan'}/30 rounded-full text-neon-${project.category === 'AI/ML' ? 'pink' : 'cyan'} text-sm font-medium`}>
                  {project.category}
                </span>
                <span className={`px-3 py-1 bg-success-500/20 border border-success-500/30 rounded-full text-success-400 text-sm font-medium`}>
                  {project.status}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                {project.title}
              </h1>
              
              <h2 className="text-2xl md:text-3xl text-neon-cyan mb-6 font-semibold">
                {project.subtitle}
              </h2>
              
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                {project.overview}
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Users className="w-5 h-5" />
                  <span>{project.teamSize}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-cyan to-neon-pink text-dark-900 font-bold rounded-xl transition-all duration-300"
                  style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Live Demo</span>
                </motion.a>
                
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-dark-800 border-2 border-neon-cyan text-neon-cyan font-bold rounded-xl hover:bg-neon-cyan hover:text-dark-900 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                  <span>Source Code</span>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="w-full h-80 bg-dark-800 rounded-2xl border border-neon-cyan/20 flex items-center justify-center relative overflow-hidden animate-cyber-glow">
                <Activity className="w-24 h-24 text-neon-cyan opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-transparent to-neon-pink/10 animate-hologram"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          >
            Project <span className="text-neon-cyan">Metrics</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(project.metrics).map(([key, value], index) => (
              <MetricCard
                key={key}
                icon={key.includes('performance') ? Zap : key.includes('accuracy') ? Target : key.includes('coverage') ? Shield : Award}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                color={index % 2 === 0 ? 'neon-cyan' : 'neon-pink'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="section-padding bg-dark-800/50">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          >
            System <span className="text-neon-pink">Architecture</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ArchitectureDiagram projectId={project.id} />
          </motion.div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-dark-800 border border-neon-pink/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-neon-pink mb-6 flex items-center">
                <Target className="w-6 h-6 mr-3" />
                Problem Statement
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {project.problemStatement}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-dark-800 border border-neon-green/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-neon-green mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-3" />
                Solution
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                {project.solution}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="section-padding bg-dark-800/30">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          >
            Key <span className="text-neon-green">Features</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-dark-800 border border-neon-cyan/20 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Core Features</h3>
              <ul className="space-y-4">
                {project.keyFeatures.slice(0, Math.ceil(project.keyFeatures.length / 2)).map((feature, index) => (
                  <FeatureItem key={index} feature={feature} index={index} />
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-dark-800 border border-neon-pink/20 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Advanced Features</h3>
              <ul className="space-y-4">
                {project.keyFeatures.slice(Math.ceil(project.keyFeatures.length / 2)).map((feature, index) => (
                  <FeatureItem key={index} feature={feature} index={index + Math.ceil(project.keyFeatures.length / 2)} />
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          >
            Technology <span className="text-neon-yellow">Stack</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {Object.entries(project.architecture).map(([category, items], index) => (
              <ArchitectureSection
                key={category}
                title={category.charAt(0).toUpperCase() + category.slice(1)}
                items={items}
                icon={category === 'frontend' ? Globe : category === 'backend' ? Server : Database}
                color={index % 3 === 0 ? 'neon-cyan' : index % 3 === 1 ? 'neon-pink' : 'neon-green'}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-white mb-6">All Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <TechBadge key={tech} tech={tech} index={index} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Challenges & Learnings */}
      <section className="section-padding bg-dark-800/50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-dark-800 border border-neon-orange/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-neon-orange mb-6 flex items-center">
                <Shield className="w-6 h-6 mr-3" />
                Technical Challenges
              </h3>
              <ul className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-3 text-gray-300"
                  >
                    <Target className="w-5 h-5 text-neon-orange mt-0.5 flex-shrink-0" />
                    <span>{challenge}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-dark-800 border border-neon-blue/20 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-neon-blue mb-6 flex items-center">
                <BookOpen className="w-6 h-6 mr-3" />
                Key Learnings
              </h3>
              <ul className="space-y-4">
                {project.learnings.map((learning, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-3 text-gray-300"
                  >
                    <Award className="w-5 h-5 text-neon-blue mt-0.5 flex-shrink-0" />
                    <span>{learning}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Highlights */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
          >
            Technical <span className="text-neon-purple">Highlights</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-dark-800 border border-neon-purple/20 rounded-2xl p-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {project.technicalHighlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <Zap className="w-5 h-5 text-neon-purple mt-1 flex-shrink-0" />
                  <span className="text-gray-300">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;