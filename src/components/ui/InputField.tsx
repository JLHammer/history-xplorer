import { useRef } from "react";
import styled from "styled-components";
import type { ComponentPropsWithRef, FocusEvent, MouseEvent } from "react";

type InputFieldProps = ComponentPropsWithRef<"input"> & {
  label: string;
  width?: string;
};

const Input = styled.input<{ $width: string }>`
  width: ${({ $width }) => $width};
  padding: 0;
  font: inherit;
  color: inherit;
  text-align: center;
  text-transform: inherit;
  background: transparent;
  border: none;
  color-scheme: light;
  outline: none;

  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.light.highlight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.light.plateBorder};
    opacity: 1;
  }

  &[type="date"],
  &[readonly] {
    cursor: pointer;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }

  body.dark-mode & {
    color-scheme: dark;
  }

  body.dark-mode &::placeholder {
    color: ${({ theme }) => theme.colors.dark.plateBorder};
  }

  body.dark-mode &:focus-visible {
    background-color: ${({ theme }) => theme.colors.dark.highlight};
  }
`;

export const InputField = ({
  label,
  width = "auto",
  onFocus,
  onMouseUp,
  ...inputProps
}: InputFieldProps) => {
  const selectedByClickRef = useRef(false);

  const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
    if (!inputProps.readOnly) {
      event.target.select();
      selectedByClickRef.current = true;
    }

    onFocus?.(event);
  };

  const handleMouseUp = (event: MouseEvent<HTMLInputElement>) => {
    if (selectedByClickRef.current) {
      event.preventDefault();
      selectedByClickRef.current = false;
    }

    onMouseUp?.(event);
  };

  return (
    <Input
      aria-label={label}
      $width={width}
      onFocus={handleFocus}
      onMouseUp={handleMouseUp}
      {...inputProps}
    />
  );
};
