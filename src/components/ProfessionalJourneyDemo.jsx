import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
} from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { fadeIn } from '../utils/motion';

const ProfessionalJourneyDemo = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [activeDemo, setActiveDemo] = useState(1);

  const journeyImages = [
    { src: '/project-images/dwe/dwe-dashboard.png', title: 'Enterprise Microservices' },
    { src: '/project-images/sql/sql-dashboard.png', title: 'SQL Playground' },
    { src: '/project-images/aws-exam-prep/aws-dashboard.png', title: 'AWS Platform' },
    { src: '/project-images/dwe/dwe-workflow.png', title: 'Workflow Design' },
    { src: '/project-images/readme-reader/readme-1.png', title: 'Frontend Development' },
    { src: '/project-images/dwe/dwe-report-view.png', title: 'Performance Optimization' },
  ];

  // Demo 1: Floating Gallery Cards
  const FloatingGallery = () => (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: 'background.default',
      }}
    >
      {/* Floating Image Cards */}
      {journeyImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 20 - 10 }}
          animate={{
            opacity: inView ? 0.95 : 0,
            scale: inView ? 1 : 0.8,
            rotate: [
              Math.random() * 20 - 10,
              Math.random() * 20 - 10,
              Math.random() * 20 - 10,
            ],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.2,
          }}
          style={{
            position: 'absolute',
            left: `${15 + (index % 3) * 30}%`,
            top: `${20 + Math.floor(index / 3) * 40}%`,
            zIndex: 1,
          }}
        >
          <Card
            className="glass-card"
            sx={{
              width: { xs: 150, md: 280 },
              height: { xs: 110, md: 200 },
              borderRadius: 3,
              overflow: 'hidden',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(10px)',
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.3s ease',
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
                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                color: 'white',
                p: 1,
                fontSize: { xs: '0.7rem', md: '0.9rem' },
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              {image.title}
            </Box>
          </Card>
        </motion.div>
      ))}

      {/* Content Overlay */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, py: 10 }}>
        <Card
          className="glass-card"
          sx={{
            p: 6,
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <Typography variant="h3" fontWeight="bold" className="text-gradient" sx={{ mb: 3 }}>
            Professional Journey
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Floating gallery cards showcase technical achievements in the background while content remains readable
          </Typography>
        </Card>
      </Container>
    </Box>
  );

  // Demo 2: Background Slideshow
  const BackgroundSlideshow = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Background Images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                backgroundImage: `url(${journeyImages[currentSlide].src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(1px)',
                opacity: 0.6,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 2,
          }}
        />

        {/* Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, py: 10 }}>
          <Card
            className="glass-card"
            sx={{
              p: 6,
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Typography variant="h3" fontWeight="bold" sx={{ color: 'white', mb: 3 }}>
              Professional Journey
            </Typography>
            <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)', maxWidth: 600, mx: 'auto', mb: 4 }}>
              Background slideshow with smooth transitions between project screenshots
            </Typography>
            <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
              Current: {journeyImages[currentSlide].title}
            </Typography>
          </Card>
        </Container>

        {/* Auto-advance slideshow */}
        {setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % journeyImages.length);
        }, 3000)}
      </Box>
    );
  };

  // Demo 3: Parallax Image Grid
  const ParallaxGrid = () => (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Parallax Background Images */}
      {journeyImages.map((image, index) => (
        <motion.div
          key={index}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: inView ? 0 : 100, opacity: inView ? 0.85 : 0 }}
          transition={{
            duration: 1.5,
            delay: index * 0.2,
          }}
          style={{
            position: 'absolute',
            width: '350px',
            height: '250px',
            left: `${10 + (index % 3) * 30}%`,
            top: `${10 + Math.floor(index / 3) * 35}%`,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${image.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              borderRadius: 4,
              filter: 'blur(0.5px)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            }}
          />
        </motion.div>
      ))}

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 10, py: 10 }}>
        <Card
          className="glass-card"
          sx={{
            p: 6,
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(25px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <Typography variant="h3" fontWeight="bold" className="text-gradient" sx={{ mb: 3 }}>
            Professional Journey
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Parallax grid with images that move at different speeds, creating depth and visual interest
          </Typography>
        </Card>
      </Container>
    </Box>
  );

  const demos = [
    { id: 1, name: 'Floating Gallery', component: <FloatingGallery /> },
    { id: 2, name: 'Background Slideshow', component: <BackgroundSlideshow /> },
    { id: 3, name: 'Parallax Grid', component: <ParallaxGrid /> },
  ];

  return (
    <Box component="section" id="professional-journey-demo" ref={ref}>
      {/* Demo Selector */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          {demos.map((demo) => (
            <Button
              key={demo.id}
              variant={activeDemo === demo.id ? 'contained' : 'outlined'}
              onClick={() => setActiveDemo(demo.id)}
              className="glass-button"
            >
              {demo.name}
            </Button>
          ))}
        </Stack>
      </Container>

      {/* Active Demo */}
      <motion.div
        key={activeDemo}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {demos.find(demo => demo.id === activeDemo)?.component}
      </motion.div>
    </Box>
  );
};

export default ProfessionalJourneyDemo;