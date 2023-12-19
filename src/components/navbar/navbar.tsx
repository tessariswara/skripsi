import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

import navbarLogo from "../../assets/projectmast.png"

const Navbar: React.FC = () => {
  return (
    <div className="border-container">
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={ navbarLogo } alt="" />
            </div>
            <div className="navbar-nav">
                <ul>
                    <li>
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/log">Logging</Link>
                    </li>
                    <li>
                        <Link to="/devices">Device</Link>
                    </li>
                    <li>
                        <Link to="/tenant">Tenant</Link>
                    </li>
                </ul>
            </div>
            <div className="navbar-user">
                <div className="navbar-user-photo">
                </div>
                <div className="navbar-user-text">
                    <h3>Mang Ujang</h3>
                    <p>Admin</p>
                </div>
            </div>
        </nav>
    </div>
  );
};

export default Navbar;
