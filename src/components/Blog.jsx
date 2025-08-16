import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Button,
  CardActions,
} from '@mui/material';
import {
  AccessTime,
  Code,
  TrendingUp,
  Lightbulb,
  ReadMore,
  ArrowForward,
  CheckCircle,
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { fadeIn } from '../utils/motion';
import { blogPosts } from '../data/blog';
import { trackEvent } from '../utils/analytics';

const Blog = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const navigate = useNavigate();

  const getCategoryColor = (category) => {
    const colors = {
      'React': 'primary',
      'Full Stack': 'secondary', 
      'Architecture': 'success',
      'Database': 'info',
      'DevOps': 'warning',
      'Infrastructure': 'secondary',
      'Performance': 'success'
    };
    return colors[category] || 'default';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'React': <Code />,
      'Full Stack': <TrendingUp />,
      'Architecture': <Lightbulb />,
      'Database': <CheckCircle />,
      'DevOps': <TrendingUp />,
      'Infrastructure': <Code />,
      'Performance': <TrendingUp />
    };
    return icons[category] || <Code />;
  };

  return (
    <Box
      component="section"
      id="blog"
      ref={ref}
      sx={{
        py: 12,
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
          <motion.div variants={fadeIn('up', 'tween', 0.2, 1)}>
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
          </motion.div>

          <Grid container spacing={4}>
            {blogPosts.map((post, index) => (
              <Grid item xs={12} md={6} key={post.id}>
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
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.15)',
                        borderColor: 'primary.main',
                      },
                    }}
                    onClick={() => {
                      trackEvent('open_blog_post', { id: post.id, title: post.title, from: 'home_blog' });
                      navigate(`/blog/${post.id}`);
                    }}
                  >
                    {/* Hero Image Section */}
                    {post.hero && (
                      <Box
                        sx={{
                          height: 200,
                          backgroundImage: `url(${post.hero.gifSrc})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                          }}
                        >
                          <Chip
                            icon={getCategoryIcon(post.category)}
                            label={post.category}
                            color={getCategoryColor(post.category)}
                            size="small"
                            sx={{ 
                              backgroundColor: 'rgba(255, 255, 255, 0.9)',
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      </Box>
                    )}

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Stack spacing={2}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            {post.date}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {post.readTime}
                            </Typography>
                          </Stack>
                        </Stack>

                        <Typography 
                          variant="h5" 
                          fontWeight="bold" 
                          sx={{ 
                            lineHeight: 1.3,
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {post.title}
                        </Typography>

                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          sx={{ 
                            mb: 3, 
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {post.excerpt}
                        </Typography>

                        <Box>
                          <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, color: 'primary.main' }}>
                            Key Technologies:
                          </Typography>
                          <Stack direction="row" flexWrap="wrap" gap={0.5}>
                            {post.technologies.slice(0, 4).map((tech, techIndex) => (
                              <Chip
                                key={techIndex}
                                label={tech}
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  fontSize: '0.75rem', 
                                  height: 24,
                                  borderColor: 'primary.main',
                                  color: 'primary.main',
                                }}
                              />
                            ))}
                            {post.technologies.length > 4 && (
                              <Chip
                                label={`+${post.technologies.length - 4} more`}
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  fontSize: '0.75rem', 
                                  height: 24,
                                  borderColor: 'text.secondary',
                                  color: 'text.secondary',
                                }}
                              />
                            )}
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>

                    <CardActions sx={{ p: 3, pt: 0 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        endIcon={<ArrowForward />}
                        sx={{
                          backgroundColor: 'primary.main',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        Read Full Story
                      </Button>
                    </CardActions>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
      </Container>
    </Box>
  );
};

export default Blog;
