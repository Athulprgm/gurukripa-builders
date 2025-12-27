import { Phone, Mail, MapPin, Instagram } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <span className="section-subtitle">Get in Touch</span>
        <h2 className="section-title">Contact Us</h2>

        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="contact-item">
              <div className="contact-icon">
                <Phone />
              </div>
              <div className="contact-text">
                <h4>Phone</h4>
                <a href="tel:917558988689">+91 7558988689</a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Mail />
              </div>
              <div className="contact-text">
                <h4>Email</h4>
                <a href="mailto:gurukripa9070@gmail.com">
                  gurukripa9070@gmail.com
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <MapPin />
              </div>
              <div className="contact-text">
                <h4>Address</h4>
                <p>
                  City Center, Cheemeni,
                  <br />
                  Cheruvathur, Kerala 671313
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <Instagram />
              </div>
              <div className="contact-text">
                <h4>Instagram</h4>
                <a
                  href="https://www.instagram.com/gurukripa_builders_chmni"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  gurukripa_builders_chmni
                </a>
              </div>
            </div>
          </div>

          <div className="map-container">
            <iframe
              title="Gurukripa Builders Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.1498051377775!2d75.22915817521181!3d12.238134288013846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6a07f33e5c16060f%3A0xf743f1beb37a67ee!2sGurukripa%20builders!5e1!3m2!1sen!2sin!4v1752645500513!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
