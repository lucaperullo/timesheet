import {
  Box,
  InputLeftAddon,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteList,
  AutoCompleteItem,
} from "@choc-ui/chakra-autocomplete";
import { IoIosSearch } from "react-icons/io";
import { useStateValue } from "../../context/state";
import styles from "./styles.module.css";
export default function Autocomplete({
  active,
  brb,
  brt,
  br,
}: {
  active?: boolean;
  brb?: string;
  brt?: string;
  br?: string;
}) {
  const [state, dispatch] = useStateValue();
  const toast = useToast();
  const checkIfCommessaExists = (code: string) => {
    const commesse = state.commesse_selezionate;
    const commessa_esiste = commesse.find(
      (commessa_selezionata: any) => commessa_selezionata.commessa.code === code
    );
    if (commessa_esiste) {
      return true;
    }
    return false;
  };
  const month = state.timesheetModalState.month;
  const year = state.timesheetModalState.year;
  const days = new Date(year, month, 0).getDate();
  const addCommessaBySearchingInCommesseArray = (enterprise: string) => {
    const commesse = state.commesse;
    const commessa = commesse.find((c: any) => c.enterprise === enterprise);

    if (commessa) {
      if (checkIfCommessaExists(commessa?.code)) {
        toast({
          title: "Commessa già in lista",
          position: "top",
          description: "",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      } else {
        dispatch({
          type: "SET_COMMESSE_SELEZIONATE",
          payload: [
            ...state.commesse_selezionate,
            {
              days: [
                ...Array.from({ length: days }, () => ({
                  hours: 0,
                  commessa: commessa.code,
                  info: "",
                })),
              ],
              month: month,
              year: year,
              commessa: commessa,
            },
          ],
        });
      }
    } else {
      return;
    }
  };

  return (
    <AutoComplete
      isReadOnly={active}
      openOnFocus={!active}
      closeOnSelect
      className={styles.autocomplete}
    >
      <Box display="flex" minW="170px">
        <AutoCompleteInput
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              if (e.target.value.length > 0) {
                addCommessaBySearchingInCommesseArray(e.target.value);
              }
            }
          }}
          onClick={() => {
            if (active) {
              dispatch({
                type: "SET_AUTOCOMPLETE",
                payload: true,
              });
            }
          }}
          className={useColorModeValue(
            styles.autocompleteInput,
            styles.autocompleteInputDark
          )}
          variant="filled"
          placeholder="Cerca commessa.."
          borderBottomRadius={brb}
          borderTopRadius={brt}
          borderRadius={br}
          background={"transparent"}
        />
      </Box>
      <AutoCompleteList width={"100%"}>
        {state.commesse &&
          state.commesse !== undefined &&
          state?.commesse?.map(
            (commessa: { code: any; enterprise: string }, i: number) => {
              return (
                <AutoCompleteItem
                  id={commessa.enterprise}
                  key={`option-${commessa.code}`}
                  value={commessa.enterprise}
                  textTransform="capitalize"
                  onClick={() => {
                    dispatch({
                      type: "SET_AUTOCOMPLETE",
                      payload: false,
                    });
                    if (!checkIfCommessaExists(commessa.code)) {
                      dispatch({
                        type: "SET_COMMESSE_SELEZIONATE",
                        payload: [
                          ...state.commesse_selezionate,
                          {
                            days: [
                              ...Array.from({ length: days }, () => ({
                                hours: 0,
                                commessa: commessa.code,
                                info: "",
                              })),
                            ],
                            month: month,
                            year: year,
                            commessa: commessa,
                          },
                        ],
                      });
                    } else {
                      toast({
                        title: "Commessa già in lista",
                        description: "",
                        status: "info",
                        duration: 5000,
                        isClosable: true,
                        position: "top",
                      });
                    }
                    dispatch({
                      type: "SET_TIMESHEET_MODAL",
                      payload: true,
                    });
                  }}
                >
                  {/* {commessa.enterprise} */}
                </AutoCompleteItem>
              );
            }
          )}
      </AutoCompleteList>
    </AutoComplete>
  );
}
