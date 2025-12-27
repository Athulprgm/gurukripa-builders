import {
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import useConfig from "../hooks/useConfig";

const Gallery = () => {
  const { config, loading } = useConfig();
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Get images from config, fallback to empty array
  const images = config?.gallery || [];

  // Show only 6 images initially, all when expanded
  const INITIAL_DISPLAY_COUNT = 6;
  const displayedImages = showAll
    ? images
    : images.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMoreImages = images.length > INITIAL_DISPLAY_COUNT;

  const openLightbox = (index) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage(e);
      if (e.key === "ArrowLeft") prevImage(e);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  if (loading) {
    return (
      <section id="gallery" className="section">
        <div className="container">
          <span className="section-subtitle">Our Work</span>
          <h2 className="section-title">Gallery</h2>
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "var(--color-text-muted)",
            }}
          >
            Loading gallery...
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="gallery" className="section">
      <div className="container">
        <span className="section-subtitle">Our Work</span>
        <h2 className="section-title">Gallery</h2>

        <div className="gallery-grid">
          {displayedImages.map((img, index) => (
            <GalleryItem
              key={index}
              img={img}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>

        {/* View More/Less Button */}
        {hasMoreImages && (
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="btn btn-outline"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {showAll ? (
                <>
                  View Less <ChevronUp size={20} />
                </>
              ) : (
                <>
                  View More ({images.length - INITIAL_DISPLAY_COUNT} more){" "}
                  <ChevronDown size={20} />
                </>
              )}
            </button>
          </div>
        )}

        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <a
            href="/gallery/IMG-20241207-WA0006.jpg"
            download
            className="btn btn-primary"
          >
            Download Brochure
          </a>
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={32} />
            </button>

            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-nav prev" onClick={prevImage}>
                <ChevronLeft size={40} />
              </button>

              <motion.img
                key={selectedImage}
                src={images[selectedImage]}
                alt="Full View"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="lightbox-img"
              />

              <button className="lightbox-nav next" onClick={nextImage}>
                <ChevronRight size={40} />
              </button>
            </div>

            <div className="lightbox-counter">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const GalleryItem = ({ img, index, onClick }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

  return (
    <motion.div
      ref={ref}
      className="gallery-item"
      style={{ y, rotateX: rotate, perspective: 1000 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
    >
      <img src={img} alt="Project" loading="lazy" />
      <div className="gallery-overlay">
        <div className="gallery-plus">
          <Plus />
        </div>
        <span
          style={{
            marginTop: "16px",
            color: "white",
            fontWeight: "600",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontSize: "0.9rem",
          }}
        >
          View Project
        </span>
      </div>
    </motion.div>
  );
};

export default Gallery;
