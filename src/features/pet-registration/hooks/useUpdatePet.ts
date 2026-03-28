import { useState } from "react";
import { updatePet as updatePetService } from "../services/petService";
import type { Pet } from "./../types/pet";

const useUpdatePet = () => {
  const [updatedPetList, setUpdatedPetList] = useState<Pet[]>([]);
  const [updatePetError, setUpdatePetError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updatePet = async (pet: Omit<Pet, "created_at">) => {
    setIsLoading(true);
    try {
      const data = await updatePetService(pet);
      setUpdatedPetList(data);
    } catch (error) {
      setUpdatePetError(
        "Erro ao atualizar pet! ID é necessário para a atualização!",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { updatePet, updatePetError, isLoading, updatedPetList };
};

export { useUpdatePet };
