"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { IoClose } from "react-icons/io5";

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

// Particle component for background animation
function FloatingParticles() {
  const particles = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-350/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated lines background
function AnimatedLines() {
  const lines = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      delay: i * 0.5,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full opacity-20">
        {lines.map((line) => (
          <motion.line
            key={line.id}
            x1={`${line.startX}%`}
            y1="0%"
            x2={`${(line.startX + 20) % 100}%`}
            y2="100%"
            stroke="url(#lineGradient)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 8,
              delay: line.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Timeline indicator
function TimelineIndicator({ currentIndex, total }: { currentIndex: number; total: number }) {
  const progress = ((currentIndex + 1) / total) * 100;
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
      <motion.div
        className="h-full bg-gradient-to-r from-primary-350 via-primary-150 to-primary-350"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {/* Glowing dot at current position */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-150 shadow-lg shadow-primary-150/50"
        animate={{ left: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ marginLeft: "-6px" }}
      />
    </div>
  );
}

export default function Gallery3DTimeline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(new Array(galleryImages.length).fill(false));
  const containerRef = useRef<HTMLDivElement>(null);
  
  const totalImages = galleryImages.length;

  // Continuous auto-rotation
  useEffect(() => {
    if (isPaused || isFullscreen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalImages);
    }, 3000); // 3 seconds per image

    return () => clearInterval(interval);
  }, [isPaused, isFullscreen, totalImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Get visible images (7 images for deeper 3D effect)
  const getVisibleImages = useCallback(() => {
    const visible = [];
    for (let i = -3; i <= 3; i++) {
      const index = (currentIndex + i + totalImages) % totalImages;
      visible.push({ index, offset: i });
    }
    return visible;
  }, [currentIndex, totalImages]);

  // 3D perspective calculations - LARGER for landscape photos
  const getCardTransform = (offset: number, isMobile: boolean) => {
    const absOffset = Math.abs(offset);
    
    if (isMobile) {
      const rotateY = offset * 35;
      const translateX = offset * 90;
      const translateZ = -absOffset * 120;
      const scale = offset === 0 ? 1 : Math.max(0.5, 1 - absOffset * 0.18);
      const opacity = Math.max(0.1, 1 - absOffset * 0.25);
      
      return {
        transform: `perspective(1000px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
        zIndex: 100 - absOffset * 10,
        opacity,
      };
    }
    
    // Desktop - LARGER cards for landscape photos
    const rotateY = offset * 40;
    const translateX = offset * 280;
    const translateZ = -absOffset * 200;
    const scale = offset === 0 ? 1 : Math.max(0.4, 1 - absOffset * 0.15);
    const opacity = Math.max(0.1, 1 - absOffset * 0.2);
    
    return {
      transform: `perspective(1500px) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex: 100 - absOffset * 10,
      opacity,
    };
  };

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  return (
    <div className="relative w-full min-h-[80vh] overflow-hidden bg-gradient-to-b from-primary-650 via-primary-600/50 to-primary-650">
      {/* Background Effects */}
      <FloatingParticles />
      <AnimatedLines />
      
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-350/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-150/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      
      {/* Main Gallery Container */}
      <div
        ref={containerRef}
        className="relative z-10 w-full h-[70vh] md:h-[80vh] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* 3D Carousel */}
        <div 
          className="relative w-full h-full flex items-center justify-center"
          style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
        >
          <AnimatePresence mode="popLayout">
            {getVisibleImages().map(({ index, offset }) => (
              <motion.div
                key={`card-${index}`}
                className="absolute cursor-pointer"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  ...getCardTransform(offset, false),
                  transition: { 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1],
                  }
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => offset === 0 && setIsFullscreen(true)}
                whileHover={offset === 0 ? { scale: 1.03 } : {}}
              >
                {/* Desktop Card - LARGER for landscape */}
                <div 
                  className="hidden md:block relative rounded-2xl overflow-hidden"
                  style={{
                    width: offset === 0 ? "600px" : "480px",
                    maxHeight: offset === 0 ? "450px" : "360px",
                    boxShadow: offset === 0 
                      ? "0 0 60px rgba(139, 92, 246, 0.4), 0 0 100px rgba(236, 72, 153, 0.2)"
                      : "0 25px 50px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <img
                    src={galleryImages[index]}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-contain bg-black/80"
                    onLoad={() => handleImageLoad(index)}
                    draggable={false}
                  />
                  
                  {/* Glowing border for center */}
                  {offset === 0 && (
                    <motion.div 
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        border: "2px solid transparent",
                        background: "linear-gradient(135deg, rgba(139, 92, 246, 0.5), rgba(236, 72, 153, 0.5)) border-box",
                        WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                      animate={{ 
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                  
                  {/* Reflection effect */}
                  {offset === 0 && (
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 pointer-events-none" />
                  )}
                </div>

                {/* Mobile Card - Larger for landscape */}
                <motion.div 
                  className="md:hidden relative rounded-xl overflow-hidden"
                  style={{
                    width: offset === 0 ? "320px" : "240px",
                    maxHeight: offset === 0 ? "260px" : "180px",
                    ...getCardTransform(offset, true),
                    boxShadow: offset === 0 
                      ? "0 0 40px rgba(139, 92, 246, 0.4)"
                      : "0 15px 30px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  <img
                    src={galleryImages[index]}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-contain bg-black/80"
                    draggable={false}
                  />
                  {offset === 0 && (
                    <div 
                      className="absolute inset-0 rounded-xl border-2 border-primary-350/50 pointer-events-none"
                    />
                  )}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Image Counter */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="px-6 py-3 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 text-white font-mono tracking-wider">
            <span className="text-primary-350 font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
            <span className="text-white/40 mx-2">/</span>
            <span className="text-white/60">{String(totalImages).padStart(2, '0')}</span>
          </div>
        </motion.div>
      </div>

      {/* Timeline Progress */}
      <TimelineIndicator currentIndex={currentIndex} total={totalImages} />

      {/* Pause indicator */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 z-50 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-white/60 text-xs font-medium tracking-wider uppercase"
          >
            Paused
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click hint */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 text-white/30 text-xs tracking-widest uppercase"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Click center image to expand
      </motion.div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-2xl flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <IoClose className="text-2xl text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="w-full h-full flex items-center justify-center p-4 md:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[currentIndex]}
                alt={`Gallery ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
                style={{
                  boxShadow: "0 0 100px rgba(139, 92, 246, 0.3)",
                }}
              />
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-mono">
              {currentIndex + 1} / {totalImages}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
