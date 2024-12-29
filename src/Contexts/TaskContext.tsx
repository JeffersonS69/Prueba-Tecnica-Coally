import {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Task, TaskContextType, TaskProviderProps } from "../interfaces/props";
import api from "../services/api";
import { toaster } from "../components/ui/toaster";
import {
  messageErrorAddingTask,
  messageErrorDeletingTask,
  messageErrorFetchingTasks,
  messageErrorUpdatingTask,
  messageTaskAdded,
  messageTaskDeleted,
  messageTaskUpdated,
  messageUseTaskContextOutsideProvider,
} from "../utils/message";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);

  const fetchToken = async () => {
    const response = await api.post("/auth/login", {
      username: import.meta.env.VITE_USERNAME,
      password: import.meta.env.VITE_PASSWORD,
    });
    return response.data;
  };

  const fetchTasks = async () => {
    const { access_token } = await fetchToken();
    try {
      setLoadingFetch(true);
      const response = await api.get(`/tasks`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error(messageErrorFetchingTasks, error);
      toaster.error({
        description: messageErrorFetchingTasks + error,
        type: "error",
      });
    } finally {
      setLoadingFetch(false);
    }
  };

  const addTask = async (task: Omit<Task, "_id" | "createdAt">) => {
    const { access_token } = await fetchToken();
    try {
      setLoadingAdd(true);
      const response = await api.post("/tasks", task, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setTasks([...tasks, response.data]);
      toaster.success({
        description: messageTaskAdded,
        type: "success",
      });
    } catch (error) {
      console.error(messageErrorAddingTask, error);
      toaster.error({
        description: messageErrorAddingTask + error,
        type: "error",
      });
    } finally {
      setLoadingAdd(false);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    const { access_token } = await fetchToken();
    try {
      setLoadingUpdate(true);
      const response = await api.put(`/tasks/${id}`, updates, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? response.data : task))
      );
      toaster.success({
        description: messageTaskUpdated,
        type: "success",
      });
    } catch (error) {
      console.error(messageErrorUpdatingTask, error);
      toaster.error({
        description: messageErrorUpdatingTask + error,
        type: "error",
      });
    } finally {
      setLoadingUpdate(false);
    }
  };

  const deleteTask = async (id: string) => {
    const { access_token } = await fetchToken();
    try {
      await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
      toaster.success({
        description: messageTaskDeleted,
        type: "success",
      });
    } catch (error) {
      console.error(messageErrorDeletingTask, error);
      toaster.error({
        description: messageErrorDeletingTask + error,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const contextValue = useMemo(
    () => ({
      tasks,
      fetchTasks,
      loadingFetch,
      loadingAdd,
      loadingUpdate,
      addTask,
      updateTask,
      deleteTask,
    }),
    [tasks, loadingAdd, loadingFetch, loadingUpdate]
  );

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error(messageUseTaskContextOutsideProvider);
  }
  return context;
};
