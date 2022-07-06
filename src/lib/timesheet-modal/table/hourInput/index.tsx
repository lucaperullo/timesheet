import {
  Box,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  PinInput,
  PinInputField,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { IoInformationOutline } from "react-icons/io5";
import { useStateValue } from "../../../../context/state";
import { arrayToString, isFerialDay } from "../../../../utils/utils";
import styles from "./styles.module.css";

export default function HoursInput({
  days,
  indexOfNode,
}: {
  days: any;
  indexOfNode: number;
}) {
  const [state, disptach] = useStateValue();
  const [showInfo, setShowInfo] = React.useState(false);
  const bgFerial = useColorModeValue("gray.700", "gray.100");
  const colorFerial = useColorModeValue("#ffffff", "gray.600");
  const bg = useColorModeValue("#dedede", "gray.600");
  const textColor = useColorModeValue("#000", "#fff");
  const year = state.timesheetModalState.year;
  const month = state.timesheetModalState.month;

  const daysNumberInArray = state.timesheetModalState.days;

  return (
    <Box width="100%" display={"flex"}>
      <Box width="100%" display={"flex"}>
        <IconButton
          onClick={() => setShowInfo(!showInfo)}
          className={styles.icon}
          variant="solid"
          colorScheme={"telegram"}
          left="0"
          aria-label={"info"}
          position={"absolute"}
          zIndex={1}
          size={"xs"}
          icon={<IoInformationOutline />}
        />
        {days && (
          <form className={styles.form}>
            {days?.length > 0 &&
              days?.map((day: any, i: number) => {
                return (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      x: -15,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                  >
                    <Box className={styles.input}>
                      <Input
                        height={"50px"}
                        width={"60.1px"}
                        size="xs"
                        textAlign={"center"}
                        borderRadius={"5px"}
                        display={showInfo ? "flex" : "none"}
                        value={day.info || ""}
                        onChange={(e) => {
                          const commesse_selezionate =
                            state.commesse_selezionate;
                          commesse_selezionate[indexOfNode].days[i].info =
                            e.target.value;
                          disptach({
                            type: "SET_COMMESSE_SELEZIONATE",
                            payload: [...commesse_selezionate],
                          });
                        }}
                        placeholder={"info"}
                      />

                      <NumberInput
                        value={
                          isFerialDay(daysNumberInArray[i], month - 1, year)
                            ? 0
                            : day.hours
                        }
                        defaultValue={0}
                        min={0}
                        max={16}
                        size="xs"
                        step={0.5}
                        onKeyDown={(e) => {
                          if (e.key === typeof NaN) {
                            const value = parseInt(e.key || 0);
                            const commesse_selezionate =
                              state.commesse_selezionate;
                            const days = commesse_selezionate[indexOfNode].days;
                            days[i].hours = value;
                            disptach({
                              type: "SET_COMMESSE_SELEZIONATE",
                              payload: [...commesse_selezionate],
                            });
                          }
                        }}
                        onChange={(e) => {
                          const commesse_selezionate =
                            state.commesse_selezionate;
                          const days = commesse_selezionate[indexOfNode].days;
                          days[i].hours = parseInt(e || "0");
                          disptach({
                            type: "SET_COMMESSE_SELEZIONATE",
                            payload: [...commesse_selezionate],
                          });
                        }}
                        paddingInline={"0"}
                        display={!showInfo ? "flex" : "none"}
                        // textAlign="center"
                        // border="1px solid #000"
                        textAlign="center"
                        justifyContent={"center"}
                        alignItems={"center"}
                        cursor={"pointer"}
                        children={
                          <NumberInputField
                            backgroundColor={
                              !isFerialDay(day, month - 1, year) ? bgFerial : bg
                            }
                            color={
                              !isFerialDay(day, month - 1, year)
                                ? colorFerial
                                : textColor
                            }
                            userSelect={
                              isFerialDay(daysNumberInArray[i], month - 1, year)
                                ? "none"
                                : "auto"
                            }
                            opacity={
                              isFerialDay(daysNumberInArray[i], month - 1, year)
                                ? "0.5"
                                : "1"
                            }
                            cursor={
                              isFerialDay(daysNumberInArray[i], month - 1, year)
                                ? "not-allowed"
                                : "auto"
                            }
                            paddingInline={"0"}
                            textAlign={"center"}
                            className={styles.numberInput}
                          />
                        }
                      />
                    </Box>
                  </motion.div>
                );
              })}
          </form>
        )}
      </Box>
    </Box>
  );
}
