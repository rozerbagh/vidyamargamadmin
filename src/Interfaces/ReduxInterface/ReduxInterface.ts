export interface CommonStateProps {}

export interface SchoolStateProps {
  schools: object;
}

export interface UserInterface {
  key: string;
  fullname: string;
  phone: string;
  email: string;
  address: string;
  status: number;
  role: number;
}

export interface AuthInterface {
  userId: string;
  email: string;
  userName: string;
  phoneno: string;
  role: number;
  subscribed: false;
  token: string;
  expireTokenTime: number;
  isSchoolUser: boolean;
  schoolId: string;
}
export interface UserStateProps {
  [key: string]: UserInterface[];
}
