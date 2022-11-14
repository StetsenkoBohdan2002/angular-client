import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { logout, loginSuccess } from './auth.actions';

export const AUTH_FEATURE_NAME = 'auth';
export interface AuthData {
  userId: string;
  userImg: string;
  firstName: string;
  lastName: string;
  email: string;
  createdDate: string;
  accessToken: string;
}
export interface AuthState {
  loading: boolean;
  loaded: boolean;
  error: string;
  authData?: User;
}

export const initialState: AuthState = {
  loading: false,
  loaded: false,
  error: '',
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, authData: User) => ({
    ...state,
    authData,
    loaded: true,
    loading: false,
    error: '',
  })),
  on(logout, (state) => ({
    ...state,
    authData: undefined,
    loaded: false,
    loading: false,
    error: '',
  }))
);
