import React, { type ReactNode, isValidElement, cloneElement } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";

type ModalSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "full";
type Radius = "none" | "sm" | "md" | "lg";
type Shadow = "none" | "sm" | "md" | "lg";
type Backdrop = "transparent" | "opaque" | "blur";
type ScrollBehavior = "normal" | "inside" | "outside";
type Placement = "auto" | "top" | "center" | "bottom";

type BaseModalProps = {
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  radius?: Radius;
  shadow?: Shadow;
  backdrop?: Backdrop;
  scrollBehavior?: ScrollBehavior;
  placement?: Placement;
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  shouldBlockScroll?: boolean;
  hideCloseButton?: boolean;
  closeButton?: ReactNode;
  motionProps?: any;
  portalContainer?: HTMLElement;
  disableAnimation?: boolean;
  buttonDisplay?: ReactNode;
};

const BaseModal: React.FC<BaseModalProps> = ({
  title,
  children,
  footer,
  size = "md",
  radius = "lg",
  shadow = "lg",
  backdrop = "opaque",
  scrollBehavior = "inside",
  placement = "auto",
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  shouldBlockScroll = true,
  hideCloseButton = false,
  closeButton,
  motionProps,
  portalContainer,
  disableAnimation = false,
  isOpen,
  onOpenChange,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={size}
        radius={radius}
        shadow={shadow}
        backdrop={backdrop}
        scrollBehavior={scrollBehavior}
        placement={placement}
        isDismissable={isDismissable}
        isKeyboardDismissDisabled={isKeyboardDismissDisabled}
        shouldBlockScroll={shouldBlockScroll}
        hideCloseButton={hideCloseButton}
        closeButton={closeButton}
        motionProps={motionProps}
        portalContainer={portalContainer}
        disableAnimation={disableAnimation}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {title && <ModalHeader>{title}</ModalHeader>}
              <ModalBody>{children}</ModalBody>
              {footer && <ModalFooter>{footer}</ModalFooter>}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BaseModal;
