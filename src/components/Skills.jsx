import { motion } from 'framer-motion';
import { Box, Container, Typography, Grid, Card } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/skills';
import { fadeIn, slideIn } from '../utils/motion';

const Skills = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const SkillCard = ({ skill, index, categoryIndex }) => {
    // Create colorful gradients for different categories
    const colorVariants = [
      {
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        shadow: 'rgba(102, 126, 234, 0.4)',
        iconColor: '#667eea',
      },
      {
        bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        shadow: 'rgba(240, 147, 251, 0.4)',
        iconColor: '#f093fb',
      },
      {
        bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        shadow: 'rgba(79, 172, 254, 0.4)',
        iconColor: '#4facfe',
      },
      {
        bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        shadow: 'rgba(67, 233, 123, 0.4)',
        iconColor: '#43e97b',
      },
      {
        bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        shadow: 'rgba(250, 112, 154, 0.4)',
        iconColor: '#fa709a',
      },
    ];

    const colorIndex =
      (categoryIndex + Math.floor(index / 2)) % colorVariants.length;
    const colors = colorVariants[colorIndex];

    return (
      <motion.div
        variants={fadeIn('up', 'spring', index * 0.1, 0.5)}
        initial="hidden"
        animate={inView ? 'show' : 'hidden'}
        whileHover={{
          scale: 1.05,
          y: -8,
          transition: { type: 'spring', stiffness: 400, damping: 15 },
        }}
      >
        <Card
          className="glass-card theme-transition micro-lift"
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            height: 100,
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              boxShadow: `0 20px 40px ${colors.shadow}`,
              border: `2px solid ${colors.iconColor}`,
              '& .skill-bg': {
                opacity: 1,
                transform: 'scale(1.1)',
              },
            },
          }}
        >
          {/* Animated background gradient */}
          <Box
            className="skill-bg"
            sx={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 80,
              height: 80,
              background: colors.bg,
              borderRadius: '50%',
              opacity: 0.1,
              transition: 'all 0.3s ease',
              transform: 'scale(0.8)',
            }}
          />

          <Typography
            variant="body1"
            fontWeight="600"
            color="text.primary"
            sx={{
              textAlign: 'center',
              zIndex: 1,
              transition: 'color 0.3s ease',
            }}
          >
            {skill.name}
          </Typography>
        </Card>
      </motion.div>
    );
  };

  return (
    <Box
      component="section"
      id="skills"
      ref={ref}
      className="theme-transition section-spacing"
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
              Technical Skills
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
                  background:
                    'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #f59e0b 100%)',
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
                fontSize: '1.1rem',
              }}
            >
              A comprehensive collection of technologies I use to bring ideas to
              life, from stunning frontends to robust backends and everything in
              between!
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ mt: 8 }}>
          {skills.map((skillCategory, categoryIndex) => (
            <motion.div
              key={skillCategory.category}
              variants={slideIn('up', 'tween', categoryIndex * 0.2, 1)}
              initial="hidden"
              animate={inView ? 'show' : 'hidden'}
            >
              <Box sx={{ mb: 8 }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ delay: categoryIndex * 0.2, duration: 0.6 }}
                >
                  <Typography
                    variant="h4"
                    fontWeight="700"
                    className="text-gradient"
                    sx={{
                      mb: 5,
                      textAlign: 'center',
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -10,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 60,
                        height: 3,
                        background:
                          'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #f59e0b 100%)',
                        borderRadius: 2,
                      },
                    }}
                  >
                    {skillCategory.category}
                  </Typography>
                </motion.div>

                <Grid container spacing={3} justifyContent="center">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <Grid item xs={6} sm={4} md={2.4} key={skill.name}>
                      <SkillCard
                        skill={skill}
                        index={skillIndex}
                        categoryIndex={categoryIndex}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Skills;
