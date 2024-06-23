import { InputText } from 'primereact/inputtext';
import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { FormikErrors, FormikTouched } from 'formik';

interface Props {
  id: string;
  label: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  isRequired?: boolean;
  direction?: 'vertical' | 'horizontal';
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
  onBlur?: (e: any) => void;
  readOnly?: boolean;
}

const FormInput = forwardRef(function FormInput(props: Props, ref?: ForwardedRef<any>) {
  const {
    id,
    label,
    value,
    placeholder,
    onChange,
    disabled,
    isRequired,
    direction = 'vertical',
    errors,
    touched,
    defaultValue,
    onBlur,
    readOnly,
  } = props;

  const Label = () => (
    <label className={`text-medium-md form-label ${isRequired ? 'required-start' : ''}`}>{label}</label>
  );

  const Input = useMemo(
    () => (
      <InputText
        id={id}
        value={value}
        defaultValue={defaultValue}
        className="common-input w-full text-md b-w-1"
        placeholder={placeholder ?? 'Nhập...'}
        disabled={disabled}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        readOnly={readOnly}
        onBlur={onBlur}
      />
    ),
    [disabled, id, onChange, placeholder, value]
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
      {Input}
      <Error />
    </div>
  ) : (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="col-span-1 lg:col-span-1 ">
        <Label />
      </div>
      <div className="col-span-1 lg:col-span-2">
        {Input}
        <Error />
      </div>
    </div>
  );
});

export default FormInput;
