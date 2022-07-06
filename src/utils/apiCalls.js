import axios from "axios";
import { Auth } from "aws-amplify";

//function to log in console the user token

// function to GET an array with all users timesheet
// suitable only for backoffice users
export async function getTimesheetsBackoffice(query) {
  try {
    console.log({ query });
    const url = `${process.env.REACT_APP_BASE_URL}/backoffice/timesheet?${query}`;
    const data = await Auth.currentSession();
    const jwtToken = data.getAccessToken().getJwtToken();
    // console.log(jwtToken);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-type": "application/json",
      },
    });

    const tsData = await response.data;
    console.log("get all user timesheet", response.data);

    return tsData;
  } catch (error) {
    console.error(error);
  }
}

//function to GET the actual user's timesheet and display it in /home
export async function getUserTimesheet(month) {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/user/timesheet?month=${month}`;
    const data = await Auth.currentSession();
    const jwtToken = data.getAccessToken().getJwtToken();
    // console.log(jwtToken);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-type": "application/json",
      },
    });
    // console.log("this user timesheet", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function getAllUserTimesheets() {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/user/list/timesheet`;
    const data = await Auth.currentSession();
    const jwtToken = data.getAccessToken().getJwtToken();
    // console.log(jwtToken);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-type": "application/json",
      },
    });
    // console.log("this user timesheet", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCommesse() {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/commesse`;
    const data = await Auth.currentSession();
    const jwtToken = data.getAccessToken().getJwtToken();

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-type": "application/json",
      },
    });
    // console.log("this user timesheet", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

//function to send in POST user's actual timesheet for the first time (CREATE TIMESHEET - Button SALVA)
export async function postUserTimesheet(payload) {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/user/timesheet`;
    const data = await Auth.currentSession();
    const jwtToken = data.getAccessToken().getJwtToken();
    // console.log(jwtToken);
    const response = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.log("postUserTimesheet error: ", JSON.stringify(error, null, 2));
    return error;
  }
}
//function to UPDATE user's actual timesheet (UPDATE TIMESHEET - Button SALVA)

//function to UPDATE user's actual timesheet STATUS (Button CONFERMA MESE)
//TODO : reduce shadows, colors match, border radius, leftside 1 panel, padding gestione l, r, bg modal color, flip colors modal inputs, svg on top header , cerchi giorni 1 px border,
export async function saveUserTimesheet(payload, type, id) {
  console.log(payload, type, id);
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/user/timesheet${"/" + id}`;
    const url2 = `${process.env.REACT_APP_BASE_URL}/user/timesheet`;
    const data = await Auth.currentSession();
    const jwtToken = data.getAccessToken().getJwtToken();
    // console.log(jwtToken);
    const response = type
      ? await axios.post(url2, payload, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-type": "application/json",
          },
        })
      : await axios.put(url, payload, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-type": "application/json",
          },
        });

    return response;
  } catch (error) {
    console.log("postUserTimesheet error: ", JSON.stringify(error, null, 2));
    return error;
  }
}

//call route to approve the single timesheet in backoffice
export async function acceptTimesheet(id, note) {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/backoffice/timesheet/${id}/confirmed`;
    const data = await Auth.currentSession();
    const jwtToken = data.getAccessToken().getJwtToken();
    // console.log(jwtToken);
    const response = await axios.put(url, note, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-type": "application/json",
      },
    });
    console.log("Accept Timesheet", response);
  } catch (error) {
    console.error("accept timesheet error: ", error);
  }
}

//call route to reject the single timesheet in backoffice
export async function declineTimesheet(id, note) {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/backoffice/timesheet/${id}/declined`;
    const data = await Auth.currentSession();
    const jwtToken = data.getAccessToken().getJwtToken();
    console.log("payload", note);
    const response = await axios.put(url, note, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-type": "application/json",
      },
    });
    console.log("Decline response", response);
  } catch (error) {
    console.error(error);
  }
}
export const getUserInfo = async () => {
  try {
    const url = `${process.env.REACT_APP_BASE_URL}/user/user`;
    const data = await Auth.currentSession();
    const jwtToken = data.getAccessToken().getJwtToken();
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
