import { Box, Stack } from "@chakra-ui/react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Box p={4} maxW="800px" margin="auto">
      <Stack gap={4}>
        <TaskForm />
        <TaskList />
      </Stack>
      <Toaster />
    </Box>
  );
}

export default App;
