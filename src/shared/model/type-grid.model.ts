import { Column } from 'primereact/column';
import { ReactNode } from 'react';
import { ThHTMLAttributes } from 'react';
export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /**
   * A string of all className you want applied to the component.
   */
  className?: string;
  /**
   * Sets the color context of the component to one of CoreUI’s themed colors.
   *
   * @type 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | string
   */
  color?: string;
}
// export declare const CTableHeaderCell: React.ForwardRefExoticComponent<TableHeaderCellProps & React.RefAttributes<HTMLTableCellElement>>;
export type TColumn = {
  children?: Column[];
  filter?: boolean | ((values: any[], onChange: (value: any) => void) => ReactNode);
  group?: string;
  key: string;
  label?: string;
  sortable?: boolean;
  _style?: any;
  // _props?: TableProps;
  _props?: TableHeaderCellProps;
};
