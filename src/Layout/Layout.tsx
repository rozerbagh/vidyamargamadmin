import React from 'react';
// import * as theme from '../theme/theme'
import Sidebar from './Sidebar';
import Header from './Header';
import { CustomLayoutProps } from "../Interfaces/PagesInterfaces"

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <>
      <Header/>
      <Sidebar/>
      <main>{children}</main>
      <footer></footer>
    </>
  );
};

export default CustomLayout;