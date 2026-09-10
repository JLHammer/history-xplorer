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
  --fold-width: 3.5rem;
  --fold-height: 2.75rem;

  position: relative;
  height: 60vh;
  overflow: hidden;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    height: 65vh;
  }

  &::before,
  &::after {
    content: "";
    display: none;
    position: absolute;
    top: 0;
    z-index: 1;
    width: var(--fold-width);
    height: var(--fold-height);
    background-color: ${({ theme }) => theme.colors.light.corner};

    body.dark-mode & {
      background-color: ${({ theme }) => theme.colors.dark.corner};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
      display: block;
    }
  }

  &::before {
    left: 0;
    clip-path: polygon(0 0, 100% 0, 0 100%);
  }

  &::after {
    right: 0;
    clip-path: polygon(0 0, 100% 0, 100% 100%);
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
