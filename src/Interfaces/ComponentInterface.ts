export interface ModalLayoutProps {
  title: string;
  open?: boolean;
  confirmLoading?: boolean;
  handleOk?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancel?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  okText?: string;
  cancelText?: string;
}

export interface InputElementProps {
  type: string;
  handleChange: (event: React.MouseEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.MouseEvent<HTMLInputElement>) => void;
  error: boolean;
  value: any;
  name: string;
  label: string;
  placeholder?: string;
}
