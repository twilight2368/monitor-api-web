import React from "react";
import { Tooltip } from "@heroui/react";
import classNames from "classnames";

type Status = "UP" | "DOWN";

type StatusBarProps = {
  status: Status;
  time?: number;
  className: string;
};

const StatusBar: React.FC<StatusBarProps> = ({ status, time, className }) => {
  const colorClass = status === "UP" ? "bg-green-400" : "bg-red-400";

  return (
    <Tooltip content={`${time}`} size="sm">
      <div
        className={classNames(
          "rounded-full cursor-help",
          colorClass,
          className
        )}
      />
    </Tooltip>
  );
};

export default StatusBar;
