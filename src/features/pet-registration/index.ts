/* - UI - */

export { FileUpload } from "./ui/FileUpload";
export { RadioGroup } from "./ui/RadioGroup";

/* - Pages - */

// 1. Forms

export { RegisterFlow } from "./pages/forms/RegisterFlow";

export { RegisterTutor } from "./pages/forms/RegisterTutor";
export { RegisterPet } from "./pages/forms/RegisterPet";

// 2. Anamnese

export { AnamneseFlow } from "./pages/anamnese/AnamneseFlow";

export { AnamneseBehavior } from "./pages/anamnese/AnamneseBehavior";
export { AnamneseDiseases } from "./pages/anamnese/AnamneseDiseases";
export { AnamneseFeeding } from "./pages/anamnese/AnamneseFeeding";
export { AnamneseReproduction } from "./pages/anamnese/AnamneseReproduction";
export { AnamneseSurgeries } from "./pages/anamnese/AnamneseSurgeries";
export { AnamneseTesticles } from "./pages/anamnese/AnamneseTesticles";
export { AnamneseWalks } from "./pages/anamnese/AnamneseWalks";

/* - Hooks - */

// 1. Pet Hooks

export { useCreatePet } from "./hooks/pet-hooks/useCreatePet";
export { useGetPets } from "./hooks/pet-hooks/useGetPets";
export { useUpdatePet } from "./hooks/pet-hooks/useUpdatePet";
export { useDeletePet } from "./hooks/pet-hooks/useDeletePet";

export { usePetBreeds } from "./hooks/pet-hooks/usePetBreeds";
export { usePetBadges } from "./hooks/pet-hooks/usePetBadges";

// 2. Tutor Hooks

export { useCreateTutor } from "./hooks/tutor-hooks/useCreateTutor";
export { useGetTutors } from "./hooks/tutor-hooks/useGetTutors";
export { useUpdateTutor } from "./hooks/tutor-hooks/useUpdateTutor";
export { useDeleteTutor } from "./hooks/tutor-hooks/useDeleteTutor";

// 3. Anamnese Hooks

export { useCreateAnamnese } from "./hooks/anamnese-hooks/useCreateAnamnese";
export { useGetAnamnese } from "./hooks/anamnese-hooks/useGetAnamnese";

// 4. Context Hooks

export { useRegistrationContext } from "./hooks/context-hooks/useRegistrationContext";

/* - Types - */

export type { Pet } from "./types/pet";
export type { Tutor } from "./types/tutor";
export type { Anamnese } from "./types/anamnsese";
