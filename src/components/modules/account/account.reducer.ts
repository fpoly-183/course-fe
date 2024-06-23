import { RootState } from '@/reducers';
import { IInitialState, IListDataResponse, IResponse } from '@/shared/shared-interfaces';
import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IUser } from '../../../shared/model/user.model';
import { createEntity, getEntities, getEntity, IAccountParams, removeEntity, updateEntity } from './account.api';

interface IAccountInitialState extends IInitialState {
  filterState: IAccountParams;
}

export const initialAccountFilter: IAccountParams = {
  page: 1,
  size: 10,
};

const initialState: IAccountInitialState = {
  loading: false,
  errorMessage: null,
  fetchEntitiesSuccess: false,
  fetchEntitySuccess: false,
  updateEntitySuccess: false,
  deleteEntitySuccess: false,
  totalItems: 0,
  totalPages: 1,
  filterState: initialAccountFilter,
  totalElements: 0,
};

export const accountAdapter = createEntityAdapter<IUser>({
  selectId: ({ id }) => id,
});

const { actions, reducer } = createSlice({
  name: 'accountSlice',
  initialState: accountAdapter.getInitialState({ initialState }),
  reducers: {
    setFilterState(state, { payload }: PayloadAction<IAccountParams>) {
      state.initialState.filterState = payload;
    },
    fetching(state) {
      state.initialState.loading = true;
    },
    resetAll(state) {
      state.initialState.loading = false;
      state.initialState.fetchEntitiesSuccess = false;
      state.initialState.fetchEntitySuccess = false;
      state.initialState.updateEntitySuccess = false;
      state.initialState.deleteEntitySuccess = false;
      state.initialState.errorMessage = null;
    },
    resetEntity(state) {
      state.initialState.updateEntitySuccess = false;
      state.initialState.errorMessage = null;
      state.initialState.deleteEntitySuccess = false;
    },
    resetMessage(state) {
      state.initialState.MessageError = '';
      state.initialState.upStatusSuccess = false;
      state.initialState.updateEntitySuccess = false;
      state.initialState.errorMessage = null;
      state.initialState.deleteEntitySuccess = false;
      state.initialState.typeSuccess = '';
    },
    setDummy(state, { payload }: PayloadAction<IUser[]>) {
      accountAdapter.setAll(state, payload);
      state.initialState.totalItems = Number(payload.length);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getEntities.fulfilled.type,
      (state, { payload }: PayloadAction<AxiosResponse<IResponse<IListDataResponse<IUser>>>>) => {
        accountAdapter.setAll(state, payload.data.data.records);
        state.initialState.totalItems = Number(payload.data.data.total);
        state.initialState.totalPages = Number(payload.data.data.pages);
        state.initialState.fetchEntitiesSuccess = true;
        state.initialState.loading = false;
      }
    );
    builder.addCase(getEntities.rejected.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.fetchEntitiesSuccess = false;
    });

    builder.addCase(getEntity.fulfilled.type, (state, { payload }: PayloadAction<IUser>) => {
      accountAdapter.upsertOne(state, payload);
      state.initialState.fetchEntitySuccess = true;
      state.initialState.loading = false;
    });
    builder.addCase(getEntity.rejected.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.fetchEntitySuccess = false;
    });
    builder.addCase(updateEntity.fulfilled.type, (state, { payload }: PayloadAction<IUser>) => {
      accountAdapter.updateOne(state, { id: payload.id, changes: payload });
      state.initialState.updateEntitySuccess = true;
      state.initialState.loading = false;
    });
    builder.addCase(updateEntity.rejected.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.updateEntitySuccess = false;
    });
    builder.addCase(createEntity.fulfilled.type, (state, { payload }: PayloadAction<IUser>) => {
      accountAdapter.addOne(state, payload);
      state.initialState.updateEntitySuccess = true;
      state.initialState.loading = false;
    });
    builder.addCase(createEntity.rejected.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.updateEntitySuccess = false;
    });
    builder.addCase(removeEntity.fulfilled.type, (state, { payload }: PayloadAction<string>) => {
      accountAdapter.removeOne(state, payload);
      state.initialState.totalItems -= 1;
      state.initialState.deleteEntitySuccess = true;
      state.initialState.loading = false;
    });
    builder.addCase(removeEntity.rejected.type, (state, { payload }: PayloadAction<any>) => {
      state.initialState.errorMessage = payload?.message;
      state.initialState.loading = false;
      state.initialState.deleteEntitySuccess = false;
    });
  },
});

export const { fetching, resetAll, resetEntity, setFilterState, setDummy, resetMessage } = actions;
export default reducer;

export const accountSelectors = accountAdapter.getSelectors<RootState>((state) => state.account);

const { selectById } = accountAdapter.getSelectors();
const getUserState = (rootState: RootState) => rootState.account;

export const selectEntityById = (id: string) => {
  return createSelector(getUserState, (state) => selectById(state, id));
};
