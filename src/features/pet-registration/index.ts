/* - UI - */

export { FileUpload } from "./ui/FileUpload";
export { RadioGroup } from "./ui/RadioGroup";

/* - Pages - */

// 1. Forms

export { RegisterTutor } from "./pages/forms/RegisterTutor";
export { RegisterPet } from "./pages/forms/RegisterPet";

// 2. Anamnese

export { Anamnese } from "./pages/anamnese/Anamnese";
export { AnamneseBehavior } from "./pages/anamnese/AnamneseBehavior";
export { AnamneseDiseases } from "./pages/anamnese/AnamneseDiseases";
export { AnamneseFeeding } from "./pages/anamnese/AnamneseFeeding";
export { AnamneseReproduction } from "./pages/anamnese/AnamneseReproduction";
export { AnamneseSurgeries } from "./pages/anamnese/AnamneseSurgeries";
export { AnamneseTesticles } from "./pages/anamnese/AnamneseTesticles";
export { AnamneseWalks } from "./pages/anamnese/AnamneseWalks";

/* - Hooks - */

// 1. General Hooks

export { usePetBreeds } from "./hooks/usePetBreeds";
export { usePetBadges } from "./hooks/usePetBadges";
export { useRegistrationContext } from "./hooks/useRegistrationContext";

// 2. C.R.U.D. - Pets

export { useCreatePet } from "./hooks/useCreatePet";
export { useGetPets } from "./hooks/useGetPets";
export { useUpdatePet } from "./hooks/useUpdatePet";
export { useDeletePet } from "./hooks/useDeletePet";

// 3. C.R.U.D. - Tutors

export { useCreateTutor } from "./hooks/useCreateTutor";
export { useGetTutors } from "./hooks/useGetTutors";
export { useUpdateTutor } from "./hooks/useUpdateTutor";
export { useDeleteTutor } from "./hooks/useDeleteTutor";

/* - Types - */

export type { Pet } from "./types/pet";
export type { Tutor } from "./types/tutor";
