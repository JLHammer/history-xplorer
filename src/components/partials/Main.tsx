import styled from "styled-components";
import type { ReactNode } from "react";
import { ThemeToggleButton } from "../ui/ThemeToggleButton";
import { ScrollToTopButton } from "../ui/ScrollToTopButton";

type MainProps = {
  children: ReactNode;
};

const MainStyled = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.light.surface};

  body.dark-mode & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
  }
`;

export const Main = ({ children }: MainProps) => {
  return (
    <MainStyled>
      <ThemeToggleButton />
      {children}
      <ScrollToTopButton />
    </MainStyled>
  );
};
