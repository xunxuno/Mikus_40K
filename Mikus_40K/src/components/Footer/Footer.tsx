import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Miku´s 40k. Todos los derechos reservados.</p>
        <ul className="footer-links">
          <li><a href="/support">Contactar el Soporte</a></li>
          <li><a href="/help-center">Centro de Ayuda</a></li>
          <li><a href="/contact">Contacto</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
