import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer>
      <div className="container footer-container">
        <div className="footer-col">
          <div className="footer-logo">
            GURUKRIPA <span>BUILDERS</span>
          </div>
          <p className="footer-desc">
            Constructing dreams into reality with precision, quality, and
            timeless design. Your trusted partner for residential and commercial
            excellence.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a
              href="https://www.instagram.com/gurukripa_builders_chmni"
              target="_blank"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul className="footer-links">
            <li>Residential Construction</li>
            <li>Commercial Projects</li>
            <li>Interior Design</li>
            <li>Renovation</li>
            <li>Landscaping</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li>
              <MapPin size={18} className="icon" />
              <span>City Center, Cheemeni, Cheruvathur, Kerala 671313</span>
            </li>
            <li>
              <Phone size={18} className="icon" />
              <span>+91 7558988689</span>
            </li>
            <li>
              <Mail size={18} className="icon" />
              <span>gurukripa9070@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-flex">
          <p>
            &copy; {new Date().getFullYear()} Gurukripa Builders. All Rights
            Reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="scroll-top-btn"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
