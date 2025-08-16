import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  IconButton,
} from '@mui/material';
import {
  AccessTime,
  CheckCircle,
  Code,
  TrendingUp,
  Lightbulb,
  ArrowBack,
  Launch,
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { fadeIn } from '../utils/motion';
import { blogPosts } from '../data/blog';

const BlogPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();

  const getCategoryColor = (category) => {
    const colors = {
      'React': 'primary',
      'Full Stack': 'secondary', 
      'Architecture': 'success',
      'Database': 'info',
      'DevOps': 'warning'
    };
    return colors[category] || 'default';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'React': <Code />,
      'Full Stack': <TrendingUp />,
      'Architecture': <Lightbulb />,
      'Database': <CheckCircle />,
      'DevOps': <TrendingUp />
    };
    return icons[category] || <Code />;
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
          <Box sx={{ mb: 6 }}>
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
            
            <Box sx={{ textAlign: 'center', mb: 8 }} ref={ref}>
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
                Technical Blog
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
                Key technical challenges I&apos;ve solved and the innovative solutions I implemented
              </Typography>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={6} lg={4} key={post.id}>
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
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Stack spacing={2}>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                        <Chip
                          icon={getCategoryIcon(post.category)}
                          label={post.category}
                          color={getCategoryColor(post.category)}
                          size="small"
                          variant="outlined"
                        />
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {post.readTime}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Typography variant="h6" fontWeight="bold" sx={{ lineHeight: 1.3 }}>
                        {post.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {post.date}
                      </Typography>

                      <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.5 }}>
                        {post.excerpt}
                      </Typography>

                      <Divider />

                      <Box>
                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: 'error.main' }}>
                            <Typography variant="caption" fontWeight="bold">C</Typography>
                          </Avatar>
                          <Typography variant="subtitle2" fontWeight="bold" color="error.main">
                            Challenge
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
                          {post.challenge}
                        </Typography>

                        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                          <Avatar sx={{ width: 24, height: 24, bgcolor: 'success.main' }}>
                            <Typography variant="caption" fontWeight="bold">S</Typography>
                          </Avatar>
                          <Typography variant="subtitle2" fontWeight="bold" color="success.main">
                            Solution
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontSize: '0.875rem' }}>
                          {post.solution}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                          Technologies Used:
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={0.5}>
                          {post.technologies.map((tech, techIndex) => (
                            <Chip
                              key={techIndex}
                              label={tech}
                              size="small"
                              variant="outlined"
                              sx={{ fontSize: '0.75rem', height: 24 }}
                            />
                          ))}
                        </Stack>
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                          Key Outcomes:
                        </Typography>
                        <List dense sx={{ py: 0 }}>
                          {post.outcomes.map((outcome, outcomeIndex) => (
                            <ListItem key={outcomeIndex} sx={{ py: 0.25, px: 0 }}>
                              <ListItemIcon sx={{ minWidth: 20 }}>
                                <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
                              </ListItemIcon>
                              <ListItemText 
                                primary={outcome}
                                primaryTypographyProps={{ 
                                  variant: 'body2', 
                                  fontSize: '0.875rem' 
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Box>

                      <Box sx={{ mt: 'auto', pt: 2 }}>
                        <Button
                          component={Link}
                          to={`/blog/${post.id}`}
                          variant="outlined"
                          endIcon={<Launch />}
                          fullWidth
                          className="glass-button"
                          sx={{
                            backgroundColor: 'transparent !important',
                            borderColor: 'primary.main',
                            color: 'primary.main',
                            '&:hover': {
                              borderColor: 'primary.light',
                              color: 'primary.light',
                              backgroundColor: 'rgba(99, 102, 241, 0.1) !important',
                            },
                          }}
                        >
                          Read Full Details
                        </Button>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BlogPage;