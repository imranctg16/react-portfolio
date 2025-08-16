import { motion } from 'framer-motion';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Download,
  Article,
  EmojiEvents,
  BusinessCenter,
  School,
} from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../contexts/ThemeContext';
import { fadeIn, slideIn, zoomIn } from '../utils/motion';

const Resume = () => {
  const { theme } = useTheme();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Mohammad_Imran_Hossain_Resume.pdf';
    link.download = 'Mohammad_Imran_Hossain_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const experience = [
    {
      title: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      description: 'Lead frontend development team, architected scalable React applications, and mentored junior developers.',
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency Pro',
      period: '2020 - 2022',
      description: 'Developed responsive web applications using React, collaborated with design teams, and optimized performance.',
    },
    {
      title: 'Junior Web Developer',
      company: 'StartUp Ventures',
      period: '2019 - 2020',
      description: 'Built interactive user interfaces, implemented responsive designs, and maintained legacy codebases.',
    },
  ];

  const education = [
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Technology',
      period: '2015 - 2019',
      description: 'Graduated with honors, specialized in web development and software engineering.',
    },
  ];

  const certifications = [
    'React Developer Certification - Meta',
    'JavaScript Algorithms and Data Structures - freeCodeCamp',
    'Responsive Web Design - freeCodeCamp',
    'AWS Certified Cloud Practitioner',
  ];

  return (
    <Box
      component="section"
      id="resume"
      ref={ref}
      sx={{
        py: 12,
        bgcolor: 'background.paper',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg">
        <motion.div variants={fadeIn('up', 'tween', 0.2, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'primary.main',
              }}
            >
              Resume
            </Typography>
            
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: inView ? 1 : 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
              <Box
                sx={{
                  width: 80,
                  height: 4,
                  bgcolor: 'primary.main',
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
                mb: 4,
              }}
            >
              Download my complete resume or view my experience and qualifications below.
            </Typography>

            <motion.div variants={zoomIn(0.4, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <Button
                variant="contained"
                size="large"
                onClick={handleDownload}
                startIcon={<Download />}
              >
                Download Resume PDF
              </Button>
            </motion.div>
          </Box>
        </motion.div>

        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div variants={slideIn('left', 'tween', 0.2, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <Stack spacing={4}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}><BusinessCenter /></Avatar>
                  <Typography variant="h4" fontWeight="bold">Work Experience</Typography>
                </Stack>
                <Divider />
                {experience.map((job, index) => (
                  <motion.div key={index} variants={fadeIn('up', 'spring', index * 0.2, 0.75)}>
                    <Card sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight="bold">{job.title}</Typography>
                      <Typography variant="subtitle1" color="primary.main" sx={{ mb: 1 }}>{job.company}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{job.period}</Typography>
                      <Typography variant="body2">{job.description}</Typography>
                    </Card>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div variants={slideIn('right', 'tween', 0.2, 1)} initial="hidden" animate={inView ? 'show' : 'hidden'}>
              <Stack spacing={4}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}><School /></Avatar>
                  <Typography variant="h4" fontWeight="bold">Education</Typography>
                </Stack>
                <Divider />
                {education.map((edu, index) => (
                  <motion.div key={index} variants={fadeIn('up', 'spring', index * 0.2, 0.75)}>
                    <Card sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight="bold">{edu.degree}</Typography>
                      <Typography variant="subtitle1" color="secondary.main" sx={{ mb: 1 }}>{edu.school}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{edu.period}</Typography>
                      <Typography variant="body2">{edu.description}</Typography>
                    </Card>
                  </motion.div>
                ))}

                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 4 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}><EmojiEvents /></Avatar>
                  <Typography variant="h4" fontWeight="bold">Certifications</Typography>
                </Stack>
                <Divider />
                <Card sx={{ p: 3 }}>
                  <Stack spacing={1}>
                    {certifications.map((cert, index) => (
                      <motion.div key={index} variants={fadeIn('up', 'spring', index * 0.1, 0.75)}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Article sx={{ fontSize: 16, color: theme.palette.primary.main }} />
                          <Typography variant="body2">{cert}</Typography>
                        </Stack>
                      </motion.div>
                    ))}
                  </Stack>
                </Card>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Resume;