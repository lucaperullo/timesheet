import { Box, useColorModeValue, Text, Button } from "@chakra-ui/react";
import Typist from "react-typist";
import { HiCursorClick } from "react-icons/hi";
import { useStateValue } from "../../../context/state";

import styles from "./styles.module.css";

import StoricoTimesheets from "./storico_timesheets";
export default function ResumeContainer() {
  const [state, dispatch] = useStateValue();
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      w={"700px"}
      backgroundColor={bg}
      height={"65vh"}
      zIndex={1}
      className={styles.resumeContainer}
      boxShadow="rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;"
      display="flex"
      overflow={"hidden"}
    >
      {!!state.storico_timesheets && <StoricoTimesheets />}{" "}
      {!state.storico_timesheets && (
        <Box
          w={"100%"}
          display={"inline-block"}
          justifyContent={"center"}
          alignItems="flex-start"
          paddingTop={"10%"}
        >
          <Typist
            cursor={{
              show: false,
            }}
          >
            <Text
              textAlign={"center"}
              className={styles.text}
              fontWeight={"100"}
            >
              Non hai ancora inviato nessun timesheet.
              <br />
              <Button
                onClick={() => {
                  dispatch({
                    type: "SET_TIMESHEET_MODAL",
                    payload: true,
                  });
                  dispatch({
                    type: "SET_AUTOCOMPLETE",
                    payload: true,
                  });
                }}
                cursor={"pointer"}
                colorScheme={"telegram"}
              >
                Inizia qui <HiCursorClick size="25px" />
              </Button>{" "}
              <br />
            </Text>
          </Typist>
        </Box>
      )}
    </Box>
  );
}
