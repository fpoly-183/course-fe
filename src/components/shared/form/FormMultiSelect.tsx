import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { TreeNode } from 'primereact/treenode';
import { TreeSelectChangeEvent } from 'primereact/treeselect';
import { MultiSelect } from 'primereact/multiselect';
import { SelectItemOptionsType } from 'primereact/selectitem';
import { ISelectOption } from '@/shared/shared-interfaces';

export interface Props {
  id: string;
  label: string;
  value?: any | undefined;
  placeholder?: string;
  options?: ISelectOption[] | SelectItemOptionsType;
  onChange?: (value?: ISelectOption) => void;
  direction?: 'vertical' | 'horizontal';
  disabled?: boolean;
  isRequired?: boolean;
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
  display?: 'chip' | 'comma' | undefined;
  showClear?: boolean;
  optionsTree?: TreeNode[] | undefined;
  className?: string;
  onChangeTree?: (event: TreeSelectChangeEvent) => void;
  filter?: boolean;
  selectionMode?: 'single' | 'multiple' | 'checkbox' | undefined;
  isMulti?: boolean;
  name?: string;
  maxSelectedLabels?: number;
}

const FormMultiSelect = forwardRef(function FormMultiSelect(props: Props, ref?: ForwardedRef<any>) {
  const {
    id,
    label,
    value,
    placeholder,
    options,
    onChange,
    direction = 'vertical',
    disabled,
    isRequired,
    errors,
    touched,
    name,
    className,
    display,
    maxSelectedLabels,
  } = props;

  const customStyles = {
    container: (styles: any) => ({
      ...styles,
      width: '100%',
    }),
    control: (styles: any) => ({
      ...styles,
      borderRadius: '8px',
      padding: '2px 12px',
      borderColor: disabled ? '#f2f2f2' : '#CDD5DF',
      '&:hover': {
        borderColor: '#1B4AB6',
      },
    }),
    input: (styles: any) => ({
      ...styles,
      padding: '0',
      margin: '0',
    }),
    placeholder: (styles: any) => ({
      ...styles,
      color: '#9AA3B2',
      margin: '0',
    }),
    // singleValue: (...styles: any) => ({
    //   ...styles,
    //   color: '#141414',
    // }),
    indicatorSeparator: (styles: any) => ({
      ...styles,
      display: 'none',
    }),
    valueContainer: (styles: any) => ({
      ...styles,
      padding: '0',
    }),
    menuList: (styles: any) => ({
      ...styles,
      height: '100px',
    }),
  };

  const Label = () => (
    <label className={`text-medium-md form-label ${isRequired ? 'required-start' : ''}`}>{label}</label>
  );

  const SelectOption = useMemo(
    () => (
      <MultiSelect
        id={id}
        name={name}
        value={value}
        onChange={(data: any) => {
          onChange && onChange(data);
        }}
        maxSelectedLabels={maxSelectedLabels}
        options={options}
        filter
        placeholder={placeholder ?? 'Chọn...'}
        className={`${className} b-w-1`}
        display={display}
        disabled={disabled}
      />
    ),
    [customStyles, disabled, onChange, options, placeholder, value]
  );

  const Error = () => (
    <>
      {errors && !!errors[id] && touched && touched[id] && (
        <div className={`text-red-500 ${errors[id] && touched[id] ? 'block' : 'hidden'}`}>{`${errors[id]}`}</div>
      )}
    </>
  );

  return direction === 'vertical' ? (
    <div ref={ref} className="w-full flex flex-col align-items-start">
      <Label />
      {SelectOption}
      <Error />
    </div>
  ) : (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="col-span-1 lg:col-span-1">
        <Label />
      </div>
      <div className="col-span-1 lg:col-span-2">
        {SelectOption}
        <Error />
      </div>
    </div>
  );
});

export default FormMultiSelect;
