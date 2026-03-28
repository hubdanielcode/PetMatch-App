import { useState } from "react";
import { Anamnese } from "../anamnese/Anamnese";
import { RegisterTutor } from "./RegisterTutor";
import { RegisterPet } from "./RegisterPet";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreatePet } from "../../hooks/useCreatePet";
import { useRegistrationContext } from "../../hooks/useRegistrationContext";

const RegisterFlow = () => {
  const { createPet } = useCreatePet();

  const {
    petName,
    species,
    breed,
    age,
    gender,
    pedigree,
    vaccinated,
    mated,
    cryptorchidism_bilateral,
    cryptorchidism_unilateral,
  } = useRegistrationContext();

  const handleFinishRegistration = async () => {
    await createPet({
      photo_url: "",
      name: petName,
      species: species,
      breed: breed,
      age: age,
      gender: gender,
      pedigree: pedigree,
      vaccinated: vaccinated,
      mated: mated,
      cryptorchidism_bilateral: cryptorchidism_bilateral,
      cryptorchidism_unilateral: cryptorchidism_unilateral,
    });
  };

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
      onNext={async () => {
        await handleFinishRegistration();
        navigate("/pagina-principal", { replace: true });
      }}
      onBack={() => setPage(2)}
    />
  );
};

export { RegisterFlow };
