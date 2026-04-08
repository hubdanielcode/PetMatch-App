import { useState } from "react";
import { updateRating as updateRatingService } from "../../services/ratingService";
import type { Rating } from "../../types/rating";

const useUpdateRating = () => {
  const [updatedRatingList, setUpdatedRatingList] = useState<Rating[]>([]);
  const [updateRatingError, setUpdateRatingError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateRating = async (rating: Omit<Rating, "created_at">) => {
    setIsLoading(true);
    try {
      const data = await updateRatingService(rating);
      setUpdatedRatingList(data);
    } catch (error) {
      setUpdateRatingError(
        "Erro ao atualizar avaliação! ID é necessário para a atualização!",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { updateRating, isLoading, updateRatingError, updatedRatingList };
};

export { useUpdateRating };
