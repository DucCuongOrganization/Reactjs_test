import { Link } from "react-router-dom";
import "./IconLink.scss";

interface IconLinkProps {
  to: string;
  children: React.ReactNode;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  className?: string;
}

export const IconLink: React.FC<IconLinkProps> = ({
  to,
  children,
  iconBefore,
  iconAfter,
  className = "",
}) => {
  return (
    <Link to={to} className={`icon-link ${className}`}>
      {iconBefore && <span className="icon-link-before">{iconBefore}</span>}
      <span className="icon-link-text">{children}</span>
      {iconAfter && <span className="icon-link-after">{iconAfter}</span>}
    </Link>
  );
};
