import { registrarUsuario , logearUsuario, LoginResponse} from '../models/UserModel';
import { getHash } from '../middlewares/authMiddleware';

// Función asincrónica para registrar un usuario
const registrarUsuario_ = async (userName: string, email: string, password: string) => {
    try {
      // Generar el hash de la contraseña (suponiendo que tienes esta función en el cliente)
      const passwordHash = await getHash(password);
  
      // Registrar el usuario (aquí podrías hacer lo que necesites con la base de datos o el almacenamiento local)
      const result = await registrarUsuario({ userName, email, password: passwordHash });
  
      return { mensaje: 'Usuario registrado con éxito', result };
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw new Error('Hubo un error al registrar el usuario');
    }
  };
  

// Función asincrónica para logear a un usuario
const logearUsuario_ = async (email: string, password: string): Promise<{ mensaje: string; result?: LoginResponse }> => {
  try {
    // Llama a la función del cliente para logear al usuario
    const result = await logearUsuario(email, password);

    if (!result) {
      return { mensaje: 'Email o contraseña incorrectos' };
    }

    return { mensaje: 'Usuario logeado con éxito', result };
  } catch (error) {
    console.error('Error al logear el usuario:', error);
    return { mensaje: 'Hubo un error al intentar logear el usuario' };
  }
};


export {
    registrarUsuario_, logearUsuario_
};