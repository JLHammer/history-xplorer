import styled from "styled-components";
import headerImage from "../../assets/header-image.avif";
import { Plate } from "./Plate";

const HeaderStyled = styled.header`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.light.background};
  position: relative;

  body.dark-mode & {
    background-color: ${({ theme }) => theme.colors.dark.background};
  }
`;

const HeaderImageContainer = styled.div`
  overflow: hidden;
`;

const HeaderImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

export const Header = () => {
  return (
    <HeaderStyled>
      <Plate />
      <HeaderImageContainer>
        <HeaderImage src={headerImage} alt="" />
      </HeaderImageContainer>
    </HeaderStyled>
  );
};
