import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useStateValue } from "../../../context/state";
import { isFerialDay } from "../../../utils/utils";

export default function DaysOfTheMonth() {
  const [state] = useStateValue();
  const year = state.timesheetModalState.year;
  const month = state.timesheetModalState.month;
  const days = state.timesheetModalState.days;

  const getActualDayString = (day: number) => {
    const date = new Date(year, month - 1, day);
    return date.toLocaleString("it-IT", {
      weekday: "short",
    });
  };
  const bgFerial = useColorModeValue("gray.700", "gray.100");
  const colorFerial = useColorModeValue("#ffffff", "gray.600");
  const bg = useColorModeValue("#dedede", "gray.600");
  const textColor = useColorModeValue("#000", "#fff");
  return (
    <Box display={"flex"}>
      {days &&
        days?.map((day: any) => (
          <Box
            key={day}
            width={"60px"}
            height={"50px"}
            borderRadius={"5px"}
            backgroundColor={!isFerialDay(day, month - 1, year) ? bgFerial : bg}
            marginRight={"10px"}
            marginBottom={"10px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text
              display={"flex"}
              justifyContent="center"
              alignItems="center"
              flexDir="column"
              color={
                !isFerialDay(day, month - 1, year) ? colorFerial : textColor
              }
            >
              <Box as="span" fontWeight={800} fontSize={"12px"}>
                {" "}
                {getActualDayString(day)}
              </Box>
              <Box as="span" fontSize={"14px"}>
                {day}
              </Box>
            </Text>
          </Box>
        ))}
    </Box>
  );
}
