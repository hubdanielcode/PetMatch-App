import { useState } from "react";
import { createAnamnese as createAnamneseService } from "../../services/anamneseService";
import type { Anamnese } from "../../types/anamnsese";

const useCreateAnamnese = () => {
  const [createAnamneseError, setCreateAnamneseError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createAnamnese = async (
    anamnsese: Omit<Anamnese, "id" | "created_at">,
  ) => {
    setIsLoading(true);
    try {
      await createAnamneseService(anamnsese);
    } catch (error) {
      setCreateAnamneseError("Erro ao salvar dados!");
    } finally {
      setIsLoading(false);
    }
  };
  return { createAnamnese, createAnamneseError, isLoading };
};

export { useCreateAnamnese };
