import React, { type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router";
import { FaBars } from "react-icons/fa6";
import classNames from "classnames";

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
      className={classNames(
        "text-white p-3 rounded-md",
        isActive ? "bg-blue-500" : ""
      )}
      onClick={() => {
        navigate(path);
      }}
    >
      {icon}
    </div>
  );
};

export default NavigateItemWithIconOnly;
