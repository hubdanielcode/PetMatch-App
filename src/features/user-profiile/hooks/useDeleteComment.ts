import { useState } from "react";
import { deleteComment as deleteCommentService } from "../services/commentService";
import type { Comment } from "../types/comment";

const useDeleteComment = () => {
  const [updatedCommentList, setUpdatedCommentList] = useState<Comment | null>(
    null,
  );
  const [deleteCommentError, setDeleteCommentError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const deleteComment = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await deleteCommentService(id);
      setUpdatedCommentList(data);
    } catch (error) {
      setDeleteCommentError(
        "Erro ao deletar comentário! Id necessário para a deleção!",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { deleteComment, updatedCommentList, deleteCommentError, isLoading };
};

export { useDeleteComment };
