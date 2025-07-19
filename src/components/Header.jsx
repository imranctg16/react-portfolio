import { useState } from 'react';
import { motion } from 'framer-motion';
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
import { fadeIn } from '../utils/motion';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
          <motion.div variants={fadeIn('right', 'tween', 0.2, 1)} initial="hidden" animate="show">
            <Logo onClick={() => scrollToSection('#hero')} />
          </motion.div>

          {!isMobile && (
            <Stack direction="row" spacing={1}>
              {navigation.map((item, index) => (
                <motion.div key={item.name} variants={fadeIn('down', 'tween', index * 0.1, 1)} initial="hidden" animate="show">
                  <Button
                    onClick={() => scrollToSection(item.href)}
                    className="glass-button micro-lift theme-transition"
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                      backgroundColor: 'transparent !important',
                      border: 'none',
                      mx: 0.5,
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                </motion.div>
              ))}
            </Stack>
          )}

          <motion.div variants={fadeIn('left', 'tween', 0.2, 1)} initial="hidden" animate="show">
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                onClick={toggleTheme}
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
            {navigation.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton
                  onClick={() => scrollToSection(item.href)}
                  className="glass-button micro-lift theme-transition"
                  sx={{
                    borderRadius: 2,
                    backgroundColor: 'transparent !important',
                    mx: 1,
                    mb: 1,
                  }}
                >
                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontWeight: 500,
                      fontSize: '1.1rem',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Toolbar />
    </>
  );
};

export default Header;