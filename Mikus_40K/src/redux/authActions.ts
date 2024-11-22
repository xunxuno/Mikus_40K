export const setUser = (userData: { token: string; userId: number }) => ({
    type: 'SET_USER',
    payload: userData,
  });
  