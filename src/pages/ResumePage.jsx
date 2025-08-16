import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Stack,
  Avatar,
  Divider,
  IconButton,
  Modal,
  Backdrop,
  Fade,
  ImageList,
  ImageListItem,
} from '@mui/material';
import {
  Download,
  Article,
  EmojiEvents,
  BusinessCenter,
  School,
  ArrowBack,
  Link as LinkIcon,
  Circle,
  Close,
  PhotoLibrary,
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../contexts/ThemeContext';
import { fadeIn, slideIn, zoomIn } from '../utils/motion';
import { trackEvent, trackOutboundLink } from '../utils/analytics';

const ResumePage = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Helper to resolve public assets respecting Vite base
  const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

  // Professional journey background images
  const backgroundImages = [
    {
      src: publicAsset('journey-images/journey-1.jpeg'),
      title: 'Professional Journey',
    },
    {
      src: publicAsset('journey-images/journey-2.jpeg'),
      title: 'Team Collaboration',
    },
    {
      src: publicAsset('journey-images/journey-3.jpeg'),
      title: 'Technical Leadership',
    },
    {
      src: publicAsset('journey-images/journey-4.jpeg'),
      title: 'Innovation & Growth',
    },
    // Test with a known working image
    {
      src: publicAsset('project-images/dwe/dwe-dashboard.png'),
      title: 'Test Image (DWE Dashboard)',
    },
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 4000); // Change every 4 seconds
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleDownload = () => {
    // Download the PDF version of resume
    trackEvent('download_resume', {
      file: 'Mohammad_Imran_Hossain_Resume.pdf',
      file_type: 'pdf',
      location: 'resume_page_hero',
    });
    const link = document.createElement('a');
    link.href = publicAsset('Mohammad_Imran_Hossain_Resume.pdf');
    link.download = 'Mohammad_Imran_Hossain_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const experience = [
    {
      title: 'Technical Lead (Augmented Resource)',
      company: 'Grameenphone Telecom Ltd',
      companyUrl: 'https://www.grameenphone.com/',
      period: 'Jul 2022 - Present',
      duration: '2.5+ years',
      description: 'Leading enterprise microservices platform development. Built reporting module processing millions of records daily, led monolith to microservices migration, and introduced centralized logging with PLG stack.',
      color: '#00A651',
      isActive: true,
    },
    {
      title: 'Senior Software Engineer',
      company: 'Brain Station 23 PLC',
      companyUrl: 'https://brainstation-23.com/',
      period: 'Nov 2020 - Jun 2022',
      duration: '1.7 years',
      description: 'Developed ERP modules for Bangladesh Academy of Rural Development including Accounting, HRM, Training systems within Laravel modular monolith architecture.',
      color: '#1976d2',
      isActive: false,
    },
    {
      title: 'Software Engineer',
      company: 'Brain Station 23 PLC',
      companyUrl: 'https://brainstation-23.com/',
      period: 'Nov 2019 - Oct 2020',
      duration: '1 year',
      description: 'Enhanced enterprise applications for public and private sectors, optimized system performance with Redis caching, and researched Nuxt.js for production integration.',
      color: '#1976d2',
      isActive: false,
    },
    {
      title: 'Associate Software Engineer',
      company: 'Brain Station 23 PLC',
      companyUrl: 'https://brainstation-23.com/',
      period: 'Nov 2018 - Oct 2019',
      duration: '1 year',
      description: 'Built core application features, implemented responsive designs, and collaborated with clients for requirement analysis and technical solutions.',
      color: '#1976d2',
      isActive: false,
    },
  ];

  const education = [
    {
      degree: 'B.Sc. in Computer Science & Engineering',
      school: 'International Islamic University, Chittagong',
      period: '2014 - 2018',
      description: 'CGPA: 3.69/4.00. Specialized in algorithms, data structures, and software engineering principles.',
    },
  ];

  const certifications = [
    'Grameenphone Innovation Lab Q4 Award Winner',
    'Co-Author: "nameGist: A Phonetic Algorithm" (Springer, 2019)',
    'Judge at IIUC Hackathon 2020',
    'Winner - Inter-University App Contest (2017)',
    'ACM ICPC Regional Participant (2015)',
  ];

  const handleImageClick = (image) => {
    trackEvent('open_journey_slide', { title: image.title });
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <Box
      component="main"
      ref={ref}
      sx={{
        py: 8,
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="lg">
        <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          {/* Hero Section (clean, no background) */}
          <Box sx={{ mb: 6 }}>
            {/* Hero content */}
            <Box>
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
                    color: 'text.primary',
                  }}
                >
                  Resume
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
                  sx={{
                    maxWidth: '600px',
                    mx: 'auto',
                    lineHeight: 1.6,
                    mb: 4,
                    color: 'text.secondary',
                  }}
                >
                  Technical Lead with almost 7 years of experience building enterprise-grade web applications and leading development teams.
                </Typography>

                <motion.div variants={zoomIn(0.4, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleDownload}
                      startIcon={<Download />}
                    >
                      Download Resume PDF
                    </Button>
                  </Stack>
                </motion.div>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Dedicated Slideshow Section */}
        <Box sx={{ mb: 8 }}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}><EmojiEvents /></Avatar>
            <Typography variant="h4" fontWeight="bold">Professional Journey</Typography>
          </Stack>
          <Card 
            className="glass-card"
            sx={{ 
              position: 'relative', 
              overflow: 'hidden', 
              borderRadius: 3,
              height: { xs: 240, sm: 320, md: 400 },
            }}
          >
            {/* Slides */}
            {backgroundImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ 
                  opacity: currentSlide === index ? 1 : 0,
                  scale: currentSlide === index ? 1 : 1.05 
                }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  inset: 0,
                }}
                onClick={() => handleImageClick(backgroundImages[index])}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </motion.div>
            ))}

            {/* Gradient overlay for text legibility */}
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 70%)' }} />

            {/* Caption and indicators */}
            <Box sx={{ position: 'absolute', left: 16, right: 16, bottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6" sx={{ color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}>
                {backgroundImages[currentSlide]?.title}
              </Typography>
              <Stack direction="row" spacing={1}>
                {backgroundImages.map((_, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      cursor: 'pointer',
                      backgroundColor: idx === currentSlide ? 'white' : 'rgba(255,255,255,0.5)',
                      boxShadow: '0 0 0 2px rgba(0,0,0,0.2)'
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Card>
        </Box>


        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div variants={slideIn('left', 'tween', 0.2, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <Stack spacing={4}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}><BusinessCenter /></Avatar>
                  <Typography variant="h4" fontWeight="bold">Work Experience</Typography>
                </Stack>
                <Divider />
                <Box sx={{ position: 'relative', pl: 3 }}>
                  {/* Timeline Line */}
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 14,
                      top: 20,
                      bottom: 20,
                      width: 2,
                      background: 'linear-gradient(to bottom, #6366f1, #8b5cf6)',
                      borderRadius: 1,
                    }}
                  />
                  
                  {experience.map((job, index) => (
                    <motion.div 
                      key={index} 
                      variants={fadeIn('up', 'spring', index * 0.2, 0.75)} 
                      initial="hidden" 
                      animate={inView ? 'show' : 'hidden'}
                      style={{ position: 'relative' }}
                    >
                      {/* Timeline Dot */}
                      <Box
                        sx={{
                          position: 'absolute',
                          left: -27,
                          top: 20,
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          bgcolor: job.color,
                          border: '4px solid',
                          borderColor: 'background.paper',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 2,
                          animation: job.isActive ? 'pulse 2s infinite' : 'none',
                          '@keyframes pulse': {
                            '0%': { boxShadow: `0 0 0 0 ${job.color}40` },
                            '70%': { boxShadow: `0 0 0 10px ${job.color}00` },
                            '100%': { boxShadow: `0 0 0 0 ${job.color}00` },
                          },
                        }}
                      >
                        <Circle sx={{ fontSize: 12, color: 'white' }} />
                      </Box>
                      
                      <Card 
                        sx={{ 
                          p: 3, 
                          mb: 3,
                          ml: 2,
                          border: job.isActive ? '2px solid' : '1px solid',
                          borderColor: job.isActive ? job.color : 'divider',
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          backdropFilter: 'blur(20px)',
                          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                          '&:hover': {
                            borderColor: job.color,
                            transform: 'translateX(8px)',
                            transition: 'all 0.3s ease',
                            backgroundColor: 'rgba(255, 255, 255, 0.25)',
                          }
                        }} 
                        className="glass-card"
                      >
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                          <Box>
                            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                              {job.title}
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                              <Typography 
                                variant="subtitle1" 
                                component="a"
                                href={job.companyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackOutboundLink(job.companyUrl, job.company)}
                                sx={{ 
                                  color: job.color,
                                  textDecoration: 'none',
                                  fontWeight: 600,
                                  '&:hover': {
                                    textDecoration: 'underline',
                                  }
                                }}
                              >
                                {job.company}
                              </Typography>
                              <LinkIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            </Stack>
                          </Box>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2" color="text.secondary" fontWeight="600">
                              {job.duration}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {job.period}
                            </Typography>
                          </Box>
                        </Stack>
                        <Typography variant="body2" sx={{ lineHeight: 1.6, mb: 3 }}>
                          {job.description}
                        </Typography>
                      </Card>
                    </motion.div>
                  ))}
                </Box>
              </Stack>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={slideIn('right', 'tween', 0.2, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <Stack spacing={4}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}><School /></Avatar>
                  <Typography variant="h4" fontWeight="bold">Education</Typography>
                </Stack>
                <Divider />
                {education.map((edu, index) => (
                  <motion.div key={index} variants={fadeIn('up', 'spring', index * 0.2, 0.75)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                    <Card 
                      sx={{ 
                        p: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(20px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                      }} 
                      className="glass-card"
                    >
                      <Typography variant="h6" fontWeight="bold">{edu.degree}</Typography>
                      <Typography variant="subtitle1" color="secondary.main" sx={{ mb: 1 }}>{edu.school}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{edu.period}</Typography>
                      <Typography variant="body2">{edu.description}</Typography>
                    </Card>
                  </motion.div>
                ))}

                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 4 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}><EmojiEvents /></Avatar>
                  <Typography variant="h4" fontWeight="bold">Achievements</Typography>
                </Stack>
                <Divider />
                <Card 
                  sx={{ 
                    p: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  }} 
                  className="glass-card"
                >
                  <Stack spacing={1}>
                    {certifications.map((cert, index) => (
                      <motion.div key={index} variants={fadeIn('up', 'spring', index * 0.1, 0.75)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Article sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                          <Typography variant="body2">{cert}</Typography>
                        </Stack>
                      </motion.div>
                    ))}
                  </Stack>
                </Card>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
        
        {/* Image Modal */}
        <Modal
          open={!!selectedImage}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
            sx: { backgroundColor: 'rgba(0, 0, 0, 0.8)' }
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
                      <PhotoLibrary sx={{ fontSize: 80, color: 'primary.main', opacity: 0.3, mb: 2 }} />
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

export default ResumePage;
