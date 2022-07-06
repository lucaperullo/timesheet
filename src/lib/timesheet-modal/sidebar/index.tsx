import {
  Box,
  IconButton,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import styles from "./styles.module.css";
import { useStateValue } from "../../../context/state";
import { MdAutoFixHigh, MdCleaningServices } from "react-icons/md";

import { isFerialDay } from "../../../utils/utils";
import Typist from "react-typist";

export default function TimesheetSidebar() {
  const [state, dispatch] = useStateValue();
  const month = state.timesheetModalState.month;
  const year = state.timesheetModalState.year;
  const sidebarExpanded = useColorModeValue(
    styles.sidebar_expanded,
    styles.sidebar_expanded_dark
  );
  const commessabg = useColorModeValue("#d3d3d39e", "#7eb0ffdb");

  //  logica autocomplete

  const commissionDays = (index: number) => {
    const commesse_selezionate = state.commesse_selezionate;
    const days = commesse_selezionate[index].days;
    days.forEach((day: any, i: number) => {
      day.hours = isFerialDay(i + 1, month - 1, year) ? 0 : 8;
    });
    dispatch({
      type: "SET_COMMESSE_SELEZIONATE",
      payload: [
        ...commesse_selezionate,
        // {
        //   [index]: {
        //     ...commesse_selezionate[index],
        //     days,
        //   },
        // },
      ],
    });
    dispatch({
      type: "SET_COMMESSA_AUTO",
      payload: true,
    });
  };
  const resetCommissionDays = (index: number) => {
    const commesse_selezionate = state.commesse_selezionate;
    const days = commesse_selezionate[index].days;
    days.forEach((day: any, i: number) => {
      day.hours = 0;
    });
    dispatch({
      type: "SET_COMMESSE_SELEZIONATE",
      payload: [
        ...commesse_selezionate,
        // {
        //   [index]: {
        //     ...commesse_selezionate[index],
        //     days,
        //   },
        // },
      ],
    });
  };

  return (
    <Box className={sidebarExpanded}>
      <Box height="100%" mt="95px">
        {state.commesse_selezionate.length > 0
          ? state.commesse_selezionate.map((timesheet: any, i: number) => (
              <Box
                key={i}
                backgroundColor={commessabg}
                backdropFilter={"blur(10px)"}
                borderRadius={"50%"}
                width={"65.99px"}
                height={"65.99px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                borderBottom={"1px solid #7979794f"}
                fontWeight={"500"}
                marginBottom="10px"
                position={"relative"}
              >
                <IconButton
                  onClick={() => resetCommissionDays(i)}
                  aria-label="autocomplete"
                  size="xs"
                  icon={<MdCleaningServices size={"18px"} />}
                  colorScheme={"red"}
                  variant="solid"
                  position={"absolute"}
                  top={"-6px"}
                  right={"5px"}
                />
                <IconButton
                  onClick={() => {
                    commissionDays(i);
                  }}
                  aria-label="autocomplete"
                  size="xs"
                  icon={<MdAutoFixHigh size={"18px"} />}
                  colorScheme={"whatsapp"}
                  variant="solid"
                  position={"absolute"}
                  top={"-6px"}
                  left="5px"
                />
                <Typist
                  cursor={{
                    show: false,
                  }}
                >
                  <Tooltip
                    hasArrow
                    placement="right-start"
                    label={`${timesheet.commessa.enterprise} - ${timesheet.commessa.code}`}
                    aria-label="A tooltip"
                  >
                    <Text
                      className={styles.commessaText}
                      width={"60px"}
                      textOverflow={"ellipsis"}
                      whiteSpace={"nowrap"}
                      overflow={"hidden"}
                      fontSize="15px"
                    >
                      {timesheet.commessa.enterprise}
                    </Text>
                  </Tooltip>
                </Typist>
              </Box>
            ))
          : null}
      </Box>
    </Box>
  );
}
