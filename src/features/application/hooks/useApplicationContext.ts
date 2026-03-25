import { useContext } from "react";
import { ApplicationContext } from "../context/ApplicationContext";

const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (!context)
    throw new Error(
      "useApplicationContext must be used within ApplicationProvider",
    );
  return context;
};
export { useApplicationContext };
