import { Permission } from '../enumeration/permission';
import { Status } from '../enumeration/status';
import { IBaseModel } from '../shared-interfaces';

export type TAuthorities = Permission 

export interface INewUser {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword?: string;
  status: Status
}

export interface IUser extends INewUser, IBaseModel {
  id: string;
}
