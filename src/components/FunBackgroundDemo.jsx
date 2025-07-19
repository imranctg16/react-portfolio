import { useState } from 'react';
import { Box, Button, Stack, Typography, Card } from '@mui/material';
import { motion } from 'framer-motion';

const FunBackgroundDemo = () => {
  const [activeDemo, setActiveDemo] = useState('fireflies');

  const demos = [
    { id: 'none', name: 'No Effect', description: 'Clean minimal background', emoji: '🧹' },
    { id: 'fireflies', name: 'Fireflies', description: 'Magical floating lights', emoji: '✨' },
    { id: 'bubbles', name: 'Floating Bubbles', description: 'Colorful rising bubbles', emoji: '🫧' },
    { id: 'stars', name: 'Twinkling Stars', description: 'Starry night sky effect', emoji: '⭐' },
    { id: 'aurora', name: 'Aurora Waves', description: 'Northern lights flow', emoji: '🌌' },
    { id: 'rain', name: 'Digital Rain', description: 'Matrix-style rain drops', emoji: '🌧️' },
    { id: 'snow', name: 'Gentle Snow', description: 'Soft falling snowflakes', emoji: '❄️' },
    { id: 'orbs', name: 'Floating Orbs', description: 'Glowing energy spheres', emoji: '🔮' },
    { id: 'petals', name: 'Cherry Petals', description: 'Falling flower petals', emoji: '🌸' },
  ];

  return (
    <Box sx={{ p: 4, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Background Effects */}
      {activeDemo === 'fireflies' && <FirefliesBackground />}
      {activeDemo === 'bubbles' && <BubblesBackground />}
      {activeDemo === 'stars' && <StarsBackground />}
      {activeDemo === 'aurora' && <AuroraBackground />}
      {activeDemo === 'rain' && <DigitalRainBackground />}
      {activeDemo === 'snow' && <SnowBackground />}
      {activeDemo === 'orbs' && <OrbsBackground />}
      {activeDemo === 'petals' && <PetalsBackground />}
      {activeDemo === 'none' && <CleanBackground />}

      {/* Demo Controls */}
      <Card 
        className="glass-card"
        sx={{ 
          position: 'fixed', 
          top: 20, 
          right: 20, 
          p: 3, 
          maxWidth: 320,
          zIndex: 1000,
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          🎨 Fun Background Effects
        </Typography>
        <Stack spacing={1}>
          {demos.map((demo) => (
            <Button
              key={demo.id}
              variant={activeDemo === demo.id ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setActiveDemo(demo.id)}
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                py: 1.5,
                px: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography sx={{ fontSize: '1.2rem' }}>{demo.emoji}</Typography>
                <Box>
                  <Typography variant="body2" fontWeight="600">
                    {demo.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {demo.description}
                  </Typography>
                </Box>
              </Box>
            </Button>
          ))}
        </Stack>
      </Card>

      {/* Sample Content */}
      <Box sx={{ pt: 10, textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <Typography variant="h2" className="text-gradient" sx={{ mb: 4 }}>
          Fun Background Effects Demo
        </Typography>
        <Card className="glass-card" sx={{ p: 4, maxWidth: 600, mx: 'auto', mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {demos.find(d => d.id === activeDemo)?.emoji} {demos.find(d => d.id === activeDemo)?.name}
          </Typography>
          <Typography color="text.secondary">
            {demos.find(d => d.id === activeDemo)?.description}. 
            This demonstrates how the background effect looks behind glassmorphism elements.
            The backdrop-filter creates beautiful interactions with the background animations.
          </Typography>
        </Card>
        
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap" useFlexGap>
          <Card className="glass-card" sx={{ p: 3, minWidth: 200 }}>
            <Typography variant="h6" fontWeight="bold">Sample Card 1</Typography>
            <Typography variant="body2" color="text.secondary">
              Notice how the background effect interacts with the glass blur.
            </Typography>
          </Card>
          <Card className="glass-card" sx={{ p: 3, minWidth: 200 }}>
            <Typography variant="h6" fontWeight="bold">Sample Card 2</Typography>
            <Typography variant="body2" color="text.secondary">
              The glassmorphism effect creates depth and beauty.
            </Typography>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};

// Clean Background
const CleanBackground = () => (
  <Box
    className="bg-pattern"
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
    }}
  />
);

// 1. Fireflies Effect
const FirefliesBackground = () => {
  const fireflies = Array.from({ length: 25 }, (_, i) => i);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
      }}
    >
      {fireflies.map((firefly) => (
        <Box
          key={firefly}
          sx={{
            position: 'absolute',
            width: Math.random() * 3 + 2,
            height: Math.random() * 3 + 2,
            background: `radial-gradient(circle, rgba(${firefly % 3 === 0 ? '255, 255, 100' : firefly % 3 === 1 ? '100, 255, 150' : '150, 200, 255'}, 0.8) 0%, transparent 70%)`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
            animation: `firefly${firefly % 3 + 1} ${5 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: `0 0 ${10 + Math.random() * 20}px rgba(255, 255, 100, 0.5)`,
            '@keyframes firefly1': {
              '0%, 100%': { opacity: 0.3, transform: 'translate(0, 0) scale(0.5)' },
              '25%': { opacity: 1, transform: 'translate(20px, -10px) scale(1.2)' },
              '50%': { opacity: 0.7, transform: 'translate(-15px, 15px) scale(0.8)' },
              '75%': { opacity: 1, transform: 'translate(10px, -20px) scale(1.1)' },
            },
            '@keyframes firefly2': {
              '0%, 100%': { opacity: 0.2, transform: 'translate(0, 0) scale(0.6)' },
              '33%': { opacity: 0.9, transform: 'translate(-25px, 10px) scale(1.3)' },
              '66%': { opacity: 0.5, transform: 'translate(15px, -25px) scale(0.9)' },
            },
            '@keyframes firefly3': {
              '0%, 100%': { opacity: 0.4, transform: 'translate(0, 0) scale(0.7)' },
              '20%': { opacity: 1, transform: 'translate(30px, 5px) scale(1.1)' },
              '40%': { opacity: 0.6, transform: 'translate(-10px, 20px) scale(0.8)' },
              '60%': { opacity: 0.9, transform: 'translate(-20px, -15px) scale(1.2)' },
              '80%': { opacity: 0.5, transform: 'translate(25px, -10px) scale(0.9)' },
            },
          }}
        />
      ))}
    </Box>
  );
};

// 2. Floating Bubbles
const BubblesBackground = () => {
  const bubbles = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {bubbles.map((bubble) => (
        <Box
          key={bubble}
          sx={{
            position: 'absolute',
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            background: `radial-gradient(circle at 30% 30%, rgba(${bubble % 3 === 0 ? '99, 102, 241' : bubble % 3 === 1 ? '245, 158, 11' : '139, 92, 246'}, 0.1) 0%, rgba(${bubble % 3 === 0 ? '99, 102, 241' : bubble % 3 === 1 ? '245, 158, 11' : '139, 92, 246'}, 0.05) 100%)`,
            borderRadius: '50%',
            border: `1px solid rgba(${bubble % 3 === 0 ? '99, 102, 241' : bubble % 3 === 1 ? '245, 158, 11' : '139, 92, 246'}, 0.2)`,
            left: `${Math.random() * 100}%`,
            bottom: '-100px',
            animation: `bubbleFloat ${8 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
            '@keyframes bubbleFloat': {
              '0%': {
                transform: 'translateY(0) translateX(0) scale(0)',
                opacity: 0,
              },
              '10%': {
                opacity: 0.7,
                transform: 'translateY(-50px) translateX(10px) scale(1)',
              },
              '90%': {
                opacity: 0.3,
                transform: `translateY(-100vh) translateX(${Math.random() * 100 - 50}px) scale(1.2)`,
              },
              '100%': {
                opacity: 0,
                transform: `translateY(-110vh) translateX(${Math.random() * 100 - 50}px) scale(0)`,
              },
            },
          }}
        />
      ))}
    </Box>
  );
};

// 3. Twinkling Stars
const StarsBackground = () => {
  const stars = Array.from({ length: 50 }, (_, i) => i);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'radial-gradient(ellipse at bottom, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
      }}
    >
      {stars.map((star) => (
        <Box
          key={star}
          sx={{
            position: 'absolute',
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: '#fff',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
            '@keyframes starTwinkle': {
              '0%, 100%': { opacity: 0.3, transform: 'scale(0.8)' },
              '50%': { opacity: 1, transform: 'scale(1.2)' },
            },
          }}
        />
      ))}
    </Box>
  );
};

// 4. Aurora Waves
const AuroraBackground = () => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      background: `
        linear-gradient(45deg, 
          rgba(99, 102, 241, 0.1) 0%, 
          rgba(139, 92, 246, 0.08) 25%, 
          rgba(245, 158, 11, 0.06) 50%, 
          rgba(99, 102, 241, 0.08) 75%, 
          rgba(139, 92, 246, 0.1) 100%
        )
      `,
      animation: 'auroraFlow 12s ease-in-out infinite',
      '@keyframes auroraFlow': {
        '0%, 100%': { 
          backgroundPosition: '0% 0%',
          transform: 'scale(1) rotate(0deg)',
        },
        '25%': { 
          backgroundPosition: '100% 25%',
          transform: 'scale(1.05) rotate(1deg)',
        },
        '50%': { 
          backgroundPosition: '50% 100%',
          transform: 'scale(1.02) rotate(-0.5deg)',
        },
        '75%': { 
          backgroundPosition: '25% 50%',
          transform: 'scale(1.03) rotate(0.5deg)',
        },
      },
    }}
  />
);

