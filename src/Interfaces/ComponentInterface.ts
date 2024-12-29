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

interface UserSchoolsInterface {
  address: {
    _id: string;
    street: string;
    landmark: string;
    district: string;
    state: string;
    pincode: number;
    country: string;
  };
  status: number;
  email: string;
  phoneno: string;
  users: any[];
  _id: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserBusesInterface {
  _id: string;
  schoolId: string;
  busname: string;
  numberplate: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserStudentsInterface {
  _id: string;
  schoolId: string;
  busId: string;
  userId: string;
  fullname: string;
  class: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserDetailsInterface {
  fullname: string;
  email: string;
  phoneno: string;
  role: number;
  gps_id: string;
  students: UserStudentsInterface[];
  buses: UserBusesInterface[];
  schools: UserSchoolsInterface[];
  address: any;
  status: number;
  image: string;
  otp: string | null;
  subscribed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ParentStudentsTableProps {
  _id: string;
  schoolId: string;
  busId: string;
  userId: string;
  fullname: string;
  class: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  schoolDetails: UserSchoolsInterface | undefined;
  busDetails: UserBusesInterface | undefined;
}
