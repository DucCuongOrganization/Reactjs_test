import { Menu } from "antd";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ReactComponent as CheckCircleIcon } from "../../assets/svg/check-circle.svg";
import { ReactComponent as HomeIcon } from "../../assets/svg/home.svg";
import { useAppDispatch } from "../../store/hooks";
import { resetFilters } from "../../store/slices/todoSlice";
import "./Nav.scss";

const NavBar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // Determine selected key based on current path
  const getSelectedKey = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname === "/todo-list") return "todo";
    return "home";
  };

  const handleMenuClick = (path: string) => {
    dispatch(resetFilters()); // Reset filters when navigating
    history.push(path);
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeIcon className="nav-icon" />,
      label: "Home",
      onClick: () => handleMenuClick("/"),
    },
    {
      key: "todo",
      icon: <CheckCircleIcon className="nav-icon" />,
      label: "Todo List",
      onClick: () => handleMenuClick("/todo-list"),
    },
  ];

  return (
    <div className="navbar-container">
      <Menu
        mode="horizontal"
        selectedKeys={[getSelectedKey()]}
        items={menuItems}
        className="custom-navbar"
      />
    </div>
  );
};

export default NavBar;
