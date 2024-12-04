import { registerSchema } from './registerSchema';

describe('registerSchema', () => {
  it('debería validar correctamente datos válidos', () => {
    const validData = {
      username: 'usuario123',
      email: 'usuario@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    expect(() => registerSchema.parse(validData)).not.toThrow();
  });

  it('debería fallar si el nombre de usuario tiene menos de 3 caracteres', () => {
    const invalidData = {
      username: 'ab',
      email: 'usuario@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    expect(() => registerSchema.parse(invalidData)).toThrowError(
      'El nombre de usuario debe tener al menos 3 caracteres'
    );
  });

  it('debería fallar si el correo no tiene un formato válido', () => {
    const invalidData = {
      username: 'usuario123',
      email: 'usuario@com',
      password: 'password123',
      confirmPassword: 'password123',
    };

    expect(() => registerSchema.parse(invalidData)).toThrowError(
      'Debe ser un correo electrónico válido'
    );
  });

  it('debería fallar si la contraseña tiene menos de 6 caracteres', () => {
    const invalidData = {
      username: 'usuario123',
      email: 'usuario@example.com',
      password: '123',
      confirmPassword: '123',
    };

    expect(() => registerSchema.parse(invalidData)).toThrowError(
      'La contraseña debe tener al menos 6 caracteres'
    );
  });

  it('debería fallar si las contraseñas no coinciden', () => {
    const invalidData = {
      username: 'usuario123',
      email: 'usuario@example.com',
      password: 'password123',
      confirmPassword: 'differentPassword',
    };

    expect(() => registerSchema.parse(invalidData)).toThrowError(
      'Las contraseñas no coinciden'
    );
  });
});
