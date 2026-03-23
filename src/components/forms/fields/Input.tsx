import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  type FieldProps,
  typeToInputMode,
} from "@/components/forms/fields/util";
import { Input as ShadcnInput } from "@/components/shadcn/ui/input";
import { Label } from "@/components/shadcn/ui/label";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input<T extends FieldValues>({
  control,
  name,
  label,
  type,
  ...props
}: FieldProps<T, InputFieldProps>): ReactNode {
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
          <ShadcnInput
            inputMode={typeToInputMode(type)}
            type={type}
            {...props}
            id={name}
            name={name}
            value={value}
            onChange={(e) =>
              onChange(
                e.target.value && type === "number"
                  ? e.target.valueAsNumber
                  : e.target.value,
              )
            }
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
