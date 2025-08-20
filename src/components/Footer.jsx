import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Link,
  Divider,
  Stack,
} from '@mui/material';
import {
  ArrowUpward,
  GitHub,
  LinkedIn,
  Mail,
  Favorite,
} from '@mui/icons-material';
import { useTheme } from '../contexts/ThemeContext';
import { fadeIn, zoomIn } from '../utils/motion';
import Logo from './Logo';
import { trackOutboundLink } from '../utils/analytics';

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    {
      icon: GitHub,
      href: 'https://github.com/imranctg16',
      label: 'GitHub',
    },
    {
      icon: LinkedIn,
      href: 'https://www.linkedin.com/in/mohammad-imran-hossain-783803135',
      label: 'LinkedIn',
    },
    {
      icon: Mail,
      href: 'mailto:imranhossain16.ctg@gmail.com',
      label: 'Email',
    },
  ];

  return (
    <Box
      component="footer"
      className="glass-nav theme-transition"
      sx={{
        py: 6,
        position: 'relative',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5} justifyContent="space-between">
          <Grid item xs={12} md={4}>
            <motion.div
              variants={fadeIn('up', 'tween', 0.2, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Logo />
              <Typography variant="body2" sx={{ mt: 2, maxWidth: 300 }}>
                Technical Lead with 6.5+ years of experience building
                enterprise-grade web applications and leading development teams.
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={social.label}
                    variants={zoomIn(index * 0.1, 0.5)}
                    whileHover={{
                      y: -5,
                      scale: 1.1,
                      transition: { type: 'spring', stiffness: 300 },
                    }}
                  >
                    <IconButton
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      onClick={() =>
                        trackOutboundLink(social.href, social.label)
                      }
                      className="glass-button micro-bounce theme-transition"
                      sx={{
                        color: 'text.primary',
                        '&:hover': { bgcolor: 'primary.main', color: 'white' },
                      }}
                    >
                      <social.icon />
                    </IconButton>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          <Grid item xs={6} md={2}>
            <motion.div
              variants={fadeIn('up', 'tween', 0.3, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Quick Links
              </Typography>
              <Stack spacing={1}>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="micro-lift theme-transition"
                    sx={{
                      color: 'text.primary',
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          <Grid item xs={6} md={3}>
            <motion.div
              variants={fadeIn('up', 'tween', 0.4, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Get In Touch
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2">Dhaka, Bangladesh</Typography>
                <Typography variant="body2">
                  imranhossain16.ctg@gmail.com
                </Typography>
                <Typography variant="body2">+880 1866 803 833</Typography>
              </Stack>
            </motion.div>
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <motion.div
              variants={zoomIn(0.5, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <IconButton
                onClick={scrollToTop}
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
                aria-label="Back to top"
              >
                <ArrowUpward />
              </IconButton>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: 'primary.main' }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} Mohammad Imran Hossain. All rights
            reserved.
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ opacity: 0.7 }}
          >
            <Typography variant="body2">Made with</Typography>
            <Favorite sx={{ fontSize: 16, color: 'red' }} />
            <Typography variant="body2">using React & Material UI</Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
