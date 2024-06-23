import { Toast } from 'primereact/toast';
import { createContext, useRef } from 'react';

interface InfoMessage {
  severity?: string;
  summary?: string;
  detail?: string;
  life?: number;
}
interface ToastContextInterface {
  showSuccessMessage: Function;
  showErrorMessage: Function;
  showInfoMessage: Function;
  showWarningMessage: Function;
}

export const ToastContext = createContext({} as ToastContextInterface);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const toastRef = useRef<any>(null);
  const lifes = 5000;
  const value: ToastContextInterface = {
    showSuccessMessage: (detail: InfoMessage, life = lifes) => {
      toastRef?.current?.show({ severity: 'success', summary: 'Thành công', detail, life });
    },
    showErrorMessage: (detail: InfoMessage, life = lifes) => {
      toastRef?.current?.show({ severity: 'error', summary: 'Lỗi', detail, life });
    },
    showInfoMessage: (detail: InfoMessage, life = lifes) => {
      toastRef?.current?.show({ severity: 'info', summary: 'Thông báo', detail, life });
    },
    showWarningMessage: (detail: InfoMessage, life = lifes) => {
      toastRef?.current?.show({ severity: 'warn', summary: 'Cảnh báo', detail, life });
    },
  };

  return (
    <>
      <Toast ref={toastRef} />
      <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    </>
  );
}
