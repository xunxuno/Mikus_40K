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
  userName: string;
  userEmail: string;
}

export interface UserDetails {
  user_id: number;
  first_name: string;
  last_name: string;
  phone_number?: string;
  country: string;
  city: string;
  zip_code: string;
  street?: string;
  house_number?: string;
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

    const { token, userId, userName, userEmail} = response.data; // Asegúrate de que tu API devuelve estos campos
    console.log('Token recibido:', token);
    console.log('UserId recibido:', userId);
    console.log('UserName recibido:', userName);
    console.log('email recibido:', userEmail);
    console.log('Respuesta del servidor:', response.data);

    return { token, userId, userName, userEmail };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener usuario por nombre:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
}

export const createUserDetails = async (details: UserDetails): Promise<void> => {
  try {
    const response = await axiosInstance.post('/api/user-details', details);
    console.log('Detalles de usuario creados:', response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al crear detalles de usuario:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};

// Función para obtener los detalles del usuario por ID
export const fetchUserDetails = async (): Promise<UserDetails | null> => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      throw new Error('No se encontró userId en localStorage');
    }

    const response = await axiosInstance.get(`/api/user-details/${Number(userId)}`);
    return response.data as UserDetails;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al obtener detalles del usuario:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};


// Función para actualizar los detalles del usuario
export const updateUserDetails = async (details: UserDetails): Promise<void> => {
  try {
    // La API espera un cuerpo con todos los campos de UserDetails
    const {
      user_id,
      first_name,
      last_name,
      phone_number,
      country,
      city,
      zip_code,
      street,
      house_number,
    } = details;

    const response = await axiosInstance.put(`/api/user-details/update`, {
      user_id,
      first_name,
      last_name,
      phone_number,
      country,
      city,
      zip_code,
      street,
      house_number,
    });

    console.log('Detalles de usuario actualizados:', response.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error al actualizar detalles del usuario:', error.message);
    } else {
      console.error('Error desconocido:', error);
    }
    throw error;
  }
};