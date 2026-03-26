import { useState } from "react";
import { Anamnese } from "../anamnese/Anamnese";
import { RegisterTutor } from "./RegisterTutor";
import { RegisterPet } from "./RegisterPet";
import { useNavigate, useLocation } from "react-router-dom";

const RegisterFlow = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from ?? "/modal";
  const fromScreen = location.state?.fromScreen ?? 2;
  const [page, setPage] = useState<1 | 2 | 3>(1);

  if (page === 1) {
    return (
      <RegisterTutor
        onNext={() => setPage(2)}
        onBack={() => navigate(from, { state: { screen: fromScreen } })}
      />
    );
  }

  if (page === 2) {
    return (
      <RegisterPet
        onNext={() => setPage(3)}
        onBack={() => setPage(1)}
      />
    );
  }

  return (
    <Anamnese
      onNext={() => navigate("/pagina-principal", { replace: true })}
      onBack={() => setPage(2)}
    />
  );
};

export { RegisterFlow };
