import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Badges } from "./Badges";
import type { Pet } from "../../features/pet-registration/types/pet";
import { StarRating } from "./StarRating";
import { useGetComments } from "../../features/user-profiile";
import { useEffect } from "react";

interface FeedCardProps {
  pet: Pet;
  index: number;
  onClick: () => void;
}

const FeedCard: React.FC<FeedCardProps> = ({ pet, index, onClick }) => {
  const { comments, getComments } = useGetComments();

  useEffect(() => {
    getComments(pet.id);
  }, [pet.id]);

  const handleCalculateRating = (rating: number[]): number => {
    if (rating.length === 0) return 0;
    const total = rating.reduce(
      (accumulator, rating) => accumulator + rating,
      0,
    );
    return total / rating.length;
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 border border-black/30 dark:border-white/20 rounded-lg md:w-45 lg:w-full flex flex-col cursor-pointer hover:shadow-md shadow-black/10 overflow-hidden"
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onClick={onClick}
    >
      <div className="flex flex-col">
        <div className="relative w-full aspect-4/3 overflow-hidden">
          <motion.img
            src={pet.photo_url}
            alt={pet.name}
            className="w-full h-full object-cover object-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-1 right-1">
            <Badges
              species={pet.species as "Cachorro" | "Gato"}
              mated={pet.mated}
              pedigree={pet.pedigree ?? false}
              vaccinated={pet.vaccinated}
              cryptorchidism_bilateral={pet.cryptorchidism_bilateral}
              cryptorchidism_unilateral={pet.cryptorchidism_unilateral}
              size="sm"
            />
          </div>
        </div>

        <div className="flex flex-col p-2">
          <div className="flex justify-between items-start gap-1 mb-1">
            <p className="text-base md:text-lg text-black dark:text-white font-semibold truncate">
              {pet.name}
            </p>
            <StarRating
              className="text-xs w-14 md:w-16 shrink-0"
              rating={handleCalculateRating(
                comments.map((comment) => comment.rating),
              )}
            />
          </div>

          <p className="text-xs text-black/70 dark:text-white/70 mb-2 line-clamp-1">
            {pet.breed} • {pet.gender} •{" "}
            {(() => {
              const petAge = Number(pet.age);
              return petAge < 12
                ? `${petAge} ${petAge === 1 ? "Mês" : "Meses"}`
                : `${petAge / 12} ${petAge / 12 === 1 ? "Ano" : "Anos"}`;
            })()}
          </p>

          <div className="flex items-center gap-1">
            <FaLocationDot className="h-3 w-3 md:h-3 md:w-3 text-amber-600" />
            <p className="text-xs text-black/70 dark:text-white/70 truncate">
              {pet.city && pet.state
                ? `${pet.city}, ${pet.state}`
                : "Localização pendente"}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export { FeedCard };
