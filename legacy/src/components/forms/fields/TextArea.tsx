import type { TextAreaProps } from "@heroui/input";
import { Textarea as NUITextArea } from "@heroui/input";
import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { FieldProps } from "./util";

export function TextArea<T extends FieldValues>({
  control,
  name,
  ...props
}: FieldProps<T, TextAreaProps>): ReactNode {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { value, onChange, onBlur, disabled },
        fieldState: { error },
      }) => (
        <NUITextArea
          {...props}
          name={name}
          label={props.label}
          isInvalid={!!error}
          errorMessage={error?.message}
          value={value}
          onValueChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
      )}
    />
  );
}
