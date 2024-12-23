// Define MenuItemType
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterPage from "./pages/Registration";
import Schools from "./pages/Schools/Schools";
import Users from "./pages/Users";
import Buses from "./pages/Buses";
import Students from "./pages/Students";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faDeleteLeft,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
type RoutesType = {
  name: string;
  ref: string;
  component: React.ComponentType<any>;
  icon?: React.ReactNode;
  title?: string;
};
const routes: RoutesType[] = [
  {
    name: "Dashboard",
    ref: "/",
    component: Home,
    // icon: <FontAwesomeIcon icon={faDeleteLeft} />,
    title: "VidyaMargam",
  },
  {
    name: "Schools",
    ref: "/schools",
    component: Schools,
    // icon: <FontAwesomeIcon icon={faDeleteLeft} />,
    title: "Schools",
  },
  {
    name: "Buses",
    ref: "/buses",
    component: Buses,
    // icon: <FontAwesomeIcon icon={faDeleteLeft} />,
    title: "Buses List",
  },
  {
    name: "Parents",
    ref: "/parents",
    component: Users,
    // icon: <FontAwesomeIcon icon={faDeleteLeft} />,
    title: "Customers",
  },
  {
    name: "Students",
    ref: "/students",
    component: Students,
    // icon: <FontAwesomeIcon icon={faDeleteLeft} />,
    title: "Students",
  },
  {
    name: "Login",
    ref: "/login",
    component: Login,
    // icon: <FontAwesomeIcon icon={faDeleteLeft} />,
    title: "Login",
  },
  {
    name: "Signup",
    ref: "/signup",
    component: RegisterPage,
    // icon: <FontAwesomeIcon icon={faDeleteLeft} />,
    title: "Signup",
  },
];
export default routes;
