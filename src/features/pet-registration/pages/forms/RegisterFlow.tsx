import { useState } from "react";
import { AnamneseFlow } from "../anamnese/AnamneseFlow";
import { RegisterTutor } from "./RegisterTutor";
import { RegisterPet } from "./RegisterPet";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreatePet, useCreateTutor } from "../../../pet-registration";
import { useRegistrationContext } from "../../hooks/context-hooks/useRegistrationContext";
import { supabase } from "../../../../../supabase/supabase";
import { uploadPetPhoto } from "../../services/petService";
import { createAnamnese } from "../../services/anamneseService";

const RegisterFlow = () => {
  const { createPet } = useCreatePet();
  const { createTutor } = useCreateTutor();

  const {
    /* - Dados do pet - */

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

    /* - Dados do tutor - */

    phoneNumber,
    street,
    houseNumber,
    complement,
    neighborhood,
    city,
    state,

    /* - Dados da anamnese - */

    feedingInfo,
    walksInfo,
    behaviorInfo,
    surgeriesInfo,
    diseasesInfo,
    testiclesInfo,
    reproductionInfo,
  } = useRegistrationContext();

  const handleFinishRegistration = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Usuário não autenticado!");

    try {
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
    } catch (err) {
      console.log("erro no tutor:", err);
    }

    const photoUrl = petPhoto ? await uploadPetPhoto(petPhoto, user.id) : "";

    const createdPet = await createPet({
      photo_url: photoUrl,
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
    <AnamneseFlow
      onNext={async () => {
        await handleFinishRegistration();
        navigate("/pagina-principal", { replace: true });
      }}
      onBack={() => setPage(2)}
    />
  );
};

export { RegisterFlow };
