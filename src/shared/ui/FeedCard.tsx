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
    if (rating.length === 0) {
      return 0;
    }
    const realRatingValue = rating.reduce(
      (accumulator, rating) => accumulator + rating,
      0,
    );
    return realRatingValue / rating.length;
  };

  return (
    <motion.div
      className="bg-white border border-black/40 rounded-lg w-full h-fit flex flex-col cursor-pointer hover:shadow-lg shadow-black/20"
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.3 }}
      onClick={onClick}
    >
      <div className="flex flex-col">
        <motion.div className="overflow-hidden rounded-t-md relative">
          <motion.img
            src={pet.photo_url}
            alt={pet.name}
            className="flex object-cover object-center h-50 w-70"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <div className="absolute top-0 right-0">
            <Badges
              species={pet.species as "Cachorro" | "Gato"}
              mated={pet.mated}
              pedigree={pet.pedigree ?? false}
              vaccinated={pet.vaccinated}
              cryptorchidism_bilateral={pet.cryptorchidism_bilateral}
              cryptorchidism_unilateral={pet.cryptorchidism_unilateral}
            />
          </div>
        </motion.div>

        <div className="flex flex-col p-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl text-black font-bold">{pet.name}</p>

            <div>
              <StarRating
                className="text-xs w-18"
                rating={handleCalculateRating(
                  comments.map((comment) => comment.rating),
                )}
              />
            </div>
          </div>

          <p className="text-sm text-black/70 mb-3">
            {pet.breed} • {pet.gender} •{" "}
            {(() => {
              const petAge = Number(pet.age);
              return petAge < 12
                ? `${petAge} ${petAge === 1 ? "Mês" : "Meses"}`
                : `${petAge / 12} ${petAge / 12 === 1 ? "Ano" : "Anos"}`;
            })()}
          </p>
          <div className="flex">
            <FaLocationDot className="h-4 w-4 text-amber-600 mr-2" />
            <p className="text-sm text-black/70">
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
