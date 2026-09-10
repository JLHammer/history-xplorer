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
      linear-gradient(180deg, ${theme.colors.light.plateBorder}, ${theme.colors.light.plateBorderEnd}) border-box;
  `}
  padding: ${({ theme }) => theme.spacing.s};
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 55%;

  body.dark-mode & {
    ${({ theme }) => `
      background:
        linear-gradient(${theme.colors.dark.plateBackground}, ${theme.colors.dark.plateBackground}) padding-box,
        linear-gradient(180deg, ${theme.colors.dark.plateBorder}, ${theme.colors.dark.plateBorderEnd}) border-box;
    `}
  }
`;

const PlateContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: calc(${({ theme }) => theme.spacing.s} / 2);
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
  color: ${({ theme }) => theme.colors.light.accent};
  border-bottom: 2px solid ${({ theme }) => theme.colors.light.accent};

  body.dark-mode & {
    color: ${({ theme }) => theme.colors.dark.accent};
    border-bottom-color: ${({ theme }) => theme.colors.dark.accent};
  }
`;

const PlateParagraph = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.light.heading};

  body.dark-mode & {
    color: ${({ theme }) => theme.colors.dark.heading};
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
