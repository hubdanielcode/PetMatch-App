import { useContext } from "react";
import { RegistrationContext } from "../context/RegistrationContext";

const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (!context)
    throw new Error(
      "useRegistrationContext must be used within ApplicationProvider",
    );
  return context;
};
export { useRegistrationContext };
