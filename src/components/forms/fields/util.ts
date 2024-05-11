import type { Control, FieldPath, FieldValues } from "react-hook-form";

export type FieldProps<
  TFieldValues extends FieldValues,
  CT,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<CT, "name"> & {
  control: Control<TFieldValues, object>;
  name: TName;
};

type InputMode =
  | "search"
  | "text"
  | "none"
  | "tel"
  | "url"
  | "email"
  | "numeric"
  | "decimal";

export function typeToInputMode(type?: string): InputMode | undefined {
  switch (type) {
    case "text":
      return type;
    case "search":
      return type;
    case "tel":
      return type;
    case "url":
      return type;
    case "email":
      return type;
    case "number":
      return "numeric";
    default:
      return undefined;
  }
}
