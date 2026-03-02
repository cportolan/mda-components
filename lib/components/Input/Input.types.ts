import { InputHTMLAttributes } from "react";

export type InputType =
    | "text"
    | "password"
    | "email"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "time"
    | "datetime-local";

export interface InputProps extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size"
> {
    type?: InputType;
    size?: "sm" | "md" | "lg";
    error?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    label?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
