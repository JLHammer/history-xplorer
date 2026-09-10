import { useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";
import { InputField } from "./InputField";
import type { KeyboardEvent, Ref, UIEvent } from "react";

export type PickerOption = {
  value: string;
  text: string;
  title?: string;
};

type PickerFieldProps = {
  label: string;
  value: string;
  options: PickerOption[];
  width?: string;
  maxLength?: number;
  placeholder?: string;
  inputMode?: "numeric" | "text";
  readOnly?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  onChange: (value: string) => void;
  onPick: (value: string) => void;
  onBlur?: () => void;
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
  onExtend?: (edge: "start" | "end") => void;
};

const EDGE_DISTANCE = 24;

const PickerFieldStyled = styled.span`
  display: inline-block;
  position: relative;
`;

const OptionList = styled.ul`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  max-height: 11rem;
  overflow-y: auto;
  margin: 0;
  padding: 0.25rem 0;
  list-style: none;
  text-align: left;
  text-transform: none;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.light.body};
  background-color: ${({ theme }) => theme.colors.light.plateBackground};
  border: 1px solid ${({ theme }) => theme.colors.light.plateBorder};
  border-radius: ${({ theme }) => theme.radii.s};
  box-shadow: ${({ theme }) => theme.shadows.button};

  body.dark-mode & {
    color: ${({ theme }) => theme.colors.dark.body};
    background-color: ${({ theme }) => theme.colors.dark.plateBackground};
    border-color: ${({ theme }) => theme.colors.dark.plateBorder};
  }
`;

const Option = styled.li<{ $active: boolean }>`
  padding: 0.125rem 0.75rem;
  white-space: nowrap;
  cursor: pointer;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.light.highlight : "transparent"};

  body.dark-mode & {
    background-color: ${({ $active, theme }) =>
      $active ? theme.colors.dark.highlight : "transparent"};
  }
`;

export const PickerField = ({
  label,
  value,
  options,
  width,
  maxLength,
  placeholder,
  inputMode = "numeric",
  readOnly = false,
  inputRef,
  onChange,
  onPick,
  onBlur,
  onKeyDown,
  onExtend,
}: PickerFieldProps) => {
  const listId = useId();
  const listRef = useRef<HTMLUListElement>(null);
  const extendedRef = useRef(false);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const optionCount = options.length;
  const currentIndex = options.findIndex((option) => option.value === value);
  const currentOption = options[currentIndex];

  const scrolledIndex = activeIndex === -1 ? currentIndex : activeIndex;

  useEffect(() => {
    extendedRef.current = false;
  }, [optionCount]);

  useEffect(() => {
    if (!open) return;

    listRef.current?.children.item(scrolledIndex)?.scrollIntoView({
      block: "nearest",
    });
  }, [open, scrolledIndex]);

  const close = () => {
    setOpen(false);
    setActiveIndex(-1);
  };

  const pick = (picked: string) => {
    close();
    onPick(picked);
  };

  const move = (delta: number) => {
    setOpen(true);
    setActiveIndex((current) => {
      const from = current === -1 ? currentIndex : current;

      return Math.min(Math.max(from + delta, 0), optionCount - 1);
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      move(1);

      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      move(-1);

      return;
    }

    if (event.key === "Escape") {
      close();

      return;
    }

    if (!open && (event.key === "Enter" || (readOnly && event.key === " "))) {
      event.preventDefault();
      setOpen(true);
      setActiveIndex(currentIndex);

      return;
    }

    if (event.key === "Enter" && open) {
      const picked = options[scrolledIndex];

      if (picked) {
        event.preventDefault();
        pick(picked.value);

        return;
      }
    }

    onKeyDown?.(event);
  };

  const handleScroll = (event: UIEvent<HTMLUListElement>) => {
    if (!onExtend || extendedRef.current) return;

    const list = event.currentTarget;
    const fromEnd = list.scrollHeight - list.scrollTop - list.clientHeight;

    if (list.scrollTop > EDGE_DISTANCE && fromEnd > EDGE_DISTANCE) return;

    extendedRef.current = true;
    onExtend(list.scrollTop <= EDGE_DISTANCE ? "start" : "end");
  };

  return (
    <PickerFieldStyled>
      <InputField
        ref={inputRef}
        label={label}
        type="text"
        inputMode={inputMode}
        autoComplete="off"
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={
          activeIndex === -1 ? undefined : `${listId}-${activeIndex}`
        }
        maxLength={maxLength}
        placeholder={placeholder}
        readOnly={readOnly}
        title={currentOption?.title}
        width={width}
        value={value}
        onFocus={() => {
          setOpen(true);
          setActiveIndex(currentIndex);
        }}
        onClick={() => setOpen(true)}
        onChange={(event) => {
          setOpen(true);
          setActiveIndex(-1);
          onChange(event.target.value);
        }}
        onBlur={() => {
          close();
          onBlur?.();
        }}
        onKeyDown={handleKeyDown}
      />
      {open && optionCount > 0 && (
        <OptionList
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          tabIndex={-1}
          onMouseDown={(event) => event.preventDefault()}
          onScroll={handleScroll}
        >
          {options.map((option, index) => (
            <Option
              key={option.value}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={option.value === value}
              title={option.title}
              $active={index === activeIndex}
              onClick={() => pick(option.value)}
            >
              {option.text}
            </Option>
          ))}
        </OptionList>
      )}
    </PickerFieldStyled>
  );
};
