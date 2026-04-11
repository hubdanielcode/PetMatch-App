import { useState } from "react";
import { updateComment as updateCommentService } from "../services/commentService";
import type { Comment } from "../types/comment";

const useUpdateComment = () => {
  const [updatedCommentsList, setUpdatedCommentsList] =
    useState<Comment | null>(null);
  const [updateCommentError, setUpdateCommentError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateComment = async (comment: Omit<Comment, "created_at">) => {
    setIsLoading(true);
    try {
      const updatedComment = await updateCommentService(comment);
      setUpdatedCommentsList(updatedComment);
    } catch (error) {
      setUpdateCommentError(
        "Erro ao atualizar comentário! Id necessário para a atualização!",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { updateComment, updatedCommentsList, updateCommentError, isLoading };
};
export { useUpdateComment };
