import { Tag } from "antd";
import "./StatusTag.scss";

export type StatusVariant = "todo" | "in-progress" | "done";

interface StatusTagProps {
  status: StatusVariant;
  children: React.ReactNode;
}

export const StatusTag: React.FC<StatusTagProps> = ({ status, children }) => {
  const getColor = () => {
    switch (status) {
      case "todo":
        return "default";
      case "in-progress":
        return "warning";
      case "done":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <Tag className={`status-tag status-tag-${status}`} color={getColor()}>
      {children}
    </Tag>
  );
};
