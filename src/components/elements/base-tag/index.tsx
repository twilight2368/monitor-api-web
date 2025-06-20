import { Chip } from "@heroui/react";
import classNames from "classnames";
import React, { type ReactNode } from "react";

type BaseTagProps = {
  children?: ReactNode;
  className?: string;
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "dot";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "sm" | "md" | "lg";
  radius?: "none" | "sm" | "md" | "lg" | "full";
  avatar?: ReactNode;
  startContent?: ReactNode;
  endContent?: ReactNode;
  isDisabled?: boolean;
};

const BaseTag: React.FC<BaseTagProps> = ({
  children,
  className,
  variant = "solid",
  color = "default",
  size = "md",
  radius = "md",
  avatar,
  startContent,
  endContent,
  isDisabled = false,
}) => {
  return (
    <Chip
      className={classNames(className)}
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      avatar={avatar}
      startContent={startContent}
      endContent={endContent}
      isDisabled={isDisabled}
    >
      {children}
    </Chip>
  );
};

export default BaseTag;
