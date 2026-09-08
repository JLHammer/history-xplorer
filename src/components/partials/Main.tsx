import styled from "styled-components";
import type { ReactNode } from "react";
import { ThemeToggleButton } from "../ui/ThemeToggleButton";

type MainProps = {
  children: ReactNode;
};

const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.light.background};

  body.dark-mode & {
    background-color: ${({ theme }) => theme.colors.dark.background};
  }
`;

export const Main = ({ children }: MainProps) => {
  return (
    <MainStyled>
      <ThemeToggleButton />
      {children}
    </MainStyled>
  );
};
