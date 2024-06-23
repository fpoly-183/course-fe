import { Status } from './enumeration/status';

export interface IInitialState {
  totalItems: number;
  typeSuccess?: string;
  MessageOptionSuccess?: string;
  MessageError?: string;
  MessageStatusfeedback?: boolean;
  MessageCreateSuccess?: boolean;
  MessageDeleteSuccess?: boolean;
  MessageStatusSuccess?: boolean;
  MessageUpdateSuccess?: boolean;
  createEntitySuccess?: boolean;
  fetchEntitiesSuccess: boolean;
  fetchEntitySuccess: boolean;
  updateEntitySuccess: boolean;
  upStatusSuccess?: boolean;
  deleteEntitySuccess: boolean;
  loading: boolean;
  errorMessage: string | null;
  totalElements: number;
  totalPages: number;
  lazyLoading?: boolean;
  selectStyle?: string;
  listSort?: [];
  updateSort?: boolean;
}

export interface IParams {
  current?: number;
  sort?: string;
  key?: string;
  page: number;
  size: number;
  ascs?: string;
  descs?: string;
  searchKey?: string;
  status?: Status;
  type?: string;
  dictType?: string;
  mediaType?: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface IListDataResponse<T> {
  records: T[];
  total: number;
  size: number;
  current: number;
  pages: number;
}

export interface IResponse<T> {
  code: number;
  success: boolean;
  data: T;
  msg: string;
}

export interface IBaseModel {
  createUser: string;
  createTime: string;
  updateUser: string;
  updateTime: string;
}

export interface ISelectOption {
  value: string;
  label: string;
  children?: any[];
}
