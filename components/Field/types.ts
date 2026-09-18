import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { fieldVariants } from "./utils";

type FieldVariantProps = VariantProps<typeof fieldVariants>;

export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & FieldVariantProps;

export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & FieldVariantProps;
