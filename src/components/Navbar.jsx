import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Theme State
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Effect
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Don't close if clicking on navbar or mobile menu button
      if (
        isOpen &&
        !e.target.closest(".navbar") &&
        !e.target.closest(".mobile-menu") &&
        !e.target.closest(".mobile-menu-btn")
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Use a small delay to prevent immediate closing
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 100);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("menu-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    }

    return () => {
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        <a href="#home" className="logo" onClick={() => setIsOpen(false)}>
          GURUKRIPA <span>BUILDERS</span>
        </a>

        {/* Desktop Nav & Toggle */}
        <div className="nav-desktop">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="nav-link">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        {/* Mobile Actions */}
        <div className="nav-mobile">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isOpen ? "active" : ""}`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="mobile-link"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
