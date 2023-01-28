import React from "react";
import Navbar from "./Navbar";
import HomeNavbar from "./HomeNavbar";

const Layout = ({ children }) => {
    return (
        <div>
            {/* <Navbar /> */}
            <HomeNavbar />
            {children}
        </div>
    );
};

export default Layout;
