// components/ProductDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductById } from '../../controllers/ProductDetailController'; // Importamos la función desde el controlador
import { addToCart } from '../../redux/cartSlice'; // Importamos la acción de Redux
import type { Product } from '../../models/ProductModel'; // Importación tipo-only para Product
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtenemos el id de los parámetros de la URL
  const [product, setProduct] = useState<Product | null>(null); // Estado para almacenar el producto
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const dispatch = useDispatch(); // Hook para disparar acciones de Redux

  // Función para manejar el agregado al carrito
  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        productId: product.id,
        quantity: 1,
        price: product.price,
        product_Name: product.product_Name,
        product_Description: product.product_Description,
        imageUrl: product.image_path,
      };
      dispatch(addToCart(cartItem)); // Enviamos el producto al carrito en Redux
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); // Indicamos que estamos cargando
      const fetchedProduct = await getProductById(parseInt(id || '')); // Llamamos a la función de controlador
      setProduct(fetchedProduct); // Establecemos el producto en el estado
      setLoading(false); // Indicamos que la carga ha terminado
    };

    fetchProduct(); // Llamamos a la función de carga cuando el componente se monta
  }, [id]); // Dependemos del id para volver a obtener el producto cuando cambie la URL

  if (loading) {
    return <div>Cargando...</div>; // Mostramos un mensaje de carga mientras esperamos el producto
  }

  if (!product) {
    return <div>Producto no encontrado</div>; // Si no se encuentra el producto, mostramos un mensaje
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail">
        <div className="product-image-container">
          <img src={product.imageUrl} alt={product.product_Name} className="product-image" />
        </div>
        <div className="product-info">
          <h2 className="product-title">{product.product_Name}</h2>
          <p className="product-description">{product.product_Description}</p>
          <div className="product-price">
            <strong>Precio:</strong> ${product.price}
          </div>
          <div className="product-shipping">
            <strong>Envío:</strong> {product.shippingType} ({product.shippingPrice !== undefined ? `+$${product.shippingPrice}` : 'Gratis'})
          </div>
          <div className="product-size">
            <strong>Medidas:</strong> {product.size}
          </div>
          <div className="product-weight">
            <strong>Peso:</strong> {product.weight}
          </div>
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
