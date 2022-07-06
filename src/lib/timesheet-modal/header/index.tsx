import {
  Box,
  IconButton,
  useColorModeValue,
  chakra,
  Tooltip,
} from "@chakra-ui/react";
import { RiArrowDownLine } from "react-icons/ri";
import { IoClose, IoCloseOutline } from "react-icons/io5";
import { useStateValue } from "../../../context/state";

import Autocomplete from "../../autocomplete";
import styles from "./styles.module.css";

export default function Header() {
  const [state, dispatch] = useStateValue();

  const deleteCommessa = (id: string) => {
    dispatch({
      type: "SET_COMMESSE_SELEZIONATE",
      payload: state.commesse_selezionate.filter(
        (t: any) => t.commessa.code !== id
      ),
    });
  };
  const bg = useColorModeValue("#dedede", "gray.600");
  const tabBg = useColorModeValue("white", "gray.700");
  return (
    <Box
      position={"relative"}
      height={"40px"}
      // borderRadius={"5px"}
      width={"100%"}
      display={"flex"}
      //   justifyContent={"space-between"}
      backgroundColor={bg}
      zIndex={3}
      className={styles.nav}
      backgroundImage={useColorModeValue(
        "url(/wallpapers/w25.svg)",
        "url(/wallpapers/w28.svg)"
      )}
      backgroundSize={"cover"}
      backgroundPosition={"center"}
    >
      <IconButton
        className={styles.button}
        borderRadius={0}
        icon={<RiArrowDownLine />}
        transform={!state.timesheetModal ? "rotate(180deg)" : "rotate(0deg)"}
        variant="ghost"
        colorScheme="dark"
        onClick={() =>
          dispatch({
            type: "SET_TIMESHEET_MODAL",
            payload: !state.timesheetModal,
          })
        }
        aria-label={"close-modal"}
      />
      <Box width="200px" position={"relative"}>
        <Autocomplete active br="0" />
      </Box>
      <Box
        width={"100%"}
        overflow={"hidden"}
        display={"flex"}
        paddingLeft="15px"
        justifyContent={"flex-start"}
      >
        {state.commesse_selezionate.length > 0 &&
          state?.commesse_selezionate?.map((timesheet: any, i: number) => {
            return (
              <Tooltip
                key={i}
                label={`${timesheet.commessa.enterprise} - ${timesheet.commessa.code}`}
                aria-label="A tooltip"
              >
                <Box
                  className={styles.commessa}
                  maxWidth={"200px"}
                  width={"auto"}
                  marginTop="3px"
                  marginRight={"6px"}
                  paddingLeft={"4px"}
                  paddingRight={"24px"}
                  // borderRadius={"5px"}
                  backgroundColor={tabBg}
                  height={"35px"}
                  textOverflow={"ellipsis"}
                  overflow={"hidden"}
                  whiteSpace={"nowrap"}
                  display="flex"
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  position={"relative"}
                >
                  <IconButton
                    position={"relative"}
                    className={styles.buttonDelete}
                    right={"1px"}
                    borderRadius="0"
                    size="xs"
                    icon={<IoClose size={"18px"} />}
                    onClick={() => deleteCommessa(timesheet.commessa.code)}
                    aria-label={"remove-commessa"}
                  ></IconButton>

                  <chakra.p
                    paddingLeft={"4px"}
                    textOverflow={"ellipsis"}
                    overflow={"hidden"}
                    whiteSpace={"nowrap"}
                    fontSize={"13px"}
                  >
                    {timesheet.commessa.enterprise}
                  </chakra.p>
                </Box>
              </Tooltip>
            );
          })}
      </Box>
      <Box>
        {/* <Button variant="solid" colorScheme={"green"}>
          Aggiungi
        </Button> */}
      </Box>
    </Box>
  );
}
