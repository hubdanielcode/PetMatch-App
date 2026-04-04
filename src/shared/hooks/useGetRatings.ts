import { useState } from "react";
import { getRatings as getRatingsService } from "../services/ratingService";
import type { Rating } from "../types/rating";

const useGetRatings = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [getRatingError, setGetRatingError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getRatings = async (pet_id: string) => {
    setIsLoading(true);
    try {
      const data = await getRatingsService(pet_id);
      setRatings(data);
    } catch (error) {
      setGetRatingError("Erro ao retornar avaliações cadastradas.");
    } finally {
      setIsLoading(false);
    }
  };
  return { getRatings, isLoading, getRatingError, ratings };
};

export { useGetRatings };
