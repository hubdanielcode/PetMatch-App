import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Badges } from "./Badges";
import type { Pet } from "../../features/pet-registration/types/pet";

interface FeedCardProps {
  pet: Pet;
  index: number;
}

const FeedCard: React.FC<FeedCardProps> = ({ pet, index }) => {
  return (
    <motion.div
      className="bg-white border border-black/40 rounded-lg w-full h-fit flex flex-col cursor-pointer hover:shadow-lg shadow-black/20"
      initial={{ y: 0, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: index * 0.3 }}
    >
      <div className="flex flex-col">
        <motion.div className="overflow-hidden rounded-t-md">
          <motion.img
            src={pet.photo_url}
            alt={pet.name}
            className="flex object-cover object-center h-50 w-70"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <Badges
          species={pet.species as "Cachorro" | "Gato"}
          mated={pet.mated}
          pedigree={pet.pedigree ?? false}
          vaccinated={pet.vaccinated}
          cryptorchidism_bilateral={pet.cryptorchidism_bilateral}
          cryptorchidism_unilateral={pet.cryptorchidism_unilateral}
        />

        <div className="flex flex-col p-3">
          <p className="text-xl text-black font-bold mb-2">{pet.name}</p>
          <p className="text-sm text-black/70 mb-3">
            {pet.breed} • {pet.gender} • {pet.age}
          </p>
          <div className="flex">
            <FaLocationDot className="h-4 w-4 text-amber-600 mr-2" />
            <p className="text-sm text-black/70">Localização pendente</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export { FeedCard };
