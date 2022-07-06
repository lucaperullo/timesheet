import {
  Box,
  useColorModeValue,
  Text,
  Button,
  ScaleFade,
  IconButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { useStateValue } from "../../context/state";
import styles from "./styles.module.css";
import Typist from "react-typist";
import TableComponent from "./table";

import Header from "./header";

import DaysOfTheMonth from "./days-of-the-month";

import TimesheetSidebar from "./sidebar";
import { HiArrowLeft, HiArrowRight, HiCursorClick } from "react-icons/hi";
import ModalFooter from "./modal-footer";

import SenderModal from "./sender-modal";
import moment from "moment";

export default function TimesheetModal() {
  const bg = useColorModeValue("#dedede", "gray.600");
  const bg2 = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("#000", "#fff");
  const [state, dispatch] = useStateValue();
  const savedTimesheet = state.timesheet_salvati;
  const savedTimesheetDays = savedTimesheet.days;
  let days: any = [];
  const commesse: any[] = [];
  const boxShadowModal = useColorModeValue("#1b1b1bbf", "rgb(0 0 0 / 36%)");

  const [elementScroll, setElementScroll] = useState(0);
  const [showSenderModal, setShowSenderModal] = useState(false);
  const calendar = document.getElementById("calendar");
  const year = state.timesheetModalState.year; // current year
  const month = state.timesheetModalState.month; // current month

  const monthString = new Date(year, month, 0).toLocaleString("it-IT", {
    month: "long",
  });
  const topPosition = state.timesheetModal ? "60px" : "94%";

  const setModalState = () => {
    const array = [];

    const daysInMonth = new Date(year, month, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      array.push(i);
    }

    dispatch({
      type: "SET_TIMESHEET_MODAL_STATE_DAYS",
      payload: array,
    });
  };

  const retriveHoursAndNotesFromGivenCommission = (commission: any) => {
    const hours: any[] = [];
    const notes: any[] = [];
    state.timesheet_salvati.days.map((day: any) => {
      day.details.filter((detail: any) => {
        if (detail.commission._id === commission._id) {
          hours.push(detail.hour);
          notes.push(detail.notes);
        }
      });
      // state.timesheet_salvati.days.
    });
    return { hours, notes };
  };

  const extractTimesheetFromSavedTimesheet = () => {
    savedTimesheetDays.forEach(
      (day: {
        details: [
          {
            notes: string;
            hour: number;
            commission: {
              _id: string;
              type: string;
              location: string;
              enterprise: string;
              code: string;
            };
            commissionCode: string;
            _id: string;
          }
        ];
      }) => {
        day.details.forEach((detail) => {
          commesse.push({
            days: [day],
            month: parseInt(moment().month(savedTimesheet.month).format("M")),
            year: parseInt(savedTimesheet.year),
            commessa: detail.commission,
          });
        });
      }
    );
    const uniqCommesse = commesse.filter((commessa, index, self) => {
      return (
        self.findIndex((t) => t.commessa._id === commessa.commessa._id) ===
        index
      );
    });
    console.log(uniqCommesse);
    uniqCommesse.forEach((commessa: any) => {
      const { hours, notes } = retriveHoursAndNotesFromGivenCommission(
        commessa.commessa
      );
      savedTimesheetDays.forEach((day: { day: any; details: any[] }) => {
        days = [
          ...days,
          {
            hours: hours[day.day - 1],
            commessa: commessa.commessa.code,
            info: notes[day.day - 1],
          },
        ];
      });
    });
    // console.log(days, uniqCommesse);
    dispatch({
      type: "SET_MAPPED_SAVEDSHEET",
      payload: days,
    });

    uniqCommesse.forEach((commessa: any, i: number) => {
      console.log(days.slice(i * 31, i * 31 + savedTimesheetDays.length));
      console.log([
        ...state.commesse_selezionate,
        {
          days: days.slice(i * 31, i * 31 + savedTimesheetDays.length),
          month: parseInt(moment().month(savedTimesheet.month).format("M")),
          year: parseInt(savedTimesheet.year),
          commessa: commessa.commessa,
        },
      ]);
      const checkIfCommessaExists = state.commesse_selezionate.find(
        (com: { code: any }) => com.code === commessa.commessa.code
      );
      if (!checkIfCommessaExists) {
        dispatch({
          type: "SET_COMMESSE_SELEZIONATE_DA_SERVER",
          payload: {
            days: days.slice(i * 31, i * 31 + savedTimesheetDays.length),
            month: parseInt(moment().month(savedTimesheet.month).format("M")),
            year: parseInt(savedTimesheet.year),
            commessa: commessa.commessa,
          },
        });
      }
    });
  };

  useEffect(() => {
    extractTimesheetFromSavedTimesheet();
    return () => {
      dispatch({
        type: "SET_MAPPED_SAVEDSHEET",
        payload: [],
      });
    };
  }, [state.timesheet_salvati]);
  useEffect(() => {
    setModalState();
  }, [month, year]);

  return (
    <Box
      tabIndex={0}
      onKeyDown={(e: any) => {
        if (e.key === "Escape") {
          dispatch({
            type: "SET_TIMESHEET_MODAL",
            payload: false,
          });
        }
      }}
    >
      <Box
        as="div"
        // ref={ref}
        position={"fixed"}
        top={topPosition}
        // transform={`translateY(${topPosition})`}
        transition={"0.5s ease"}
        // borderRadius="5"
        backgroundColor={bg}
        zIndex={2}
        // padding={"12px"}
        left={"0"}
        right={"0"}
        width={"100vw"}
        boxShadow={`0px 0px 10px ${boxShadowModal}`}
        display="flex"
        flexDirection="column"
        overflow="hidden"
        className={styles.modal}
      >
        <SenderModal
          showSenderModal={showSenderModal}
          setShowSenderModal={setShowSenderModal}
        />

        {/* header */}
        <Header />
        {/* board container */}
        {state.commesse_selezionate.length > 0 ? (
          <Box
            width={"100%"}
            height="100%"
            padding={"15px"}
            display="flex"
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            position={"relative"}
            backgroundColor={bg2}
          >
            <Box
              as="div"
              width={"100%"}
              display={"flex"}
              marginLeft="auto"
              marginRight="auto"
              justifyContent="space-between"
            >
              <Text
                fontSize={"2.5rem"}
                fontWeight={"100"}
                color={textColor}
                marginLeft={"auto"}
                marginRight={"auto"}
                textTransform="capitalize"
              >
                {`${monthString} ${year}`}
              </Text>
            </Box>
            <Box
              className={styles.boardContainer}
              position={"relative"}
              width={"100%"}
              maxHeight={"60vh"}
              display="flex"
              justifyContent={"flex-start"}
              marginTop="40px"
              overflow="hidden"
            >
              {/* <Box className={styles.sidebar}>
             
            </Box> */}

              <Box
                display={"flex"}
                justifyContent="flex-start"
                alignItems={"flex-start"}
                overflowY={"auto"}
                id="calendar"
                onScroll={(e: any) => {
                  e.preventDefault();
                  setElementScroll(e.target.scrollLeft);
                }}
              >
                <Box position={"sticky"} left="0" className={styles.sidebar}>
                  <TimesheetSidebar />
                </Box>
                <Box className={styles.contentCalendar}>
                  {calendar && (
                    <IconButton
                      onClick={() => {
                        calendar &&
                          calendar.scrollBy({
                            left: 150,
                            behavior: "smooth",
                          });
                        // audio2.play();
                      }}
                      position={"absolute"}
                      right={"5px"}
                      top={"50%"}
                      variant={"solid"}
                      colorScheme={"whatsapp"}
                      zIndex={3}
                      size={"sm"}
                      rounded={"full"}
                      aria-label={""}
                      className={styles.scrollRight}
                      icon={<HiArrowRight />}
                    >
                      scroll
                    </IconButton>
                  )}
                  {elementScroll > 0 && (
                    <IconButton
                      onClick={() => {
                        calendar &&
                          calendar.scrollBy({
                            left: -150,
                            behavior: "smooth",
                          });
                        // audio2.play();
                      }}
                      size={"sm"}
                      variant={"solid"}
                      rounded={"full"}
                      position={"absolute"}
                      // left={"110px"}
                      colorScheme={"facebook"}
                      top={"50%"}
                      zIndex={3}
                      aria-label={""}
                      className={styles.scrollLeft}
                      icon={<HiArrowLeft />}
                    ></IconButton>
                  )}

                  <Box
                    display={"flex"}
                    paddingTop="20px"
                    paddingLeft={"1rem"}
                    position="sticky"
                    top="0"
                    zIndex="2"
                    borderRadius={"5px"}
                    marginBottom={"5px"}
                  >
                    <DaysOfTheMonth />
                  </Box>
                  {state.commesse_selezionate.map(
                    (timesheet: any, index: number) => {
                      return (
                        <Box
                          position={"relative"}
                          key={index}
                          id={timesheet?.commessa?.code}
                          className={styles.commessa}
                        >
                          <TableComponent
                            indexOfNode={index}
                            days={timesheet.days}
                          />
                        </Box>
                      );
                    }
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box
            width={"100%"}
            height="100%"
            display={"flex"}
            justifyContent={"center"}
            alignItems="center"
          >
            <Box>
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
                  Non hai ancora selezionato nessuna commessa.
                  <br />
                  <Button
                    onClick={() => {
                      dispatch({
                        type: "SET_AUTOCOMPLETE",
                        payload: true,
                      });
                    }}
                    cursor={"pointer"}
                    colorScheme="telegram"
                  >
                    clicca qui <HiCursorClick size="25px" />
                  </Button>{" "}
                  <br /> per aggiungerne una!
                </Text>
              </Typist>
            </Box>
          </Box>
        )}
        <ScaleFade initialScale={0.9} in={!!state.commesse_selezionate.length}>
          <ModalFooter
            showSenderModal={showSenderModal}
            setShowSenderModal={setShowSenderModal}
          />
        </ScaleFade>
      </Box>

      <Box
        top={topPosition}
        position={"fixed"}
        height="2120vh"
        width={"100vw"}
        opacity={state.timesheetModal ? 1 : 0}
        transition={"0.5s ease"}
        backgroundColor="#000000ba"
        zIndex={1}
      ></Box>
    </Box>
  );
}
