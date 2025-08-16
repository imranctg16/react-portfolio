import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
  IconButton,
  Link as MuiLink,
} from '@mui/material';
import {
  ArrowBack,
  Launch,
  GitHub,
  Visibility,
  Info,
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { fadeIn, slideIn } from '../utils/motion';
import { projects } from '../data/projects';
import { trackEvent, trackOutboundLink } from '../utils/analytics';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  // Tech color mapping based on technology type
  const getTechColor = (tech) => {
    const techLower = tech.toLowerCase();
    if (techLower.includes('react') || techLower.includes('vue') || techLower.includes('angular')) return 'info';
    if (techLower.includes('laravel') || techLower.includes('php') || techLower.includes('node')) return 'success';
    if (techLower.includes('mysql') || techLower.includes('mongodb') || techLower.includes('redis')) return 'warning';
    if (techLower.includes('docker') || techLower.includes('nginx') || techLower.includes('aws')) return 'secondary';
    if (techLower.includes('typescript') || techLower.includes('javascript')) return 'primary';
    return 'default';
  };

  return (
    <Box
      component="main"
      sx={{
        py: 8,
        bgcolor: 'background.default',
        overflow: 'hidden',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <Box sx={{ mb: 6 }} ref={ref}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
              <IconButton 
                onClick={() => navigate('/')}
                className="glass-button"
                sx={{ 
                  color: 'text.primary',
                  backgroundColor: 'transparent !important',
                }}
              >
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" color="text.secondary">
                Back to Home
              </Typography>
            </Stack>

            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                My Projects
              </Typography>
              
              <motion.div 
                initial={{ scaleX: 0 }} 
                animate={{ scaleX: inView ? 1 : 0 }} 
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
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
                A showcase of my latest work and personal projects, featuring modern web applications and innovative solutions.
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Featured Projects */}
        <motion.div variants={slideIn('up', 'tween', 0.3, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
            Featured Projects
          </Typography>
          
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {featuredProjects.map((project, index) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <motion.div
                  variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                >
                  <Card 
                    className="glass-card micro-lift theme-transition"
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: 'transparent',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={project.image}
                      alt={project.title}
                      sx={{ 
                        bgcolor: 'grey.200',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.875rem',
                        color: 'grey.600',
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Stack spacing={2}>
                        <Typography variant="h6" fontWeight="bold">
                          {project.title}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6, mb: 2 }}>
                          {project.description}
                        </Typography>

                        {/* Motivation Section */}
                        {project.motivation && (
                          <Box sx={{ 
                            mb: 3, 
                            p: 2.5, 
                            backgroundColor: 'rgba(245, 158, 11, 0.12)', 
                            borderRadius: 3, 
                            border: '2px solid rgba(245, 158, 11, 0.3)',
                            boxShadow: '0 2px 8px rgba(245, 158, 11, 0.1)',
                          }}>
                            <Typography 
                              variant="subtitle2" 
                              fontWeight="700" 
                              color="warning.main" 
                              sx={{ 
                                mb: 1.5, 
                                display: 'block',
                                fontSize: '0.85rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                              }}
                            >
                              💡 Why I Built This
                            </Typography>
                            <Typography 
                              variant="body2" 
                              color="text.primary" 
                              sx={{ 
                                fontSize: '0.9rem', 
                                lineHeight: 1.6,
                                fontWeight: 500,
                                display: '-webkit-box',
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {project.motivation}
                            </Typography>
                          </Box>
                        )}

                        <Stack direction="row" flexWrap="wrap" gap={0.5}>
                          {project.technologies.map((tech, techIndex) => (
                            <Chip
                              key={techIndex}
                              label={tech}
                              size="small"
                              variant="outlined"
                              color={getTechColor(tech)}
                              sx={{ 
                                fontSize: '0.75rem', 
                                height: 24,
                                borderWidth: '1.5px',
                                fontWeight: 500
                              }}
                            />
                          ))}
                        </Stack>

                        <Stack direction="row" spacing={1} sx={{ mt: 'auto', pt: 2 }}>
                          <Button
                            onClick={() => {
                              trackEvent('open_project_detail', { id: project.id, title: project.title, from: 'projects_page_card' });
                              navigate(`/project/${project.id}`);
                            }}
                            variant="contained"
                            startIcon={<Info />}
                            size="small"
                            sx={{ flex: 1 }}
                          >
                            View Details
                          </Button>
                          {project.liveUrl && project.liveUrl !== '#' && (
                            <Button
                              component={MuiLink}
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackOutboundLink(project.liveUrl, `${project.title} Live Demo`)}
                              variant="outlined"
                              startIcon={<Launch />}
                              size="small"
                              sx={{ flex: 1 }}
                            >
                              Live Demo
                            </Button>
                          )}
                          <Button
                            component={MuiLink}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackOutboundLink(project.githubUrl, `${project.title} Code`)}
                            variant="outlined"
                            startIcon={<GitHub />}
                            size="small"
                            sx={{ flex: 1 }}
                          >
                            Code
                          </Button>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Other Projects */}
        <motion.div variants={slideIn('up', 'tween', 0.4, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, textAlign: 'center' }}>
            Other Projects
          </Typography>
          
          <Grid container spacing={4}>
            {otherProjects.map((project, index) => (
              <Grid item xs={12} md={6} key={project.id}>
                <motion.div
                  variants={fadeIn('up', 'spring', index * 0.1 + 0.3, 0.75)}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                >
                  <Card 
                    className="glass-card micro-lift theme-transition"
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      backgroundColor: 'transparent',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 160, height: 120 }}
                      image={project.image}
                      alt={project.title}
                    />
                    <CardContent sx={{ flex: 1, p: 2 }}>
                      <Stack spacing={1.5}>
                        <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                          {project.title}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem', lineHeight: 1.5 }}>
                          {project.description}
                        </Typography>

                        {/* Motivation Section - Compact */}
                        {project.motivation && (
                          <Box sx={{ 
                            p: 1.5, 
                            backgroundColor: 'rgba(245, 158, 11, 0.08)', 
                            borderRadius: 2, 
                            border: '1px solid rgba(245, 158, 11, 0.25)',
                          }}>
                            <Typography 
                              variant="caption" 
                              fontWeight="600" 
                              color="warning.main" 
                              sx={{ 
                                mb: 0.5, 
                                display: 'block',
                                fontSize: '0.75rem',
                                textTransform: 'uppercase',
                              }}
                            >
                              💡 Motivation
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.primary" 
                              sx={{ 
                                fontSize: '0.8rem', 
                                lineHeight: 1.4,
                                fontWeight: 400,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                            >
                              {project.motivation}
                            </Typography>
                          </Box>
                        )}

                        <Stack direction="row" flexWrap="wrap" gap={0.5}>
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <Chip
                              key={techIndex}
                              label={tech}
                              size="small"
                              variant="outlined"
                              color={getTechColor(tech)}
                              sx={{ 
                                fontSize: '0.7rem', 
                                height: 20,
                                borderWidth: '1.5px',
                                fontWeight: 500
                              }}
                            />
                          ))}
                          {project.technologies.length > 3 && (
                            <Chip
                              label={`+${project.technologies.length - 3}`}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.7rem', height: 20 }}
                            />
                          )}
                        </Stack>

                        <Stack direction="row" spacing={1}>
                          <Button
                            onClick={() => { 
                              trackEvent('open_project_detail', { id: project.id, title: project.title, from: 'projects_page_compact' });
                              navigate(`/project/${project.id}`);
                            }}
                            variant="contained"
                            startIcon={<Info />}
                            size="small"
                            sx={{ fontSize: '0.7rem', py: 0.5, px: 1 }}
                          >
                            Details
                          </Button>
                          {project.liveUrl && project.liveUrl !== '#' && (
                            <IconButton
                              component={MuiLink}
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackOutboundLink(project.liveUrl, `${project.title} Live Demo`)}
                              size="small"
                              className="glass-button"
                            >
                              <Visibility fontSize="small" />
                            </IconButton>
                          )}
                          <IconButton
                            component={MuiLink}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackOutboundLink(project.githubUrl, `${project.title} Code`)}
                            size="small"
                            className="glass-button"
                          >
                            <GitHub fontSize="small" />
                          </IconButton>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProjectsPage;
