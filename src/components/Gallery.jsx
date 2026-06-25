import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import useConfig from "../hooks/useConfig";

const Gallery = () => {
  const { config, loading } = useConfig();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Get images from config, fallback to empty array
  const images = config?.gallery || [];

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  if (loading || images.length === 0) {
    return (
      <section id="gallery" className="gallery-section">
        <div className="container">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">GALLERY</h2>
          <div
            style={{
              textAlign: "center",
              padding: "80px 0",
              color: "var(--muted)",
              fontSize: "0.875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Loading gallery...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="gallery-section" style={{ overflow: 'hidden' }}>
      <div className="container">
        <div className="gallery-header" style={{ marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <span className="section-label">Our Work</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>CREATIVE GALLERY</h2>
          </div>
          <div className="gallery-controls-top">
             <button className="slider-btn" onClick={() => paginate(-1)}>
               <ChevronLeft size={24} />
             </button>
             <button className="slider-btn" onClick={() => paginate(1)}>
               <ChevronRight size={24} />
             </button>
          </div>
        </div>

        <div className="gallery-slider-wrapper">
          <div className="gallery-slider-track">
             <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                  <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={{
                    enter: (dir) => ({
                      x: dir > 0 ? 1000 : -1000,
                      opacity: 0,
                      scale: 0.8,
                    }),
                    center: {
                      zIndex: 1,
                      x: 0,
                      opacity: 1,
                      scale: 1,
                    },
                    exit: (dir) => ({
                      zIndex: 0,
                      x: dir < 0 ? 1000 : -1000,
                      opacity: 0,
                      scale: 0.8,
                    })
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 200, damping: 25 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.4 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -10000) {
                      paginate(1);
                    } else if (swipe > 10000) {
                      paginate(-1);
                    }
                  }}
                  className="gallery-slide-main"
                >
                  <img src={images[currentIndex]} alt={`Project ${currentIndex + 1}`} loading="lazy" />
                  <div className="slide-overlay">
                    <h3 className="slide-title">Residence {currentIndex + 1}</h3>
                    <p className="slide-category">Premium Project</p>
                  </div>
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Thumbnail preview */}
          <div className="gallery-thumbnails">
            {images.map((img, idx) => (
              <div 
                key={idx} 
                className={`thumb-item ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  if (idx === currentIndex) return;
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
              >
                <img src={img} alt={`thumb ${idx}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
