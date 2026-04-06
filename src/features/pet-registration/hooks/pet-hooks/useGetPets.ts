import { useState } from "react";
import { getPets as getPetService } from "../../services/petService";
import type { Pet } from "../../types/pet";

const useGetPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [getPetError, setGetPetError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getPets = async () => {
    setIsLoading(true);
    try {
      const data = await getPetService();
      setPets(data);
    } catch (error) {
      setGetPetError("Erro ao retornar pets cadastrados.");
    } finally {
      setIsLoading(false);
    }
  };
  return { getPets, isLoading, getPetError, pets };
};

export { useGetPets };
