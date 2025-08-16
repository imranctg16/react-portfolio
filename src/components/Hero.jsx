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
} from '@mui/material';
import {
  KeyboardArrowDown,
  GitHub,
  LinkedIn,
  Mail,
} from '@mui/icons-material';
import { fadeIn, slideIn } from '../utils/motion';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            opacity: inView ? 0.8 : 0,
            scale: inView ? 1 : 0.8,
            rotate: [
              Math.random() * 8 - 4,
              Math.random() * 8 - 4,
              Math.random() * 8 - 4,
            ],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 5 + index * 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.5,
          }}
          style={{
            position: 'absolute',
            left: `${8 + (index % 2) * 40}%`,
            top: `${20 + Math.floor(index / 2) * 35}%`,
            zIndex: 1,
          }}
        >
          <Card
            className="glass-card"
            sx={{
              width: { xs: 120, md: 200 },
              height: { xs: 90, md: 150 },
              borderRadius: 3,
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.3s ease',
                border: '2px solid rgba(99, 102, 241, 0.4)',
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
                opacity: 0.9,
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
              Let's Connect
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
    </Box>
  );
};

export default Hero;