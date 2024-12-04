import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Miku´s 40k. Todos los derechos reservados.</p>
        <ul className="footer-links">
          <li><a href="/about-us">Sobre Nosotros</a></li>
          <li><a href="/contact-support">Contacto</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