// 5. Digital Rain
const DigitalRainBackground = () => {
  const raindrops = Array.from({ length: 30 }, (_, i) => i);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.02)',
      }}
    >
      {raindrops.map((drop) => (
        <Box
          key={drop}
          sx={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: '-20px',
            width: '2px',
            height: `${Math.random() * 100 + 50}px`,
            background: `linear-gradient(to bottom, transparent, rgba(${drop % 3 === 0 ? '99, 102, 241' : drop % 3 === 1 ? '245, 158, 11' : '139, 92, 246'}, 0.8), transparent)`,
            animation: `digitalRain ${3 + Math.random() * 2}s linear infinite`,
            animationDelay: `${Math.random() * 3}s`,
            '@keyframes digitalRain': {
              '0%': { transform: 'translateY(0)', opacity: 0 },
              '10%': { opacity: 1 },
              '90%': { opacity: 0.5 },
              '100%': { transform: 'translateY(100vh)', opacity: 0 },
            },
          }}
        />
      ))}
    </Box>
  );
};

// 6. Gentle Snow
const SnowBackground = () => {
  const snowflakes = Array.from({ length: 30 }, (_, i) => i);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {snowflakes.map((flake) => (
        <Box
          key={flake}
          sx={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: '-10px',
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '50%',
            animation: `snowFall ${8 + Math.random() * 4}s linear infinite`,
            animationDelay: `${Math.random() * 8}s`,
            '@keyframes snowFall': {
              '0%': { 
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                opacity: 0,
              },
              '10%': { opacity: 1 },
              '90%': { opacity: 0.5 },
              '100%': { 
                transform: `translateY(100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg)`,
                opacity: 0,
              },
            },
          }}
        />
      ))}
    </Box>
  );
};

