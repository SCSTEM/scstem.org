import type { TextAreaProps } from "@nextui-org/input";
import { Textarea as NUITextArea } from "@nextui-org/input";
import type { FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import type { FieldProps } from "./util";

export function TextArea<T extends FieldValues>({
  control,
  name,
  ...props
}: FieldProps<T, TextAreaProps>): JSX.Element {
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
