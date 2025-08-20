import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  oneLight,
  oneDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
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
} from '@mui/material';
import {
  AccessTime,
  TrendingUp,
  Lightbulb,
  CheckCircle,
  ArrowBack,
  Share,
  ContentCopy,
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { fadeIn } from '../utils/motion';
import { blogPosts } from '../data/blog';
import ProjectHero from '../components/ProjectHero';
import ProjectImageGallery from '../components/ProjectImageGallery';
import { Grid } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { isDarkMode } = useTheme();

  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <Box sx={{ py: 8, textAlign: 'center', minHeight: '100vh' }}>
        <Container maxWidth="lg">
          <Typography variant="h4" gutterBottom>
            Blog Post Not Found
          </Typography>
          <Button onClick={() => navigate('/blog')} variant="contained">
            Back to Blog
          </Button>
        </Container>
      </Box>
    );
  }

  const getCategoryColor = (category) => {
    const colors = {
      React: 'primary',
      'Full Stack': 'secondary',
      Architecture: 'success',
      Database: 'info',
      DevOps: 'warning',
      Infrastructure: 'secondary',
      Performance: 'success',
    };
    return colors[category] || 'default';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      React: <TrendingUp />,
      'Full Stack': <TrendingUp />,
      Architecture: <Lightbulb />,
      Database: <CheckCircle />,
      DevOps: <TrendingUp />,
      Infrastructure: <TrendingUp />,
      Performance: <TrendingUp />,
    };
    return icons[category] || <TrendingUp />;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (err) {
      console.log('Failed to copy link');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing');
      }
    } else {
      handleCopyLink();
    }
  };

  // Simplified markdown components for better readability
  const markdownComponents = {
    h1: ({ children }) => (
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{
          mt: 6,
          mb: 3,
          color: 'primary.main',
          fontSize: { xs: '1.75rem', md: '2.25rem' },
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          pb: 2,
        }}
      >
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{
          mt: 5,
          mb: 2,
          color: 'secondary.main',
          fontSize: { xs: '1.4rem', md: '1.8rem' },
        }}
      >
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography
        variant="h5"
        fontWeight="600"
        sx={{
          mt: 4,
          mb: 2,
          color: 'text.primary',
          fontSize: { xs: '1.2rem', md: '1.4rem' },
        }}
      >
        {children}
      </Typography>
    ),
    p: ({ children }) => (
      <Typography
        variant="body1"
        sx={{
          mb: 3,
          fontSize: { xs: '1rem', md: '1.1rem' },
          lineHeight: 1.8,
          color: 'text.primary',
          fontWeight: 400,
        }}
      >
        {children}
      </Typography>
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <Box sx={{ my: 3 }}>
          <SyntaxHighlighter
            style={isDarkMode ? oneDark : oneLight}
            language={match[1]}
            PreTag="div"
            customStyle={{
              margin: 0,
              borderRadius: '8px',
              fontSize: '0.9rem',
              lineHeight: '1.5',
            }}
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </Box>
      ) : (
        <Box
          component="code"
          sx={{
            backgroundColor: 'action.hover',
            color: 'primary.main',
            padding: '2px 6px',
            borderRadius: '4px',
            fontSize: '0.875em',
            fontFamily: 'monospace',
            fontWeight: 500,
          }}
          {...props}
        >
          {children}
        </Box>
      );
    },
    ul: ({ children }) => (
      <Box
        component="ul"
        sx={{
          my: 2,
          pl: 0,
          listStyle: 'none',
        }}
      >
        {children}
      </Box>
    ),
    li: ({ children }) => (
      <Typography
        component="li"
        variant="body1"
        sx={{
          mb: 2,
          pl: 3,
          position: 'relative',
          fontSize: { xs: '1rem', md: '1.1rem' },
          lineHeight: 1.7,
          color: 'text.primary',
          '&:before': {
            content: '"▸"',
            color: 'primary.main',
            fontWeight: 'bold',
            position: 'absolute',
            left: 0,
            top: 0,
            fontSize: '1.2em',
          },
        }}
      >
        {children}
      </Typography>
    ),
    strong: ({ children }) => (
      <Box
        component="strong"
        sx={{ fontWeight: 'bold', color: 'primary.main' }}
      >
        {children}
      </Box>
    ),
    table: ({ children }) => (
      <Paper
        sx={{ my: 3, overflow: 'auto', backgroundColor: 'background.paper' }}
      >
        <Box
          component="table"
          sx={{ width: '100%', borderCollapse: 'collapse' }}
        >
          {children}
        </Box>
      </Paper>
    ),
    th: ({ children }) => (
      <Box
        component="th"
        sx={{
          p: 2,
          borderBottom: '2px solid',
          borderColor: 'primary.main',
          fontWeight: 'bold',
          textAlign: 'left',
          backgroundColor: 'action.hover',
        }}
      >
        {children}
      </Box>
    ),
    td: ({ children }) => (
      <Box
        component="td"
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {children}
      </Box>
    ),
    blockquote: ({ children }) => (
      <Box
        sx={{
          borderLeft: '4px solid',
          borderColor: 'primary.main',
          backgroundColor: 'action.hover',
          pl: 3,
          py: 2,
          my: 3,
          fontStyle: 'italic',
        }}
      >
        {children}
      </Box>
    ),
    // Skip images and badges
    img: () => null,
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
        {/* Hero Section with GIF */}
        {post.hero && (
          <ProjectHero
            gifSrc={post.hero.gifSrc}
            title={post.title}
            subtitle={post.excerpt}
            liveUrl={post.hero.liveUrl}
            githubUrl={post.hero.githubUrl}
            technologies={post.technologies}
          />
        )}

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
                    onClick={() => navigate('/blog')}
                    className="glass-button"
                    sx={{ color: 'text.primary' }}
                  >
                    <ArrowBack />
                  </IconButton>
                  <Typography variant="body1" color="text.secondary">
                    Back to Blog
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

              {/* Article Header */}
              <Box sx={{ mb: 6 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mb: 3 }}
                >
                  <Chip
                    icon={getCategoryIcon(post.category)}
                    label={post.category}
                    color={getCategoryColor(post.category)}
                    variant="outlined"
                    sx={{ fontSize: '0.9rem', height: 36 }}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    color="text.secondary"
                  >
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <AccessTime sx={{ fontSize: 18 }} />
                      <Typography variant="body2">{post.readTime}</Typography>
                    </Stack>
                    <Typography variant="body2">{post.date}</Typography>
                  </Stack>
                </Stack>

                <Typography
                  variant="h2"
                  fontWeight="bold"
                  sx={{
                    mb: 4,
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
                  {post.title}
                </Typography>

                <Typography
                  variant="h5"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.6,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    mb: 4,
                  }}
                >
                  {post.excerpt}
                </Typography>

                {/* Technologies */}
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 4 }}>
                  {post.technologies.map((tech, index) => (
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

          {/* TLDR Section */}
          <motion.div
            variants={fadeIn('up', 'tween', 0.3, 1)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <Paper
              className="glass-card"
              sx={{
                p: 3,
                mb: 4,
                backgroundColor: 'background.paper',
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'primary.main',
              }}
            >
              <Typography
                variant="h5"
                fontWeight="bold"
                color="primary.main"
                sx={{ mb: 3 }}
              >
                TL;DR
              </Typography>

              <Grid container spacing={3}>
                {/* Problem */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      color="error.main"
                      sx={{ mb: 1 }}
                    >
                      Problem
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.9rem', lineHeight: 1.5 }}
                    >
                      {post.challenge}
                    </Typography>
                  </Box>
                </Grid>

                {/* Solution */}
                <Grid item xs={12} md={4}>
                  <Box sx={{ mb: 2 }}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      color="success.main"
                      sx={{ mb: 1 }}
                    >
                      Solution
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: '0.9rem', lineHeight: 1.5 }}
                    >
                      {post.solution}
                    </Typography>
                  </Box>
                </Grid>

                {/* Key Results */}
                <Grid item xs={12} md={4}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight="bold"
                      color="secondary.main"
                      sx={{ mb: 1 }}
                    >
                      Results
                    </Typography>
                    <Stack spacing={0.5}>
                      {post.outcomes.slice(0, 3).map((outcome, index) => (
                        <Stack direction="row" spacing={1} key={index}>
                          <CheckCircle
                            sx={{
                              color: 'success.main',
                              fontSize: 14,
                              mt: 0.25,
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ fontSize: '0.85rem', lineHeight: 1.4 }}
                          >
                            {outcome}
                          </Typography>
                        </Stack>
                      ))}
                      {post.outcomes.length > 3 && (
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ pl: 2.5 }}
                        >
                          +{post.outcomes.length - 3} more outcomes...
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Paper>

            {/* Technical Deep Dive */}
            {post.story && (
              <Paper
                className="glass-card"
                sx={{
                  p: 3,
                  mb: 4,
                  backgroundColor: 'background.paper',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="primary.main"
                  sx={{ mb: 3 }}
                >
                  Technical Deep Dive
                </Typography>
                <Box
                  sx={{
                    '& > *:first-of-type': { mt: 0 },
                    '& img': { display: 'none' },
                    '& a[href^="https://img.shields.io"]': { display: 'none' },
                    '& h1': {
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      mt: 3,
                      mb: 2,
                      color: 'text.primary',
                    },
                    '& h2': {
                      fontSize: '1.3rem',
                      fontWeight: 'bold',
                      mt: 2.5,
                      mb: 1.5,
                      color: 'text.primary',
                    },
                    '& h3': {
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      mt: 2,
                      mb: 1,
                      color: 'text.primary',
                    },
                    '& p': { mb: 2, lineHeight: 1.6, color: 'text.primary' },
                    '& ul': { pl: 3, mb: 2 },
                    '& ol': { pl: 3, mb: 2 },
                    '& li': { mb: 0.5, color: 'text.primary' },
                    '& code': {
                      backgroundColor: 'action.hover',
                      color: 'primary.main',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontSize: '0.875em',
                      fontFamily: 'monospace',
                    },
                    '& pre': {
                      backgroundColor: 'action.hover',
                      p: 2,
                      borderRadius: 2,
                      mb: 2,
                      overflow: 'auto',
                    },
                    '& blockquote': {
                      borderLeft: '4px solid',
                      borderColor: 'primary.main',
                      pl: 2,
                      py: 1,
                      backgroundColor: 'rgba(99, 102, 241, 0.05)',
                      borderRadius: '0 4px 4px 0',
                      mb: 2,
                      fontStyle: 'italic',
                    },
                    '& table': {
                      width: '100%',
                      borderCollapse: 'collapse',
                      mb: 2,
                    },
                    '& th': {
                      backgroundColor: 'action.hover',
                      p: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                      fontWeight: 'bold',
                    },
                    '& td': {
                      p: 1,
                      border: '1px solid',
                      borderColor: 'divider',
                    },
                    maxWidth: '100%',
                    wordBreak: 'break-word',
                  }}
                >
                  <ReactMarkdown
                    components={markdownComponents}
                    remarkPlugins={[remarkGfm]}
                  >
                    {post.story}
                  </ReactMarkdown>
                </Box>
              </Paper>
            )}

            {/* Feature Gallery */}
            {post.gallery && post.gallery.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <ProjectImageGallery
                  images={post.gallery}
                  title="🚀 User Journey & Key Features"
                  columns={3}
                />
              </Box>
            )}
          </motion.div>

          {/* Navigation Footer */}
          <motion.div
            variants={fadeIn('up', 'tween', 0.4, 1)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            <Box sx={{ textAlign: 'center', pt: 3 }}>
              <Divider sx={{ mb: 3 }} />
              <Stack
                direction="row"
                justifyContent="center"
                spacing={2}
                flexWrap="wrap"
              >
                <Button
                  component={Link}
                  to="/blog"
                  variant="outlined"
                  size="medium"
                  className="glass-button"
                >
                  ← All Posts
                </Button>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  size="medium"
                >
                  Home
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Container>
    </Box>
  );
};

export default BlogPostPage;
