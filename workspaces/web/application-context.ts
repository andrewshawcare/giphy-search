import { createContext } from "react";

interface ApplicationContext {
  api: {
    origin: string;
  };
}

export const ApplicationContext = createContext<ApplicationContext>({
  api: {
    origin: process.env["API_ORIGIN"]!,
  },
});
