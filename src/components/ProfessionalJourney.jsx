import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  Stack,
  Avatar,
  Divider,
  Modal,
  Backdrop,
  Fade,
  IconButton,
} from '@mui/material';
import { PhotoLibrary, Close } from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../contexts/ThemeContext';
import { fadeIn, slideIn, zoomIn } from '../utils/motion';

const ProfessionalJourney = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedImage, setSelectedImage] = useState(null);

  // Professional journey images - using project screenshots as demo
  const journeyImages = [
    {
      src: '/project-images/dwe/dwe-dashboard.png',
      title: 'Enterprise Microservices at Grameenphone',
      description:
        'Leading the development of Dynamic Workflow Engine with 11 microservices',
    },
    {
      src: '/project-images/sql/sql-dashboard.png',
      title: 'SQL Playground Innovation',
      description:
        'Building interactive learning platforms with gamification elements',
    },
    {
      src: '/project-images/aws-exam-prep/aws-dashboard.png',
      title: 'AWS Certification Platform',
      description:
        'Comprehensive exam preparation system with 1000+ practice questions',
    },
    {
      src: '/project-images/dwe/dwe-workflow.png',
      title: 'Workflow Architecture Design',
      description:
        'Designing dynamic form builders and state machine workflows',
    },
    {
      src: '/project-images/readme-reader/readme-1.png',
      title: 'Modern Frontend Development',
      description:
        'Creating intuitive user interfaces with React and TypeScript',
    },
    {
      src: '/project-images/dwe/dwe-report-view.png',
      title: 'Performance Optimization Success',
      description: 'Achieved 95% query performance improvement (20min → 30sec)',
    },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Box
      component="section"
      id="professional-journey"
      ref={ref}
      className="theme-transition section-spacing"
      sx={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" className="section-container">
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
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
              Professional Journey in Pictures
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
              A visual showcase of my technical achievements and professional
              milestones
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={fadeIn('up', 'tween', 0.4, 1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <Box sx={{ mt: 8 }}>
            <Grid container spacing={4}>
              {journeyImages.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    variants={zoomIn(0.1 + index * 0.1, 0.6)}
                    initial="hidden"
                    animate={inView ? 'show' : 'hidden'}
                    whileHover={{ scale: 1.05, y: -8 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <Card
                      className="glass-card theme-transition"
                      sx={{
                        cursor: 'pointer',
                        borderRadius: 4,
                        overflow: 'hidden',
                        position: 'relative',
                        aspectRatio: '4/3',
                        '&:hover .image-overlay': {
                          opacity: 1,
                        },
                        '&:hover .image-content': {
                          transform: 'translateY(0)',
                        },
                      }}
                      onClick={() => handleImageClick(image)}
                    >
                      {/* Project screenshot */}
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <img
                          src={image.src}
                          alt={image.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                        {/* Fallback placeholder */}
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(135deg, 
                              ${theme.palette.primary.main}20, 
                              ${theme.palette.secondary.main}20)`,
                            display: 'none',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                          }}
                        >
                          <PhotoLibrary
                            sx={{
                              fontSize: 48,
                              color: 'primary.main',
                              opacity: 0.3,
                            }}
                          />
                        </Box>

                        {/* Image overlay */}
                        <Box
                          className="image-overlay"
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background:
                              'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
                            opacity: 0,
                            transition: 'opacity 0.3s ease',
                          }}
                        />

                        {/* Image content */}
                        <Box
                          className="image-content"
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 2,
                            color: 'white',
                            transform: 'translateY(20px)',
                            transition: 'transform 0.3s ease',
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            sx={{ mb: 0.5 }}
                          >
                            {image.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ opacity: 0.9, fontSize: '0.85rem' }}
                          >
                            {image.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: 'italic' }}
              >
                📸 Demo using project screenshots - will be replaced with actual
                professional journey photos
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Image Modal */}
        <Modal
          open={!!selectedImage}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            sx: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
          }}
        >
          <Fade in={!!selectedImage}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                maxWidth: '90vw',
                maxHeight: '90vh',
                outline: 'none',
              }}
            >
              {selectedImage && (
                <Card
                  className="glass-card"
                  sx={{
                    position: 'relative',
                    borderRadius: 4,
                    overflow: 'hidden',
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                >
                  <IconButton
                    onClick={handleCloseModal}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      color: 'white',
                      zIndex: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      },
                    }}
                  >
                    <Close />
                  </IconButton>

                  {/* Modal image content */}
                  <Box sx={{ position: 'relative' }}>
                    <img
                      src={selectedImage.src}
                      alt={selectedImage.title}
                      style={{
                        maxWidth: '80vw',
                        maxHeight: '70vh',
                        width: 'auto',
                        height: 'auto',
                        display: 'block',
                        borderRadius: '16px 16px 0 0',
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    {/* Fallback for modal */}
                    <Box
                      sx={{
                        width: 600,
                        height: 400,
                        background: `linear-gradient(135deg, 
                          ${theme.palette.primary.main}20, 
                          ${theme.palette.secondary.main}20)`,
                        display: 'none',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 4,
                        borderRadius: '16px 16px 0 0',
                      }}
                    >
                      <PhotoLibrary
                        sx={{
                          fontSize: 80,
                          color: 'primary.main',
                          opacity: 0.3,
                          mb: 2,
                        }}
                      />
                    </Box>

                    {/* Image caption */}
                    <Box sx={{ p: 3, backgroundColor: 'background.paper' }}>
                      <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                        {selectedImage.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {selectedImage.description}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              )}
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Box>
  );
};

export default ProfessionalJourney;
