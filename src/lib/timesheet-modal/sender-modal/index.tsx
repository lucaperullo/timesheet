import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  useDisclosure,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useStateValue } from "../../../context/state";
import { postUserTimesheet, saveUserTimesheet } from "../../../utils/apiCalls";

export default function SenderModal({
  showSenderModal,
  setShowSenderModal,
}: {
  showSenderModal: boolean;
  setShowSenderModal: (value: boolean) => void;
}) {
  const [state, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
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
                    notes: commessa?.days[day - 1].info,
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
          status: "TO_APPROVE",
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
                    hour: commessa?.days[day - 1]?.hours,
                    commission: commessa?.commessa?._id,
                    commissionCode: commessa?.commessa?.code,
                  };
                }),
              ],
            };
          }),
          status: "TO_APPROVE",
        }
      : {};

  return (
    <Modal
      isCentered
      isOpen={showSenderModal}
      onClose={() => setShowSenderModal(false)}
    >
      <ModalOverlay
        bg="none"
        backdropFilter="blur(3px)"
        filter={"grayscale(70%)"}
      />
      <ModalContent>
        <ModalHeader>Attenzione</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Una volta inviato, il timesheet non potrà più essere modificato.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            onClick={() => {
              setIsLoading(true);
              saveUserTimesheet(
                !state?.timesheet_salvati ? payload : updatePayload, //TODO ADD PAYLOAD2
                !state?.timesheet_salvati ? true : false,
                state?.timesheet_salvati?._id && state.timesheet_salvati._id
              ).then((res: any) => {
                if (res.status === 200) {
                  setIsLoading(false);
                  setShowSenderModal(false);
                  toast({
                    title: "Timesheet inviato.",
                    description:
                      "Il timesheet è stato preso in carico ed è in attesa di approvazione.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                  });
                } else {
                  setIsLoading(false);
                  toast({
                    title: "Errore",
                    description: "Errore durante il caricamento del timesheet.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "top-right",
                  });
                }
              });
            }}
          >
            Procedi
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
