import { useState } from "react";
import { deletePet as deletePetService } from "../services/petService";
import type { Pet } from "../types/pet";

const useDeletePet = () => {
  const [updatedPetList, setUpdatedPetList] = useState<Pet[]>([]);
  const [deletePetError, setDeletePetError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const deletePet = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await deletePetService(id);
      setUpdatedPetList(data);
    } catch (error) {
      setDeletePetError("Erro ao deleter pet! ID é necessário para a deleção!");
    } finally {
      setIsLoading(false);
    }
  };
  return { deletePet, deletePetError, isLoading, updatedPetList };
};
export { useDeletePet };
