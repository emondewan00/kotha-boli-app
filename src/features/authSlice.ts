import {createSlice} from '@reduxjs/toolkit';
import {getItem} from '../utils/storage';

type User = {
  _id: string;
  email: string;
  name: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
};

const initialState: AuthState = {
  token: getItem('token') ?? null,
  user: getItem('user') ? JSON.parse(getItem('user') as string) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: state => {
      state.token = null;
      state.user = null;
    },
  },
});

export const {loginSuccess, logout} = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: any) => state.auth.token;
export const selectUser = (state: any) => state.auth.user;

export const selectIsAuthenticated = (state: any) => !!state.auth.token;
