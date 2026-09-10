import styled from "styled-components";
import type { ReactNode } from "react";

export type PlateProps = {
  label: string;
  value?: ReactNode;
  description: string;
};

const PlateStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 0.75rem solid transparent;
  ${({ theme }) => `
    background:
      linear-gradient(${theme.colors.light.plateBackground}, ${theme.colors.light.plateBackground}) padding-box,
      linear-gradient(180deg, ${theme.colors.white}, ${theme.colors.light.plateBorder}) border-box;
  `}
  padding: ${({ theme }) => theme.spacing.s};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;

  body.dark-mode & {
    ${({ theme }) => `
      background:
        linear-gradient(${theme.colors.dark.plateBackground}, ${theme.colors.dark.plateBackground}) padding-box,
        linear-gradient(180deg, ${theme.colors.dark.heading}, ${theme.colors.dark.plateBorder}) border-box;
    `}
  }
`;

const PlateContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.s};
  position: relative;
  height: 90%;
  width: 95%;
`;

const PlateScrew = styled.div<{ $corner: "tl" | "tr" | "bl" | "br" }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.light.plateScrew};
  position: absolute;
  ${({ $corner }) => ($corner[0] === "t" ? "top" : "bottom")}: 0.5rem;
  ${({ $corner }) => ($corner[1] === "l" ? "left" : "right")}: 0.5rem;
  z-index: 1;
`;

const PlateHeading = styled.h1`
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSizes.l};
  color: ${({ theme }) => theme.colors.light.heading};

  body.dark-mode & {
    color: ${({ theme }) => theme.colors.dark.heading};
  }
`;

const PlateHeadingValue = styled.span`
  display: inline-block;
  margin-left: ${({ theme }) => theme.spacing.xs};
  border-bottom: 2px solid ${({ theme }) => theme.colors.light.plateBorder};

  &:focus-within {
    border-bottom-color: ${({ theme }) => theme.colors.light.heading};
  }

  body.dark-mode & {
    border-bottom-color: ${({ theme }) => theme.colors.dark.plateBorder};
  }

  body.dark-mode &:focus-within {
    border-bottom-color: ${({ theme }) => theme.colors.dark.heading};
  }
`;

const PlateParagraph = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.light.heading};

  body.dark-mode & {
    color: ${({ theme }) => theme.colors.dark.body};
  }
`;

export const Plate = ({ label, value, description }: PlateProps) => {
  return (
    <PlateStyled>
      <PlateScrew $corner="tl" />
      <PlateScrew $corner="tr" />
      <PlateScrew $corner="bl" />
      <PlateScrew $corner="br" />
      <PlateContent>
        <PlateHeading>
          {label}
          {value && (
            <>
              {" "}
              <PlateHeadingValue>{value}</PlateHeadingValue>
            </>
          )}
        </PlateHeading>
        <PlateParagraph>{description}</PlateParagraph>
      </PlateContent>
    </PlateStyled>
  );
};
