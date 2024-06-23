import React, { ForwardedRef, forwardRef, useMemo, lazy } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import { ISelectOption } from '@/shared/shared-interfaces';
import Select from 'react-select';
interface Props {
  id: string;
  label: string;
  value?: ISelectOption | ISelectOption[] | null | undefined;
  placeholder?: string;
  options?: ISelectOption[];
  onChange?: (value?: ISelectOption | ISelectOption[]) => void;
  direction?: 'vertical' | 'horizontal';
  disabled?: boolean;
  isRequired?: boolean;
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
  isMulti?: boolean;
  isClearable?: boolean;
}

const FormSelect = forwardRef(function FormInput(props: Props, ref?: ForwardedRef<any>) {
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
    isMulti,
    isClearable = true,
  } = props;

  const customStyles = {
    container: (styles: any) => ({
      ...styles,
      width: '100%',
    }),
    menu: (styles: any) => ({
      ...styles,
      zIndex: 99999,
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
      zIndex: 99,
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
      maxHeight: '200px',
      // zIndex: 999
    }),
    option: (styles: any) => ({
      ...styles,
    }),
  };

  const Label = () => (
    <label className={`text-medium-md form-label ${isRequired ? 'required-start' : ''}`}>{label}</label>
  );

  const SelectOption = useMemo(
    () => (
      <Select
        value={value}
        isMulti={isMulti}
        styles={customStyles}
        placeholder={placeholder ?? 'Chọn...'}
        options={options}
        isClearable={isClearable}
        className="b-w-1"
        onChange={(data: any) => {
          onChange && onChange(data);
        }}
        isDisabled={disabled}
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

export default FormSelect;
