//import React from 'react';
import './AboutUs.css';
import { FaAward, FaHeart, FaUsers, FaGlobe } from 'react-icons/fa';

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-box">
        <h1 className="about-title">Acerca de Nosotros</h1>
        <p className="about-description">
          Somos una empresa apasionada por las figuras de colección de alta calidad, enfocada en dos mundos fascinantes:
          <strong> Warhammer 40k</strong>, con su vasto universo futurista y épico, y la icónica estrella virtual <strong>Hatsune Miku</strong>, que
          ha conquistado los corazones de millones. Nuestra misión es fusionar la calidad artesanal con el diseño innovador, llevando a nuestros
          clientes piezas únicas que combinan la esencia de estos dos universos.
        </p>
        <p className="about-description">
          Nos dedicamos a distribuir figuras de colección cuidadosamente seleccionadas, garantizando autenticidad, detalle y excelencia en cada
          producto. Creemos que cada figura cuenta una historia, y queremos ser parte de esa narrativa, conectando a los fans con sus personajes
          favoritos de manera inolvidable.
        </p>

        <h2 className="about-subtitle">
          <FaAward /> Nuestra Filosofía
        </h2>
        <p className="about-description">
          La calidad es nuestra prioridad. Trabajamos directamente con fabricantes reconocidos y diseñadores talentosos para asegurar que cada
          figura cumpla con los estándares más exigentes. Además, valoramos profundamente a nuestra comunidad de coleccionistas y fans, y estamos
          comprometidos a ofrecer una experiencia de compra excepcional.
        </p>

        <h2 className="about-subtitle">
          <FaUsers /> Nuestro Compromiso
        </h2>
        <ul className="about-list">
          <li><FaHeart /> Ofrecer figuras auténticas y de calidad superior.</li>
          <li><FaHeart /> Fomentar la creatividad y la innovación en el diseño.</li>
          <li><FaHeart /> Conectar a los fans con los universos que aman.</li>
          <li><FaHeart /> Garantizar un servicio al cliente confiable y personalizado.</li>
        </ul>

        <h2 className="about-subtitle">
          <FaGlobe /> Nuestro Alcance Global
        </h2>
        <p className="about-description">
          Aunque nuestra sede está en Mérida, Yucatán, nuestros productos llegan a coleccionistas y fans de todo el mundo. 
          Nos esforzamos por ofrecer una experiencia de compra internacional, garantizando la entrega de figuras auténticas a cualquier rincón del planeta.
        </p>

        <p className="about-description">
          Gracias por ser parte de esta comunidad. En cada figura que distribuimos, llevamos nuestro compromiso y nuestra pasión por los detalles.
          ¡Bienvenidos a un mundo donde Warhammer 40k y Hatsune Miku convergen en la perfección coleccionable!
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
