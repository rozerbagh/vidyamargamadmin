import React from 'react';
// import * as theme from '../theme/theme'
// import Sidebar from './Sidebar/Sidebar';
// import { Grid } from '@mantine/core';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { CustomLayoutProps } from "../Interfaces/PagesInterfaces"
import { NavbarSimpleColored } from './Sidebar/Navbar';
const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <aside><NavbarSimpleColored /></aside>
      <header><Header /></header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default CustomLayout;