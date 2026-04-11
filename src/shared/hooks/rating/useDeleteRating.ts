import { useState } from "react";
import { deleteRating as deleteRatingService } from "../../services/ratingService";
import type { Rating } from "../../types/rating";

const useDeleteRating = () => {
  const [updatedRatingList, setUpdatedRatingList] = useState<Rating[]>([]);
  const [deleteRatingError, setDeleteRatingError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const deleteRating = async (id: string) => {
    setIsLoading(true);
    try {
      const data = await deleteRatingService(id);
      setUpdatedRatingList((prev) =>
        prev.filter((rating) => rating.id !== data.id),
      );
    } catch (error) {
      setDeleteRatingError(
        "Erro ao deletar avaliação! ID é necessário para a deleção!",
      );
    }

    setIsLoading(false);
  };
  return { updatedRatingList, deleteRatingError, isLoading, deleteRating };
};

export { useDeleteRating };
