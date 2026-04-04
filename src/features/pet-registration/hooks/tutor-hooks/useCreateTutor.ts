import { useState } from "react";
import { createTutor as createTutorService } from "../../services/tutorService";
import type { Tutor } from "../../types/tutor";

const useCreateTutor = () => {
  const [createTutorError, setCreateTutorError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createTutor = async (
    tutor: Omit<Tutor, "id" | "created_at" | "validated_at" | "user_id">,
  ) => {
    setIsLoading(true);
    try {
      await createTutorService(tutor);
    } catch (error) {
      setCreateTutorError("Erro ao cadastrar tutor!");
    } finally {
      setIsLoading(false);
    }
  };
  return { createTutor, createTutorError, isLoading };
};
export { useCreateTutor };
