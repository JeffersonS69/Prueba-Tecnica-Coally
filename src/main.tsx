import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TaskProvider } from "./Contexts/TaskContext.tsx";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <TaskProvider>
        <App />
      </TaskProvider>
    </ChakraProvider>
  </StrictMode>
);
