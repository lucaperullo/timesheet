import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from "@chakra-ui/react";
import ResumeContainer from "../timesheet/resume_container";
import ManagementComponent from "./management";
import styles from "./styles.module.css";
export default function BackofficeLanding() {
  const bg = useColorModeValue("#ffffff", "#1a202c");
  return (
    <Box
      width="100%"
      height="100%"
      backgroundColor={bg}
      borderRadius="5px"
      minH={"460px"}
    >
      <Tabs isFitted>
        <TabList>
          <Tab className={styles.tab}>Timesheets</Tab>
          <Tab className={styles.tab}>Gestione</Tab>
          {/* <Tab></Tab> */}
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box className={styles.resumeContainer}>
              <ResumeContainer />
            </Box>
          </TabPanel>
          <TabPanel>
            <Box className={styles.resumeContainer}>
              <ManagementComponent />
            </Box>
          </TabPanel>
          {/* <TabPanel>
            <p>three!</p>
          </TabPanel> */}
        </TabPanels>
      </Tabs>
    </Box>
  );
}
