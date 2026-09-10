import { Icon, type IconProps } from "./Icon";

export const UpArrowIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9.25" />
    <path d="M12 16.5v-9" />
    <path d="M8.5 11 12 7.5 15.5 11" />
  </Icon>
);
