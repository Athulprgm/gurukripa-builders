import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const statsData = [
  { value: 96, suffix: "+", label: "Projects Delivered" },
  { value: 138, suffix: "+", label: "Happy Families" },
  { value: 4, suffix: "+", label: "Years of Excellence" },
];

// Animated counter hook
const useCounter = (target, isInView, duration = 2200) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return count;
};

const StatItem = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(stat.value, isInView, 2000 + index * 200);

  return (
    <motion.div
      ref={ref}
      className="stat-item"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="stat-divider" />
      <span className="stat-number-display">
        {count}
        {stat.suffix}
      </span>
      <p className="stat-label">{stat.label}</p>
    </motion.div>
  );
};

const Stats = () => {
  return (
    <section className="stats-section">
      <div className="container">
        <motion.div
          style={{ textAlign: "center", marginBottom: "0px" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label" style={{ justifyContent: "center" }}>
            By The Numbers
          </span>
        </motion.div>
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
