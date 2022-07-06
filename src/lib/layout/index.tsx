import { Box } from "@chakra-ui/react";
import { ReactNode, useEffect } from "react";

import AutocompleteModal from "../autocomplete_modal";

import Header from "./header";
import styles from "./styles.module.css";
type LayoutProps = {
  children: ReactNode;
  children2?: ReactNode;
  title: string;
  description: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <Box
      minW={"1228px"}
      display="flex"
      justifyContent="space-between"
      px={{
        base: "0",
        md: "2",
        lg: "8",
      }}
      className={styles.layout}
    >
      <AutocompleteModal />
      <Box>
        <Header />
      </Box>
      <Box width={"100%"} display={"flex"} flexDir="column">
        <Box className={styles.content}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
