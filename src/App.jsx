import { ThemeProvider } from './contexts/ThemeContext';
import { Box } from '@mui/material';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <Box 
        className="theme-transition bg-pattern"
        sx={{ 
          minHeight: '100vh',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        
        <Header />
        <Box component="main">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;