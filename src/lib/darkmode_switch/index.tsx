import React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import styles from "./styles.module.css";

import { useStateValue } from "../../context/state";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode: toggleMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(BsMoonStarsFill, BsSunFill);
  const bg = useColorModeValue("gray.600", "gray.200");

  const [state, dispatch] = useStateValue();
  return (
    <IconButton
      size="md"
      fontSize="md"
      borderRadius="full"
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      className={styles.colorModeSwitcher}
      onClick={() => {
        toggleMode();
        // dispatch({ type: "SET_DARKMODE", payload: !state.darkmode });
      }}
      icon={<SwitchIcon color={bg} />}
    />
  );
};
