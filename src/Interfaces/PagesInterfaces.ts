export interface CustomLayoutProps {
  children: React.ReactNode;
}

export interface LoginType {
  email?: string;
  password?: string;
  remember?: string;
};

export interface RegistrationInterface {
  fullname: string;
  email?: string;
  password?: string;
  phoneno: string;
  role: number;
  gps_id: string;
};

export interface SchoolObject {
  address: {
    __id: string;
    street: string;
    landmark: string;
    district: string;
    state: string;
    pincode: number;
    country: string;
  };
  status?: number;
  _id: string;
  name: string;
  email: string;
  phoneno: string;
}

export interface HOCProps {
  children: React.ReactNode; // Specify that children can be any React node
}
