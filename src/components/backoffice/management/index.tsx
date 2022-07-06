import {
  Box,
  Button,
  chakra,
  Flex,
  IconButton,
  Input,
  InputGroup,
  SimpleGrid,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { motion } from "framer-motion";
import moment from "moment";
import { useEffect, useState } from "react";
import { FcInfo } from "react-icons/fc";
import { IoSearchOutline } from "react-icons/io5";
import { useStateValue } from "../../../context/state";
import { getTimesheetsBackoffice } from "../../../utils/apiCalls";
import styles from "./styles.module.css";
export default function ManagementComponent() {
  const bg = useColorModeValue("white", "gray.800");

  const [state, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [status, setStatus] = useState("");
  const params = {
    month,
    year,
    name,
    surname,
    status,
  };

  const getAllTimesheets = async () => {
    const response = await getTimesheetsBackoffice();
    dispatch({
      type: "SET_TIMESHEET_BACKOFFICE",
      payload: response,
    });
  };
  useEffect(() => {
    getAllTimesheets();
  }, []);

  return (
    <Box
      w={"700px"}
      backgroundColor={bg}
      borderRadius="5"
      h="65vh"
      className={styles.manageContainer}
      boxShadow={"0px 14px 10px 0px rgb(0 0 0 / 36%)"}
      display="flex"
      flexDir={"column"}
      overflowX={"auto"}
      alignItems={"flex-end"}
      justifyContent={"flex-start"}
      zIndex={2}
      overflow={"hidden"}
      position="relative"
      left={0}
    >
      <TableContainer minH="190px" w={"100%"}>
        <Table size="sm">
          <TableCaption>
            {state?.timesheet_backoffice?.length > 0 &&
              "Ricerca : " +
                " trovati " +
                `${state?.timesheet_backoffice?.length} timesheets`}
          </TableCaption>

          <Tbody>
            <Tr>
              <Td>
                <Input
                  onChange={(e) => {
                    setName(e.currentTarget.value);
                  }}
                  mx="2"
                  paddingLeft="10px"
                  variant="filled"
                  placeholder="nome"
                  type="search"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setName(e.currentTarget.value);
                      const param = new URLSearchParams(params);
                      setIsLoading(true);
                      if (name !== "") {
                        getTimesheetsBackoffice(param).then((response) => {
                          setIsLoading(false);
                          dispatch({
                            type: "SET_TIMESHEET_BACKOFFICE",
                            payload: response,
                          });
                        });
                      }
                    }
                  }}
                ></Input>
              </Td>
              <Td>
                {" "}
                <Input
                  onChange={(e) => {
                    setSurname(e.currentTarget.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSurname(e.currentTarget.value);
                      const param = new URLSearchParams(params);
                      setIsLoading(true);
                      getTimesheetsBackoffice(param).then((response) => {
                        setIsLoading(false);
                        dispatch({
                          type: "SET_TIMESHEET_BACKOFFICE",
                          payload: response,
                        });
                      });
                    }
                  }}
                  paddingLeft="10px"
                  variant="filled"
                  placeholder="cognome"
                  type="search"
                  mr="2"
                ></Input>
              </Td>
              <Td minW="130px">
                <Select
                  placeholder="Stato"
                  tagVariant="solid"
                  onChange={(e: any) => {
                    setStatus(e.value);
                  }}
                  options={[
                    {
                      value: "",
                      label: "Tutti",
                    },
                    {
                      label: "Approvati",
                      value: "APPROVED",
                    },
                    {
                      label: "Da approvare",
                      value: "TO_APPROVE",
                    },

                    {
                      label: "Bozze",
                      value: "DRAFT",
                    },
                  ]}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>
                {" "}
                <Input
                  onChange={(e) => {
                    setMonth(e.currentTarget.value);
                  }}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      setMonth(e.currentTarget.value);
                      const param = new URLSearchParams(params);
                      const response = await getTimesheetsBackoffice(param);
                      dispatch({
                        type: "SET_TIMESHEET_BACKOFFICE",
                        payload: response,
                      });
                    }
                  }}
                  paddingLeft="10px"
                  variant="filled"
                  mx="2"
                  placeholder="mese"
                  type="search"
                ></Input>
              </Td>
              <Td>
                <Input
                  onChange={(e) => {
                    setYear(e.currentTarget.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setYear(e.currentTarget.value);
                      const param = new URLSearchParams(params);
                      setIsLoading(true);
                      getTimesheetsBackoffice(param).then((response) => {
                        setIsLoading(false);
                        dispatch({
                          type: "SET_TIMESHEET_BACKOFFICE",
                          payload: response,
                        });
                      });
                    }
                  }}
                  paddingRight={"10px"}
                  paddingLeft="10px"
                  variant="filled"
                  placeholder="anno"
                  type="search"
                ></Input>
              </Td>
              <Td>
                <Button
                  isLoading={isLoading}
                  width="100%"
                  colorScheme="green"
                  variant="solid"
                  onClick={() => {
                    const param = new URLSearchParams(params);
                    setIsLoading(true);
                    getTimesheetsBackoffice(param).then((response) => {
                      setIsLoading(false);

                      dispatch({
                        type: "SET_TIMESHEET_BACKOFFICE",
                        payload: response,
                      });
                    });
                  }}
                >
                  <IoSearchOutline />
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      {/* map dei timesheet ricercati dal backoffice */}
      <Box overflowY={"auto"} w="100%">
        {state?.timesheet_backoffice?.length > 0 &&
          state.timesheet_backoffice.map((timesheet: any, i: number) => {
            return (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <SimpleGrid
                  spacingY={3}
                  columns={{
                    base: 4,
                  }}
                  fontSize={{
                    base: "sm",
                    md: "md",
                  }}
                  w="full"
                  fontWeight="400"
                  my="2"
                  py={{
                    base: 1,
                    md: 4,
                  }}
                  px={{
                    base: 2,
                    md: 10,
                  }}
                >
                  <chakra.span
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textTransform={"capitalize"}
                    transform={`translateX(5px)`}
                  >
                    {timesheet.month}
                  </chakra.span>
                  <chakra.span
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                    transform={`translateX(5px)`}
                  >
                    {timesheet.year}
                  </chakra.span>
                  <chakra.span
                    textOverflow="ellipsis"
                    overflow="hidden"
                    whiteSpace="nowrap"
                  >
                    {moment(timesheet.updatedAt).format("DD/MM/YYYY")}
                  </chakra.span>
                  <Flex
                    justify={{
                      base: "center",
                    }}
                  >
                    <IconButton
                      icon={<FcInfo size="100%" />}
                      minWidth="20px"
                      minHeight={"20px"}
                      maxHeight={"20px"}
                      maxWidth={"20px"}
                      variant="ghost"
                      colorScheme="blue"
                      borderRadius={"full"}
                      size="sm"
                      aria-label={"info"}
                      onClick={() => {
                        dispatch({
                          type: "SET_TIMESHEET_DETAIL",
                          payload: timesheet,
                        });
                      }}
                    />
                  </Flex>
                </SimpleGrid>
              </motion.div>
            );
          })}
      </Box>
    </Box>
  );
}
