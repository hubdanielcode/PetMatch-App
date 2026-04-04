import { useState } from "react";
import { createPet as createPetService } from "../../services/petService";
import type { Pet } from "../../types/pet";

const useCreatePet = () => {
  const [createPetError, setCreatePetError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createPet = async (pet: Omit<Pet, "id" | "created_at" | "user_id">) => {
    setIsLoading(true);
    try {
      const data = await createPetService(pet);
      return data;
    } catch (error) {
      setCreatePetError("Erro ao cadastrar pet.");
    } finally {
      setIsLoading(false);
    }
  };
  return { createPet, isLoading, createPetError };
};

export { useCreatePet };
