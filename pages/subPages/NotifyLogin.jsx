import React from 'react';
import Navbar from '../../src/components/molecules/Navbar';
/** @jsxImportSource @emotion/react */

const NotifyLogin = ({ loggedInUser, handleLogout }) => {
  return (
    <>
      {loggedInUser && (
        <Navbar loggedInUser={loggedInUser} handleLogout={handleLogout} />
      )}
    </>
  );
};

export default NotifyLogin;
