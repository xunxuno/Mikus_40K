import React, { useEffect, useState } from 'react';
import { OrderItem, getOrderHistory } from '../../models/CartModel';
import './OrderHistory.css';

const OrderHistory: React.FC = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const userId = 1; // Cambia este valor por el ID del usuario autenticado (puedes usar Redux o Context)

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const history = await getOrderHistory(userId);
        setOrderItems(history);
      } catch (err) {
        setError('Error al cargar el historial de compras.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, [userId]);

  if (loading) return <div>Cargando historial de compras...</div>;
  if (error) return <div>{error}</div>;
  if (orderItems.length === 0) return <div>No tienes compras registradas.</div>;

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
