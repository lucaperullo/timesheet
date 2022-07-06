import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useStateValue } from "../../context/state";
import Autocomplete from "../autocomplete";
import styles from "./styles.module.css";
export default function AutocompleteModal() {
  const [state, dispatch] = useStateValue();

  return (
    <Modal
      isOpen={state.autocomplete}
      onClose={() =>
        dispatch({
          type: "SET_AUTOCOMPLETE",
          payload: false,
        })
      }
    >
      <ModalOverlay
        onClick={() =>
          dispatch({
            type: "SET_AUTOCOMPLETE",
            payload: false,
          })
        }
      />
      <ModalContent
        margin={"2"}
        top={"60px"}
        zIndex={99999}
        className={styles.modalAutocomplete}
      >
        <Autocomplete />
      </ModalContent>
    </Modal>
  );
}
