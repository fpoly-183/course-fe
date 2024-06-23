import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../shared/model/user.model';
import { getUserInfo, login } from './auth.api';

interface IInitialLoginState {
  loading: boolean;
  errorMessage: string | null;
  user: IUser | null;
  loginSuccess: boolean;
  getUserInfoSuccess: boolean;
  token: string | null;
}

const initialState: IInitialLoginState = {
  loading: false,
  errorMessage: null,
  loginSuccess: false,
  getUserInfoSuccess: false,
  token: null,
  user: null,
};

const { actions, reducer } = createSlice({
  name: 'authenticationSlice',
  initialState,
  reducers: {
    fetching(state) {
      state.loading = true;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('authentication_token');
    },
    resetAll(state) {
      state.loading = false;
      state.loginSuccess = false;
      state.getUserInfoSuccess = false;
      state.token = null;
      state.user = null;
      state.errorMessage = null;
    },
    resetEntity(state) {
      state.getUserInfoSuccess = false;
      state.loginSuccess = false;
      state.loading = false;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }: PayloadAction<{ id_token: string }>) => {
      localStorage.setItem('authentication_token', payload.id_token);
      state.token = payload.id_token;
      state.loginSuccess = true;
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, { payload }: PayloadAction<any>) => {
      localStorage.removeItem('authentication_token');
      state.errorMessage = payload?.message;
      state.loading = false;
      state.loginSuccess = false;
    });
    builder.addCase(getUserInfo.fulfilled, (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
      state.getUserInfoSuccess = true;
      state.errorMessage = null;
      state.loading = false;
    });
    builder.addCase(getUserInfo.rejected, (state, { payload }) => {
      localStorage.removeItem('authentication_token');
      state.getUserInfoSuccess = false;
      state.loading = false;
    });
  },
});

export const { fetching, resetAll, resetEntity, logout } = actions;
export default reducer;
