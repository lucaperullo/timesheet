import { Box, Text } from "@chakra-ui/react";

import { useStateValue } from "../../context/state";

export const LoadingScreen = () => {
  const [state, dispatch] = useStateValue();
  const progressbg = "green.400";
  return (
    <>
      {state.isLoading && (
        <Box height={"100vh"} width="100vw" position={"relative"}>
          <Box
            position={"relative"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%, -50%)"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text
              fontSize={{
                base: "20px",
                md: "28px",
              }}
              fontWeight="100"
              w="100%"
              textAlign={"center"}
            >
              {state?.loadingMessage?.message}
            </Text>

            <Box
              backgroundColor={"gray.600"}
              // border={`1px solid ${progressbg}`}
              padding={"5px"}
              borderRadius={"5px"}
              h="10px"
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              w={{
                base: "70%",
              }}
            >
              <Box
                backgroundColor={progressbg}
                h="5px"
                borderRadius={"5px"}
                w={`${state.loadingMessage.percent}%`}
                transition="all 1s ease"
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};
