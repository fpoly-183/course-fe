import { Permission } from '../enumeration/permission';
import { IBaseModel } from '../shared-interfaces';

export interface INewMenu {
  name: string;
  code: string;
  alias: string;
  category: number;
  source: string; // icon
  parentId: string;
  path: string;
  sort: number;
  action: number;
  permission: Permission;
  menuType: any;
}
interface IMenuMeta {
  enName: string;
  icon: any;
  isAffix: boolean;
  isHide: boolean;
  isIframe: boolean;
  isKeepAlive: boolean;
  isLink: string;
  title: string;
}
export interface IMenu extends IBaseModel, INewMenu {
  id: string;
  children?: IMenu[];
  label?: string;
  meta: IMenuMeta;
}
