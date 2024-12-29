// Define MenuItemType
import React from "react";
import Home from "./pages/Home";
import Schools from "./pages/Schools/Schools";
import Users from "./pages/Users/Users";
import Buses from "./pages/Buses";
import Students from "./pages/Students";
import { IconHome, IconSchool, IconBus, IconUser } from "@tabler/icons-react";
import UsersDetails from "./pages/Users/UsersDetails";
type RoutesType = {
  name: string;
  ref: string;
  segment?: string;
  component: React.ComponentType<any>;
  icon?: any;
  title?: string;
  flag?: boolean;
};
const routes: RoutesType[] = [
  {
    name: "Dashboard",
    ref: "/",
    segment: "dashboard",
    component: Home,
    icon: IconHome,
    title: "VidyaMargam",
    flag: true,
  },
  {
    name: "Schools",
    ref: "/schools",
    segment: "schools",
    component: Schools,
    icon: IconSchool,
    title: "Schools",
    flag: true,
  },
  {
    name: "Buses",
    ref: "/buses/:schoolId",
    segment: "buses",
    component: Buses,
    icon: IconBus,
    title: "Buses List",
    flag: false,
  },
  {
    name: "Parents",
    ref: "/parents",
    segment: "parents",
    component: Users,
    icon: IconUser,
    title: "Customers",
    flag: true,
  },
  {
    name: "Users",
    ref: "/users/:id",
    segment: "users",
    component: UsersDetails,
    icon: IconUser,
    title: "Users",
    flag: false,
  },
  {
    name: "Students",
    ref: "/students/:fullname/:parentId",
    segment: "students",
    component: Students,
    icon: IconUser,
    title: "Students",
    flag: false,
  },
];
export default routes;
