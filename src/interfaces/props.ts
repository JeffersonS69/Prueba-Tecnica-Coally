import { SetStateAction } from "react";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
}

export interface TaskContextType {
  tasks: Task[];
  loadingAdd: boolean;
  loadingFetch: boolean;
  loadingUpdate: boolean;
  fetchTasks: () => void;
  addTask: (task: Omit<Task, "_id" | "createdAt">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

export interface TaskProviderProps {
  children: React.ReactNode;
}

export interface TaskProps {
  task: Task;
}
export interface EditableInputProps {
  _id: string;
  title?: string;
  description?: string;
  completed: boolean;
}

export interface PersonalizeProps {
  title: string;
  value: string | undefined;
  setValue: (value: SetStateAction<string>) => void;
}
