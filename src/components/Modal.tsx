"use client";

import { type ReactNode, useState } from "react";
import { Button, type ButtonProps } from "@/components/shadcn/ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/ui/dialog";

export interface ModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
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
  isDismissable?: boolean;
  hideCloseButton?: boolean;
  className?: string;
  scrollBehavior?: "inside" | "outside" | "normal";
}

const sizeClasses: Record<string, string> = {
  xs: "max-w-xs",
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
  "2xl": "max-w-4xl",
  "3xl": "max-w-5xl",
  "4xl": "max-w-6xl",
  "5xl": "max-w-7xl",
  full: "max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)]",
};

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
  const onInteractOutside = isDismissable
    ? undefined
    : (e: Event) => e.preventDefault();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={`${sizeClasses[size] ?? sizeClasses.md} ${className ?? ""}`}
        onInteractOutside={onInteractOutside}
        onEscapeKeyDown={isDismissable ? undefined : (e) => e.preventDefault()}
        hideCloseButton={hideCloseButton}
      >
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <DialogBody
          className={
            scrollBehavior === "inside" ? "overflow-y-auto max-h-[60vh]" : ""
          }
        >
          {children}
        </DialogBody>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

export interface ModalCloseButtonProps extends ButtonProps {
  onBeforeClose?: () => void;
}

export function ModalCloseButton({
  onBeforeClose,
  onClick,
  ...props
}: ModalCloseButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onBeforeClose?.();
    onClick?.(e);
  };

  return (
    <DialogClose asChild>
      <Button onClick={handleClick} {...props} />
    </DialogClose>
  );
}

export interface ModalWithTriggerProps
  extends Omit<ModalProps, "isOpen" | "onOpenChange"> {
  trigger: ReactNode;
  triggerProps?: Omit<ButtonProps, "onClick" | "children">;
}

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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button {...triggerProps}>{trigger}</Button>
      </DialogTrigger>
      <DialogContent
        className={`${sizeClasses[size ?? "md"]} ${className ?? ""}`}
        onInteractOutside={
          isDismissable === false ? (e) => e.preventDefault() : undefined
        }
        onEscapeKeyDown={
          isDismissable === false ? (e) => e.preventDefault() : undefined
        }
        hideCloseButton={hideCloseButton}
      >
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <DialogBody
          className={
            scrollBehavior === "inside" ? "overflow-y-auto max-h-[60vh]" : ""
          }
        >
          {children}
        </DialogBody>
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
}

export function useDisclosure(defaultOpen = false) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
    onOpenChange: setIsOpen,
  };
}
