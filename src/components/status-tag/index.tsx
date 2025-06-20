import React from "react";
import { Chip, Tooltip } from "@heroui/react";
import classNames from "classnames";

type Status = "UP" | "DOWN";

type StatusTagProps = {
  status: Status;
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const colorClass = status === "UP" ? "success" : "danger";

  return (
    <Chip color={colorClass} size="md">
      {status}
    </Chip>
  );
};

export default StatusTag;
