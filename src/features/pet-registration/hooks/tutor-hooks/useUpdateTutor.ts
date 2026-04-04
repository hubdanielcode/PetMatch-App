import { useState } from "react";
import { updateTutor as updateTutorService } from "../../services/tutorService";
import type { Tutor } from "../../types/tutor";

const useUpdateTutor = () => {
  const [updatedTutorList, setUpdatedTutorList] = useState<Tutor[]>([]);
  const [updateTutorError, setUpdateTutorError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateTutor = async (tutor: Omit<Tutor, "created_at">) => {
    setIsLoading(true);
    try {
      const data = await updateTutorService(tutor);
      setUpdatedTutorList(data);
    } catch (error) {
      setUpdateTutorError(
        "Erro ao atualizar tutor! ID é necessário para a atualização!",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { updateTutor, updateTutorError, isLoading, updatedTutorList };
};

export { useUpdateTutor };
