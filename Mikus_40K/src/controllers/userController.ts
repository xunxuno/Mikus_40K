import { registrarUsuario } from '../models/UserModel';
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
/*async function logearUsuario(req: Request, res: Response): Promise<Response> {
  const { nombre, password }: { nombre: string; password: string } = req.body;

  try {
    // Intentar logear al usuario
    const result = await usuarioModel.logearUsuario(nombre, password);

    if (!result) {
      return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' });
    }

    return res.status(200).json({ mensaje: 'Usuario logeado con éxito', result });
  } catch (error) {
    console.error('Error al logear el usuario:', error);
    return res.status(500).json({ mensaje: 'Hubo un error al intentar logear el usuario' });
  }
}*/

export {
    registrarUsuario_,
  //logearUsuario
};