// models/ProductModel.ts

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  shippingType: string;
  shippingPrice?: number;
  size?: string;
  weight?: string;
  quantity: number;
}

export const products: Product[] = [
  {
      id: 1,
      name: 'Miku Veraniega Edicion 5',
      description: 'Figura Miku edicion Veraniega.',
      price: 100,
      imageUrl: 'https://via.placeholder.com/150',
      shippingType: 'Estándar',
      shippingPrice: 90,
      size: '25cm x 15cm x 10cm',
      weight: '500g',
      quantity: 20,
  },
  {
      id: 2,
      name: 'Spacemarine',
      description: 'Figura Spacemarine del videojuego Spacemarine 2.',
      price: 200,
      imageUrl: 'https://via.placeholder.com/150',
      shippingType: 'Exprés',
      shippingPrice: 150,
      size: '30cm x 18cm x 12cm',
      weight: '700g',
      quantity: 25,
  },
  {
      id: 3,
      name: 'Miku Maid',
      description: 'Figura Miku Maid.',
      price: 150,
      imageUrl: 'https://via.placeholder.com/150',
      shippingType: 'Exprés',
      shippingPrice: 150,
      size: '20cm x 12cm x 8cm',
      weight: '400g',
      quantity: 15,
  },
  {
      id: 4,
      name: 'Reductus Saboteur',
      description: 'Figura Reductus Saboteur.',
      price: 800,
      imageUrl: 'https://via.placeholder.com/150',
      shippingType: 'Gratis',
      shippingPrice: 0,
      size: '28cm x 16cm x 10cm',
      weight: '900g',
      quantity: 30,
  },
];
