import { Box, useColorModeValue, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./styles.module.css";
export default function Logo() {
  const bg = useColorModeValue(styles.bg, styles.bg_dark);
  return (
    <Box className={bg}>
      <Text className={styles.text}>Fides</Text>
    </Box>
  );
}
