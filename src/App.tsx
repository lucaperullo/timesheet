import { withAuthenticator } from "@aws-amplify/ui-react";
import {
  ChakraProvider,
  Box,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Amplify, { Auth } from "aws-amplify";

import awsExports from "./aws-exports";
import Layout from "./lib/layout";
import "./index.css";
import TimesheetPage from "./pages/timesheet";

import theme from "./theme";
import "@aws-amplify/ui-react/styles.css";
import { useStateValue } from "./context/state";
import { useEffect } from "react";

import TimesheetModal from "./lib/timesheet-modal";
import {
  getAllUserTimesheets,
  getCommesse,
  getUserInfo,
  getUserTimesheet,
} from "./utils/apiCalls";
import { checkGroup } from "./utils/utils";
import BackofficePage from "./pages/backoffice";

import TimesheetDetailModal from "./lib/timesheet_detail_modal";
import { LoadingScreen } from "./lib/loading-screen";

Amplify.configure(awsExports);
function App() {
  const [state, dispatch] = useStateValue();
  const progressbg = useColorModeValue("green.500", "pink.500");
  const toast = useToast();
  const setUserInfo = async () => {
    dispatch({
      type: "SET_USER",
      payload: await getUserInfo(),
    });
    dispatch({
      type: "SET_LOADING_MESSAGE",
      payload: {
        message: "Caricando informazioni utente..",
        percent: 10,
      },
    });
  };
  const commesseCall = async () => {
    const data2 = await Auth.currentSession();
    if (data2) {
      const data = await getCommesse();
      dispatch({
        type: "SET_COMMESSE",
        payload: data,
      });
      dispatch({
        type: "SET_LOADING_MESSAGE",
        payload: {
          message: "Caricando commesse disponibili..",
          percent: 30,
        },
      });
    }
  };

  const setStoricoTimesheets = async () => {
    await getAllUserTimesheets().then((data: any) => {
      dispatch({
        type: "SET_STORICO_TIMESHEETS",
        payload: data,
      });
      dispatch({
        type: "SET_LOADING_MESSAGE",
        payload: {
          message: "Caricamento storico dei timesheets..",
          percent: 50,
        },
      });
    });
  };

  const setSavedTimesheets = async () => {
    if (
      !!state.timesheetModalState &&
      !!state.timesheetModalState.month &&
      !!state.timesheetModalState.year
    ) {
      const month = state.timesheetModalState.month;
      const year = state.timesheetModalState.year;
      const monthString = new Date(year, month, 0).toLocaleString("it-IT", {
        month: "long",
      });

      await getUserTimesheet(monthString)
        .then((data) => {
          if (data !== null) {
            dispatch({
              type: "SET_TIMESHEET_SALVATI",
              payload: data,
            });
          }
          dispatch({
            type: "SET_LOADING_MESSAGE",
            payload: {
              message: "Caricamento timesheet..",
              percent: 70,
            },
          });
          // extractCommesseFromSavedTimesheet(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const setUserGroup = async () => {
    (await checkGroup("Backoffice")) &&
      dispatch({
        type: "SET_USER_GROUP",
        payload: "Backoffice",
      });
    dispatch({
      type: "SET_LOADING_MESSAGE",
      payload: {
        message: "Fabbricazione componenti..",
        percent: 90,
      },
    });
  };

  const initializeApplication = async () => {
    await Promise.all([
      setUserInfo(),
      commesseCall(),
      setStoricoTimesheets(),
      setSavedTimesheets(),
      setUserGroup(),
    ]);
  };

  useEffect(() => {
    initializeApplication();
    return () => {
      dispatch({
        type: "SET_COMMESSE_SELEZIONATE",
        payload: [],
      });
    };
  }, []);
  useEffect(() => {
    setTimeout(() => {
      startApplicationOnlyIfAllDataIsLoaded();
    }, 1500);
  }, [state?.user]);

  const startApplicationOnlyIfAllDataIsLoaded = () => {
    dispatch({
      type: "SET_LOADING_MESSAGE",
      payload: {
        message: `Caricamento completato!`,
        percent: 100,
      },
    });
    setTimeout(() => {
      dispatch({
        type: "SET_IS_LOADING",
        payload: false,
      });
    }, 1500);
  };

  useEffect(() => {
    if (state.timesheet_salvati && state.timesheet_salvati.note !== "") {
      toast({
        title: "Timesheet rifiutato!",
        description: state.timesheet_salvati.info,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [state.timesheet_salvati]);

  return (
    <ChakraProvider theme={theme}>
      <LoadingScreen />
      {!state.isLoading && state.user && state.storico_timesheets && (
        <Box height={"100vh"} fontSize="xl">
          {state?.timesheet_salvati?.status === "DRAFT" ||
          !state.timesheet_salvati ? (
            <TimesheetModal />
          ) : null}
          <Box
            overflow={"hidden"}
            display={"flex"}
            justifyContent="center"
            paddingTop={"90px"}
            minH="100%"
          >
            <Layout
              children={
                state?.user_group === "Backoffice" ? (
                  <BackofficePage />
                ) : (
                  <TimesheetPage />
                )
              }
              // children2={<RightBar />}
              title="Timesheet"
              description="asd"
            />
          </Box>
        </Box>
      )}
      <TimesheetDetailModal />
    </ChakraProvider>
  );
}

export default withAuthenticator(App);
