import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { ToastOptions, toast } from 'react-toastify';
import { FaXmark } from 'react-icons/fa6';
import { IoNotifications } from 'react-icons/io5';
const centerToast: ToastOptions = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const bottomRightToast: ToastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

interface IProp {
  message: string;
}

interface INotify {
  title: string;
  body: string;
}

const Success = (prop: IProp) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
    <FaCheckCircle className="text-success text-2xl" />
    <div style={{ color: '#333333', marginLeft: '5px' }}>{prop.message}</div>
  </div>
);

const Error = (prop: IProp) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
    <FaXmark className="text-danger text-2xl" color="#DC3545" />
    <div style={{ color: '#DC3545', marginLeft: '5px' }}>{prop.message}</div>
  </div>
);

const Info = (prop: IProp) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
    <FaInfoCircle className="text-primary text-2xl" color="#007bff" />
    <div style={{ color: '#333333', marginLeft: '5px' }}>{prop.message}</div>
  </div>
);

const Notify = (prop: INotify) => (
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
    <IoNotifications className="text-success mr-1 mt-1 text-2xl" color="#007bff" />
    <div style={{ color: '#333333 ', marginLeft: '5px' }}>
      <b>{prop.title}</b>
      <br />
      {prop.body}
    </div>
  </div>
);

export const ToastSuccess = (message: string) => {
  if (message) {
    toast(<Success message={message} />, centerToast);
  }
};

export const ToastError = (message: string) => {
  if (message) {
    toast(<Error message={message} />, centerToast);
  }
};

export const ToastInfo = (message: string) => {
  if (message) {
    toast(<Info message={message} />, centerToast);
  }
};

export const ToastNotification = (title: string, body: string) => {
  if (title && body) {
    toast(<Notify title={title} body={body} />, bottomRightToast);
  }
};
