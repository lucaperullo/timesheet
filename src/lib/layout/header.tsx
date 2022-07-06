import {
  Box,
  Button,
  chakra,
  Divider,
  HStack,
  List,
  ListItem,
  useColorModeValue,
  Text,
  Avatar,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";

import { RiFileAddLine, RiLogoutCircleLine } from "react-icons/ri";
import { useStateValue } from "../../context/state";

import { ColorModeSwitcher } from "../darkmode_switch";
import Logo from "../logo";
import DrawerComponent from "./drawer";
import styles from "./styles.module.css";
const Header = () => {
  async function signOut() {
    try {
      await Auth.signOut();
      dispatch({
        type: "RESET_STATE",
      });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const [state, dispatch] = useStateValue();

  const neon = useColorModeValue(styles.title, styles.title_dark);
  const bg = useColorModeValue(styles.header_light, styles.header_dark);
  const sidebarStyle = useColorModeValue(styles.sidebar, styles.sidebar_dark);
  const textContainer = useColorModeValue(
    styles.text_container,
    styles.text_container_dark
  );
  const sidebarStyle2 = useColorModeValue(
    styles.sidebar2,
    styles.sidebar2_dark
  );

  return (
    <>
      <DrawerComponent />
      <HStack as="header" className={bg}>
        <Box className={styles.navbarContent}>
          <Logo />
          <Box className={styles.element} />
          <Box textAlign={"center"} className={textContainer}>
            <chakra.p className={neon}>Timesheet</chakra.p>
            {state.user_group === "Backoffice" && (
              <chakra.p className={styles.backoffice}>backoffice</chakra.p>
            )}
          </Box>

          <ColorModeSwitcher justifySelf="flex-start" />
        </Box>
      </HStack>

      <>
        <Box width={"100%"} className={sidebarStyle}>
          <Box
            mb={"10px"}
            className={styles.userImage}
            backgroundImage={useColorModeValue(
              "url(/wallpapers/w14.svg)",
              "url(/wallpapers/w19.svg)"
            )}
            backgroundSize={"cover"}
            backgroundPosition={"center"}
          >
            <Avatar
              name={state.user.name + " " + state.user.surname}
              size="lg"
            />
          </Box>
          <Text mt="7" color={"gray"} fontSize="xs">
            {state.user.email}
          </Text>
          <Divider mt={"2"} mb="2" />
          <Box className={styles.userName}>
            <p>
              Benvenuto <br /> {state.user.name + " " + state.user.surname}
            </p>
          </Box>
          <Divider mt={"2"} />
          <List my="2" spacing={1}>
            <ListItem>
              <Button
                onClick={signOut}
                variant={"ghost"}
                size={"sm"}
                colorScheme="red"
                aria-label="Search database"
              >
                Esci
                <Box ml="6px">
                  <RiLogoutCircleLine size={"18px"} />
                </Box>
              </Button>
            </ListItem>
          </List>
        </Box>
      </>
    </>
  );
};

export default Header;
