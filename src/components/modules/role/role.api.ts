import axios from '@/shared/config/axios-interceptor';
import { INewUser, IUser } from '@/shared/model/user.model';
import { IParams } from '@/shared/shared-interfaces';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { pickBy } from 'lodash';

const prefix = 'users';

export interface IAccountParams extends IParams {}

export const getEntities = createAsyncThunk(
  `get-all-${prefix}`,
  async (field: IParams, thunkAPI: any): Promise<any> => {
    try {
      const params = pickBy(field);
      return await axios.get<IUser[]>(prefix + '/list', { params });
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getEntity = createAsyncThunk(`get-single-${prefix}`, async (id: string, thunkAPI) => {
  try {
    const { data } = await axios.get<IUser>(`${prefix}/detail?id=${id}`);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateEntity = createAsyncThunk(`solid-user/submit`, async (body: IUser, thunkAPI) => {
  try {
    const { data } = await axios.post<IUser>(`${prefix}/submit`, body);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const removeEntity = createAsyncThunk(`${prefix}/remove`, async (id: string, thunkAPI) => {
  try {
    const body = { ids: [id] };
    await axios.post(`${prefix}/remove`, body);
    return id;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const createEntity = createAsyncThunk(`solid-user/register`, async (body: INewUser, thunkAPI) => {
  try {
    const { data } = await axios.post(`${prefix}/register`, body);
    return data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});