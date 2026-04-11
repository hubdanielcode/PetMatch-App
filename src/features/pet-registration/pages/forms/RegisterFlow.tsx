import { useState } from "react";
import { AnamneseFlow } from "../anamnese/AnamneseFlow";
import { RegisterTutor } from "./RegisterTutor";
import { RegisterPet } from "./RegisterPet";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreatePet } from "../../hooks/pet-hooks/useCreatePet";
import { useCreateTutor } from "../../hooks/tutor-hooks/useCreateTutor";
import { useRegistrationContext } from "../../hooks/context-hooks/useRegistrationContext";
import { supabase } from "../../../../../supabase/supabase";
import { uploadPetPhoto } from "../../services/petService";
import { createAnamnese } from "../../services/anamneseService";

const RegisterFlow = () => {
  const { createPet } = useCreatePet();
  const { createTutor } = useCreateTutor();

  const {
    petPhoto,
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
    resetContext,
    phoneNumber,
    street,
    houseNumber,
    complement,
    neighborhood,
    city,
    state,
    feedingInfo,
    walksInfo,
    behaviorInfo,
    surgeriesInfo,
    diseasesInfo,
    testiclesInfo,
    reproductionInfo,
  } = useRegistrationContext();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from ?? "/modal";
  const fromScreen = location.state?.fromScreen ?? 2;

  const [page, setPage] = useState<1 | 2 | 3>(1);

  const handleFinishRegistration = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Usuário não autenticado!");

    const { data: existingTutor } = await supabase
      .from("tutors")
      .select("id")
      .eq("user_id", user.id)
      .single();

    if (!existingTutor) {
      await createTutor({
        name:
          (`${user.user_metadata?.firstName ?? ""} ${user.user_metadata?.lastName ?? ""}`.trim() ||
            user.email) ??
          "",
        photo_url: null,
        email: user.email ?? "",
        phone: phoneNumber,
        street,
        number: houseNumber,
        complement,
        neighborhood,
        city,
        state,
      });
    }

    const photoUrl = petPhoto ? await uploadPetPhoto(petPhoto, user.id) : "";

    const createdPet = await createPet({
      photo_url: photoUrl,
      name: petName,
      species,
      breed,
      age,
      gender,
      pedigree,
      vaccinated,
      mated,
      cryptorchidism_bilateral,
      cryptorchidism_unilateral,
    });

    await createAnamnese({
      pet_id: createdPet.id,
      feeding_info: feedingInfo,
      walks_info: walksInfo,
      behavior_info: behaviorInfo,
      surgeries_info: surgeriesInfo,
      diseases_info: diseasesInfo,
      testicles_info: testiclesInfo,
      reproduction_info: reproductionInfo,
    });

    resetContext();
  };

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
    <AnamneseFlow
      onNext={async () => {
        try {
          await handleFinishRegistration();
          navigate("/pagina-principal", { replace: true });
        } catch (err) {
          console.error(
            "ERRO:",
            JSON.stringify(err, Object.getOwnPropertyNames(err)),
          );
        }
      }}
      onBack={() => setPage(2)}
    />
  );
};

export { RegisterFlow };
