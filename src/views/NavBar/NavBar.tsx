import React from "react";
import "./Nav.scss";
import { NavLink } from "react-router-dom";

const NavBar: React.FC = () => {
  return (
    <nav className="topnav">
      <NavLink exact activeClassName="active" to="/">
        Home
      </NavLink>
      <NavLink activeClassName="active" to="/jobs">
        Jobs
      </NavLink>
      <NavLink activeClassName="active" to="/random">
        Random User
      </NavLink>
      <NavLink activeClassName="active" to="/users">
        Users
      </NavLink>
      <NavLink activeClassName="active" to="/model">
        Model Form
      </NavLink>
      <NavLink activeClassName="active" to="/todo-list">
        To Do List
      </NavLink>
    </nav>
  );
};

export default NavBar;
