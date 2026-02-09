"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronBack, IoChevronForward, IoClose, IoExpand } from "react-icons/io5";

// Gallery images from uploads folder
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
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export default function Gallery3D({ 
  autoPlay = true, 
  autoPlayInterval = 4000 
}: Gallery3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Touch handling
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const totalImages = galleryImages.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || isFullscreen) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, isPaused, isFullscreen, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape") setIsFullscreen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Get visible images for 3D effect (5 images: current + 2 on each side)
  const getVisibleImages = () => {
    const visible = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + totalImages) % totalImages;
      visible.push({ index, offset: i });
    }
    return visible;
  };

  const getCardStyle = (offset: number) => {
    const absOffset = Math.abs(offset);
    const baseZ = 100 - absOffset * 30;
    const rotateY = offset * 25;
    const translateX = offset * 180;
    const translateZ = -absOffset * 150;
    const scale = 1 - absOffset * 0.15;
    const opacity = 1 - absOffset * 0.3;

    return {
      transform: `perspective(1200px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex: baseZ,
      opacity: Math.max(opacity, 0),
    };
  };

  const getCardStyleMobile = (offset: number) => {
    const absOffset = Math.abs(offset);
    const baseZ = 100 - absOffset * 30;
    const rotateY = offset * 20;
    const translateX = offset * 100;
    const translateZ = -absOffset * 80;
    const scale = 1 - absOffset * 0.2;
    const opacity = 1 - absOffset * 0.35;

    return {
      transform: `perspective(800px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex: baseZ,
      opacity: Math.max(opacity, 0),
    };
  };

  return (
    <>
      {/* Main 3D Gallery */}
      <div 
        ref={containerRef}
        className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* 3D Cards Container */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1200px" }}>
          <AnimatePresence mode="popLayout">
            {getVisibleImages().map(({ index, offset }) => (
              <motion.div
                key={`${index}-${offset}`}
                className="absolute cursor-pointer"
                initial={{ 
                  opacity: 0, 
                  scale: 0.8,
                }}
                animate={{
                  ...getCardStyle(offset),
                  transition: { 
                    duration: 0.5, 
                    ease: [0.32, 0.72, 0, 1] 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8,
                  transition: { duration: 0.3 }
                }}
                onClick={() => {
                  if (offset === 0) {
                    setIsFullscreen(true);
                  } else {
                    goToSlide(index);
                  }
                }}
                whileHover={offset === 0 ? { scale: 1.02 } : {}}
              >
                {/* Desktop Card */}
                <div 
                  className="hidden md:block relative rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    width: "400px",
                    height: "auto",
                    maxHeight: "500px",
                  }}
                >
                  <img
                    src={galleryImages[index]}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-contain bg-black/50"
                    style={{ maxHeight: "500px" }}
                    draggable={false}
                  />
                  {/* Glowing border effect for center card */}
                  {offset === 0 && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary-350/50 pointer-events-none" />
                  )}
                </div>

                {/* Mobile Card */}
                <div 
                  className="md:hidden relative rounded-xl overflow-hidden shadow-xl"
                  style={{
                    width: "220px",
                    height: "auto",
                    maxHeight: "280px",
                  }}
                >
                  <img
                    src={galleryImages[index]}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-contain bg-black/50"
                    style={{ maxHeight: "280px" }}
                    draggable={false}
                  />
                  {offset === 0 && (
                    <div className="absolute inset-0 rounded-xl border-2 border-primary-350/50 pointer-events-none" />
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 z-50 p-3 md:p-4 rounded-full bg-primary-600/80 backdrop-blur-sm border border-primary-350/30 text-white hover:bg-primary-500 transition-all hover:scale-110 shadow-lg"
          aria-label="Previous image"
        >
          <IoChevronBack className="text-xl md:text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 z-50 p-3 md:p-4 rounded-full bg-primary-600/80 backdrop-blur-sm border border-primary-350/30 text-white hover:bg-primary-500 transition-all hover:scale-110 shadow-lg"
          aria-label="Next image"
        >
          <IoChevronForward className="text-xl md:text-2xl" />
        </button>

        {/* Fullscreen button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-50 p-2 md:p-3 rounded-full bg-primary-600/80 backdrop-blur-sm border border-primary-350/30 text-white hover:bg-primary-500 transition-all hover:scale-110 shadow-lg"
          aria-label="Fullscreen"
        >
          <IoExpand className="text-lg md:text-xl" />
        </button>

        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-primary-600/80 backdrop-blur-sm border border-primary-350/30 text-white text-sm font-medium">
          {currentIndex + 1} / {totalImages}
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap px-4">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-primary-350 scale-125 shadow-lg shadow-primary-350/50"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close fullscreen"
            >
              <IoClose className="text-2xl text-white" />
            </button>

            {/* Navigation in fullscreen */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-4 md:left-8 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <IoChevronBack className="text-2xl text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-4 md:right-8 z-50 p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <IoChevronForward className="text-2xl text-white" />
            </button>

            {/* Fullscreen image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex items-center justify-center p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[currentIndex]}
                alt={`Gallery image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                draggable={false}
              />
            </motion.div>

            {/* Counter in fullscreen */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium">
              {currentIndex + 1} / {totalImages}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
