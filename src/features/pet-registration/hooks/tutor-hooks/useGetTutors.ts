import { useState } from "react";
import { getTutors as getTutorsService } from "../../services/tutorService";
import type { Tutor } from "../../types/tutor";

const useGetTutors = () => {
  const [tutor, setNewTutor] = useState<Tutor | null>(null);
  const [getTutorError, setGetTutorError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getTutors = async (user_id: string) => {
    setIsLoading(true);
    try {
      const data = await getTutorsService(user_id);
      setNewTutor(data);
    } catch (error) {
      setGetTutorError("Erro ao retornar os tutores cadastrados!");
    } finally {
      setIsLoading(false);
    }
  };
  return { getTutors, getTutorError, isLoading, tutor };
};
export { useGetTutors };
