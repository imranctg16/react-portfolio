import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ResumePage from './pages/ResumePage';
import { initGA, trackPageview } from './utils/analytics';

function AnalyticsListener() {
  const location = useLocation();
  useEffect(() => {
    trackPageview(location.pathname + location.search, document.title);
  }, [location]);
  return null;
}

function App() {
  useEffect(() => {
    const id = import.meta.env.VITE_GA_ID;
    if (id) {
      initGA(id);
    }
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Box
          className="theme-transition bg-pattern"
          sx={{
            minHeight: '100vh',
            position: 'relative',
            bgcolor: 'background.default',
          }}
        >
          <Header />
          <AnalyticsListener />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPostPage />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
