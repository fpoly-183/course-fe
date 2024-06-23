import { Dialog, DialogBreakpoints } from 'primereact/dialog';
import React from 'react';

interface IProps {
  header?: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  children: React.JSX.Element;
  className?: string;
  breakpoints?: DialogBreakpoints;
  footerContent?: React.ReactNode;
}

const UpdateDialog = (props: IProps) => {
  const {
    header,
    visible,
    setVisible,
    children,
    className,
    footerContent,
    breakpoints = { '576px': 'calc(100vw - 44px)' },
  } = props;
  return (
    <Dialog
      className={`common-dialog-wrapper  ${className}`}
      headerClassName="text-semibold-md px-4 py-3"
      contentClassName="px-4 py-3"
      header={header}
      breakpoints={breakpoints}
      footer={footerContent}
      visible={visible}
      onHide={() => setVisible(false)}
      draggable={false}
      resizable={false}
      dismissableMask={true}
      blockScroll={true}
    >
      {children}
    </Dialog>
  );
};

export default UpdateDialog;
