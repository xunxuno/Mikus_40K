import axiosInstance from './axiosInstance'; 

export interface User {
  id?: number;
  userName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
}

export const registrarUsuario = async (user: Omit<User, 'id'>): Promise<{ mensaje: string }> => {
  try {
      const response = await axiosInstance.post('/api/singIn', {
        secureData: {
              userName: user.userName,
              email: user.email,
              password: user.password,
          },
      });

      console.log('Respuesta del servidor:', response.data);

      return response.data; // Se espera que el backend envíe un mensaje de confirmación
  } catch (error: unknown) {
      if (error instanceof Error) {
          console.error('Error al registrar usuario:', error.message);
      } else {
          console.error('Error desconocido:', error);
      }
      throw error;
  }
};

// Función para logear un usuario
export async function logearUsuario(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post('http://localhost:3002/api/singUp', {
      secureData: {
        email,
        password,
      },
    });

    const { token, userId } = response.data; // Asegúrate de que tu API devuelve estos campos
    console.log('Token recibido:', token);
    console.log('UserId recibido:', userId);
    console.log('Respuesta del servidor:', response.data);

    return { token, userId };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener usuario por nombre:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
}
