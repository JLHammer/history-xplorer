import styled from "styled-components";
import type { ComponentPropsWithoutRef } from "react";

type InputFieldProps = ComponentPropsWithoutRef<"input"> & {
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

  &[type="date"] {
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

  body.dark-mode &:focus-visible {
    background-color: ${({ theme }) => theme.colors.dark.highlight};
  }
`;

export const InputField = ({
  label,
  width = "auto",
  ...inputProps
}: InputFieldProps) => (
  <Input aria-label={label} $width={width} {...inputProps} />
);
