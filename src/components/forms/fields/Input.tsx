import type { InputProps } from "@heroui/input";
import { Input as NUIInput } from "@heroui/input";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  typeToInputMode,
  type FieldProps,
} from "@/components/forms/fields/util";

export function Input<T extends FieldValues>({
  control,
  name,
  ...props
}: FieldProps<T, InputProps>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur, disabled },
        fieldState: { error },
      }) => (
        <NUIInput
          inputMode={typeToInputMode(props.type)}
          {...props}
          name={name}
          label={props.label}
          isInvalid={!!error}
          errorMessage={error?.message}
          value={value}
          onChange={(e) =>
            onChange(
              e.target.value && props.type === "number"
                ? e.target.valueAsNumber
                : e.target.value,
            )
          }
          onBlur={onBlur}
          disabled={disabled}
        />
      )}
    />
  );
}
