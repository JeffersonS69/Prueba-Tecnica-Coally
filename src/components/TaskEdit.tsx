import { Badge, HStack, VStack } from "@chakra-ui/react";
import { FC, useState } from "react";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "./ui/popover";
import { LuPencilLine, LuX } from "react-icons/lu";
import InputForm from "./InputPersonalize";
import TextAreaPersonalize from "./TextAreaPersonalize";
import { TaskProps } from "../interfaces/props";
import { useTaskContext } from "../Contexts/TaskContext";
import { Button } from "./ui/button";

const TaskEdit: FC<TaskProps> = ({ task }) => {
  const { updateTask, deleteTask, loadingUpdate } = useTaskContext();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description ?? "");
  const [open, setOpen] = useState(false);
  
  const toggleUpdate = () => {
    updateTask(task._id, { title, description });
    setOpen(false);
  };

  return (
    <HStack justify="space-between">
      <Badge size="md">{new Date(task.createdAt).toLocaleDateString()}</Badge>
      <HStack>
        <PopoverRoot open={open} onOpenChange={(e) => setOpen(e.open)}>
          <PopoverTrigger>
            <Button
              variant="outline"
              size="xs"
              aria-label="Edit task"
              disabled={task.completed}
            >
              <LuPencilLine />
            </Button>
          </PopoverTrigger>
          <PopoverContent css={{ "--popover-bg": "colors.blackAlpha.950" }}>
            <PopoverArrow />
            <PopoverBody>
              <PopoverTitle
                fontSize="lg"
                fontWeight="medium"
                textAlign="center"
              >
                Edit task ✍️
              </PopoverTitle>
              <VStack>
                <InputForm title="Title" value={title} setValue={setTitle} />
                <TextAreaPersonalize
                  title="Description"
                  value={description}
                  setValue={setDescription}
                />
                <HStack justify={"space-around"} w="full">
                  <Button
                    type="submit"
                    variant="ghost"
                    colorPalette="green"
                    onClick={toggleUpdate}
                    colorScheme="light"
                    loading={loadingUpdate}
                  >
                    Accept
                  </Button>
                  <Button colorPalette="red" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </HStack>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </PopoverRoot>
        <Button
          variant="outline"
          size="xs"
          aria-label="Delete task"
          onClick={() => deleteTask(task._id)}
        >
          <LuX />
        </Button>
      </HStack>
    </HStack>
  );
};

export default TaskEdit;
