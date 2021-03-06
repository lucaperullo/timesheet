import { extendTheme, theme as base } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";

const styles = {
  global: (props: StyleFunctionProps | Dict<any>) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("#7598a2", "#14181d")(props),
      transitionProperty: "background-color",
      transitionDuration: "normal",
    },
  }),
};

const colors = {
  brand: {
    50: "#f6e8ff",
    100: "#e3bdff",
    200: "#cd94ff",
    300: "#b46ef7",
    400: "#9a4ce7",
    500: "#7e31ce",
    600: "#641eab",
    700: "#4b1483",
    800: "#341158",
    900: "#1e0d2d",
  },
};

// const fonts = {
//   heading: `Josefin Sans, ${base.fonts.heading}`,
// };

const components = {
  Button: {
    variants: {
      pill: (props: StyleFunctionProps) => ({
        ...base.components.Button.variants.outline(props),
        rounded: "full",
        color: "gray.500",
      }),
    },
  },
};

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({ config, styles, colors, components });
export default theme;
