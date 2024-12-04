import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductById } from '../../controllers/ProductDetailController'; // Importamos la función desde el controlador
import { addToCart } from '../../redux/cartSlice'; // Importamos la acción de Redux
import { addProductToCart, getOrCreatePendingCart, updateProductQuantityInCart, getProductQuantityInCart } from '../../models/CartModel'; // Importamos funciones de la API
import type { Product } from '../../models/ProductModel'; // Importación tipo-only para Product
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtenemos el id de los parámetros de la URL
  const [product, setProduct] = useState<Product | null>(null); // Estado para almacenar el producto
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const dispatch = useDispatch(); // Hook para disparar acciones de Redux

  // Obtén el userId de algún contexto, hook o estado global si es necesario
  const userId = 1; // Asegúrate de reemplazar esto con el id del usuario real

  // Función para manejar el agregado al carrito
  const handleAddToCart = async () => {
    if (!userId) {
      alert('Debes iniciar sesión para agregar productos al carrito.');
      return;
    }

    try {
      // Asegurarse de que el usuario tiene un carrito pendiente
      const cart_id = await getOrCreatePendingCart(userId);
      console.log('cart_id: ', cart_id);

      // Verificar si el producto ya está en el carrito
      const existingProduct = await getProductQuantityInCart(cart_id, product?.id || 0);
      console.log('productos existentes: ', existingProduct);

      if (existingProduct.quantity > 0) {
        // Si el producto ya está en el carrito, actualizar la cantidad
        await updateProductQuantityInCart(userId, {
          productId: product?.id || 0,
          quantity: existingProduct.quantity + 1,
          price: product?.price || 0
        });
        console.log('cantidad actualizada a: ', existingProduct);
        alert(`La cantidad del producto "${product?.product_Name}" fue actualizada en el carrito.`);
      } else {
        // Si el producto no está en el carrito, lo agregamos normalmente
        await addProductToCart(userId, {
          productId: product?.id || 0,
          quantity: 1,
          price: product?.price || 0,
          product_name: product?.product_Name || ''
        });
        alert(`El producto "${product?.product_Name}" fue agregado al carrito.`);
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      alert('Hubo un error al agregar el producto al carrito. Inténtalo nuevamente.');
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
          <img src={product.image_path} alt={product.product_Name} className="product-image" />
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
