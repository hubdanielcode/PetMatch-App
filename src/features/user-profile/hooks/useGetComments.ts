import { useState } from "react";
import { getComments as getCommentsService } from "../services/commentService";
import type { Comment } from "../types/comment";

const useGetComments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [getCommentError, setGetCommentError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getComments = async (pet_id: string) => {
    setIsLoading(true);
    try {
      const data = await getCommentsService(pet_id);
      setComments(data);
    } catch (error) {
      setGetCommentError("Erro ao retornar comentários encontrados!");
    } finally {
      setIsLoading(false);
    }
  };
  return { getComments, comments, getCommentError, isLoading };
};

export { useGetComments };
