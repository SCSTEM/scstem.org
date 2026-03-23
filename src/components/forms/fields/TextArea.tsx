import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Label } from "@/components/shadcn/ui/label";
import { Textarea as ShadcnTextarea } from "@/components/shadcn/ui/textarea";

import type { FieldProps } from "./util";

type TextAreaFieldProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export function TextArea<T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: FieldProps<T, TextAreaFieldProps>): ReactNode {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur, disabled },
        fieldState: { error },
      }) => (
        <div className="flex flex-col gap-1.5 w-full">
          {label && <Label htmlFor={name}>{label}</Label>}
          <ShadcnTextarea
            {...props}
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            disabled={disabled}
            aria-invalid={!!error}
            className={error ? "border-danger" : ""}
          />
          {error?.message && (
            <p className="text-danger text-xs">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
