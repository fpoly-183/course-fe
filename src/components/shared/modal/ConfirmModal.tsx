// import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro';
// import { Dispatch, SetStateAction } from 'react';

// interface IConfirmModalProps {
//   title: string;
//   content: React.ReactNode;
//   onAbort?: () => void;
//   onConfirm?: () => void;
//   visible: boolean;
//   setVisible: Dispatch<SetStateAction<boolean>>;
// }

// const ConfirmModal = (props: IConfirmModalProps) => {
//   const { title, content, onAbort, onConfirm, visible, setVisible } = props;

//   const onClose = () => {
//     setVisible(false);
//   };

//   return (
//     <CModal visible={visible} onClose={onClose}>
//       <CModalHeader>
//         <CModalTitle>{title}</CModalTitle>
//       </CModalHeader>
//       <CModalBody>{content}</CModalBody>
//       <CModalFooter>
//         <CButton
//           onClick={() => {
//             onClose();
//             onAbort && onAbort();
//           }}
//           color="dark"
//           variant="outline"
//         >
//           Hủy
//         </CButton>
//         <CButton
//           onClick={() => {
//             onClose();
//             onConfirm && onConfirm();
//           }}
//           color="danger"
//           className="text-white"
//         >
//           Đồng ý
//         </CButton>
//       </CModalFooter>
//     </CModal>
//   );
// };

// export default ConfirmModal;
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Dispatch, SetStateAction } from 'react';

interface IConfirmModalProps {
  title: string;
  content: React.ReactNode;
  onAbort?: () => void;
  onConfirm?: () => void;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<any>>;
}

const ConfirmModal = (props: IConfirmModalProps) => {
  const { title, content, onAbort, onConfirm, visible, setVisible } = props;

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Dialog
      visible={visible}
      onHide={onClose}
      breakpoints={{ '960px': '75vw', '640px': '100vw' }}
      style={{ width: '30vw' }}
    >
      <h3>{title}</h3>
      <div>{content}</div>
      <div className="flex justify-content-end">
        <Button
          label="Cancel"
          onClick={() => {
            onClose();
            onAbort && onAbort();
          }}
          className="p-button-text p-button-gray"
        />
        <Button
          label="Confirm"
          onClick={() => {
            onClose();
            onConfirm && onConfirm();
          }}
          className="p-button-text p-button-red"
        />
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
