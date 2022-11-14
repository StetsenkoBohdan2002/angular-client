import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const loginSuccess = createAction(
  '[Auth] login success',
  props<User>()
);

export const logout = createAction('[Auth] logout');
