import { Box } from "@chakra-ui/react";
import { useStateValue } from "../../../context/state";

import HoursInput from "./hourInput";
export default function TableComponent({
  days,
  indexOfNode,
}: {
  days: any;
  indexOfNode: number;
}) {
  // console.log(days);
  return (
    <Box
      width="100%"
      display={"flex"}
      paddingTop={"1rem"}
      position={"relative"}
      paddingLeft={"1rem"}
    >
      <Box width="100%" height={"100%"}>
        {days && <HoursInput days={days} indexOfNode={indexOfNode} />}
      </Box>
    </Box>
  );
}
