import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  reviews?: number;
  className?: string;
}

const StarRating = ({ rating, reviews, className }: StarRatingProps) => {
  return (
    <div
      className={`flex flex-col bg-linear-to-br from-amber-200 via-orange-200 to-red-200 px-4 py-1 rounded-lg border border-black/40 ${className ?? ""}`}
      aria-readonly
    >
      <div className="flex items-center justify-start">
        <FaStar className="h-4 w-4 text-black" />
        <p className="text-black text-md font-semibold ml-2">
          {rating.toFixed(1)}
        </p>
      </div>
      {reviews && (
        <p className="text-sm text-black/70 whitespace-nowrap text-center">
          {reviews} {reviews === 1 ? "Avaliação" : "Avaliações"}
        </p>
      )}
    </div>
  );
};
export { StarRating };
