import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  IconButton,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close, ZoomIn, ChevronLeft, ChevronRight } from '@mui/icons-material';

const ProjectImageGallery = ({ images, title, columns = 2 }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleImageClick = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h5" 
          fontWeight="600" 
          sx={{ 
            mb: 3, 
            color: 'primary.main',
            textAlign: 'center'
          }}
        >
          {title}
        </Typography>
        
        <ImageList 
          variant="masonry" 
          cols={isMobile ? 1 : columns} 
          gap={16}
          sx={{
            overflow: 'visible',
            margin: 0
          }}
        >
          {images.map((image, index) => (
            <ImageListItem 
              key={index}
              component={motion.div}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Paper
                className="glass-card"
                sx={{
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderColor: 'rgba(99, 102, 241, 0.3)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 40px rgba(99, 102, 241, 0.2)',
                  }
                }}
                onClick={() => handleImageClick(image, index)}
              >
                <Box
                  component="img"
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    transition: 'transform 0.3s ease',
                  }}
                />
                
                {/* Hover overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    '&:hover': {
                      opacity: 1,
                    }
                  }}
                  className="image-overlay"
                >
                  <ZoomIn sx={{ color: 'white', fontSize: 40 }} />
                </Box>
                
                {/* Caption */}
                {image.caption && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
                      p: 2,
                      color: 'white'
                    }}
                  >
                    <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                      {image.caption}
                    </Typography>
                  </Box>
                )}
              </Paper>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      {/* Modal for full-screen view */}
      <Modal
        open={!!selectedImage}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh',
            outline: 'none',
          }}
        >
          <AnimatePresence mode="wait">
            {selectedImage && (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <Paper
                  className="glass-card"
                  sx={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                    borderRadius: 2,
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <Box
                    component="img"
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '80vh',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                  
                  {/* Caption in modal */}
                  {selectedImage.caption && (
                    <Box sx={{ p: 3, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                      <Typography variant="body1" sx={{ color: 'white', textAlign: 'center' }}>
                        {selectedImage.caption}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation controls */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
              }
            }}
          >
            <Close />
          </IconButton>

          {images.length > 1 && (
            <>
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: 'absolute',
                  left: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  }
                }}
              >
                <ChevronLeft />
              </IconButton>

              <IconButton
                onClick={handleNext}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  }
                }}
              >
                <ChevronRight />
              </IconButton>
            </>
          )}

          {/* Image counter */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 16,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: 1,
              fontSize: '0.9rem'
            }}
          >
            {currentIndex + 1} / {images.length}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ProjectImageGallery;