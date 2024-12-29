import { FC, useState } from "react";
import { useTaskContext } from "../Contexts/TaskContext";
import { Flex, Spinner, Stack, Tabs, Text, VStack } from "@chakra-ui/react";
import TaskItem from "./TaskItem";
import { items } from "../utils/items";
import {
    messageLoadingTasks,
  messageNoTasksFound,
  messageNoTasksFoundForFilter,
} from "../utils/message";

const TaskList: FC = () => {
  const { tasks, loadingFetch } = useTaskContext();
  const [optionFilter, setOptionFilter] = useState("All");

  if (loadingFetch) {
    return (
      <Stack align="center" justify="center" h="25vh">
        <Spinner size="xl" color="orange" />
        <Text color="black">{messageLoadingTasks}</Text>
      </Stack>
    );
  }

  if (tasks.length === 0) {
    return (
      <Stack align="center" justify="center" h="50vh">
        <Text color="black">{messageNoTasksFound}</Text>
      </Stack>
    );
  }

  const filteredTasks = tasks.filter((task) => {
    if (optionFilter === "All") {
      return true;
    } else if (optionFilter === "Pending") {
      return !task.completed;
    } else if (optionFilter === "Completed") {
      return task.completed;
    }
  });

  return (
    <VStack gap={4}>
      <Tabs.Root
        defaultValue="All"
        w="full"
        justify="center"
        onValueChange={(e) => setOptionFilter(e.value)}
      >
        <Tabs.List>
          {items.map((item) => (
            <Tabs.Trigger key={item.value} value={item.value}>
              {item.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
      {filteredTasks.length === 0 ? (
        <Stack align="center" justify="center" h="25vh">
          <Text color="black" paddingTop="10">
            {messageNoTasksFoundForFilter}
          </Text>
        </Stack>
      ) : (
        <Flex
          gap={4}
          wrap="wrap-reverse"
          justify="center"
          direction="row-reverse"
        >
          {filteredTasks.map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </Flex>
      )}
    </VStack>
  );
};

export default TaskList;
