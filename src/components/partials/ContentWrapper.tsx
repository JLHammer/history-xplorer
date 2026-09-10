import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { Main } from "./Main";
import { Plate, type PlateProps } from "./Plate";
import type { ReactNode } from "react";

type ContentWrapperProps = PlateProps & {
  children?: ReactNode;
};

export const ContentWrapper = ({
  label,
  value,
  valueEmpty,
  control,
  subheading,
  description,
  children,
}: ContentWrapperProps) => {
  return (
    <>
      <Header>
        <Plate
          label={label}
          value={value}
          valueEmpty={valueEmpty}
          control={control}
          subheading={subheading}
          description={description}
        />
      </Header>
      <NavBar />
      <Main>{children}</Main>
    </>
  );
};
