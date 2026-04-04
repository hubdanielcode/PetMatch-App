import { useState } from "react";
import { getAllPets } from "../../services/petService";
import type { Pet } from "../../types/pet";

const useGetAllPets = () => {
  const [newPet, setNewPet] = useState<Pet[]>([]);
  const [getAllPetsError, setGetAllPetsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getPets = async () => {
    setIsLoading(true);
    try {
      const data = await getAllPets();
      setNewPet(data);
    } catch (error) {
      setGetAllPetsError("Erro ao retornar pets cadastrados.");
    } finally {
      setIsLoading(false);
    }
  };
  return { getPets, isLoading, getAllPetsError, newPet };
};

export { useGetAllPets };
