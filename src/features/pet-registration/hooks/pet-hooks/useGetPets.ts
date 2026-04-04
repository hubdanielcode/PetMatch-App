import { useState } from "react";
import { getPets as getPetService } from "../../services/petService";
import type { Pet } from "../../types/pet";

const useGetPets = () => {
  const [newPet, setNewPet] = useState<Pet[]>([]);
  const [getPetError, setGetPetError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getPets = async () => {
    setIsLoading(true);
    try {
      const data = await getPetService();
      setNewPet(data);
    } catch (error) {
      setGetPetError("Erro ao retornar pets cadastrados.");
    } finally {
      setIsLoading(false);
    }
  };
  return { getPets, isLoading, getPetError, newPet };
};

export { useGetPets };
