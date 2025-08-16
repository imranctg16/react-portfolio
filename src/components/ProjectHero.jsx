import { motion } from 'framer-motion';
import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';

const ProjectHero = ({ 
  gifSrc, 
  title, 
  subtitle, 
  liveUrl, 
  githubUrl,
  technologies = []
}) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
        {/* Video/GIF Container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: { xs: '300px', sm: '400px', md: '500px' },
            overflow: 'hidden',
            borderRadius: 3,
          }}
        >
          {/* Background GIF/Image */}
          <Box
            component="img"
            src={gifSrc}
            alt="Project Demo"
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
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)',
              backdropFilter: 'blur(1px)',
            }}
          />

          {/* Minimal overlay with just action buttons */}
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
              background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.6))',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                {liveUrl && liveUrl !== "#" && (
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<OpenInNew />}
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    Try Live Demo
                  </Button>
                )}

                {githubUrl && githubUrl !== "#" && (
                  <Button
                    variant="outlined"
                    size="large"
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
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
                    View Code
                  </Button>
                )}
              </Stack>
            </motion.div>
          </Box>

        </Box>
      </Paper>
    </motion.div>
  );
};

export default ProjectHero;