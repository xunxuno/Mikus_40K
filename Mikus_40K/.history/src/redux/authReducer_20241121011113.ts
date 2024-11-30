interface AuthState {
    token: string | null;
    userId: number | null;
  }
  
  const initialState: AuthState = {
    token: null,
    userId: null,
  };
  
  const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          token: action.payload.token,
          userId: action.payload.userId,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  