export type User = {
  id: number;
  name: string;
  surname: string;
  user_group: string;
  email: string;
  timesheets: Timesheet[];
};

export type Commessa = {
  code: string;
  enterprise: string;
  location: string;
  type: string;
};

export type Timesheet = {
  commessa: Commessa;
  month: string;
  year: string;
  days: [
    {
      work_day: work_day;
    }
  ];
  odr: number;
  or: number;
  rol: number;
  fe: number;
  status: status;
};

export type work_day = {
  day: number;
  hour: number;
};

export type status = "approved" | "pending" | "rejected";
