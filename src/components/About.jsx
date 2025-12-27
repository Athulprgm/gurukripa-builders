import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-wrapper">
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img src="/about-new.png" alt="Modern Interior" />
            <div className="experience-badge">
              <span className="years">15+</span>
              <span className="text">
                Years of
                <br />
                Experience
              </span>
            </div>
          </motion.div>

          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="section-subtitle">Who We Are</span>
            <h2 className="section-title">Reliable Construction Partners</h2>
            <p className="about-description">
              We are a team of experienced professionals committed to delivering
              quality construction and design solutions. Our services span the
              entire project lifecycle—from planning and estimating to
              supervision and execution.
            </p>
            <p className="about-description">
              With a strong focus on precision, creativity, and customer
              satisfaction, we bring each project to life with attention to
              detail and a dedication to excellence.
            </p>

            <ul className="about-features">
              <li>
                <CheckCircle size={20} className="icon" /> Residential &
                Commercial
              </li>
              <li>
                <CheckCircle size={20} className="icon" /> Premium Interiors
              </li>
              <li>
                <CheckCircle size={20} className="icon" /> Landscape Design
              </li>
              <li>
                <CheckCircle size={20} className="icon" /> Detailed Supervision
              </li>
            </ul>

            <a href="#contact" className="btn btn-outline">
              Learn More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default About;
