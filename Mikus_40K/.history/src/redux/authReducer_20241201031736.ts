// authReducer.ts
interface AuthState {
  token: string | null;
  userId: number | null;
  userName: string | null;
  userEmail: string | null;
}

const userName = localStorage.getItem('userName');
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
const userEmail = localStorage.getItem('userEmail')

const initialState: AuthState = {
  token: token ? token : null,
  userId: userId ? Number(userId) : null,
  userName: userName ? userName : null,
  userEmail: userEmail ? userEmail: null,
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
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

export default authReducer;