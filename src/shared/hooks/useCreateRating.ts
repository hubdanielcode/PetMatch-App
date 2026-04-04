import { useState } from "react";
import { createRating as createRatingService } from "../services/ratingService";
import type { Rating } from "../types/rating";

const useCreateRating = () => {
  const [createRatingError, setCreateRatingError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createRating = async (
    rating: Omit<Rating, "id" | "created_at" | "user_id">,
  ) => {
    setIsLoading(true);
    try {
      await createRatingService(rating);
    } catch (error) {
      setCreateRatingError("Erro ao cadastrar avaliação");
    } finally {
      setIsLoading(false);
    }
  };
  return { createRating, isLoading, createRatingError };
};
export { useCreateRating };
