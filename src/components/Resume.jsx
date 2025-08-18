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
  Language,
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
      title: 'Technical Lead (Augmented Resource)',
      company: 'Grameenphone Telecom Ltd.',
      period: 'Jul 2022 – Present',
      description:
        'Architected platform reporting module serving millions of records daily; cut query times from ~20 minutes to ~30 seconds. Led 11-service migration, standardized API contracts. Created AWS Lambda-inspired dynamic function execution feature. Mentored 8+ engineers across 3 teams.',
    },
    {
      title: 'Senior Software Engineer',
      company: 'Brain Station 23 PLC',
      period: 'Nov 2018 – Jun 2022',
      description:
        'Built and maintained ERP modules (Accounting, HRM, Training, Vehicle Management) for Bangladesh Academy of Rural Development. Created Kaizen-inspired continuous improvement project for Bangladesh Ministry of Industries; awarded for best innovations in industry field. Improved performance with query optimization and Redis caching.',
    },
  ];

  const education = [
    {
      degree: 'B.Sc. in Computer Science & Engineering',
      school: 'International Islamic University, Chittagong, Bangladesh',
      period: '2014 – 2018',
      description: 'CGPA: 3.69 / 4.00',
    },
  ];

  const languages = [
    'Bengali — Native proficiency',
    'English — Fluent (written and verbal communication)',
    'Hindi/Urdu — Moderate proficiency',
    'Arabic — Reading proficiency',
  ];

  const certifications = [
    'Winner — Inter‑University App Contest (2017)',
    'Co‑Author — nameGist: A Phonetic Algorithm (Springer, 2019)',
    'Judge — IIUC Hackathon (2020)',
    'ACM ICPC Regional Participant (2015)',
    'Grameenphone Innovation Lab Q4 Award Winner',
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
        <motion.div
          variants={fadeIn('up', 'tween', 0.2, 1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
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

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: inView ? 1 : 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
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
              Download my complete resume or view my experience and
              qualifications below.
            </Typography>

            <motion.div
              variants={zoomIn(0.4, 1)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
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
            <motion.div
              variants={slideIn('left', 'tween', 0.2, 1)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              <Stack spacing={4}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <BusinessCenter />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold">
                    Work Experience
                  </Typography>
                </Stack>
                <Divider />
                {experience.map((job, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
                  >
                    <Card sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {job.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="primary.main"
                        sx={{ mb: 1 }}
                      >
                        {job.company}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {job.period}
                      </Typography>
                      <Typography variant="body2">{job.description}</Typography>
                    </Card>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              variants={slideIn('right', 'tween', 0.2, 1)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              <Stack spacing={4}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <School />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold">
                    Education
                  </Typography>
                </Stack>
                <Divider />
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    variants={fadeIn('up', 'spring', index * 0.2, 0.75)}
                  >
                    <Card sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {edu.degree}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="secondary.main"
                        sx={{ mb: 1 }}
                      >
                        {edu.school}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {edu.period}
                      </Typography>
                      <Typography variant="body2">{edu.description}</Typography>
                    </Card>
                  </motion.div>
                ))}

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 4 }}
                >
                  <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    <Language />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold">
                    Languages
                  </Typography>
                </Stack>
                <Divider />
                <Card sx={{ p: 3 }}>
                  <Stack spacing={1}>
                    {languages.map((lang, index) => (
                      <motion.div
                        key={index}
                        variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1.5}
                        >
                          <Language
                            sx={{
                              fontSize: 16,
                              color: theme.palette.secondary.main,
                            }}
                          />
                          <Typography variant="body2">{lang}</Typography>
                        </Stack>
                      </motion.div>
                    ))}
                  </Stack>
                </Card>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  sx={{ mt: 4 }}
                >
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <EmojiEvents />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold">
                    Awards & Activities
                  </Typography>
                </Stack>
                <Divider />
                <Card sx={{ p: 3 }}>
                  <Stack spacing={1}>
                    {certifications.map((cert, index) => (
                      <motion.div
                        key={index}
                        variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1.5}
                        >
                          <Article
                            sx={{
                              fontSize: 16,
                              color: theme.palette.primary.main,
                            }}
                          />
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
