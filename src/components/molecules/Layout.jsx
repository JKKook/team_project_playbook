import React from 'react';
import Navbar from './Navbar';
import Loading from '../atoms/Loading';

const Layout = ({ children }) => {
  return (
    <div>
      {/* <Loading /> */}
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
