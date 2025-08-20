import { motion } from 'framer-motion';
import { Box, Container, Typography, Grid, Card, Stack } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { fadeIn, slideIn, zoomIn } from '../utils/motion';

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box
      component="section"
      id="about"
      ref={ref}
      className="theme-transition section-spacing"
      sx={{
        position: 'relative',
        overflow: 'hidden',
      }}
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
              About Me
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
              }}
            >
              Technical Lead with expertise in enterprise-grade web applications
              and system architecture
            </Typography>
          </Box>
        </motion.div>

        {/* Work Experience Timeline */}
        <motion.div
          variants={fadeIn('up', 'tween', 0.4, 1)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          <Card
            className="glass-card theme-transition"
            sx={{ p: 4, borderRadius: 4, mb: 6 }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              color="text.primary"
              sx={{ mb: 3, textAlign: 'center' }}
            >
              Professional Journey
            </Typography>

            <Stack spacing={3}>
              {/* Brain Station 23 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ minWidth: 120 }}>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    fontWeight="600"
                  >
                    2018 - 2021
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    Brain Station 23 Ltd
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    One of the largest and most recognized software companies in
                    Bangladesh
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Software Engineer • Built enterprise applications and
                    learned foundation skills
                  </Typography>
                </Box>
              </Box>

              {/* Progress Bar */}
              <Box
                sx={{
                  position: 'relative',
                  height: 8,
                  bgcolor: 'action.hover',
                  borderRadius: 4,
                  mx: 2,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '45%',
                    height: '100%',
                    bgcolor: 'primary.main',
                    borderRadius: 4,
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    width: '50%',
                    height: '100%',
                    bgcolor: 'secondary.main',
                    borderRadius: 4,
                  }}
                />
              </Box>

              {/* Grameenphone */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ minWidth: 120 }}>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    fontWeight="600"
                  >
                    2022 - Present
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    color="text.primary"
                  >
                    Grameenphone Telecom Ltd
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Leading telecommunications company in Bangladesh
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Software Engineer → Tech Lead • Leading system migrations
                    and enterprise solutions
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Card>
        </motion.div>

        <Grid container spacing={8} className="content-grid">
          <Grid item xs={12} lg={6}>
            <Stack spacing={4}>
              <motion.div
                variants={slideIn('left', 'tween', 0.2, 1)}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
              >
                <Card
                  className="glass-card theme-transition"
                  sx={{ p: 4, borderRadius: 4 }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="bold"
                    color="text.primary"
                    sx={{ mb: 3 }}
                  >
                    My Journey & What Drives Me
                  </Typography>

                  <Stack spacing={3}>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      I specialize in Laravel, Vue.js, React.js, and Express.js,
                      working with both relational and non-relational databases.
                      I love creating solutions that make people&apos;s lives
                      easier, especially when building mission-critical systems
                      that handle real-world complexity.
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      I like to think of myself as a problem solver who uses
                      various tools, stacks, and technologies to make it happen.
                      From telecom operations processing millions of
                      transactions to enterprise reporting systems, I find
                      purpose in creating robust solutions that businesses
                      depend on daily.
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      Continuous improvement drives everything I do. I&apos;ve
                      led migrations from monolithic systems to microservices,
                      introduced centralized logging with PLG stack, and
                      eliminated external Docker dependencies. I am currently
                      learning Generative AI and LLMs to explore the latest
                      technology trends.
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      Technical leadership and mentorship are core to my
                      approach. I am a good team player, open to suggestions,
                      and proficient in English (both speaking and writing). I
                      believe in empowering teams through knowledge sharing,
                      code reviews, and architectural guidance. My goal is to
                      build not just systems, but also the developers who
                      maintain them.
                    </Typography>
                  </Stack>
                </Card>
              </motion.div>
            </Stack>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Stack spacing={4}>
              <motion.div
                variants={zoomIn(0.4, 1)}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
              >
                <Card
                  className="glass-card theme-transition"
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    border: '2px solid rgba(99, 102, 241, 0.3)',
                    background: 'rgba(99, 102, 241, 0.02)',
                  }}
                >
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    color="primary.main"
                    sx={{ mb: 3 }}
                  >
                    Fun Facts
                  </Typography>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'primary.main',
                          borderRadius: '50%',
                          mt: 1,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ lineHeight: 1.7 }}
                      >
                        Co-authored a research paper published by Springer:
                        <a
                          href="https://www.researchgate.net/publication/336908773_nameGist_a_novel_phonetic_algorithm_with_bilingual_support"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: 'inherit',
                            textDecoration: 'underline',
                            fontWeight: 600,
                          }}
                        >
                          &quot;nameGist: a novel phonetic algorithm with
                          bilingual support&quot;
                        </a>
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'secondary.main',
                          borderRadius: '50%',
                          mt: 1,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ lineHeight: 1.7 }}
                      >
                        Won the{' '}
                        <strong>Grameenphone Innovation Lab Q4 Award</strong>{' '}
                        for outstanding technical contributions
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'info.main',
                          borderRadius: '50%',
                          mt: 1,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ lineHeight: 1.7 }}
                      >
                        Served as a{' '}
                        <strong>judge at IIUC Hackathon 2020</strong>,
                        evaluating innovative tech solutions
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          bgcolor: 'success.main',
                          borderRadius: '50%',
                          mt: 1,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant="body1"
                        color="text.primary"
                        sx={{ lineHeight: 1.7 }}
                      >
                        My most satisfying moments come when solving production
                        issues that have stumped teams for months - usually with
                        a cup of tea and some deep system analysis
                      </Typography>
                    </Box>
                  </Stack>
                </Card>
              </motion.div>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
