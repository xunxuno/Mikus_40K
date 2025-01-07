import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { getProductById } from '../../controllers/ProductDetailController'; // Función para obtener el producto por ID
import { addProductToCart, getOrCreatePendingCart, updateProductQuantityInCart, getProductQuantityInCart } from '../../models/CartModel'; // Importamos funciones de la API
import type { Product } from '../../models/ProductModel'; // Importación tipo-only para Product
import { RootState } from '../../redux/store'; // Estado global
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtenemos el id de los parámetros de la URL
  const [product, setProduct] = useState<Product | null>(null); // Estado para almacenar el producto
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [imgError, setImgError] = useState<string>(''); // Estado para manejar error de carga de imagen
  const userId = useSelector((state: RootState) => state.auth.userId); // Accedemos al id del usuario desde el estado global

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true); // Indicamos que estamos cargando
      try {
        const fetchedProduct = await getProductById(parseInt(id || '')); // Llamamos a la función de controlador
        setProduct(fetchedProduct); // Establecemos el producto en el estado
      } catch (error) {
        console.error('Error al cargar el producto:', error);
      } finally {
        setLoading(false); // Indicamos que la carga ha terminado
      }
    };

    fetchProduct(); // Llamamos a la función de carga cuando el componente se monta
  }, [id]); // Dependemos del id para volver a obtener el producto cuando cambie la URL

  // Si estamos cargando, mostramos el mensaje
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no encontramos el producto, mostramos un mensaje de error
  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  // Verifica si la URL de la imagen es correcta
  const imageUrl = `/${product.image_path}`;

  // Comprobamos si la imagen existe en la ruta pública
  const img = new Image();
  img.src = imageUrl;
  img.onload = () => {
    setImgError(''); // Imagen cargada correctamente, reseteamos el error
  };
  img.onerror = (error) => {
    console.error('Error al cargar la imagen en la ruta: ', imageUrl, error);
    setImgError(`Error al cargar la imagen. Ruta: ${imageUrl}.`);
  };

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

  return (
    <div className="product-detail-page">
      <div className="product-detail">
        <div className="product-image-container">
          {/* Si hay un error con la imagen, mostramos el mensaje detallado */}
          {imgError ? (
            <div>
              <strong>Hubo un error al cargar la imagen:</strong>
              <p>{imgError}</p>
            </div>
          ) : (
            <img src={imageUrl} alt={product.product_Name} className="product-image" />
          )}
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
          {/* Botón para agregar al carrito */}
          <button
            className="add-to-cart-button"
            onClick={handleAddToCart}
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
