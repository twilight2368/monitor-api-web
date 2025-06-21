import React from "react";
import { Chip } from "@heroui/react";

type Status = "UP" | "DOWN" | "UNKNOWN";

type StatusTagProps = {
  status: Status;
};

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  const colorClass =
    status === "UNKNOWN" ? "default" : status === "UP" ? "success" : "danger";

  return (
    <Chip color={colorClass} size="md">
      {status}
    </Chip>
  );
};

export default StatusTag;
