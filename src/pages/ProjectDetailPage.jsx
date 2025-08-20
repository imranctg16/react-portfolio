import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  IconButton,
  Button,
  Divider,
  Paper,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  ArrowBack,
  Launch,
  GitHub,
  Share,
  ContentCopy,
  CheckCircle,
  TrendingUp,
  Speed,
  Security,
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { fadeIn } from '../utils/motion';
import { projects } from '../data/projects';
import ProjectImageGallery from '../components/ProjectImageGallery';
import { trackEvent, trackOutboundLink } from '../utils/analytics';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <Box sx={{ py: 8, textAlign: 'center', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Project Not Found
          </Typography>
          <Button onClick={() => navigate('/projects')} variant="contained">
            Back to Projects
          </Button>
        </Container>
      </Box>
    );
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      trackEvent('copy_project_link', { id: project.id, title: project.title });
    } catch (err) {
      console.log('Failed to copy link');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: project.title,
          text: project.subtitle || project.description,
          url: window.location.href,
        });
        trackEvent('share_project', {
          id: project.id,
          title: project.title,
          method: 'web_share_api',
        });
      } catch (err) {
        console.log('Error sharing');
      }
    } else {
      trackEvent('share_project', {
        id: project.id,
        title: project.title,
        method: 'fallback_copy',
      });
      handleCopyLink();
    }
  };

  return (
    <Box
      component="main"
      sx={{
        py: { xs: 4, md: 8 },
        bgcolor: 'background.default',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Image */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.1, 1)}
          initial="hidden"
          animate="show"
        >
          <Paper
            className="glass-card"
            sx={{
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(99, 102, 241, 0.2)',
              borderRadius: 3,
              mb: 6,
              boxShadow: '0 20px 60px rgba(99, 102, 241, 0.1)',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '300px', sm: '400px', md: '500px' },
                overflow: 'hidden',
                borderRadius: 3,
              }}
            >
              <Box
                component="img"
                src={project.image}
                alt={project.title}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.7)',
                }}
              />

              {/* Gradient overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)',
                  backdropFilter: 'blur(1px)',
                }}
              />

              {/* Action buttons */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  p: 4,
                  background:
                    'linear-gradient(transparent, rgba(0, 0, 0, 0.6))',
                }}
              >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Launch />}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackOutboundLink(
                          project.liveUrl,
                          `${project.title} Live Demo`
                        )
                      }
                      sx={{
                        backgroundColor: 'rgba(99, 102, 241, 0.9)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                        '&:hover': {
                          backgroundColor: 'rgba(99, 102, 241, 1)',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4)',
                        },
                      }}
                    >
                      View Live Demo
                    </Button>
                  )}

                  {project.githubUrl && project.githubUrl !== '#' && (
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<GitHub />}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackOutboundLink(
                          project.githubUrl,
                          `${project.title} Code`
                        )
                      }
                      sx={{
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        '&:hover': {
                          borderColor: 'rgba(255, 255, 255, 0.6)',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      View Source
                    </Button>
                  )}
                </Stack>
              </Box>
            </Box>
          </Paper>
        </motion.div>

        <Container maxWidth="xl">
          <motion.div
            variants={fadeIn('up', 'tween', 0.2, 1)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <Box sx={{ mb: 6 }} ref={ref}>
              {/* Header Navigation */}
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 4 }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <IconButton
                    onClick={() => navigate('/projects')}
                    className="glass-button"
                    sx={{ color: 'text.primary' }}
                  >
                    <ArrowBack />
                  </IconButton>
                  <Typography variant="body1" color="text.secondary">
                    Back to Projects
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <IconButton
                    onClick={handleShare}
                    className="glass-button"
                    sx={{ color: 'text.primary' }}
                  >
                    <Share />
                  </IconButton>
                  <IconButton
                    onClick={handleCopyLink}
                    className="glass-button"
                    sx={{ color: 'text.primary' }}
                  >
                    <ContentCopy />
                  </IconButton>
                </Stack>
              </Stack>

              {/* Project Header */}
              <Box sx={{ mb: 6 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Chip
                    label={project.category || 'Full-Stack'}
                    color="primary"
                    variant="outlined"
                    sx={{ fontSize: '0.9rem', height: 36 }}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    color="text.secondary"
                  >
                    <Typography variant="body2">{project.duration}</Typography>
                    <Typography variant="body2">•</Typography>
                    <Typography variant="body2">{project.teamSize}</Typography>
                  </Stack>
                </Stack>

                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{
                    mb: 2,
                    fontSize: { xs: '2rem', md: '3rem' },
                    lineHeight: 1.2,
                    background:
                      'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {project.title}
                </Typography>

                {project.subtitle && (
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      fontSize: { xs: '1.1rem', md: '1.3rem' },
                      mb: 4,
                    }}
                  >
                    {project.subtitle}
                  </Typography>
                )}

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.8,
                    mb: 3,
                    color: 'text.primary',
                  }}
                >
                  {project.description}
                </Typography>

                {/* Motivation Section */}
                {project.motivation && (
                  <Box
                    sx={{
                      mb: 4,
                      p: 3,
                      backgroundColor: 'rgba(245, 158, 11, 0.08)',
                      borderRadius: 2,
                      border: '1px solid rgba(245, 158, 11, 0.2)',
                    }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="warning.main"
                      sx={{ mb: 2 }}
                    >
                      Why I Built This
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      sx={{
                        fontSize: { xs: '0.95rem', md: '1rem' },
                        lineHeight: 1.7,
                      }}
                    >
                      {project.motivation}
                    </Typography>
                  </Box>
                )}

                {/* Technologies */}
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 4 }}>
                  {project.technologies.map((tech, index) => (
                    <Chip
                      key={index}
                      label={tech}
                      size="small"
                      variant="outlined"
                      sx={{
                        fontSize: '0.8rem',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                      }}
                    />
                  ))}
                </Stack>

                <Divider sx={{ mb: 6 }} />
              </Box>
            </Box>
          </motion.div>

          {/* GIF Demo Section */}
          {project.gif && (
            <motion.div
              variants={fadeIn('up', 'tween', 0.3, 1)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              <Card
                className="glass-card"
                sx={{ p: 4, borderRadius: 4, mb: 6 }}
              >
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{
                    mb: 3,
                    textAlign: 'center',
                    background:
                      'linear-gradient(45deg, #6366f1 30%, #8b5cf6 90%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  🎥 Live Demo
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    maxWidth: '800px',
                    mx: 'auto',
                    borderRadius: 3,
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(99, 102, 241, 0.2)',
                    border: '2px solid rgba(99, 102, 241, 0.3)',
                  }}
                >
                  <Box
                    component="img"
                    src={project.gif}
                    alt={`${project.title} Demo`}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                </Box>
              </Card>
            </motion.div>
          )}

          {/* Image Gallery Section */}
          {project.gallery && project.gallery.length > 0 && (
            <motion.div
              variants={fadeIn('up', 'tween', 0.4, 1)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              <Card
                className="glass-card"
                sx={{ p: 4, borderRadius: 4, mb: 6 }}
              >
                <ProjectImageGallery
                  images={project.gallery}
                  title="📸 Project Screenshots"
                  columns={3}
                />
              </Card>
            </motion.div>
          )}

          {/* Main Content - Two Column Layout */}
          <motion.div
            variants={fadeIn('up', 'tween', 0.3, 1)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <Grid container spacing={4} sx={{ mb: 6 }}>
              {/* Left Column - Overview & Key Info */}
              <Grid item xs={12} lg={6}>
                <Stack spacing={3}>
                  {/* Overview */}
                  <Card className="glass-card" sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="primary.main"
                      sx={{ mb: 2 }}
                    >
                      Project Overview
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.95rem', lineHeight: 1.7, mb: 3 }}
                    >
                      {project.overview}
                    </Typography>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="error.main"
                      sx={{ mb: 1 }}
                    >
                      Challenge
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.9rem', lineHeight: 1.6, mb: 3 }}
                    >
                      {project.problemStatement}
                    </Typography>

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      color="success.main"
                      sx={{ mb: 1 }}
                    >
                      Solution
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.9rem', lineHeight: 1.6 }}
                    >
                      {project.solution}
                    </Typography>
                  </Card>

                  {/* Architecture */}
                  <Card className="glass-card" sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="warning.main"
                      sx={{ mb: 2 }}
                    >
                      Architecture
                    </Typography>
                    {Object.entries(project.architecture).map(
                      ([layer, technologies]) => (
                        <Box key={layer} sx={{ mb: 2 }}>
                          <Typography
                            variant="body2"
                            fontWeight="bold"
                            color="primary.main"
                            sx={{ mb: 0.5, textTransform: 'capitalize' }}
                          >
                            {layer}:
                          </Typography>
                          <Stack direction="row" flexWrap="wrap" gap={0.5}>
                            {technologies.map((tech, index) => (
                              <Chip
                                key={index}
                                label={tech}
                                size="small"
                                sx={{ fontSize: '0.7rem', height: 20 }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      )
                    )}
                  </Card>
                </Stack>
              </Grid>

              {/* Right Column - Features & Technical Details */}
              <Grid item xs={12} lg={6}>
                <Stack spacing={3}>
                  {/* Key Features */}
                  <Card className="glass-card" sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="secondary.main"
                      sx={{ mb: 2 }}
                    >
                      Key Features
                    </Typography>
                    <Stack spacing={1.5}>
                      {project.keyFeatures.slice(0, 6).map((feature, index) => (
                        <Stack direction="row" spacing={1.5} key={index}>
                          <CheckCircle
                            sx={{
                              color: 'success.main',
                              fontSize: 16,
                              mt: 0.5,
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ lineHeight: 1.5, fontSize: '0.9rem' }}
                          >
                            {feature}
                          </Typography>
                        </Stack>
                      ))}
                      {project.keyFeatures.length > 6 && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ pl: 3 }}
                        >
                          +{project.keyFeatures.length - 6} more features...
                        </Typography>
                      )}
                    </Stack>
                  </Card>

                  {/* Technical Highlights */}
                  <Card className="glass-card" sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="info.main"
                      sx={{ mb: 2 }}
                    >
                      Technical Highlights
                    </Typography>
                    <Stack spacing={1.5}>
                      {project.technicalHighlights
                        .slice(0, 5)
                        .map((highlight, index) => (
                          <Stack direction="row" spacing={1.5} key={index}>
                            <TrendingUp
                              sx={{
                                color: 'info.main',
                                fontSize: 16,
                                mt: 0.5,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ lineHeight: 1.5, fontSize: '0.9rem' }}
                            >
                              {highlight}
                            </Typography>
                          </Stack>
                        ))}
                      {project.technicalHighlights.length > 5 && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ pl: 3 }}
                        >
                          +{project.technicalHighlights.length - 5} more
                          highlights...
                        </Typography>
                      )}
                    </Stack>
                  </Card>

                  {/* Key Metrics */}
                  <Card className="glass-card" sx={{ p: 3 }}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      color="success.main"
                      sx={{ mb: 2 }}
                    >
                      Key Metrics
                    </Typography>
                    <Stack spacing={2}>
                      {Object.entries(project.metrics).map(
                        ([metric, value]) => (
                          <Box key={metric}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                              sx={{ mb: 0.5 }}
                            >
                              <Speed
                                sx={{ color: 'success.main', fontSize: 16 }}
                              />
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                color="text.primary"
                                sx={{ textTransform: 'capitalize' }}
                              >
                                {metric}
                              </Typography>
                            </Stack>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ pl: 3, fontSize: '0.85rem' }}
                            >
                              {value}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Stack>
                  </Card>
                </Stack>
              </Grid>
            </Grid>

            {/* Bottom Section - Challenges & Learnings */}
            <Grid container spacing={4} sx={{ mb: 6 }}>
              <Grid item xs={12} md={6}>
                <Card
                  className="glass-card"
                  sx={{ p: 3, height: 'fit-content' }}
                >
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="error.main"
                    sx={{ mb: 2 }}
                  >
                    Challenges Overcome
                  </Typography>
                  <Stack spacing={1.5}>
                    {project.challenges.slice(0, 4).map((challenge, index) => (
                      <Stack direction="row" spacing={1.5} key={index}>
                        <Security
                          sx={{
                            color: 'error.main',
                            fontSize: 16,
                            mt: 0.5,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ lineHeight: 1.5, fontSize: '0.9rem' }}
                        >
                          {challenge}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  className="glass-card"
                  sx={{ p: 3, height: 'fit-content' }}
                >
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="info.main"
                    sx={{ mb: 2 }}
                  >
                    Key Learnings
                  </Typography>
                  <Stack spacing={1.5}>
                    {project.learnings.slice(0, 4).map((learning, index) => (
                      <Stack direction="row" spacing={1.5} key={index}>
                        <CheckCircle
                          sx={{
                            color: 'info.main',
                            fontSize: 16,
                            mt: 0.5,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ lineHeight: 1.5, fontSize: '0.9rem' }}
                        >
                          {learning}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </motion.div>

          {/* Navigation Footer */}
          <motion.div
            variants={fadeIn('up', 'tween', 0.4, 1)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <Box sx={{ textAlign: 'center', pt: 6 }}>
              <Divider sx={{ mb: 4 }} />
              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                flexWrap="wrap"
              >
                <Button
                  component={Link}
                  to="/projects"
                  variant="outlined"
                  size="large"
                  className="glass-button"
                >
                  ← Back to All Projects
                </Button>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  size="large"
                >
                  Back to Home
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Container>
    </Box>
  );
};

export default ProjectDetailPage;
