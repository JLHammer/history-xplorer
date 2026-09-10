import styled from "styled-components";
import { UpArrowIcon } from "../icons/UpArrowIcon";
import { useScrolledPastTop } from "../../hooks/useScrolledPastTop";

type BackToTopButtonProps = {
  className?: string;
};

const BackToTopText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.s};
  white-space: nowrap;
`;

const BackToTopButtonStyled = styled.button`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem;
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.light.body};
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.colors.light.heading};
  }

  body.dark-mode & {
    color: ${({ theme }) => theme.colors.dark.body};
  }

  body.dark-mode &:hover,
  body.dark-mode &:focus-visible {
    color: ${({ theme }) => theme.colors.dark.heading};
  }
`;

export const BackToTopButton = ({ className }: BackToTopButtonProps) => (
  <BackToTopButtonStyled
    type="button"
    className={className}
    onClick={() => window.scrollTo({ top: 0 })}
    aria-label="Go back to top"
  >
    <UpArrowIcon />
    <BackToTopText>Go back to top</BackToTopText>
  </BackToTopButtonStyled>
);

const ScrollToTopButtonStyled = styled(BackToTopButton)`
  position: fixed;
  right: ${({ theme }) => theme.spacing.s};
  bottom: ${({ theme }) => theme.spacing.s};
  display: none;
  flex-direction: row-reverse;
  gap: 0.5rem;

  ${BackToTopText} {
    display: none;
  }

  &:hover ${BackToTopText}, &:focus-visible ${BackToTopText} {
    display: inline;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: inline-flex;
  }
`;

export const ScrollToTopButton = () => {
  const scrolledPast = useScrolledPastTop();

  if (!scrolledPast) return null;

  return <ScrollToTopButtonStyled />;
};
