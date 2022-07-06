import {
  Box,
  Button,
  InputGroup,
  InputLeftAddon,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useStateValue } from "../../../context/state";
import { saveUserTimesheet } from "../../../utils/apiCalls";
import { isFerialDay } from "../../../utils/utils";

import styles from "./styles.module.css";
export default function ModalFooter({
  showSenderModal,
  setShowSenderModal,
}: {
  showSenderModal: boolean;
  setShowSenderModal: (value: boolean) => void;
}) {
  const [state, dispatch] = useStateValue();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const commesse_selezionate = state?.commesse_selezionate;
  const daysForEachCommessa = commesse_selezionate?.map(
    (commesse_selezionata: any) => commesse_selezionata?.days
  );
  const hoursFromDays = daysForEachCommessa.map((days: any) => {
    return days.map((day: any) => day?.hours);
  });
  // console.log(hoursFromDays);
  const sumOfHours = hoursFromDays.map((array: any) => {
    return array.reduce(
      (acc: any, curr: any) => parseInt(acc) + parseInt(curr),
      0
    );
  });
  // console.log(sumOfHours);
  const total = sumOfHours.reduce(
    (acc: any, curr: any) => parseInt(acc) + parseInt(curr),
    0
  );
  // console.log(total);
  const year = state.timesheetModalState.year;
  const month = state.timesheetModalState.month;
  const monthString = new Date(year, month, 0).toLocaleString("it-IT", {
    month: "long",
  });

  const updatePayload =
    state.commesse_selezionate.length > 0
      ? {
          days: state.timesheetModalState.days.map((day: any) => {
            return {
              day: day,
              details: [
                ...state?.commesse_selezionate?.map((commessa: any) => {
                  return {
                    notes: commessa?.days[day - 1]?.info,
                    hour:
                      commessa?.days[day - 1]?.hours !== "" &&
                      commessa?.days[day - 1]?.hours !== null
                        ? commessa?.days[day - 1]?.hours
                        : 0,
                    commission: commessa?.commessa?._id,
                    commissionCode: commessa?.commessa?.code,
                  };
                }),
              ],
            };
          }),
          status: "DRAFT",
        }
      : {};
  const payload =
    state.commesse_selezionate.length > 0
      ? {
          month: monthString,
          year: year,
          days: state.timesheetModalState.days.map((day: any) => {
            return {
              day: day,
              details: [
                ...state?.commesse_selezionate?.map((commessa: any) => {
                  return {
                    notes: commessa?.days[day - 1]?.info,
                    hour:
                      commessa?.days[day - 1]?.hours !== "" &&
                      commessa?.days[day - 1]?.hours !== null
                        ? commessa?.days[day - 1]?.hours
                        : 0,
                    commission: commessa?.commessa._id,
                    commissionCode: commessa?.commessa.code,
                  };
                }),
              ],
            };
          }),
          status: "DRAFT",
        }
      : {};
  return (
    <Box
      backgroundColor={useColorModeValue("gray.100", "gray.700")}
      position="relative"
      bottom={"0px"}
      left={0}
      width="100%"
      height={"72px"}
      className={styles.footer}
      justifyContent="flex-end"
      display={"flex"}
      alignItems="center"
      px="2"
    >
      <Box display={"flex"} width={"100%"}>
        <InputGroup maxW="145" w="145" mr={2} ml={2}>
          <InputLeftAddon
            h="41px"
            color={useColorModeValue("gray.200", "gray.900")}
            backgroundColor={useColorModeValue("gray.700", "gray.200")}
            children="Tot"
          />
          <Button
            color={useColorModeValue("gray.900", "gray.100")}
            variant={"filled"}
            overflow="hidden"
            backgroundColor={useColorModeValue("gray.300", "")}
            textOverflow="ellipsis"
            whiteSpace={"nowrap"}
            children={isNaN(total) ? "" : total}
            disabled
            isLoading={isNaN(total) ? true : false}
            display={"flex"}
            alignItems="center"
            justifyContent="center"
            w="91px"
          />
        </InputGroup>
        {/* <InputGroup maxW="100" mr={2} ml={2}>
          <InputLeftAddon children="Str" />
          <Input value={0} disabled />
        </InputGroup> */}
      </Box>
      <Button
        isLoading={isLoading}
        variant={"solid"}
        colorScheme="blue"
        onClick={() => {
          setIsLoading(true);
          state.commesse_selezionate.length > 0 &&
            saveUserTimesheet(
              !state?.timesheet_salvati ? payload : updatePayload,
              !state?.timesheet_salvati ? true : false,
              state?.timesheet_salvati?._id && state.timesheet_salvati._id
            ).then((res: any) => {
              if (res.status === 200) {
                dispatch({
                  type: "SET_TIMESHEET_SALVATI",
                  payload: res.data,
                });
                setIsLoading(false);
                setShowSenderModal(false);
                toast({
                  title: "Timesheet salvato.",
                  description: "Il timesheet è stato salvato con successo.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                  position: "top-right",
                });
              } else {
                setIsLoading(false);
                toast({
                  title: "Errore",
                  description: "Errore durante il salvataggio del timesheet.",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                  position: "top-right",
                });
              }
            });
        }}
        mr={2}
        cursor={"pointer"}
        _hover={{
          backgroundColor: useColorModeValue("blue.300", "blue.400"),
        }}
        _active={{
          backgroundColor: useColorModeValue("blue.300", "blue.700"),
        }}
      >
        Salva
      </Button>
      <Button
        variant={"solid"}
        colorScheme="whatsapp"
        onClick={() => {
          setShowSenderModal(true);
        }}
        cursor={"pointer"}
        _hover={{
          backgroundColor: useColorModeValue("green.300", "green.400"),
        }}
        _active={{
          backgroundColor: useColorModeValue("green.300", "green.700"),
        }}
      >
        Invia
      </Button>
    </Box>
  );
}
