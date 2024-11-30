// components/ProductCatalog.tsx
import React, { useEffect, useState } from 'react';
import { Product, obtenerProductos } from '../../models/ProductModel';
import { Link } from 'react-router-dom';
import './ProductCatalog.css';

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Efecto para obtener los productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productos = await obtenerProductos();
        setProducts(productos);
      } catch (err) {
        setError('Error al cargar los productos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="catalog-container">
      {products.map((product: Product) => (
        <Link key={product.id} to={`/product/${product.id}`} className="catalog-item-link">
          <div className="catalog-item">
            <img src={product.image_path} alt={product.product_Name} className="item-image" />
            <h3 className="item-title">{product.product_Name}</h3>
            <p className="item-price">${product.price.toFixed(2)}</p>
            <p className="item-shipping">
              {product.shippingType} {product.shippingPrice !== 0 && `- $${product.shippingPrice}`}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductCatalog;
