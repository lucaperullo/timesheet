const baseUrl = process.env.REACT_APP_BASE_URL;
const endpoints = {
  createTimesheet: baseUrl + "/user/timesheet",
  getUser: baseUrl + "/user/user",
  getAllUser: baseUrl + "/backoffice/user",
  getTimesheets: baseUrl + "/backoffice/timesheet",
  getTimesheetByUser: baseUrl + "/user/timesheet",
  getCommesse: baseUrl + "/commesse",
};
export default endpoints;
