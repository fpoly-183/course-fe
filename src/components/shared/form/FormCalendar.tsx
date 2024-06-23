import { FormikErrors, FormikTouched } from 'formik';
import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { Calendar } from 'primereact/calendar';
import { addLocale } from 'primereact/api';

interface Props {
  id: string;
  label: string;
  val?: Date | string | null;
  value?: Date;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  onChange?: (value: Date) => void;
  disabled?: boolean;
  isRequired?: boolean;
  errors?: FormikErrors<any>;
  touched?: FormikTouched<any>;
  showIcon?: boolean;
  className?: string;
  direction?: 'vertical' | 'horizontal';
  size?: number;
  selectionMode?: 'single' | 'range' | 'multiple';
}

const FormCalendar = forwardRef(function FormCalendar(props: Props, ref?: ForwardedRef<any>) {
  const {
    id,
    label,
    value,
    minDate,
    maxDate,
    placeholder,
    onChange,
    disabled,
    isRequired,
    errors,
    touched,
    showIcon = false,
    className,
    direction = 'vertical',
    size = 4,
  } = props;

  addLocale('vi', {
    firstDayOfWeek: 1,
    dayNames: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    monthNames: [
      'Tháng 1 ',
      'Tháng 2 ',
      'Tháng 3 ',
      'Tháng 4 ',
      'Tháng 5 ',
      'Tháng 6 ',
      'Tháng 7 ',
      'Tháng 8 ',
      'Tháng 9 ',
      'Tháng 10 ',
      'Tháng 11 ',
      'Tháng 12 ',
    ],
    monthNamesShort: [
      'Tháng 1 ',
      'Tháng 2 ',
      'Tháng 3 ',
      'Tháng 4 ',
      'Tháng 5 ',
      'Tháng 6 ',
      'Tháng 7 ',
      'Tháng 8 ',
      'Tháng 9 ',
      'Tháng 10 ',
      'Tháng 11 ',
      'Tháng 12 ',
    ],
    today: 'Hôm nay',
    clear: 'Đóng',
  });

  const Label = () => (
    <label className={`text-medium-md form-label ${isRequired ? 'required-start' : ''}`}>{label}</label>
  );

  const CalendarElement = useMemo(
    () => (
      <Calendar
        id={id}
        name={id}
        className={`common-calendar w-full `}
        panelClassName="common-calendar-panel"
        dateFormat="dd/mm/yy"
        locale="vi"
        value={value}
        minDate={minDate ?? new Date()}
        maxDate={maxDate}
        placeholder={placeholder ?? 'Chọn ngày...'}
        showIcon={showIcon}
        onChange={(e) => {
          if (e.value) {
            onChange && onChange(e.value);
          }
        }}
        disabled={disabled}
      />
    ),
    [id, value, minDate, maxDate, placeholder, showIcon, onChange, disabled]
  );

  const Error = () => (
    <>
      {errors && !!errors[id] && touched && touched[id] && (
        <div className={`text-red-500 ${errors[id] && touched[id] ? 'block' : 'hidden'}`}>{`${errors[id]}`}</div>
      )}
    </>
  );

  return direction === 'vertical' ? (
    <div className={`w-full flex flex-col align-items-start ${className}`} ref={ref}>
      <Label />
      {CalendarElement}
      <Error />
    </div>
  ) : (
    <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="col-span-1 lg:col-span-1">
        <Label />
      </div>
      <div className="col-span-1 lg:col-span-2">
        {CalendarElement}
        <Error />
      </div>
    </div>
  );
});

export default FormCalendar;
