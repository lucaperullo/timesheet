export const initialState = {
  user: null,
  user_group: "",
  commesse: [
    {
      code: "",
      enterprise: "",
      location: "",
      type: "",
    },
  ],
  timesheetModalState: {
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    days: [],
  },
  timesheetModal: false, // true = open, false = close
  timesheet_postati: [],
  timehseet_salvati: null, // timesheet salvati nel database
  storico_timesheets: null, // timesheet utente attuale salvati nel database
  timesheet_backoffice: null, // tutti i timesheet nel database
  giorni_autocompletati: [],
  commesse_selezionate: [],
  timesheet_detail: null,
  savedsheets: null,
  commessa_autocomplete: false,

  autocomplete: false,
  isLoading: true,
  loadingMessage: {
    message: "Caricamento",
    percent: 0,
  },
};

export const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  console.log(state, action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "SET_TIMESHEET_MODAL":
      return {
        ...state,
        timesheetModal: action.payload,
      };
    case "SET_TIMESHEET_POSTATI":
      return {
        ...state,
        timesheet_postati: action.payload,
      };
    case "SET_TIMESHEET_SALVATI":
      return {
        ...state,
        timesheet_salvati: action.payload,
      };
    case "SET_TIMESHEET_DETAIL":
      return {
        ...state,
        timesheet_detail: action.payload,
      };
    case "SET_MAPPED_SAVEDSHEET":
      return {
        ...state,
        savedsheets: action.payload,
      };
    case "SET_TIMESHEET_BACKOFFICE":
      return {
        ...state,
        timesheet_backoffice: action.payload,
      };
    case "SET_COMMESSE":
      return {
        ...state,
        commesse: action.payload,
      };
    case "SET_COMMESSE_SELEZIONATE":
      return {
        ...state,
        commesse_selezionate: action.payload,
      };
    case "SET_COMMESSE_SELEZIONATE_DA_SERVER":
      return {
        ...state,
        commesse_selezionate: [...state.commesse_selezionate, action.payload],
      };
    case "SET_COMMESSA_AUTO":
      return {
        ...state,
        commessa_autocomplete: action.payload,
      };

    case "SET_AUTOCOMPLETE":
      return {
        ...state,
        autocomplete: action.payload,
      };

    case "SET_USER_GROUP":
      return {
        ...state,
        user_group: action.payload,
      };
    case "SET_TIMESHEET_MODAL_STATE_MONTH":
      return {
        ...state,
        timesheetModalState: {
          ...state.timesheetModalState,
          month: action.payload,
        },
      };
    case "SET_TIMESHEET_MODAL_STATE_YEAR":
      return {
        ...state,
        timesheetModalState: {
          ...state.timesheetModalState,
          year: action.payload,
        },
      };

    case "SET_TIMESHEET_MODAL_STATE_DAYS":
      return {
        ...state,
        timesheetModalState: {
          ...state.timesheetModalState,
          days: action.payload,
        },
      };
    case "SET_STORICO_TIMESHEETS":
      return {
        ...state,
        storico_timesheets: action.payload,
      };
    case "SET_IS_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_LOADING_MESSAGE":
      return {
        ...state,
        loadingMessage: action.payload,
      };
    case "RESET_STATE":
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
