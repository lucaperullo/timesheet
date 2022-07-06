import {
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Drawer,
  Box,
  Img,
  Avatar,
  IconButton,
  Divider,
  Text,
} from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { RiLogoutCircleLine } from "react-icons/ri";

import { useStateValue } from "../../context/state";

import Autocomplete from "../autocomplete";
import styles from "./styles.module.css";

import { useEffect, useState } from "react";
import AnimatedDrawer from "../animated-drawer";

export default function DrawerComponent() {
  const [state, dispatch] = useStateValue();
  async function signOut() {
    try {
      dispatch({
        type: "SET_COMMESSE_SELEZIONATE",
        payload: [],
      });
      await Auth.signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const [isPaused, setIsPaused] = useState(true);
  const [drawer, setDrawer] = useState(false);
  useEffect(() => {
    if (drawer) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
    }
  }, [drawer]);

  return (
    <>
      <Box
        className={styles.drawerButton}
        position={"absolute"}
        zIndex={"9999"}
        top={"7px"}
        width={"50px"}
        height={"50px"}
        padding="2px"
        as="button"
        left={"7px!important"}
        onClick={() => {
          setDrawer(!drawer);
        }}
      >
        <AnimatedDrawer isPaused={isPaused} />
      </Box>

      <Drawer
        isOpen={drawer}
        placement="left"
        onClose={() => {
          setDrawer(false);
        }}
      >
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerHeader paddingLeft={"60px"}>
            <Img
              src={"./fides_logo.svg"}
              height="36px"
              width={"300px"}
              position="relative"
              top="-8px"
            />
          </DrawerHeader>

          <DrawerBody paddingTop={"20px"}>
            {!!state.timesheet_salvati &&
              state.timesheet_salvati.status !== "TO_APPROVE" && (
                <Box onClick={() => setDrawer(false)}>
                  <Autocomplete active brb={"0px"} />
                </Box>
              )}
            <Box width={"100%"}>
              <Box mb={"10px"} className={styles.userImageMobile}>
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
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <IconButton
              children={<RiLogoutCircleLine />}
              aria-label={"log-out"}
              colorScheme="red"
              onClick={signOut}
            />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
