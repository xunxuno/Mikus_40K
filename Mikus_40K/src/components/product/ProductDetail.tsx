import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../controllers/ProductDetailController'; // Función para obtener el producto por ID
import type { Product } from '../../models/ProductModel'; // Importación tipo-only para Product
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtenemos el id de los parámetros de la URL
  const [product, setProduct] = useState<Product | null>(null); // Estado para almacenar el producto
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [imgError, setImgError] = useState<string>(''); // Estado para manejar error de carga de imagen

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
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
