import { Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";

const images = [
  "IMG-20250713-WA0025.jpg",
  "IMG-20250713-WA0027.jpg",
  "IMG-20250713-WA0031.jpg",
  "IMG-20250713-WA0030.jpg",
  "IMG-20250713-WA0032.jpg",
  "IMG-20250713-WA0028.jpg",
  "IMG-20250713-WA0026.jpg",
  "IMG-20250713-WA0029.jpg",
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <section id="gallery" className="section">
      <div className="container">
        <span className="section-subtitle">Our Work</span>
        <h2 className="section-title">Gallery</h2>

        <div className="gallery-grid">
          {images.map((img, index) => (
            <GalleryItem
              key={index}
              img={img}
              index={index}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>

        <div style={{ marginTop: "60px", textAlign: "center" }}>
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
                src={`/gallery/${images[selectedImage]}`}
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
      <img src={`/gallery/${img}`} alt="Project" loading="lazy" />
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
