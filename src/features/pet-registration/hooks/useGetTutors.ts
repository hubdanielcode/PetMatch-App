import { useState } from "react";
import { getTutors as getTutorsService } from "../services/tutorService";
import type { Tutor } from "../types/tutor";

const useGetTutors = () => {
  const [newTutor, setNewTutor] = useState<Tutor[]>([]);
  const [getTutorError, setGetTutorError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getTutors = async () => {
    setIsLoading(true);
    try {
      const data = await getTutorsService();
      setNewTutor(data);
    } catch (error) {
      setGetTutorError("Erro ao retornar os tutores cadastrados!");
    } finally {
      setIsLoading(false);
    }
  };
  return { getTutors, getTutorError, isLoading, newTutor };
};
export { useGetTutors };
