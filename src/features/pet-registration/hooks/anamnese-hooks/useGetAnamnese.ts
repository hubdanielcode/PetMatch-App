import { useState } from "react";
import { getAnamnese as getAnamneseService } from "./../../services/anamneseService";
import type { Anamnese } from "../../types/anamnsese";

const useGetAnamnese = () => {
  const [newAnamnese, setNewAnamnese] = useState<Anamnese | null>(null);
  const [getAnamneseError, setGetAnamneseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getAnamnese = async (pet_id: string) => {
    setIsLoading(true);
    try {
      const data = await getAnamneseService(pet_id);
      setNewAnamnese(data);
    } catch (error) {
      setGetAnamneseError("Falha ao retornar dados da anamnese!");
    } finally {
      setIsLoading(false);
    }
  };
  return { getAnamnese, newAnamnese, getAnamneseError, isLoading };
};
export { useGetAnamnese };
