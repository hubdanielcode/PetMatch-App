import { useState } from "react";
import { deleteTutor as deleteTutorService } from "../services/tutorService";
import type { Tutor } from "../types/tutor";

const useDeleteTutor = () => {
  const [updatedTutorList, setUpdatedtutorList] = useState<Tutor[]>([]);
  const [deleteTutorError, setDeletetutorError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const deleteTutor = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await deleteTutorService(id);
      setUpdatedtutorList(data);
    } catch (error) {
      setDeletetutorError(
        "Erro ao deletar tutor! ID é necessário para a deleção",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { deleteTutor, deleteTutorError, isLoading, updatedTutorList };
};
export { useDeleteTutor };
