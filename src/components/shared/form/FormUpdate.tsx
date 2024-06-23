import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { Button } from 'primereact/button';
import { useNavigation, Navigate } from 'react-router-dom';
import { useRouter } from '@/shared/utils/hooks/useRouter';

export interface ExtraButton {
  label: string;
  visible?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
}

interface Props {
  title: string;
  children: React.JSX.Element;
  submitTitle?: string;
  onSubmit: () => void;
  isLoading?: boolean;
  isDetail?: boolean;
  footerButtons?: ExtraButton[];
  headerButtons?: ExtraButton[];
}

const FormUpdate = (props: Props) => {
  const { title, children, submitTitle, onSubmit, isLoading, headerButtons, footerButtons, isDetail } = props;

  const { navigate } = useRouter();

  return isLoading ? (
    <div className="form-update-wrapper flex align-items-center justify-content-center">
      <AiOutlineLoading3Quarters className="full-page-loading-icon text-black" />
    </div>
  ) : (
    <div className="form-update-wrapper flex flex-col row-gap-4">
      <div className="flex flex-row align-items-center justify-content-between">
        <span className="text-display-semibold-xs">{title}</span>
        {headerButtons?.map(
          (item, index) =>
            (item.visible ?? true) && (
              <Button
                disabled={item.isDisabled}
                key={index}
                className="button-primary form-update-button text-medium-md text-white"
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            )
        )}
      </div>
      <div className="form-update-container flex flex-1 flex-col bg-white row-gap-4">{children}</div>
      <div className="flex flex-row flex-wrap gap-3 align-items-center justify-content-end pb-5">
        <Button
          className="button-outlined form-update-button text-medium-md"
          onClick={() => {
            window.history.back();
          }}
        >
          Quay lại
        </Button>
        {onSubmit && !isDetail && (
          <Button
            className="button-primary form-update-button text-medium-md text-white"
            onClick={() => onSubmit && onSubmit()}
          >
            {submitTitle ?? 'Lưu'}
          </Button>
        )}
        {footerButtons?.map(
          (item, index) =>
            (item.visible ?? true) && (
              <Button
                disabled={item.isDisabled}
                key={index}
                className="button-primary form-update-button text-medium-md text-white"
                onClick={item.onClick}
              >
                {item.label}
              </Button>
            )
        )}
      </div>
    </div>
  );
};

export default FormUpdate;
