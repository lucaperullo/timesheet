import {
  Box,
  Button,
  chakra,
  Flex,
  IconButton,
  SimpleGrid,
  Stack,
  useColorModeValue,
  Text,
  Badge,
} from "@chakra-ui/react";
import "moment/locale/it";
import moment from "moment";
import { FcInfo } from "react-icons/fc";
import { IoIosAddCircleOutline } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
import { useStateValue } from "../../../../context/state";

import { AiFillUnlock, AiFillLock, AiOutlineHistory } from "react-icons/ai";
import { motion } from "framer-motion";

export default function StoricoTimesheets() {
  const [state, dispatch] = useStateValue();
  const dataColor = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("gray.100", "gray.700");
  const bg3 = useColorModeValue("gray.200", "gray.700");
  const v = useColorModeValue("outline", "solid");
  moment.locale("it");
  return (
    <Flex w="full" overflow={"auto"} flexDirection="column" alignItems="center">
      {!!state.timesheet_salvati &&
        state.timesheet_salvati.status !== "TO_APPROVE" && (
          <Button
            w="90%"
            position={state.user_group !== "Backoffice" ? "sticky" : "static"}
            top={state.user_group !== "Backoffice" ? "10px" : "auto"}
            zIndex={state.user_group !== "Backoffice" ? "3" : "auto"}
            onClick={() => {
              dispatch({
                type: "SET_TIMESHEET_MODAL",
                payload: true,
              });
            }}
            colorScheme={"telegram"}
            my="2"
            variant={v}
            size={"lg"}
            minH="50px"
            rightIcon={<BsArrowRight />}
          >
            Continua a compilare
          </Button>
        )}
      {!state.timesheet_salvati && (
        <Button
          w="90%"
          position={state.user_group !== "Backoffice" ? "sticky" : "static"}
          top={state.user_group !== "Backoffice" ? "10px" : "auto"}
          zIndex={state.user_group !== "Backoffice" ? "3" : "auto"}
          onClick={() => {
            dispatch({
              type: "SET_TIMESHEET_MODAL",
              payload: true,
            });
          }}
          colorScheme={"telegram"}
          my="2"
          variant={v}
          size={"lg"}
          minH="50px"
          rightIcon={<BsArrowRight />}
        >
          Inizia a compilare
        </Button>
      )}
      {state.timesheet_salvati && (
        <Box
          w="90%"
          backgroundColor={bg3}
          position={"sticky"}
          top={state.user_group !== "Backoffice" ? "63px" : "0"}
          zIndex={1}
          my="2"
          p="2"
          display="flex"
          flexDir={"column"}
        >
          <Text pl="2" fontWeight={600} fontSize="18px">
            {" "}
            Timesheet corrente :
          </Text>
          <Box display={"flex"}>
            <Badge
              mx="1"
              variant="solid"
              colorScheme={
                state.timesheet_salvati.status === "DRAFT" ? "pink" : "red"
              }
              maxW="120px"
              w="auto"
              h="30px"
              display={"flex"}
              justifyContent="center"
              alignItems="center"
              borderRadius={5}
            >
              <Text mr="2" textTransform={"lowercase"}>
                {state.timesheet_salvati.status === "DRAFT"
                  ? "BOZZA"
                  : "SALVATO"}
              </Text>

              {state.timesheet_salvati.status === "DRAFT" ? (
                <AiFillUnlock size="17px" />
              ) : (
                <AiFillLock size="17px" />
              )}
            </Badge>
            <Badge
              mx="1"
              variant="solid"
              colorScheme={"green"}
              maxW="200px"
              w="auto"
              h="30px"
              display={"flex"}
              justifyContent="center"
              alignItems="center"
              borderRadius={5}
            >
              <Text mr="2" textTransform={"lowercase"}>
                {moment(
                  state.timesheet_salvati.updatedAt ||
                    state.timesheet_salvati.createdAt
                ).fromNow() + " "}
              </Text>

              <AiOutlineHistory size="17px" />
            </Badge>

            <Button
              variant={v}
              mr={{
                base: "2",
                md: 8,
              }}
              marginLeft={"auto"}
              w="100px"
              h="30px"
              colorScheme={"yellow"}
              onClick={() =>
                dispatch({
                  type: "SET_TIMESHEET_DETAIL",
                  payload: state.timesheet_salvati,
                })
              }
            >
              Info
            </Button>
          </Box>
        </Box>
      )}
      <Stack
        direction={{
          base: "column",
        }}
        w="90%"
        shadow="lg"
        position={"relative"}
      >
        {" "}
        <Flex
          direction={{
            base: "column",
          }}
          bg={dataColor}
        >
          <SimpleGrid
            zIndex={1}
            position={"sticky"}
            top={
              !!state.timesheet_salvati
                ? state.user_group !== "Backoffice"
                  ? "144px"
                  : "90px"
                : "auto"
            }
            spacingY={3}
            columns={{
              base: 4,
            }}
            w={{
              base: "full",
            }}
            whiteSpace={"nowrap"}
            bg={bg2}
            color={"gray.500"}
            py={{
              base: 1,
              md: 4,
            }}
            px={{
              base: 2,
              md: 10,
            }}
            fontSize={{
              base: "sm",
              md: "md",
            }}
            fontWeight="500"
          >
            <chakra.span
              textTransform="capitalize"
              textOverflow={"ellipsis"}
              overflow={"hidden"}
            >
              Mese
            </chakra.span>
            <chakra.span
              textTransform="capitalize"
              textOverflow={"ellipsis"}
              overflow={"hidden"}
            >
              Anno
            </chakra.span>
            <chakra.span
              textTransform="capitalize"
              textOverflow={"ellipsis"}
              overflow={"hidden"}
            >
              Data
            </chakra.span>
            <chakra.span
              textAlign={{
                base: "center",
              }}
            >
              Info
            </chakra.span>
          </SimpleGrid>

          {state.storico_timesheets.map((timesheet: any, i: number) => {
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
        </Flex>
      </Stack>
    </Flex>
  );
}