// 7. Floating Orbs
const OrbsBackground = () => {
  const orbs = Array.from({ length: 8 }, (_, i) => i);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {orbs.map((orb) => (
        <Box
          key={orb}
          sx={{
            position: 'absolute',
            width: Math.random() * 120 + 80,
            height: Math.random() * 120 + 80,
            background: `radial-gradient(circle, rgba(${orb % 3 === 0 ? '99, 102, 241' : orb % 3 === 1 ? '245, 158, 11' : '139, 92, 246'}, 0.15) 0%, transparent 70%)`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(20px)',
            animation: `orbFloat ${10 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            '@keyframes orbFloat': {
              '0%, 100%': { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 0.3,
              },
              '25%': { 
                transform: 'translate(30px, -20px) scale(1.1)',
                opacity: 0.7,
              },
              '50%': { 
                transform: 'translate(-20px, 30px) scale(0.9)',
                opacity: 0.5,
              },
              '75%': { 
                transform: 'translate(40px, 10px) scale(1.05)',
                opacity: 0.8,
              },
            },
          }}
        />
      ))}
    </Box>
  );
};

// 8. Cherry Petals
const PetalsBackground = () => {
  const petals = Array.from({ length: 15 }, (_, i) => i);
  
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        background: 'linear-gradient(to bottom, rgba(245, 158, 11, 0.02) 0%, transparent 50%)',
      }}
    >
      {petals.map((petal) => (
        <Box
          key={petal}
          sx={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: '-20px',
            width: Math.random() * 8 + 4,
            height: Math.random() * 12 + 6,
            background: `linear-gradient(45deg, rgba(245, 158, 11, 0.6), rgba(255, 192, 203, 0.4))`,
            borderRadius: '50% 0 50% 0',
            animation: `petalFall ${6 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
            '@keyframes petalFall': {
              '0%': { 
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                opacity: 0,
              },
              '10%': { opacity: 0.8 },
              '90%': { opacity: 0.3 },
              '100%': { 
                transform: `translateY(100vh) translateX(${Math.random() * 200 - 100}px) rotate(${Math.random() * 720}deg)`,
                opacity: 0,
              },
            },
          }}
        />
      ))}
    </Box>
  );
};

export default FunBackgroundDemo;