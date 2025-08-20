import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme } from '../contexts/ThemeContext';
import { trackEvent } from '../utils/analytics';
import { fadeIn } from '../utils/motion';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', sectionId: 'hero', isSection: true },
    { name: 'About', sectionId: 'about', isSection: true },
    { name: 'Skills', sectionId: 'skills', isSection: true },
    { name: 'Projects', href: '/projects', isSection: false },
    { name: 'Blog', href: '/blog', isSection: false },
    { name: 'Resume', href: '/resume', isSection: false },
    { name: 'Contact', sectionId: 'contact', isSection: true },
  ];

  // Effect to handle scroll-based navigation highlighting
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleSectionNavigation = (sectionId) => {
    setIsMenuOpen(false);

    // If we're not on home page, navigate to home first
    if (location.pathname !== '/') {
      if (sectionId === 'hero') {
        window.location.href = `/`;
      } else {
        window.location.href = `/`;
        // After navigation, scroll to section
        setTimeout(() => {
          const element = document.querySelector(`#${sectionId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
      return;
    }

    // If on home page, scroll to section
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(`#${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActiveRoute = (href) => {
    return location.pathname === href;
  };

  const isActiveSection = (sectionId) => {
    // Only highlight section if we're on home page
    return location.pathname === '/' && activeSection === sectionId;
  };

  const handleToggleTheme = () => {
    const next = isDarkMode ? 'light' : 'dark';
    trackEvent('toggle_theme', { to: next });
    toggleTheme();
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        className="glass-nav theme-transition"
        sx={{
          backgroundColor: 'transparent !important',
          borderBottom: 'none',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <motion.div
            variants={fadeIn('right', 'tween', 0.2, 1)}
            initial="hidden"
            animate="show"
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Logo />
            </Link>
          </motion.div>

          {!isMobile && (
            <Stack direction="row" spacing={1}>
              {navigation.map((item, index) => {
                const isActive = item.isSection
                  ? isActiveSection(item.sectionId)
                  : isActiveRoute(item.href);

                return (
                  <motion.div
                    key={item.name}
                    variants={fadeIn('down', 'tween', index * 0.1, 1)}
                    initial="hidden"
                    animate="show"
                  >
                    {item.isSection ? (
                      <Button
                        onClick={() => handleSectionNavigation(item.sectionId)}
                        className="glass-button micro-lift theme-transition"
                        sx={{
                          color: isActive ? 'primary.main' : 'text.primary',
                          fontWeight: isActive ? 600 : 500,
                          backgroundColor: isActive
                            ? 'rgba(99, 102, 241, 0.1) !important'
                            : 'transparent !important',
                          border: isActive ? '1px solid' : 'none',
                          borderColor: isActive
                            ? 'primary.main'
                            : 'transparent',
                          mx: 0.5,
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor:
                              'rgba(99, 102, 241, 0.1) !important',
                          },
                        }}
                      >
                        {item.name}
                      </Button>
                    ) : (
                      <Button
                        component={Link}
                        to={item.href}
                        className="glass-button micro-lift theme-transition"
                        sx={{
                          color: isActive ? 'primary.main' : 'text.primary',
                          fontWeight: isActive ? 600 : 500,
                          backgroundColor: isActive
                            ? 'rgba(99, 102, 241, 0.1) !important'
                            : 'transparent !important',
                          border: isActive ? '1px solid' : 'none',
                          borderColor: isActive
                            ? 'primary.main'
                            : 'transparent',
                          mx: 0.5,
                          '&:hover': {
                            color: 'primary.main',
                            backgroundColor:
                              'rgba(99, 102, 241, 0.1) !important',
                          },
                        }}
                      >
                        {item.name}
                      </Button>
                    )}
                  </motion.div>
                );
              })}
            </Stack>
          )}

          <motion.div
            variants={fadeIn('left', 'tween', 0.2, 1)}
            initial="hidden"
            animate="show"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                onClick={handleToggleTheme}
                className="glass-button micro-bounce theme-transition"
                sx={{
                  color: 'text.primary',
                  backgroundColor: 'transparent !important',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
                aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>

              {isMobile && (
                <IconButton
                  onClick={() => setIsMenuOpen(true)}
                  className="glass-button micro-bounce theme-transition"
                  sx={{
                    color: 'text.primary',
                    backgroundColor: 'transparent !important',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                  aria-label="Open menu"
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>
          </motion.div>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        PaperProps={{
          className: 'glass theme-transition',
          sx: {
            width: 280,
            backgroundColor: 'transparent !important',
            backdropFilter: 'blur(20px)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <List>
            {navigation.map((item) => {
              const isActive = item.isSection
                ? isActiveSection(item.sectionId)
                : isActiveRoute(item.href);

              return (
                <ListItem key={item.name} disablePadding>
                  {item.isSection ? (
                    <ListItemButton
                      onClick={() => handleSectionNavigation(item.sectionId)}
                      className="glass-button micro-lift theme-transition"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: isActive
                          ? 'rgba(99, 102, 241, 0.1) !important'
                          : 'transparent !important',
                        border: isActive ? '1px solid' : 'none',
                        borderColor: isActive ? 'primary.main' : 'transparent',
                        mx: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                          fontWeight: isActive ? 600 : 500,
                          fontSize: '1.1rem',
                          color: isActive ? 'primary.main' : 'text.primary',
                        }}
                      />
                    </ListItemButton>
                  ) : (
                    <ListItemButton
                      component={Link}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="glass-button micro-lift theme-transition"
                      sx={{
                        borderRadius: 2,
                        backgroundColor: isActive
                          ? 'rgba(99, 102, 241, 0.1) !important'
                          : 'transparent !important',
                        border: isActive ? '1px solid' : 'none',
                        borderColor: isActive ? 'primary.main' : 'transparent',
                        mx: 1,
                        mb: 1,
                      }}
                    >
                      <ListItemText
                        primary={item.name}
                        primaryTypographyProps={{
                          fontWeight: isActive ? 600 : 500,
                          fontSize: '1.1rem',
                          color: isActive ? 'primary.main' : 'text.primary',
                        }}
                      />
                    </ListItemButton>
                  )}
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      <Toolbar />
    </>
  );
};

export default Header;
