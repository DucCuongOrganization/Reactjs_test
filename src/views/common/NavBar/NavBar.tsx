import {
  CheckCircleOutlined,
  HomeOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { FaReact } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";
import "./NavBar.scss";

export const NavBar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  // Determine selected key based on current path
  const getSelectedKey = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname.startsWith("/todo")) return "todo";
    if (location.pathname === "/tarot") return "tarot";
    return "home";
  };

  const handleMenuClick = (path: string) => {
    history.push(path);
  };

  const menuItems = [
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => handleMenuClick("/"),
    },
    {
      key: "todo",
      icon: <CheckCircleOutlined />,
      label: "To Do List",
      onClick: () => handleMenuClick("/todo-list"),
    },
    {
      key: "tarot",
      icon: <StarOutlined />,
      label: "Tarot AR",
      onClick: () => handleMenuClick("/tarot"),
    },
  ];

  return (
    <div className="navbar-container">
      <div className="navbar-header">
        {(FaReact as any)({ className: "navbar-icon" })}
        <span className="navbar-title">React Website</span>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        items={menuItems}
        className="navbar-menu"
      />
    </div>
  );
};
