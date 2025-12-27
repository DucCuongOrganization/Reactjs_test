import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { FaReact } from "react-icons/fa";
import { useHistory, useLocation } from "react-router-dom";

export const NavBar: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  // Determine selected key based on current path
  const getSelectedKey = () => {
    if (location.pathname === "/") return "home";
    if (location.pathname.startsWith("/todo")) return "todo";
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
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "16px 24px",
          borderBottom: "1px solid #f0f0f0",
          marginBottom: "8px",
        }}
      >
        <FaReact style={{ fontSize: "24px", color: "#61DAFB" }} />
        <span
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            color: "#1f2937",
          }}
        >
          React Website
        </span>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[getSelectedKey()]}
        items={menuItems}
        style={{ height: "100%", borderRight: 0 }}
      />
    </div>
  );
};
