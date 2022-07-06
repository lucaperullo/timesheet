import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Box,
  useColorModeValue,
  chakra,
  Text,
  Code,
  Badge,
  Flex,
  Tag,
  Hide,
  Show,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import moment from "moment";
import { useState } from "react";

import { useStateValue } from "../../context/state";

export default function TimesheetDetailModal() {
  const [state, dispatch] = useStateValue();
  const [refuseModal, setRefuseModal] = useState(false);
  const bg = useColorModeValue("gray.200", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.900");
  const bg3 = useColorModeValue("gray.300", "gray.600");
  const month = !!state.timesheet_detail && state.timesheet_detail.month;
  const year = !!state.timesheet_detail && state.timesheet_detail.year;
  return (
    <motion.div layout>
      {!!state.timesheet_detail && (
        <Modal
          motionPreset="slideInBottom"
          size={"full"}
          isOpen={!!state.timesheet_detail}
          onClose={() =>
            dispatch({
              type: "SET_TIMESHEET_DETAIL",
              payload: null,
            })
          }
        >
          <ModalOverlay />
          <ModalContent overflowX="hidden">
            <ModalHeader
              display={"flex"}
              w="100%"
              backgroundColor={bg}
              position="fixed"
              top="0"
              zIndex={2}
              h={{
                base: "95px",
                md: "auto",
              }}
            >
              Informazioni dettagliate
              <Hide below="md">
                <Flex
                  w={"100%"}
                  position={"absolute"}
                  left="260px"
                  top="14px"
                  zIndex={2}
                >
                  <Badge
                    variant="solid"
                    mr="2"
                    colorScheme={
                      state.timesheet_detail.status === "DRAFT" ? "pink" : "red"
                    }
                    height="30px"
                    textAlign={"center"}
                    display="flex"
                    alignItems="center"
                    borderRadius={5}
                    justifyContent="center"
                    px="2"
                  >
                    {state.timesheet_detail.status === "DRAFT"
                      ? "Stato : Bozza"
                      : "Stato : Da approvare"}
                  </Badge>
                  <Badge
                    px="2"
                    borderRadius={5}
                    height="30px"
                    textAlign={"center"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    variant="solid"
                    mr="2"
                    colorScheme={"green"}
                  >
                    ultima modifica :
                    {" " + moment(state.timesheet_detail.updatedAt).fromNow()}
                  </Badge>
                </Flex>
              </Hide>
              <Show below="md">
                <Flex w={"100%"} position={"fixed"} top="50px" zIndex={2}>
                  <Badge
                    variant="solid"
                    mr="2"
                    colorScheme={"teal"}
                    height="30px"
                    textAlign={"center"}
                    display="flex"
                    alignItems="center"
                    borderRadius={5}
                    justifyContent="center"
                    px="2"
                  >
                    stato :{" " + state.timesheet_detail.status}
                  </Badge>
                  <Badge
                    px="2"
                    borderRadius={5}
                    textAlign={"center"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    variant="solid"
                    mr="2"
                    colorScheme={"yellow"}
                  >
                    ultima modifica :
                    {" " + moment(state.timesheet_detail.updatedAt).fromNow()}
                  </Badge>
                </Flex>
              </Show>
            </ModalHeader>
            <ModalCloseButton
              position="fixed"
              top="10px"
              right={"8"}
              zIndex={2}
            />
            <ModalBody backgroundColor={bg2} p="2">
              <Box w="100%" textAlign="center" pt="20">
                <Text
                  fontWeight={100}
                  textTransform={"lowercase"}
                  fontSize={"38px"}
                  my="2"
                >
                  {month}
                </Text>
              </Box>

              <Box
                textAlign={"center"}
                display={"grid"}
                gridTemplateColumns={{
                  base: "repeat(2, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(5, 1fr)",
                  lg: "repeat(6, 1fr)",
                  xl: "repeat(8, 1fr)",
                }}
              >
                {state.timesheet_detail.days.map(
                  (day: {
                    createdAt: Date;
                    day: number;
                    details: [
                      {
                        notes: string;
                        hour: number;
                        commission: {
                          code: string;
                          enterprise: string;
                          location: string;
                          type: string;
                          _id: string;
                        };
                        commissionCode: string;
                        _id: string;
                      }
                    ];
                    updatedAt: Date;
                    _id: string;
                  }) => {
                    const convertMonthStringToNumber = (month: string) => {
                      switch (month) {
                        case "GENNAIO":
                          return 1;
                        case "FEBBRAIO":
                          return 2;
                        case "MARZO":
                          return 3;
                        case "APRILE":
                          return 4;
                        case "MAGGIO":
                          return 5;
                        case "GIUGNO":
                          return 6;
                        case "LUGLIO":
                          return 7;
                        case "AGOSTO":
                          return 8;
                        case "SETTEMBRE":
                          return 9;
                        case "OTTOBRE":
                          return 10;
                        case "NOVEMBRE":
                          return 11;
                        case "DICEMBRE":
                          return 12;
                        default:
                          return 0;
                      }
                    };
                    const dayNumber = day.day;
                    const dayMonth = convertMonthStringToNumber(month);
                    const dayYear = year;
                    const dayDate = new Date(dayYear, dayMonth - 1, dayNumber);
                    const dayToDayString = moment(dayDate).format("dddd");

                    return day.details.map(
                      (detail: {
                        notes: string;
                        hour: number;
                        commission: {
                          code: string;
                          enterprise: string;
                          location: string;
                          type: string;
                          _id: string;
                        };
                        commissionCode: string;
                        _id: string;
                      }) => {
                        return (
                          <motion.div
                            key={detail._id}
                            initial={{
                              opacity: 0,
                              y: -30,
                              display: "flex",
                              justifyContent: "center",
                            }}
                            whileInView={{
                              opacity: 1,
                              y: 0,
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Box
                              p="2"
                              minH={"130px"}
                              maxH="130px"
                              minW="140px"
                              maxW="150px"
                              borderRadius={"5px"}
                              m="2"
                              backgroundColor={bg}
                              _hover={{
                                backgroundColor: bg3,
                                overflow: "auto",
                              }}
                              overflow="hidden"
                            >
                              <chakra.p
                                w="100%"
                                backgroundColor={bg2}
                                fontWeight={500}
                                borderRadius={"5px"}
                              >
                                {dayToDayString} {day.day}
                              </chakra.p>
                              <Badge
                                width={100}
                                variant="outline"
                                colorScheme={"pink"}
                                textOverflow="ellipsis"
                                whiteSpace={"nowrap"}
                                overflow={"hidden"}
                              >
                                {detail.commission.enterprise}
                              </Badge>

                              {detail.notes.length > 0 && (
                                <Badge colorScheme="yellow" variant="solid">
                                  {detail.notes}
                                </Badge>
                              )}

                              {detail.hour > 0 && (
                                <Badge variant={"solid"} colorScheme="blue">
                                  {" "}
                                  {detail.hour} ore
                                </Badge>
                              )}
                            </Box>
                          </motion.div>
                        );
                      }
                    );
                  }
                )}
              </Box>
            </ModalBody>

            <ModalFooter
              position={"fixed"}
              bottom="0"
              zIndex={2}
              width="100%"
              backgroundColor={bg}
            >
              {state.user_group === "Backoffice" &&
                state.timesheet_detail.status === "TO_APPROVE" && (
                  <Button
                    mr={3}
                    colorScheme="green"
                    variant="solid"
                    onClick={() => {
                      console.log("change status to approved");
                    }}
                  >
                    Approva
                  </Button>
                )}
              {state.user_group === "Backoffice" &&
                state.timesheet_detail.status === "TO_APPROVE" && (
                  <Button
                    mr={3}
                    colorScheme="yellow"
                    variant="solid"
                    onClick={() => {
                      setRefuseModal(true);
                    }}
                  >
                    Rifiuta
                  </Button>
                )}
              <Button
                colorScheme="red"
                mr={3}
                onClick={() => {
                  dispatch({
                    type: "SET_TIMESHEET_DETAIL",
                    payload: null,
                  });
                }}
              >
                Chiudi
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </motion.div>
  );
}
