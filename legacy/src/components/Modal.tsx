"use client";

import type { ButtonProps } from "@heroui/react";
import {
  Button,
  Modal as HeroModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { createContext, useContext, type ReactNode } from "react";

const ModalContext = createContext<(() => void) | null>(null);

/**
 * Hook to get the modal close function from context
 */
function useModalClose() {
  const onClose = useContext(ModalContext);
  if (!onClose) {
    throw new Error("useModalClose must be used within a Modal component");
  }
  return onClose;
}

export interface ModalProps {
  /**
   * Whether the modal is open
   */
  isOpen: boolean;

  /**
   * Callback fired when the modal open state changes
   */
  onOpenChange: (isOpen: boolean) => void;

  /**
   * Modal title (optional)
   */
  title?: ReactNode;

  /**
   * Modal body content
   */
  children: ReactNode;

  /**
   * Footer content (optional)
   * Use ModalCloseButton for buttons that should close the modal
   */
  footer?: ReactNode;

  /**
   * Size of the modal
   * @default "md"
   */
  size?:
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

  /**
   * Whether clicking outside the modal should close it
   * @default true
   */
  isDismissable?: boolean;

  /**
   * Whether to hide the close button
   * @default false
   */
  hideCloseButton?: boolean;

  /**
   * Custom className for the modal
   */
  className?: string;

  /**
   * Scroll behavior of the modal
   * @default "inside"
   */
  scrollBehavior?: "inside" | "outside" | "normal";
}

/**
 * Reusable Modal component built on HeroUI
 *
 * @example
 * ```tsx
 * import { Modal, ModalCloseButton } from "@/components/Modal";
 * import { useDisclosure, Button } from "@heroui/react";
 *
 * function MyComponent() {
 *   const { isOpen, onOpen, onOpenChange } = useDisclosure();
 *
 *   return (
 *     <>
 *       <Button onPress={onOpen}>Open Modal</Button>
 *       <Modal
 *         isOpen={isOpen}
 *         onOpenChange={onOpenChange}
 *         title="My Modal"
 *         footer={
 *           <>
 *             <ModalCloseButton color="danger" variant="light">
 *               Cancel
 *             </ModalCloseButton>
 *             <ModalCloseButton color="primary">
 *               Confirm
 *             </ModalCloseButton>
 *           </>
 *         }
 *       >
 *         <p>Modal content goes here</p>
 *       </Modal>
 *     </>
 *   );
 * }
 * ```
 */
export function Modal({
  isOpen,
  onOpenChange,
  title,
  children,
  footer,
  size = "md",
  isDismissable = true,
  hideCloseButton = false,
  className,
  scrollBehavior = "inside",
}: ModalProps) {
  return (
    <HeroModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={size}
      isDismissable={isDismissable}
      hideCloseButton={hideCloseButton}
      className={className}
      scrollBehavior={scrollBehavior}
    >
      <ModalContent>
        {(onClose) => (
          <ModalContext.Provider value={onClose}>
            {title && <ModalHeader>{title}</ModalHeader>}
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer}</ModalFooter>}
          </ModalContext.Provider>
        )}
      </ModalContent>
    </HeroModal>
  );
}

export interface ModalCloseButtonProps extends ButtonProps {
  /**
   * Additional action to perform before closing
   */
  onBeforeClose?: () => void;
}

/**
 * Button component that automatically closes the modal when clicked
 * Can only be used inside Modal or ModalWithTrigger components
 *
 * @example
 * ```tsx
 * <Modal>
 *   <ModalCloseButton color="primary">Got it</ModalCloseButton>
 * </Modal>
 * ```
 */
export function ModalCloseButton({
  onBeforeClose,
  onPress,
  ...props
}: ModalCloseButtonProps) {
  const onClose = useModalClose();

  const handlePress = (e: Parameters<NonNullable<ButtonProps["onPress"]>>[0]) => {
    onBeforeClose?.();
    onPress?.(e);
    onClose();
  };

  return <Button onPress={handlePress} {...props} />;
}

export interface ModalWithTriggerProps
  extends Omit<ModalProps, "isOpen" | "onOpenChange"> {
  /**
   * The trigger button content
   */
  trigger: ReactNode;

  /**
   * Props to pass to the trigger button
   */
  triggerProps?: Omit<ButtonProps, "onPress" | "children">;
}

/**
 * Modal with built-in trigger button for use in Server Components
 *
 * This is a client component that handles its own state, allowing you to use it
 * directly in Server Components without needing "use client" in your file.
 *
 * @example
 * ```tsx
 * // In a Server Component (no "use client" needed)
 * import { ModalWithTrigger, ModalCloseButton } from "@/components/Modal";
 *
 * export default function MyPage() {
 *   return (
 *     <ModalWithTrigger
 *       trigger="Open Modal"
 *       title="Welcome"
 *       footer={
 *         <ModalCloseButton color="primary">
 *           Got it
 *         </ModalCloseButton>
 *       }
 *     >
 *       <p>Modal content goes here</p>
 *     </ModalWithTrigger>
 *   );
 * }
 * ```
 */
export function ModalWithTrigger({
  trigger,
  triggerProps,
  title,
  children,
  footer,
  size,
  isDismissable,
  hideCloseButton,
  className,
  scrollBehavior,
}: ModalWithTriggerProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} {...triggerProps}>
        {trigger}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title={title}
        footer={footer}
        size={size}
        isDismissable={isDismissable}
        hideCloseButton={hideCloseButton}
        className={className}
        scrollBehavior={scrollBehavior}
      >
        {children}
      </Modal>
    </>
  );
}

/**
 * Re-export HeroUI's useDisclosure hook for convenience
 */
export { useDisclosure };
