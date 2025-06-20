import React from "react";
import { Tooltip } from "@heroui/react";
import classNames from "classnames";

type Status = "UP" | "DOWN";

type StatusBarProps = {
  status: Status;
  time: string; // e.g., "2025-06-19 14:30"
  className: string;
};

const StatusBar: React.FC<StatusBarProps> = ({ status, time, className }) => {
  const colorClass = status === "UP" ? "bg-green-400" : "bg-red-400";

  return (
    <Tooltip content={time}>
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
