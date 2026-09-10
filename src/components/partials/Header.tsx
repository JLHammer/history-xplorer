import styled from "styled-components";
import headerImage from "../../assets/header-image.avif";
import type { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode;
};

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.light.surface};
  position: relative;

  body.dark-mode & {
    background-color: ${({ theme }) => theme.colors.dark.surface};
  }
`;

const HeaderImageContainer = styled.div`
  position: relative;
  height: 60vh;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 65vh;
  }
`;

const HeaderImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 100%;
  transform: scale(1.1);
  transform-origin: center 100%;
`;

export const Header = ({ children }: HeaderProps) => {
  return (
    <HeaderStyled>
      <HeaderImageContainer>
        <HeaderImage src={headerImage} alt="History Xplorer Header Image" />
      </HeaderImageContainer>
      {children}
    </HeaderStyled>
  );
};
