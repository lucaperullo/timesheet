import ResumeContainer from "../../components/timesheet/resume_container";

import PageLayout from "../../lib/page-layout";

export default function TimesheetPage() {
  return <PageLayout children={<ResumeContainer />} />;
}
