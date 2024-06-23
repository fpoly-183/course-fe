import { Column } from 'primeng/column';
import React from 'react';
export type ColumnProps = {
  children?: ColumnProps[];
  filter?: boolean | ((values: any[], onChange: (value: any) => void) => React.ReactNode);
  group?: string;
  field: string;
  header?: string;
  sortable?: boolean;
  style?: any;
  headerStyle?: any;
};

export type Group = {
  children?: Group[] | Column[];
  colspan?: number;
  deep?: number;
  group?: string;
  key: string;
  label?: string;
  style?: any;
  props?: any;
};
export type Item = {
  [key: string]: number | string | any;
  _cellProps?: any;
  _props?: any;
  _selected?: boolean;
};
export type ScopedColumns = {
  [key: string]: any;
  details?: (a: Item, b: number) => JSX.Element | null;
};
