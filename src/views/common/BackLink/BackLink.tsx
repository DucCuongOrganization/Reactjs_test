import { ArrowLeftOutlined } from "@ant-design/icons";
import { IconLink } from "../IconLink";

interface BackLinkProps {
  to?: string;
  children?: React.ReactNode;
}

export const BackLink: React.FC<BackLinkProps> = ({
  to = "/todo-list",
  children = "Back to List",
}) => {
  return (
    <IconLink to={to} iconBefore={<ArrowLeftOutlined />}>
      {children}
    </IconLink>
  );
};
