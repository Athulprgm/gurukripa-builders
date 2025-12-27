import { useRef } from "react";
import { Hammer, ClipboardList, Home, Trees, Ruler } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const TiltCard = ({ children, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 500, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]); // Subtle tilt
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]); // Subtle tilt

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="service-card"
    >
      <div style={{ transform: "translateZ(20px)" }}>{children}</div>
    </motion.div>
  );
};

const services = [
  {
    icon: <ClipboardList size={28} />,
    title: "Planning & Estimation",
    desc: "Detailed architectural planning and precise cost estimation.",
  },
  {
    icon: <Ruler size={28} />,
    title: "Supervision",
    desc: "On-site supervision ensuring construction follows plans perfectly.",
  },
  {
    icon: <Hammer size={28} />,
    title: "Construction",
    desc: "From foundation to finishing, delivering durable, premium builds.",
  },
  {
    icon: <Home size={28} />,
    title: "Interior Design",
    desc: "Functional, aesthetic spaces tailored to your modern lifestyle.",
  },
  {
    icon: <Trees size={28} />,
    title: "Landscaping",
    desc: "Creating green, inviting outdoor environments for your property.",
  },
];

const Services = () => {
  return (
    <section id="services" className="section">
      <div className="container">
        <span className="section-subtitle">What We Do</span>
        <h2 className="section-title">Our Expertise</h2>

        <div className="services-grid">
          {services.map((service, index) => (
            <TiltCard key={index} index={index}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
