import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_NAME } from './auth.reducer';
export const getFeature = createFeatureSelector<AuthState>(AUTH_FEATURE_NAME);

export const getLoading = createSelector(getFeature, (state) => state.loading);

export const getLoaded = createSelector(getFeature, (state) => state.loaded);

export const getServerError = createSelector(
  getFeature,
  (state) => state.error
);

export const getAuthData = createSelector(
  getFeature,
  (state) => state.authData
);

export const getAccessToken = createSelector(
  getAuthData,
  (authData) => authData && authData.accessToken
);
