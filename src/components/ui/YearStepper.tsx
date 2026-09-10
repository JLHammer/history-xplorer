import styled from "styled-components";

type YearStepperProps = {
  label: string;
  onStep: (delta: number) => void;
};

const YearStepperStyled = styled.span`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin-left: -0.25em;
`;

const StepButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: inherit;
  background: none;
  border: none;
  cursor: pointer;

  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.light.highlight};
  }

  body.dark-mode &:focus-visible {
    background-color: ${({ theme }) => theme.colors.dark.highlight};
  }
`;

const StepIcon = styled.svg`
  width: 0.75rem;
  height: 0.75rem;
`;

export const YearStepper = ({ label, onStep }: YearStepperProps) => (
  <YearStepperStyled>
    <StepButton
      type="button"
      onClick={() => onStep(1)}
      aria-label={`One ${label} later`}
    >
      <StepIcon viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
        <path d="M6 2.5 11 9H1z" />
      </StepIcon>
    </StepButton>
    <StepButton
      type="button"
      onClick={() => onStep(-1)}
      aria-label={`One ${label} earlier`}
    >
      <StepIcon viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
        <path d="M6 9.5 1 3h10z" />
      </StepIcon>
    </StepButton>
  </YearStepperStyled>
);
