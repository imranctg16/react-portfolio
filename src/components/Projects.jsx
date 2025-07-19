import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Stack,
  IconButton,
  Grid,
  ButtonGroup,
} from '@mui/material';
import {
  Launch,
  GitHub,
  Visibility,
  FilterList,
  Info,
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/projects';
import { fadeIn, zoomIn } from '../utils/motion';

const Projects = () => {
  const [filter, setFilter] = useState('featured');
  const [showAll, setShowAll] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const filteredProjects = projects.filter(project => {
    if (filter === 'featured') return project.featured;
    if (filter === 'all') return true;
    return project.category === filter;
  });

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  const allTechnologies = [...new Set(projects.flatMap(project => project.technologies))];

  const ProjectCard = ({ project, index }) => (
    <motion.div variants={zoomIn(index * 0.1, 0.5)} initial="hidden" animate={inView ? 'show' : 'hidden'} whileHover={{ y: -10, scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}>
      <Card
        className="glass-card theme-transition micro-lift"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '16px 16px 0 0',
            background: `linear-gradient(135deg, ${index % 2 === 0 ? 'rgba(99, 102, 241, 0.1)' : 'rgba(245, 158, 11, 0.1)'} 0%, ${index % 2 === 0 ? 'rgba(139, 92, 246, 0.1)' : 'rgba(251, 191, 36, 0.1)'} 100%)`,
            border: `2px solid ${index % 2 === 0 ? 'rgba(99, 102, 241, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`,
          }}
        >
          <Stack alignItems="center" spacing={2}>
            <Visibility sx={{ fontSize: 56, color: index % 2 === 0 ? 'primary.main' : 'secondary.main', opacity: 0.7 }} />
            <Typography variant="body2" color="text.secondary" fontWeight="600">
              {project.title}
            </Typography>
          </Stack>
          
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(135deg, ${index % 2 === 0 ? 'rgba(99, 102, 241, 0.9)' : 'rgba(245, 158, 11, 0.9)'} 0%, ${index % 2 === 0 ? 'rgba(139, 92, 246, 0.9)' : 'rgba(251, 191, 36, 0.9)'} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              transition: 'opacity 0.3s ease',
              gap: 2,
              '.MuiCard-root:hover &': {
                opacity: 1,
              },
            }}
          >
            <IconButton
              size="large"
              className="glass-button micro-bounce"
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                color: 'primary.main',
                '&:hover': { 
                  bgcolor: 'white',
                  transform: 'scale(1.1)',
                },
              }}
              onClick={() => alert('Project detail page coming soon!')}
            >
              <Info />
            </IconButton>
            <IconButton
              size="large"
              component="a"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button micro-bounce"
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.9)',
                color: 'primary.main',
                '&:hover': { 
                  bgcolor: 'white',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Launch />
            </IconButton>
            <IconButton
              size="large"
              component="a"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button micro-bounce"
              sx={{ 
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                '&:hover': { 
                  bgcolor: 'black',
                  transform: 'scale(1.1)',
                },
              }}
            >
              <GitHub />
            </IconButton>
          </Box>

          {project.featured && (
            <Chip
              label="Featured"
              size="small"
              className="glass-button animate-pulse-soft"
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                fontWeight: 600,
                bgcolor: 'primary.main',
                color: 'white',
                border: 'none',
              }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Typography variant="h6" fontWeight="bold" color="text.primary">
              {project.title}
            </Typography>
            <Chip
              label={project.category || 'Full-Stack'}
              size="small"
              className="glass-button micro-bounce"
              sx={{ 
                ml: 1, 
                fontWeight: 500,
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            />
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 3,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.6,
            }}
          >
            {project.description}
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
            {project.technologies.slice(0, 4).map((tech) => (
              <Chip
                key={tech}
                label={tech}
                size="small"
                className="glass-button micro-bounce theme-transition"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  border: '1px solid rgba(99, 102, 241, 0.3)',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderColor: 'transparent',
                  },
                }}
              />
            ))}
            {project.technologies.length > 4 && (
              <Chip
                label={`+${project.technologies.length - 4} more`}
                size="small"
                className="glass-button micro-bounce"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'text.secondary',
                }}
              />
            )}
          </Stack>
        </CardContent>

        <CardActions sx={{ p: 3, pt: 0 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Info />}
            onClick={() => alert('Project detail page coming soon!')}
            className="micro-lift theme-transition"
            sx={{ 
              mr: 1,
              bgcolor: 'primary.main',
              border: 'none',
              '&:hover': {
                bgcolor: 'primary.main',
              },
            }}
          >
            View Details
          </Button>
          <IconButton
            component="a"
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button micro-bounce"
            sx={{
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
              },
            }}
          >
            <Launch />
          </IconButton>
          <IconButton
            component="a"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button micro-bounce"
            sx={{
              color: 'text.primary',
              '&:hover': {
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
              },
            }}
          >
            <GitHub />
          </IconButton>
        </CardActions>
      </Card>
    </motion.div>
  );

  return (
    <Box
      component="section"
      id="projects"
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
              Featured Projects
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
              A showcase of my recent work, highlighting technical skills and creative problem-solving. 
              Each project demonstrates clean code, modern architecture, and user-focused design.
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={fadeIn('up', 'tween', 0.4, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <ButtonGroup className="glass-card" sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <Button
                variant={filter === 'all' ? 'contained' : 'outlined'}
                onClick={() => setFilter('all')}
                startIcon={<FilterList />}
                className="glass-button micro-lift theme-transition"
                sx={{ 
                  px: 3, 
                  py: 1, 
                  borderRadius: '12px 0 0 12px',
                  bgcolor: filter === 'all' 
                    ? 'primary.main'
                    : 'transparent',
                  border: 'none',
                  color: filter === 'all' ? 'white' : 'text.primary',
                }}
              >
                All Projects
              </Button>
              <Button
                variant={filter === 'featured' ? 'contained' : 'outlined'}
                onClick={() => setFilter('featured')}
                className="glass-button micro-lift theme-transition"
                sx={{ 
                  px: 3, 
                  py: 1, 
                  borderRadius: '0 12px 12px 0',
                  bgcolor: filter === 'featured' 
                    ? 'primary.main'
                    : 'transparent',
                  border: 'none',
                  color: filter === 'featured' ? 'white' : 'text.primary',
                }}
              >
                Featured Only
              </Button>
            </ButtonGroup>
          </Box>
        </motion.div>

        <Grid container spacing={6} className="content-grid" sx={{ mb: 8 }}>
          {displayedProjects.map((project, index) => (
            <Grid item xs={12} md={6} key={project.id}>
              <ProjectCard project={project} index={index} />
            </Grid>
          ))}
        </Grid>

        {filteredProjects.length > 6 && (
          <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setShowAll(!showAll)}
                className="glass-button micro-lift theme-transition"
                sx={{ 
                  px: 4, 
                  py: 1.5, 
                  borderRadius: 3,
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                    borderColor: 'transparent',
                  },
                }}
              >
                {showAll ? 'Show Less' : `View All ${filteredProjects.length} Projects`}
              </Button>
            </Box>
          </motion.div>
        )}

        <motion.div variants={fadeIn('up', 'tween', 0.4, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <Card className="glass-card theme-transition" sx={{ p: 5, borderRadius: 4, textAlign: 'center', mt: 8 }}>
            <Typography variant="h4" fontWeight="bold" className="text-gradient" sx={{ mb: 4 }}>
              Technologies I Work With
            </Typography>
            
            <Stack
              direction="row"
              flexWrap="wrap"
              justifyContent="center"
              gap={2}
              sx={{ maxWidth: '900px', mx: 'auto' }}
            >
              {allTechnologies.map((tech, index) => (
                <motion.div
                  key={tech}
                  variants={zoomIn(index * 0.05, 0.5)}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                  whileHover={{ y: -5, scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                >
                  <Chip
                    label={tech}
                    className="glass-button micro-bounce theme-transition"
                    sx={{
                      height: 40,
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      px: 2,
                      border: '2px solid rgba(99, 102, 241, 0.3)',
                      color: 'text.primary',
                      background: 'rgba(99, 102, 241, 0.05)',
                      '&:hover': {
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderColor: 'primary.main',
                        boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
                      },
                    }}
                  />
                </motion.div>
              ))}
            </Stack>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Projects;