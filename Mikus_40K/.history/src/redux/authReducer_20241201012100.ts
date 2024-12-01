interface AuthState {
    token: string | null;
    userId: number | null;
    userName: string | null;
  }
  
  const initialState: AuthState = {
    token: null,
    userId: null,
    userName: null,
  };
  
  const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          token: action.payload.token,
          userId: action.payload.userId,
          userName: action.payload.userName,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  