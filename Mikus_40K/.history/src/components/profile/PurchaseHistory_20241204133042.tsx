import React, { useEffect, useState } from 'react';
import { OrderItem, getOrderHistory } from '../../models/CartModel';
import './OrderHistory.css';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';

const OrderHistory: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    console.log('Componente montado, iniciando fetch del historial de compras.');
    const fetchOrderHistory = async () => {
      try {
        console.log(`Obteniendo historial para el usuario con ID: ${userId}`);
        const history = await getOrderHistory(userId!);
        console.log('Historial obtenido:', history);
        setOrderItems(history);
      } catch (err) {
        console.error('Error al obtener el historial de compras:', err);
        setError('Error al cargar el historial de compras.');
      } finally {
        setLoading(false);
        console.log('Finalizado fetch del historial de compras.');
      }
    };

    fetchOrderHistory();
  }, [userId]);

  console.log('Estado actual:', { orderItems, loading, error });

  if (loading) {
    console.log('Cargando historial...');
    return <div>Cargando historial de compras...</div>;
  }

  if (error) {
    console.log('Error encontrado:', error);
    return <div>{error}</div>;
  }

  if (orderItems.length === 0) {
    console.log('No hay compras registradas.');
    return <div>No tienes compras registradas.</div>;
  }

  return (
    <div className="order-history-container">
      <h2>Historial de Compras</h2>
      <div className="order-history-grid">
        {orderItems.map((item) => (
          <div key={item.id} className="order-history-item">
            <h3 className="order-history-product">{item.product_name}</h3>
            <p className="order-history-quantity">Cantidad: {item.quantity}</p>
            <p className="order-history-price">Precio: ${item.price.toFixed(2)}</p>
            <p className="order-history-total">
              Total: ${(item.quantity * item.price).toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;