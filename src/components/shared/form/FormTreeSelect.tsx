import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { TreeSelect, TreeSelectChangeEvent, TreeSelectSelectionKeysType } from 'primereact/treeselect';
import { TreeNode } from 'primereact/treenode';

export interface ITreeSelectOption {
  key: string;
  label: string;
  children: ITreeSelectOption[];
}

interface Props {
  id: string;
  label: string;
  value?: string | TreeSelectSelectionKeysType | TreeSelectSelectionKeysType[] | null;
  placeholder?: string;
  options?: ITreeSelectOption[] | TreeNode[];
  onChange?: (value: TreeSelectChangeEvent) => void;
  direction?: 'vertical' | 'horizontal';
  disabled?: boolean;
  isRequired?: boolean;
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
  showClear?: boolean;
  classNames?: string;
  filter?: boolean;
  selectionMode?: 'single' | 'multiple' | 'checkbox';
  display?: 'chip' | 'comma';
  name?: string;
  className?: string;
}

const FormTreeSelect = forwardRef(function FormTreeSelect(props: Props, ref?: ForwardedRef<any>) {
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
    display = 'chip',
    showClear,
    classNames,
    filter,
    selectionMode,
    name,
    className,
  } = props;

  const Label = () => (
    <label className={`text-medium-md form-label ${isRequired ? 'required-start' : ''}`}>{label}</label>
  );

  const Select = useMemo(
    () => (
      <TreeSelect
        name={name}
        filter={filter}
        selectionMode={selectionMode}
        className={`common-tree-select inputBorder w-full text-md b-w-1 ${classNames ?? ''}`}
        panelClassName="common-tree-select-panel"
        value={value}
        showClear={showClear}
        placeholder={placeholder ?? 'Chọn...'}
        options={options}
        display={display}
        onChange={(data: any) => {
          onChange && onChange(data);
        }}
        disabled={disabled}
      />
    ),
    [classNames, disabled, display, filter, onChange, options, placeholder, selectionMode, showClear, value]
  );

  const Error = () => (
    <>
      {errors && !!errors[id] && touched && touched[id] && (
        <div className={`text-red-500 ${errors[id] && touched[id] ? 'block' : 'hidden'}`}>{`${errors[id]}`}</div>
      )}
    </>
  );
  return direction === 'vertical' ? (
    <div ref={ref} className={`${className ? className : 'flex flex-col align-items-start '} w-full `}>
      <Label />
      {Select}
      <Error />
    </div>
  ) : (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/4">
        <Label />
      </div>
      <div className="w-full md:w-3/4">
        {Select}
        <Error />
      </div>
    </div>
  );
});

export default FormTreeSelect;
