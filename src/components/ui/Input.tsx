"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";

// ─── Primitive label & helper components ─────────────────────────────────────

interface LabelProps {
  readonly htmlFor?: string;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly required?: boolean;
}

/**
 * Label — accessible form label, links to an input via `htmlFor`.
 */
export function Label({
  htmlFor,
  children,
  className,
  required = false,
}: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-foreground text-sm font-medium", className)}
    >
      {children}
      {required && (
        <span className="ml-1 text-red-500" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}

interface HelperTextProps {
  readonly children: React.ReactNode;
  readonly id?: string | undefined;
  readonly className?: string | undefined;
}

/**
 * HelperText — secondary guidance beneath a form field.
 */
export function HelperText({ children, id, className }: HelperTextProps) {
  return (
    <p id={id} className={cn("text-subtle text-xs", className)}>
      {children}
    </p>
  );
}

interface ErrorMessageProps {
  readonly children: React.ReactNode;
  readonly id?: string | undefined;
  readonly className?: string | undefined;
}

/**
 * ErrorMessage — validation error shown beneath a form field.
 * Uses role="alert" for immediate screen reader announcement.
 */
export function ErrorMessage({ children, id, className }: ErrorMessageProps) {
  return (
    <p
      id={id}
      role="alert"
      className={cn("text-xs text-red-600 dark:text-red-400", className)}
    >
      {children}
    </p>
  );
}

// ─── Input ────────────────────────────────────────────────────────────────────

type FieldSharedProps = {
  readonly label?: string;
  readonly error?: string;
  readonly helperText?: string;
  readonly required?: boolean;
};

type InputProps = FieldSharedProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof FieldSharedProps>;

/**
 * Input — a styled text input with optional label, validation, and helper text.
 * Automatically links label ↔ input and error ↔ aria-describedby.
 *
 * @example
 *   <Input label="Email" type="email" placeholder="you@example.com" />
 *   <Input label="Name" error="Name is required" />
 *   <Input label="Bio" helperText="Max 160 characters" />
 */
export function Input({
  label,
  error,
  helperText,
  required = false,
  id: externalId,
  className,
  ...props
}: InputProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText && !error ? `${id}-helper` : undefined;
  const describedBy =
    [errorId, helperId]
      .filter((v): v is string => typeof v === "string")
      .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <input
        id={id}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-required={required}
        className={cn(
          "bg-background text-foreground h-9 w-full rounded-md border px-3 text-sm",
          "placeholder:text-subtle",
          "transition-colors",
          "focus:ring-accent focus:ring-2 focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-red-500 focus:ring-red-500" : "border-border",
          className,
        )}
        {...props}
      />
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      {helperText && !error && (
        <HelperText id={helperId}>{helperText}</HelperText>
      )}
    </div>
  );
}

// ─── Textarea ─────────────────────────────────────────────────────────────────

type TextareaProps = FieldSharedProps &
  Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    keyof FieldSharedProps
  >;

/**
 * Textarea — a styled multi-line text input.
 * Same label/error/helper API as Input.
 */
export function Textarea({
  label,
  error,
  helperText,
  required = false,
  id: externalId,
  className,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText && !error ? `${id}-helper` : undefined;
  const describedBy =
    [errorId, helperId]
      .filter((v): v is string => typeof v === "string")
      .join(" ") || undefined;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <Label htmlFor={id} required={required}>
          {label}
        </Label>
      )}
      <textarea
        id={id}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-required={required}
        className={cn(
          "bg-background text-foreground min-h-[100px] w-full resize-y rounded-md border px-3 py-2 text-sm",
          "placeholder:text-subtle",
          "transition-colors",
          "focus:ring-accent focus:ring-2 focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-red-500 focus:ring-red-500" : "border-border",
          className,
        )}
        {...props}
      />
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      {helperText && !error && (
        <HelperText id={helperId}>{helperText}</HelperText>
      )}
    </div>
  );
}
