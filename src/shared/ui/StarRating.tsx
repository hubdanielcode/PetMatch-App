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
      className={`
        flex flex-col items-center
        bg-linear-to-br from-amber-400 via-orange-400 to-red-400
        dark:from-amber-600 dark:via-orange-600 dark:to-red-600
        px-2 sm:px-3 py-1
        rounded-lg border border-black/40 dark:border-white/20
        w-fit
        ${className ?? ""}
      `}
      aria-readonly
    >
      <div className="flex items-center gap-1">
        <FaStar className="h-3 w-3 sm:h-4 sm:w-4 text-black dark:text-white" />
        <p className="text-xs sm:text-sm font-semibold text-black dark:text-white">
          {rating.toFixed(1)}
        </p>
      </div>

      {reviews !== undefined && (
        <p className="text-[10px] sm:text-xs text-black/70 dark:text-white/70 whitespace-nowrap">
          {reviews} {reviews === 1 ? "Avaliação" : "Avaliações"}
        </p>
      )}
    </div>
  );
};

export { StarRating };
