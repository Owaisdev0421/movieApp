export interface ColorsProps {
  primary: string;
  darkPrimary: string;
  lightPrimary: string;
  secondary: string;
  accent: string;
  warning: string;
  red: string;
  white: string;
  background: string;
  grey: string;
  primaryText: string;
  black: string;
  darkGrey: string;
  lightGreen: string;
  darkOrange: string;
  grey100: string;
  grey50: string;
}

const light: ColorsProps = {
  primary: "#F15A24",
  darkPrimary: "#D2181B",
  lightPrimary: "#FF7342",
  secondary: "#A3E1DE",
  accent: "#FF998E",
  warning: "#FFB6C1",
  red: "#FE7475",
  white: "#FFFFFF",
  background: "#F9FAFC",
  grey: "#BBBBBB",
  primaryText: "#33333C",
  black: "#000000",
  darkGrey: "#808087",
  lightGreen: "#E8FCF7",
  darkOrange: "#e23d14",
  grey100: "#CCCCD1",
  grey50: "#EDF0F5",
};

const dark: ColorsProps = {
  primary: "#F15A24",
  darkPrimary: "#D2181B",
  lightPrimary: "#FF7342",
  secondary: "#A3E1DE",
  accent: "#FF998E",
  warning: "#FFB6C1",
  red: "#FE7475",
  white: "#FFFFFF",
  background: "#F9FAFC",
  grey: "#BBBBBB",
  primaryText: "#33333C",
  black: "#000000",
  darkGrey: "#808087",
  lightGreen: "#E8FCF7",
  darkOrange: "#e23d14",
  grey100: "#CCCCD1",
  grey50: "#EDF0F5",
};

export type ColorThemeProps = "light" | "dark";

export const colors: { [key in ColorThemeProps]: ColorsProps } = {
  light,
  dark,
};
