import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section id="home" className="hero" ref={ref}>
      <div
        className="container"
        style={{ width: "100%", position: "relative", zIndex: 10 }}
      >
        <motion.div
          className="hero-content"
          style={{ y: yText, opacity: opacityText }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hero-title"
          >
            Building Visions,
            <br />
            <span>Constructing Reality</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-desc"
          >
            Pioneering the future of construction with advanced engineering,
            premium design, and unwavering commitment to quality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <a href="#contact" className="btn btn-primary">
              Start Project
            </a>
            <a
              href="#services"
              className="btn btn-outline"
              style={{ marginLeft: "16px" }}
            >
              View Services
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
