import { useState } from "react";
import { createComment as createCommentService } from "../services/commentService";
import { type Comment } from "../types/comment";

const useCreateComment = () => {
  const [createCommentError, setCreateCommentError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createComment = async (
    comment: Omit<Comment, "id" | "user_id" | "created_at">,
  ) => {
    setIsLoading(true);
    try {
      await createCommentService(comment);
    } catch (error) {
      setCreateCommentError("Erro ao criar comentário!");
    } finally {
      setIsLoading(false);
    }
  };
  return { createComment, createCommentError, isLoading };
};

export { useCreateComment };
