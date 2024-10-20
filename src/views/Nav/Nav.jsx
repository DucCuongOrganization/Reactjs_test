// Nav.js
import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="topnav">
      <div className="topnav">
        <NavLink to="/" activeClassName="active" exact>
          Home
        </NavLink>
        <NavLink to="/user" activeClassName="active">
          Users
        </NavLink>
        <NavLink to="/random" activeClassName="active">
          Random
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
