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
        <NavLink to="/job" activeClassName="active">
          Job
        </NavLink>
        <NavLink to="/random" activeClassName="active">
          Random
        </NavLink>
        <NavLink to="/users" activeClassName="active">
          User
        </NavLink>
        <NavLink to="/model" activeClassName="active">
          Model
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
