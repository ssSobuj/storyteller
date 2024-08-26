import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__links">
          <a href="#about" className="footer__link">
            About Us
          </a>
          <a href="#contact" className="footer__link">
            Contact
          </a>
          <a href="#privacy" className="footer__link">
            Privacy Policy
          </a>
        </div>
        <div className="footer__copy">
          <p>&copy; 2024 Your Company Name. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
