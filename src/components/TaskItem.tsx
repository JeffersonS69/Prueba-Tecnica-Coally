import { FC } from "react";
import { TaskProps } from "../interfaces/props";
import { useTaskContext } from "../Contexts/TaskContext";
import { CheckboxCard } from "./ui/checkbox-card";
import TaskEdit from "./TaskEdit";
import { Stack } from "@chakra-ui/react";

const TaskItem: FC<TaskProps> = ({ task }) => {
  const { updateTask } = useTaskContext();

  const toggleCompletion = () => {
    updateTask(task._id, { completed: !task.completed });
  };

  return (
    <Stack maxW="720px">
      <CheckboxCard
        colorPalette={task.completed ? "orange" : "black"}
        color="black"
        shadow="md"
        rounded="lg"
        background="#FEFEFE"
        size="lg"
        label={
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.title}
          </span>
        }
        wordBreak="break-word"
        description={
          <span
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            {task.description}
          </span>
        }
        checked={task.completed}
        onCheckedChange={toggleCompletion}
        addon={<TaskEdit task={task} />}
      />
    </Stack>
  );
};

export default TaskItem;
