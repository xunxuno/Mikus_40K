
/*import axiosInstance from './axiosInstance';

export interface Product {
  id: number;
  product_Name: string;
  price: number;
  product_Description: string;
  image_path: string;
  shippingType: string;
  shippingPrice: number;
  category: 'Miku' | 'Warhammer'; 
}

// Función para obtener todos los productos
export const obtenerProductos = async (): Promise<Product[]> => {
  try {
    const response = await axiosInstance.get('/api/products'); // Asegúrate de que esta es la URL correcta de tu API
    console.log('Productos recibidos:', response.data);

    return response.data; // Devuelve los productos recibidos de la API
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener productos:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error; // Lanza el error para que pueda ser manejado más arriba
  }
};*/

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
  category: 'Miku' | 'Warhammer'; // Nueva propiedad para categorizar el producto
}

// Datos temporales de productos
export const products: Product[] = [
  {
    id: 1,
    name: 'Miku Veraniega Edicion 5',
    description: 'Figura Miku edición Veraniega.',
    price: 100,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Estándar',
    shippingPrice: 90,
    size: '25cm x 15cm x 10cm',
    weight: '500g',
    category: 'Miku',
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
    category: 'Warhammer',
  },
  {
    id: 3,
    name: 'Miku Maid',
    description: 'Figura de Miku en atuendo de maid.',
    price: 150,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Exprés',
    shippingPrice: 150,
    size: '20cm x 12cm x 8cm',
    weight: '400g',
    category: 'Miku',
  },
  {
    id: 4,
    name: 'Reductus Saboteur',
    description: 'Figura del personaje Reductus Saboteur.',
    price: 800,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Gratis',
    shippingPrice: 0,
    size: '28cm x 16cm x 10cm',
    weight: '900g',
    category: 'Warhammer',
  },
  {
    id: 5,
    name: 'Miku Snow Princess',
    description: 'Figura de Miku con atuendo de princesa de la nieve.',
    price: 120,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Estándar',
    shippingPrice: 70,
    size: '22cm x 14cm x 9cm',
    weight: '450g',
    category: 'Miku',
  },
  {
    id: 6,
    name: 'Ultramarine Capitán',
    description: 'Figura del capitán Ultramarine.',
    price: 300,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Exprés',
    shippingPrice: 180,
    size: '32cm x 20cm x 15cm',
    weight: '1kg',
    category: 'Warhammer',
  },
  {
    id: 7,
    name: 'Miku Future Tech',
    description: 'Figura de Miku con temática futurista.',
    price: 110,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Estándar',
    shippingPrice: 90,
    size: '23cm x 15cm x 10cm',
    weight: '500g',
    category: 'Miku',
  },
  {
    id: 8,
    name: 'Miku Racing Queen',
    description: 'Figura de Miku con atuendo de carreras.',
    price: 140,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Exprés',
    shippingPrice: 130,
    size: '24cm x 16cm x 11cm',
    weight: '550g',
    category: 'Miku',
  },
  {
    id: 9,
    name: 'Warhammer Tech-Priest',
    description: 'Figura del Tech-Priest de Warhammer 40k.',
    price: 250,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Exprés',
    shippingPrice: 160,
    size: '27cm x 18cm x 12cm',
    weight: '800g',
    category: 'Warhammer',
  },
  {
    id: 10,
    name: 'Miku Rock Star',
    description: 'Figura de Miku con guitarra y estilo de rock.',
    price: 130,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Estándar',
    shippingPrice: 100,
    size: '24cm x 14cm x 10cm',
    weight: '480g',
    category: 'Miku',
  },
  {
    id: 11,
    name: 'Warhammer Dreadnought',
    description: 'Figura de un Dreadnought de Warhammer 40k.',
    price: 500,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Exprés',
    shippingPrice: 200,
    size: '35cm x 25cm x 20cm',
    weight: '1.5kg',
    category: 'Warhammer',
  },
  {
    id: 12,
    name: 'Miku Classic Idol',
    description: 'Figura de Miku con el clásico atuendo de idol.',
    price: 90,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Estándar',
    shippingPrice: 80,
    size: '20cm x 12cm x 8cm',
    weight: '400g',
    category: 'Miku',
  },
  {
    id: 13,
    name: 'Necron Overlord',
    description: 'Figura del Necron Overlord de Warhammer 40k.',
    price: 280,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Exprés',
    shippingPrice: 150,
    size: '29cm x 17cm x 10cm',
    weight: '750g',
    category: 'Warhammer',
  },
  {
    id: 14,
    name: 'Miku Magical Girl',
    description: 'Figura de Miku con atuendo de chica mágica.',
    price: 160,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Estándar',
    shippingPrice: 110,
    size: '23cm x 15cm x 9cm',
    weight: '500g',
    category: 'Miku',
  },
  {
    id: 15,
    name: 'Miku Gothic Lolita',
    description: 'Figura de Miku con estilo gótico y lolita.',
    price: 180,
    imageUrl: 'https://via.placeholder.com/150',
    shippingType: 'Exprés',
    shippingPrice: 120,
    size: '25cm x 15cm x 10cm',
    weight: '600g',
    category: 'Miku',
  },
];
