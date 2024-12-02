//import React from 'react';
import './ContactSupport.css';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function ContactSupport() {
  return (
    <div className="contact-support-container">
      <div className="contact-box">
        <h1 className="contact-title">Contacto</h1>
        <p className="contact-info">
          <strong>Correo Electrónico:</strong> <FaEnvelope /> soporteMikus_40K@gmail.com
        </p>
        <p className="contact-info">
          <strong>Teléfono:</strong> <FaPhone /> +52 (999) 945 2344
        </p>
        <p className="contact-info">
          <strong>Dirección:</strong> <FaMapMarkerAlt /> CALLE 47 NO. 536 #POR 72, C. 72, Centro, 97000 Mérida, Yuc.
        </p>

        <div className="contact-details">
          <p className="contact-detail"><strong>Horario de atención:</strong> Lunes a Viernes de 9:00 AM a 6:00 PM</p>
          <p className="contact-detail"><strong>Redes Sociales:</strong></p>
        </div>

        <div className="contact-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactSupport;
