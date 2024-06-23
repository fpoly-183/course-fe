import { ButtonAlias } from '@/shared/enumeration/button-alias';
import { Permission } from '@/shared/enumeration/permission';
import { SearchType } from '@/shared/enumeration/search-type';
import { Status } from '@/shared/enumeration/status';
import { ScopedColumns } from '@/shared/model/type';
import { TColumn } from '@/shared/model/type-grid.model';
import { IBaseModel, IInitialState, IParams, ISelectOption } from '@/shared/shared-interfaces';
import { FormikState } from 'formik';
import { TreeSelectChangeEvent } from 'primereact/treeselect';
import { Dispatch, SetStateAction } from 'react';

export interface ISelectValue {
  value: string | Status;
  label: string;
  checked?: boolean;
}

export interface ISearchItem {
  id: string;
  type: string;
  title: string;
  name?: string;
  name1?: string;
  name2?: string;
  placeHolder?: string;
  placeHolder1?: string;
  placeHolder2?: string;
  singleInput: boolean;
  selectValue?: ISelectValue[];
  onInputChange?: (value: string) => void;
  formText?: string;
  isHidden?: boolean;
  options?: { label: string; value: string }[];
  childItems?: string[]; // child items value will reset when input change
  parentItem?: string; // options will be null when parent item has no value
  valueDate?: string;
  defaultOption?: { value: string; label: string };
}

export interface ISearchContent {
  searchContent: ISearchItem[];
}

export interface ISearchContainer {
  listComponent?: Array<any>;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  resetForm: (nextState?: Partial<FormikState<any>>) => void;
}
export interface IComponentExchange {
  initialState: any;
  textType: Array<ISearchContent>;
  values: any;
  resetForm: (nextState?: Partial<FormikState<any>>) => void;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
  handleChange(e: React.ChangeEvent<any>): void;
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
}
export interface IUpdateModalProps<T> {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  setModalAuthorized: Dispatch<SetStateAction<boolean>>;
  setModalHistory: Dispatch<SetStateAction<boolean>>;
  setModalAssignment: Dispatch<SetStateAction<boolean>>;
  setModalReply: Dispatch<SetStateAction<boolean>>;
  item?: T & { index: number };
  isDetail: boolean;
  isAuthorized: boolean;
  isHistory?: boolean;
  isAssignment?: boolean;
  isReply?: boolean;
  selectStyle?: string;
  setItem?: Dispatch<SetStateAction<any>>;
}

export interface IGridProps {
  permission?: string;
  loading?: boolean;
  renderSearchForm?: React.ReactNode;
  renderLeftButton?: React.ReactNode;
  renderRightButton?: React.ReactNode;
  renderActionButton?: (item: any) => JSX.Element;
  filterState: any;
  columns: TColumn[];
  items: Array<any>;
  scopedColumns: ScopedColumns;
  initialState: any;
  setFilterState: any;
  tableTree?: boolean;
  tableTextSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  getEntities: Function;
  removeEntity: Function;
  resetMessage: Function;
  resetEntity: Function;
  onRowClick?: (item: any) => void;
  UpdateModal?: (props: IUpdateModalProps<any>) => JSX.Element;
  searchTypes?: ISearchContent[];
  idKeyTable: string;
  childrenKeyTable?: string;
  selectStyle?: string;
  checkBox?: boolean;
  buttons?: any[];
  className?: string;
  searchFields?: string[];
  labelChildren?: string;
  titleKey?: string;
  user?: any;
  type?: string;
}
export interface ISearchItemProps {
  id: string;
  title: string;
  placeholder?: string;
  value?: string;
  type: SearchType;
  options?: ISelectOption[];
  optionTree?: any[];
  onChange?: (value: string) => void;
  childItems?: string[]; // child items value will reset when input change
  parentItem?: string; // options will be null when parent item has no value
  onChangeTree?: (value: TreeSelectChangeEvent) => void;
  idSearch?: string;
  disable?: boolean;
  otherType?: boolean;
  className?: string;
  size?: number;
  sizeMd?: number;
  noValue?: boolean;
  showIcon?: boolean;
  valueDefault?: any;
  isClearable?: boolean;
  minDate?: string;
}

export interface ISearchContainerProps<T extends IParams> {
  filterState: T;
  setFilterState: Function;
  searchContent?: ISearchItemProps[];
  isShowSearch?: boolean;
}

export interface IActionButton {
  title: string;
  position: any;
  alias: ButtonAlias;
  permission: Permission;
  onClick?: (data: any) => void;
  icon?: any;
}

export interface ITableColumn {
  key: string;
  label: string;
  headerClassName?: string;
  headerStyle?: React.CSSProperties;
  frozen?: boolean;
  expander?: boolean;
  rowspan?: number;
}

export interface ITableContainerProps<T extends IBaseModel> {
  tableData: T[];
  columns: ITableColumn[];
  scopedColumns: ScopedColumns;
  actionButtons: IActionButton[];
  isMultipleMode?: boolean;
  tableTree?: boolean;
  type?: string;
  idKeyTable: string;
  showChildren?: boolean;
  checkbox?: boolean;
  rowGroupMode?: string;
  groupRowsBy?: any;
  visibleIndex?: boolean; // hiện cột số thứ tự
  visibleAction?: boolean;
  className?: string;
  rowspan?: number;
}

export interface ITableProps<T extends IParams, R extends IInitialState, S extends IBaseModel>
  extends ITableContainerProps<S> {
  filterState: T;
  setFilterState: Function;
  initialState: R;
  onClickActionButton: (action: IActionButton, item: S | null) => void;
  selectionItems: any[];
  setSelectionItems: Dispatch<SetStateAction<any[]>>;
  isLoading: boolean;
  selectStyle?: string;
  selectStyleAll?: (select: string) => void;
  isPaginatorHidden?: boolean;
  selectionMode?: string;
  minWidthTable?: string;
  dataKey?: string;
  isSort?: boolean;
  swapSort?: Function;
}
