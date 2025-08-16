import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  IconButton,
  Link,
} from '@mui/material';
import {
  MailOutline,
  PhoneOutlined,
  LocationOnOutlined,
  Send,
  GitHub,
  LinkedIn,
  Twitter,
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { fadeIn, slideIn } from '../utils/motion';

const Contact = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const mailtoUrl = `mailto:imranhossain16.ctg@gmail.com?subject=Contact from ${name}&body=${encodeURIComponent(
      message
    )}&replyto=${email}`;
    window.location.href = mailtoUrl;
  };

  const contactInfo = [
    {
      icon: MailOutline,
      label: 'Email',
      value: 'imranhossain16.ctg@gmail.com',
      href: 'mailto:imranhossain16.ctg@gmail.com',
    },
    {
      icon: PhoneOutlined,
      label: 'Phone',
      value: '+880 1866 803 833',
      href: 'tel:+8801866803833',
    },
    {
      icon: LocationOnOutlined,
      label: 'Location',
      value: 'Dhaka, Bangladesh',
    },
  ];

  const socialLinks = [
    { icon: GitHub, label: 'GitHub', href: 'https://github.com/imranctg16' },
    { icon: LinkedIn, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohammad-imran-hossain-783803135' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com/imranctg16' },
  ];

  return (
    <Box
      component="section"
      id="contact"
      ref={ref}
      className="theme-transition section-spacing"
      sx={{ position: 'relative', overflow: 'hidden' }}
    >
      <Container maxWidth="lg" className="section-container">
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <Box className="section-header">
            <Typography
              variant="h2"
              className="text-gradient"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Get In Touch
            </Typography>
            
            <motion.div 
              initial={{ scaleX: 0 }} 
              animate={{ scaleX: inView ? 1 : 0 }} 
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 4,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #f59e0b 100%)',
                  mx: 'auto',
                  mb: 4,
                  borderRadius: 2,
                  transformOrigin: 'center',
                }}
              />
            </motion.div>
            
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ 
                maxWidth: '600px', 
                mx: 'auto', 
                lineHeight: 1.6,
                fontSize: '1.1rem'
              }}
            >
              💬 Have a project in mind or just want to say hi? I'd love to hear from you and discuss how we can work together!
            </Typography>
          </Box>
        </motion.div>

        {/* Let's Connect Section */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.4, 1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <Box className="glass-card theme-transition" sx={{ p: 5, borderRadius: 4, mb: 8 }}>
            <Typography 
              variant="h4" 
              fontWeight="700" 
              className="text-gradient"
              sx={{ mb: 5, textAlign: 'center' }}
            >
              📞 Let's Connect
            </Typography>
            
            <Grid container spacing={4}>
              {/* Contact Info Items */}
              {contactInfo.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={item.label}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Box 
                      className="glass-card theme-transition micro-lift"
                      sx={{ 
                        p: 4, 
                        borderRadius: 3,
                        textAlign: 'center',
                        height: '100%',
                        border: '2px solid rgba(255, 255, 255, 0.1)',
                        '&:hover': {
                          border: '2px solid rgba(99, 102, 241, 0.3)',
                          boxShadow: '0 15px 45px rgba(99, 102, 241, 0.2)',
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, ${index % 2 === 0 ? '#6366f1' : '#f59e0b'} 0%, ${index % 2 === 0 ? '#8b5cf6' : '#fbbf24'} 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 3,
                          boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)',
                        }}
                      >
                        <item.icon sx={{ fontSize: 28, color: 'white' }} />
                      </Box>
                      <Typography variant="h6" fontWeight="600" color="text.primary" sx={{ mb: 1 }}>
                        {item.label}
                      </Typography>
                      <Link
                        href={item.href}
                        underline="none"
                        color="text.secondary"
                        sx={{ 
                          fontSize: '1rem',
                          '&:hover': { 
                            color: 'primary.main',
                            textDecoration: 'underline' 
                          }
                        }}
                      >
                        {item.value}
                      </Link>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
              
              {/* Social Media */}
              <Grid item xs={12} sm={6} md={4}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Box 
                    className="glass-card theme-transition micro-lift"
                    sx={{ 
                      p: 4, 
                      borderRadius: 3,
                      textAlign: 'center',
                      height: '100%',
                      border: '2px solid rgba(255, 255, 255, 0.1)',
                      '&:hover': {
                        border: '2px solid rgba(245, 158, 11, 0.3)',
                        boxShadow: '0 15px 45px rgba(245, 158, 11, 0.2)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)',
                      }}
                    >
                      <Typography sx={{ fontSize: 28 }}>🌐</Typography>
                    </Box>
                    <Typography variant="h6" fontWeight="600" color="text.primary" sx={{ mb: 2 }}>
                      Social Media
                    </Typography>
                    <Stack direction="row" spacing={1} justifyContent="center">
                      {socialLinks.map((social, index) => (
                        <motion.div
                          key={social.label}
                          whileHover={{ y: -3, scale: 1.1 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <IconButton
                            component="a"
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                            size="small"
                            sx={{
                              color: 'text.secondary',
                              '&:hover': { 
                                color: 'secondary.main',
                              }
                            }}
                          >
                            <social.icon sx={{ fontSize: 20 }} />
                          </IconButton>
                        </motion.div>
                      ))}
                    </Stack>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </motion.div>

        {/* Send Message Section */}
        <motion.div
          variants={slideIn('up', 'tween', 0.6, 1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <Box className="glass-card theme-transition" sx={{ p: 5, borderRadius: 4, maxWidth: 800, mx: 'auto' }}>
            <Typography 
              variant="h4" 
              fontWeight="700" 
              className="text-gradient"
              sx={{ mb: 4, textAlign: 'center' }}
            >
              ✉️ Send Message
            </Typography>
            
            <Box
              component="form"
              onSubmit={handleSubmit}
            >
              <Stack spacing={4}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          background: 'rgba(255, 255, 255, 0.05)',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.08)',
                          },
                          '&.Mui-focused': {
                            background: 'rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
                          }
                        },
                        '& .MuiInputLabel-root': {
                          fontWeight: 500,
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      required
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          background: 'rgba(255, 255, 255, 0.05)',
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.08)',
                          },
                          '&.Mui-focused': {
                            background: 'rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
                          }
                        },
                        '& .MuiInputLabel-root': {
                          fontWeight: 500,
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                
                <TextField
                  fullWidth
                  required
                  multiline
                  rows={8}
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: 'rgba(255, 255, 255, 0.05)',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.08)',
                      },
                      '&.Mui-focused': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.2)',
                      }
                    },
                    '& .MuiInputLabel-root': {
                      fontWeight: 500,
                    }
                  }}
                />
                
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<Send />}
                    className="micro-lift theme-transition"
                    sx={{ 
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
                        boxShadow: '0 12px 40px rgba(99, 102, 241, 0.5)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    Send Message 🚀
                  </Button>
                </motion.div>
              </Stack>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Contact;