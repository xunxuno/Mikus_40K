export interface User {
  id: number;
  username: string;
  password: string;  // Contraseña agregada
  token: string;
}

// Usuario "fake" de ejemplo
export const fakeUser: User = {
  id: 1,
  username: 'admin',
  password: 'admin',
  token: 'fake-token-123',
};
