// ProductDetailController.ts
import { Product } from '../models/ProductModel';

// Datos temporales de productos (pueden moverse a una fuente de datos más apropiada)
const products: Product[] = [
  {
    id: 1,
    name: 'Miku Veraniega Edición 5',
    description: 'Figura Miku edición Veraniega. Perfecta para coleccionistas.',
    price: 100,
    imageUrl: 'https://via.placeholder.com/400',
    shippingType: 'Estándar',
    shippingPrice: 10,
    size: '25cm x 15cm x 10cm',
    weight: '500g',
  },
  {
    id: 2,
    name: 'Spacemarine',
    description: 'Figura Spacemarine del videojuego Spacemarine 2. Impresionante detalle.',
    price: 200,
    imageUrl: 'https://via.placeholder.com/400',
    shippingType: 'Exprés',
    shippingPrice: 20,
    size: '30cm x 18cm x 12cm',
    weight: '700g',
  },
  {
    id: 3,
    name: 'Miku Maid',
    description: 'Figura Miku como sirvienta en versión coleccionista.',
    price: 150,
    imageUrl: 'https://via.placeholder.com/400',
    shippingType: 'Gratis',
    shippingPrice: 0,
    size: '20cm x 12cm x 8cm',
    weight: '400g',
  },
  {
    id: 4,
    name: 'Reductus Saboteur',
    description: 'Figura de Reductus Saboteur del universo Warhammer 40k.',
    price: 300,
    imageUrl: 'https://via.placeholder.com/400',
    shippingType: 'Gratis',
    shippingPrice: 0,
    size: '28cm x 16cm x 10cm',
    weight: '900g',
  },
];

export const getProductById = (id: number): Product | undefined => {
  return products.find((product) => product.id === id);
};
