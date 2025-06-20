import React, { type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaBars } from "react-icons/fa6";

type NavigateItemWithIconOnlyProps = {
  path: string;
  icon?: ReactNode;
};

const NavigateItemWithIconOnly: React.FC<NavigateItemWithIconOnlyProps> = ({
  path,
  icon = <FaBars />,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive =
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <div
      className={`p-2 ${isActive ? "bg-blue-500 rounded-md text-white" : ""}`}
      onClick={() => {
        navigate(path);
      }}
    >
      {icon}
    </div>
  );
};

export default NavigateItemWithIconOnly;
