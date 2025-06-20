import { Button, type PressEvent } from "@heroui/react";
import React, {
  type ReactNode,
  type MouseEventHandler,
  type KeyboardEvent,
} from "react";

type SpinnerPlacement = "start" | "end";
type Variant =
  | "solid"
  | "bordered"
  | "light"
  | "flat"
  | "faded"
  | "shadow"
  | "ghost";
type Color =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
type Size = "sm" | "md" | "lg";
type Radius = "none" | "sm" | "md" | "lg" | "full";

type BaseButtonProps = {
  children?: ReactNode;
  variant?: Variant;
  color?: Color;
  size?: Size;
  radius?: Radius;
  startContent?: ReactNode;
  endContent?: ReactNode;
  spinner?: ReactNode;
  spinnerPlacement?: SpinnerPlacement;
  fullWidth?: boolean;
  isIconOnly?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  disableRipple?: boolean;
  disableAnimation?: boolean;
  onPress?: (e: PressEvent) => void;
  onPressStart?: (e: PressEvent) => void;
  onPressEnd?: (e: PressEvent) => void;
  onPressChange?: (isPressed: boolean) => void;
  onPressUp?: (e: PressEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  onClick?: MouseEventHandler;
  className?: string;
};

const BaseButton: React.FC<BaseButtonProps> = ({
  children,
  variant = "solid",
  color = "default",
  size = "md",
  radius = "md",
  startContent,
  endContent,
  spinner,
  spinnerPlacement = "start",
  fullWidth = false,
  isIconOnly = false,
  isDisabled = false,
  isLoading = false,
  disableRipple = false,
  disableAnimation = false,
  onPress,
  onPressStart,
  onPressEnd,
  onPressChange,
  onPressUp,
  onKeyDown,
  onKeyUp,
  onClick,
  className,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      radius={radius}
      startContent={startContent}
      endContent={endContent}
      spinner={spinner}
      spinnerPlacement={spinnerPlacement}
      fullWidth={fullWidth}
      isIconOnly={isIconOnly}
      isDisabled={isDisabled}
      isLoading={isLoading}
      disableRipple={disableRipple}
      disableAnimation={disableAnimation}
      onPress={onPress}
      onPressStart={onPressStart}
      onPressEnd={onPressEnd}
      onPressChange={onPressChange}
      onPressUp={onPressUp}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
