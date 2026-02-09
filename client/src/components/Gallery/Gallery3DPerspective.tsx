"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Gallery images from uploads
const galleryImages = [
  "/gallery/481173400_1057323746413295_1775774296801532011_n.jpg",
  "/gallery/481509667_2673904989666128_3002275614166939809_n.jpg",
  "/gallery/486488095_1074767591335577_7827928281379542744_n.jpg",
  "/gallery/486744791_1077460771066259_1566373957133847468_n.jpg",
  "/gallery/487240457_1077460677732935_5544608968535103110_n.jpg",
  "/gallery/497551410_1112484410897228_1620564262150331093_n.jpg",
  "/gallery/497693378_1112484394230563_2872090538395765173_n.jpg",
  "/gallery/515508116_18230939212294696_5996969202442812967_n.jpg",
  "/gallery/572127354_18245757541294696_6122396084713759290_n.jpg",
  "/gallery/572704482_18245757511294696_227372582636254251_n.jpg",
  "/gallery/574162048_18245757496294696_7253269102456205082_n.jpg",
  "/gallery/574513785_18245757514294696_3767797335745131349_n.jpg",
  "/gallery/589763923_1273087768170224_614655561934480603_n.jpg",
  "/gallery/590331863_1273087614836906_8529056411892364492_n.jpg",
  "/gallery/86191670_1259441291112512_5159372220719431680_n.jpg",
  "/gallery/86495352_1259444844445490_8685841499482488832_n.jpg",
];

interface Gallery3DProps {
  autoRotate?: boolean;
  rotationSpeed?: number;
}

const Gallery3DPerspective = ({ 
  autoRotate = true, 
  rotationSpeed = 4000 
}: Gallery3DProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
    }, rotationSpeed);

    return () => clearInterval(interval);
  }, [autoRotate, isHovered, rotationSpeed]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const goToPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const getVisibleImages = () => {
    const images = [];
    const total = galleryImages.length;
    
    // Show 5 images in the 3D carousel (mobile: 3)
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + total) % total;
      images.push({
        src: galleryImages[index],
        position: i,
        index,
      });
    }
    return images;
  };

  const getCardStyle = (position: number) => {
    const absPos = Math.abs(position);
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    // Base values for positioning
    const baseScale = isMobile ? 0.6 : 0.75;
    const centerScale = isMobile ? 0.85 : 1;
    const baseX = isMobile ? 120 : 280;
    const baseZ = isMobile ? -80 : -150;
    
    return {
      x: position * baseX,
      z: absPos * baseZ,
      rotateY: position * -25,
      scale: position === 0 ? centerScale : baseScale - absPos * 0.1,
      opacity: absPos > 2 ? 0 : 1 - absPos * 0.2,
      zIndex: 10 - absPos,
    };
  };

  const visibleImages = getVisibleImages();

  return (
    <div className="relative w-full min-h-screen bg-primary-650 overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-350/10 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-primary-150/10 via-transparent to-transparent" />
      
      {/* Title */}
      <div className="pt-24 pb-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="Inter GradText text-5xl md:text-7xl font-extrabold"
        >
          OUR TECH JOURNEY
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white/50 mt-4 text-lg"
        >
          BNMPC IT Club Memories
        </motion.p>
      </div>

      {/* 3D Gallery Container */}
      <div 
        ref={containerRef}
        className="relative h-[60vh] md:h-[70vh] flex items-center justify-center perspective-[1500px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: "1500px" }}
      >
        <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
          <AnimatePresence mode="popLayout">
            {visibleImages.map(({ src, position, index }) => {
              const style = getCardStyle(position);
              return (
                <motion.div
                  key={index}
                  className="absolute cursor-pointer"
                  initial={{ 
                    x: direction > 0 ? 500 : -500, 
                    opacity: 0,
                    rotateY: direction > 0 ? -45 : 45,
                    scale: 0.5 
                  }}
                  animate={{
                    x: style.x,
                    rotateY: style.rotateY,
                    scale: style.scale,
                    opacity: style.opacity,
                    zIndex: style.zIndex,
                  }}
                  exit={{ 
                    x: direction > 0 ? -500 : 500, 
                    opacity: 0,
                    rotateY: direction > 0 ? 45 : -45,
                    scale: 0.5 
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                  }}
                  onClick={() => position === 0 && setSelectedImage(src)}
                  whileHover={position === 0 ? { scale: 1.05 } : {}}
                  style={{ 
                    transformStyle: "preserve-3d",
                    zIndex: style.zIndex,
                  }}
                >
                  <div 
                    className={`
                      relative overflow-hidden rounded-2xl shadow-2xl
                      ${position === 0 
                        ? 'ring-4 ring-primary-350/50 shadow-primary-350/30' 
                        : 'opacity-80'
                      }
                    `}
                    style={{
                      width: position === 0 ? 'min(80vw, 500px)' : 'min(60vw, 350px)',
                      height: position === 0 ? 'min(50vh, 350px)' : 'min(40vh, 280px)',
                      boxShadow: position === 0 
                        ? '0 25px 80px -20px rgba(139, 92, 246, 0.5)' 
                        : '0 15px 40px -10px rgba(0,0,0,0.5)',
                    }}
                  >
                    <img
                      src={src}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-contain bg-black/50"
                      draggable={false}
                    />
                    {/* Gradient overlay for non-center images */}
                    {position !== 0 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-50 p-3 md:p-4 rounded-full bg-primary-600/80 backdrop-blur-sm border border-primary-350/30 text-white hover:bg-primary-350/50 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-50 p-3 md:p-4 rounded-full bg-primary-600/80 backdrop-blur-sm border border-primary-350/30 text-white hover:bg-primary-350/50 transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 py-8">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`
              w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? 'bg-primary-350 w-6 md:w-8' 
                : 'bg-white/30 hover:bg-white/50'
              }
            `}
          />
        ))}
      </div>

      {/* Image Counter */}
      <div className="text-center pb-8">
        <span className="text-primary-350 text-2xl font-bold">{currentIndex + 1}</span>
        <span className="text-white/40 text-lg"> / {galleryImages.length}</span>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-[95vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full size"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 p-2 rounded-full bg-primary-350 text-white hover:bg-primary-450 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-white/30 text-sm pb-12"
      >
        Click on center image to view full size • Use arrows or dots to navigate
      </motion.p>
    </div>
  );
};

export default Gallery3DPerspective;
