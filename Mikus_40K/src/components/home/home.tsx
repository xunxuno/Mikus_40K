import React from 'react';
import './home.css';
import image1 from '../../images/HALLOWEEN(1).png';
import image2 from '../../images/HALLOWEEN.png';
import image3 from '../../images/test.png';
import ImageCarousel from '../ImageCarousel';
import Sidebar from '../sidebar/Sidebar';
import ProductComponent from '../product/Product';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';

const images = [image1, image2, image3];

const Home: React.FC = () => {
  const dispatch = useDispatch();

  // Función para agregar productos al carrito
  const addToLocalCart = (productId: number) => {
    const cartItem = {
      productId,
      quantity: 1,
      price: 0, // Ajusta esto si tienes información del precio
      product_Name: '', // Puedes obtener esta información si es necesario
      product_Description: '',
      imageUrl: '',
    };
    dispatch(addToCart(cartItem));
  };

  return (
    <>
      <div>
        <ImageCarousel images={images} />
      </div>
      <div>
        <Sidebar />
        <h3 className="products">PRODUCTOS DESTACADOS</h3>
        {/* Aquí pasamos la función como prop */}
        <ProductComponent addToLocalCart={addToLocalCart} />
      </div>
    </>
  );
};

export default Home;
