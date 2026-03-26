import { useState } from "react";
import { Anamnese } from "../anamnese/Anamnese";
import { RegisterTutor } from "./RegisterTutor";
import { RegisterPet } from "./RegisterPet";
import { useNavigate } from "react-router-dom";

const RegisterFlow = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState<1 | 2 | 3>(1);

  if (page === 1) {
    return <RegisterTutor onNext={() => setPage(2)} />;
  }

  if (page === 2) {
    return <RegisterPet onNext={() => setPage(3)} />;
  }

  return (
    <Anamnese
      onNext={() => navigate("/pagina-principal", { replace: true })}
      onBack={() => setPage(2)}
    />
  );
};

export { RegisterFlow };
