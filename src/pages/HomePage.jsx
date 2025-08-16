import { Box, Typography } from '@mui/material';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <Box component="main">
      <Typography variant="h6" sx={{ p: 2, textAlign: 'center', display: 'none' }}>
        Home Page Loading...
      </Typography>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Contact />
    </Box>
  );
};

export default HomePage;