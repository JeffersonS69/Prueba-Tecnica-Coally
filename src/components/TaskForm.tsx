import { FC, FormEvent, useState } from "react";
import { useTaskContext } from "../Contexts/TaskContext";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { Button } from "./ui/button";
import TextAreaPersonalize from "./TextAreaPersonalize";
import InputPersonalize from "./InputPersonalize";

const TaskForm: FC = () => {
  const { addTask, loadingAdd } = useTaskContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    addTask({ title, description, completed: false });
    setTitle("");
    setDescription("");
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      background="#FCB241"
      shadow="md"
      p={4}
      borderRadius="lg"
    >
      <Stack gap={4}>
        <Heading textAlign="center" size="2xl">
          To-Do List 📑
        </Heading>
        <InputPersonalize title="Title" value={title} setValue={setTitle} />
        <TextAreaPersonalize
          title="Description"
          value={description}
          setValue={setDescription}
        />
        <Button
          colorPalette="white"
          rounded="lg"
          variant="subtle"
          type="submit"
          loading={loadingAdd}
          loadingText="Adding task... 🖋️"
        >
          Add new task ✍️
        </Button>
      </Stack>
    </Box>
  );
};

export default TaskForm;
