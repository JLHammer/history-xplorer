import styled from "styled-components";

export const Message = styled.p`
  padding: ${({ theme }) => theme.spacing.m};
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.s};
  color: ${({ theme }) => theme.colors.light.heading};

  body.dark-mode & {
    color: ${({ theme }) => theme.colors.dark.heading};
  }
`;
