import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Chip,
  IconButton,
  Avatar,
  Card,
  Modal,
  Backdrop,
} from '@mui/material';
import {
  KeyboardArrowDown,
  GitHub,
  LinkedIn,
  Mail,
  Close,
  ArrowBackIos,
  ArrowForwardIos,
} from '@mui/icons-material';
import { fadeIn, slideIn } from '../utils/motion';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [slideshowOpen, setSlideshowOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openSlideshow = (imageIndex) => {
    setCurrentSlide(imageIndex);
    setSlideshowOpen(true);
  };

  const closeSlideshow = () => {
    setSlideshowOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % journeyImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + journeyImages.length) % journeyImages.length);
  };

  const handleKeyPress = (event) => {
    if (!slideshowOpen) return;
    if (event.key === 'ArrowLeft') prevSlide();
    if (event.key === 'ArrowRight') nextSlide();
    if (event.key === 'Escape') closeSlideshow();
  };

  useEffect(() => {
    if (slideshowOpen) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [slideshowOpen]);

  const techStack = ['Laravel', 'Vue.js', 'React.js', 'Express.js', 'Nuxt.js', 'PHP', 'MySQL', 'Redis', 'Docker'];

  // Professional journey images for background
  const journeyImages = [
    {
      src: '/journey-images/journey-1.jpeg',
      title: 'Professional Journey',
    },
    {
      src: '/journey-images/journey-2.jpeg',
      title: 'Team Collaboration',
    },
    {
      src: '/journey-images/journey-3.jpeg',
      title: 'Technical Leadership',
    },
    {
      src: '/journey-images/journey-4.jpeg',
      title: 'Innovation & Growth',
    },
    {
      src: '/journey-images/journey-5.jpeg',
      title: 'Development Excellence',
    },
    {
      src: '/journey-images/journey-6.jpeg',
      title: 'Technical Achievements',
    },
    {
      src: '/journey-images/journey-7.jpeg',
      title: 'Project Success',
    },
  ];

  return (
    <Box
      component="section"
      id="hero"
      ref={ref}
      className="theme-transition"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Floating Background Images */}
      {journeyImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 15 - 7 }}
          animate={{
            opacity: inView ? 0.6 : 0,
            scale: inView ? 1 : 0.8,
            rotate: [
              Math.random() * 6 - 3,
              Math.random() * 6 - 3,
              Math.random() * 6 - 3,
            ],
            y: [0, -8, 0],
          }}
          transition={{
            duration: 6 + index * 0.3,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.3,
          }}
          style={{
            position: 'absolute',
            left: index < 4 
              ? `${5 + (index * 20)}%` 
              : `${15 + ((index - 4) * 20)}%`,
            top: index < 4 ? '15%' : '55%',
            zIndex: 2,
          }}
        >
          <Card
            className="glass-card"
            onClick={() => openSlideshow(index)}
            sx={{
              width: { xs: 180, md: 280 },
              height: { xs: 120, md: 200 },
              borderRadius: 4,
              overflow: 'hidden',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(15px)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              '&:hover': {
                transform: 'scale(1.05)',
                transition: 'transform 0.3s ease',
                border: '3px solid rgba(99, 102, 241, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
              },
            }}
          >
            <img
              src={image.src}
              alt={image.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 1,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                color: 'white',
                p: 0.5,
                fontSize: { xs: '0.6rem', md: '0.8rem' },
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              {image.title}
            </Box>
          </Card>
        </motion.div>
      ))}
      <Container 
        maxWidth="lg" 
        className="section-container"
        sx={{ textAlign: 'center', position: 'relative', zIndex: 10 }}
      >
        <motion.div variants={fadeIn('down', 'tween', 0.2, 1)} initial="hidden" animate="show">
          <Avatar
            className="float-animation glass-card"
            sx={{
              width: 120,
              height: 120,
              mx: 'auto',
              mb: 2,
              fontSize: '3rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #f59e0b 100%)',
              boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: -2,
                background: 'linear-gradient(45deg, #6366f1, #8b5cf6, #f59e0b, #6366f1)',
                borderRadius: '50%',
                zIndex: -1,
                animation: 'spin 3s linear infinite',
              },
            }}
          >
            MIH
          </Avatar>
        </motion.div>

        <motion.div variants={slideIn('left', 'tween', 0.4, 1)} initial="hidden" animate="show">
          <Typography
            variant="h1"
            className="text-gradient"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              mb: 2,
              letterSpacing: '-0.02em',
            }}
          >
            Hello, I&apos;m Mohammad Imran Hossain
          </Typography>
        </motion.div>

        <motion.div variants={slideIn('right', 'tween', 0.6, 1)} initial="hidden" animate="show">
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 600,
              color: 'secondary.main',
              mb: 3,
            }}
          >
            Technical Lead & Full-Stack Developer
          </Typography>
        </motion.div>

        <motion.div variants={fadeIn('up', 'tween', 0.8, 1)} initial="hidden" animate="show">
          <Typography
            variant="h6"
            sx={{
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              color: 'text.secondary',
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            6.5+ years building enterprise-grade web applications. 
            Leading system migrations, solving complex production issues, and mentoring development teams.
          </Typography>
        </motion.div>

        <motion.div variants={fadeIn('up', 'tween', 1, 1)} initial="hidden" animate="show">
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            useFlexGap
            sx={{ my: 4 }}
          >
            {techStack.map((tech) => (
              <motion.div key={tech} whileHover={{ scale: 1.1, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Chip
                  label={tech}
                  className="glass-button micro-bounce theme-transition"
                  sx={{
                    fontWeight: 600,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
                  }}
                />
              </motion.div>
            ))}
          </Stack>
        </motion.div>

        <motion.div variants={fadeIn('up', 'tween', 1.2, 1)} initial="hidden" animate="show">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={3}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => scrollToSection('#projects')}
              className="micro-lift theme-transition"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                border: 'none',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
                  boxShadow: '0 12px 40px rgba(99, 102, 241, 0.5)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              View My Work
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              onClick={() => scrollToSection('#contact')}
              className="glass-button micro-lift theme-transition"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 3,
                border: '2px solid',
                borderColor: 'secondary.main',
                color: 'secondary.main',
                fontWeight: 600,
                background: 'rgba(245, 158, 11, 0.1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                  color: 'white',
                  borderColor: 'secondary.main',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Let&apos;s Connect
            </Button>
          </Stack>
        </motion.div>

        <motion.div variants={fadeIn('up', 'tween', 1.4, 1)} initial="hidden" animate="show">
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            {[
              { icon: GitHub, href: "https://github.com/imranctg16", label: "GitHub" },
              { icon: LinkedIn, href: "https://www.linkedin.com/in/mohammad-imran-hossain-783803135", label: "LinkedIn" },
              { icon: Mail, href: "mailto:imranhossain16.ctg@gmail.com", label: "Email" }
            ].map((social) => (
              <motion.div key={social.label} whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
                <IconButton
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="glass-button micro-bounce theme-transition"
                  sx={{
                    color: 'text.primary',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderColor: 'transparent',
                    },
                  }}
                >
                  <social.icon />
                </IconButton>
              </motion.div>
            ))}
          </Stack>
        </motion.div>

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <IconButton
            onClick={() => scrollToSection('#about')}
            className="glass-button micro-bounce theme-transition"
            sx={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
                borderColor: 'transparent',
              },
            }}
            aria-label="Scroll to about section"
          >
            <KeyboardArrowDown />
          </IconButton>
        </motion.div>
      </Container>

      {/* Journey Images Slideshow Modal */}
      <Modal
        open={slideshowOpen}
        onClose={closeSlideshow}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.9)' }
        }}
      >
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            maxWidth: '1000px',
            height: '80vh',
            outline: 0,
            zIndex: 1300,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            style={{
              width: '100%',
              height: '100%',
            }}
          >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: 4,
              overflow: 'hidden',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={closeSlideshow}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                zIndex: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <Close />
            </IconButton>

            {/* Previous Button */}
            <IconButton
              onClick={prevSlide}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <ArrowBackIos />
            </IconButton>

            {/* Next Button */}
            <IconButton
              onClick={nextSlide}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
              }}
            >
              <ArrowForwardIos />
            </IconButton>

            {/* Current Image */}
            <img
              src={journeyImages[currentSlide]?.src}
              alt={journeyImages[currentSlide]?.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />

            {/* Image Title and Counter */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
                color: 'white',
                p: 3,
                textAlign: 'center',
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                {journeyImages[currentSlide]?.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {currentSlide + 1} of {journeyImages.length}
              </Typography>
            </Box>

            {/* Thumbnail Navigation */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 80,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: 1,
                p: 2,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 3,
                backdropFilter: 'blur(10px)',
              }}
            >
              {journeyImages.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'white',
                      transform: 'scale(1.2)',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
          </motion.div>
        </Box>
      </Modal>
    </Box>
  );
};

export default Hero;