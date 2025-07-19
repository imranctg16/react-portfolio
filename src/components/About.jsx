import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Stack,
  Avatar,
} from '@mui/material';
import {
  Code,
  Coffee,
  Lightbulb,
  Group,
  EmojiEvents,
  LocationOn,
  CalendarToday,
  TrackChanges,
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { fadeIn, slideIn, zoomIn } from '../utils/motion';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const highlights = [
    {
      icon: Code,
      title: 'Clean Code Advocate',
      description: 'Writing maintainable, scalable code that stands the test of time',
    },
    {
      icon: Lightbulb,
      title: 'Problem Solver',
      description: 'Turning complex challenges into elegant, user-friendly solutions',
    },
    {
      icon: Group,
      title: 'Team Collaborator',
      description: 'Thriving in cross-functional teams and mentoring junior developers',
    },
    {
      icon: TrackChanges,
      title: 'Results Driven',
      description: 'Focused on delivering measurable impact and exceptional user experiences',
    }
  ];

  const stats = [
    { number: '5+', label: 'Years Experience', icon: CalendarToday },
    { number: '50+', label: 'Projects Completed', icon: Code },
    { number: '15+', label: 'Technologies', icon: EmojiEvents },
    { number: '3', label: 'Countries Worked', icon: LocationOn }
  ];


  return (
    <Box
      component="section"
      id="about"
      ref={ref}
      className="theme-transition section-spacing"
      sx={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" className="section-container">
        <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <Box className="section-header">
            <Typography
              variant="h2"
              className="text-gradient"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              About Me
            </Typography>
            
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: inView ? 1 : 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
              <Box
                sx={{
                  width: 80,
                  height: 4,
                  bgcolor: 'primary.main',
                  mx: 'auto',
                  mb: 4,
                  borderRadius: 2,
                  transformOrigin: 'center',
                }}
              />
            </motion.div>
            
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Passionate software engineer with a love for creating digital experiences that make a difference
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={4} sx={{ mb: 12 }}>
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={stat.label}>
              <motion.div variants={zoomIn(index * 0.1, 0.5)} initial="hidden" animate={inView ? 'show' : 'hidden'} whileHover={{ y: -10, scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}>
                <Card
                  className="glass-card theme-transition micro-lift"
                  sx={{
                    textAlign: 'center',
                    p: 3,
                    borderRadius: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'primary.main',
                      mx: 'auto',
                      mb: 2,
                      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                    }}
                  >
                    <stat.icon />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
                    {stat.number}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" fontWeight="medium">
                    {stat.label}
                  </Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={8} className="content-grid">
          <Grid item xs={12} lg={6}>
            <Stack spacing={4}>
              <motion.div variants={slideIn('left', 'tween', 0.2, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <Card className="glass-card theme-transition" sx={{ p: 4, borderRadius: 4 }}>
                  <Typography variant="h4" fontWeight="bold" color="text.primary" sx={{ mb: 3 }}>
                    My Journey
                  </Typography>
                  
                  <Stack spacing={3}>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      <Coffee sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
                      I&apos;m a passionate software engineer with over 5 years of experience crafting 
                      digital solutions that solve real-world problems. My journey started with a 
                      curiosity about how things work, which evolved into a deep love for creating 
                      elegant, efficient code.
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      I specialize in full-stack development with a focus on modern JavaScript 
                      frameworks, cloud architecture, and user experience design. I believe that 
                      great software is not just about functionality—it's about creating 
                      experiences that delight users and empower businesses.
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      When I'm not coding, you'll find me exploring new technologies, 
                      contributing to open-source projects, or sharing knowledge through tech talks 
                      and mentoring. I'm always excited about the next challenge and the 
                      opportunity to learn something new.
                    </Typography>
                  </Stack>
                </Card>
              </motion.div>

              <Grid container spacing={2}>
                {highlights.map((highlight, index) => (
                  <Grid item xs={12} sm={6} key={highlight.title}>
                    <motion.div variants={fadeIn('up', 'spring', index * 0.2, 0.75)} initial="hidden" animate={inView ? 'show' : 'hidden'} whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}>
                      <Card
                        className="glass-card theme-transition micro-lift"
                        sx={{
                          p: 3,
                          height: '100%',
                          borderRadius: 3,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 48,
                            height: 48,
                            background: index % 2 === 0 
                              ? 'linear-gradient(135deg, #6366f1 0%, #8183f5 100%)'
                              : 'linear-gradient(135deg, #ec4899 0%, #f06fab 100%)',
                            mb: 2,
                            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                          }}
                        >
                          <highlight.icon />
                        </Avatar>
                        <Typography variant="h6" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
                          {highlight.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {highlight.description}
                        </Typography>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Stack spacing={4}>
              <motion.div variants={slideIn('right', 'tween', 0.2, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <Card className="glass-card theme-transition" sx={{ p: 4, borderRadius: 4 }}>
                  <Typography variant="h4" fontWeight="bold" color="text.primary" sx={{ mb: 3 }}>
                    What Drives Me
                  </Typography>
                  
                  <Stack spacing={3}>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      🚀 I&apos;m passionate about creating technology that makes a real difference. 
                      Whether it&apos;s building scalable web applications, optimizing user experiences, 
                      or mentoring the next generation of developers, I find purpose in solving 
                      complex problems with elegant solutions.
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      🌱 Continuous learning is at the core of everything I do. The tech industry 
                      evolves rapidly, and I embrace that challenge by staying curious and 
                      adaptable. Currently diving deep into AI/ML and exploring how emerging 
                      technologies can enhance human capabilities.
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      🤝 Collaboration and knowledge sharing energize me. I believe the best 
                      solutions come from diverse perspectives working together. I actively 
                      contribute to open-source projects and enjoy mentoring others in their 
                      coding journey.
                    </Typography>
                  </Stack>
                </Card>
              </motion.div>

              <motion.div variants={zoomIn(0.4, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                <Card
                  className="glass-card theme-transition"
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: '2px solid rgba(99, 102, 241, 0.3)',
                    background: 'rgba(99, 102, 241, 0.02)',
                  }}
                >
                  <Typography variant="h5" fontWeight="bold" color="primary.main" sx={{ mb: 2 }}>
                    💡 Fun Fact
                  </Typography>
                  <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.7 }}>
                    I&apos;ve written over 100,000 lines of code, debugged countless issues at 3 AM, 
                    and still get excited every time I see &quot;Hello, World!&quot; in a new language. 
                    Coffee is my debugging companion, and I have a collection of rubber ducks 
                    that are excellent listeners during problem-solving sessions.
                  </Typography>
                </Card>
              </motion.div>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;