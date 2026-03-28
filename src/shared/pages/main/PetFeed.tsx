import { FeedCard } from "../../ui/FeedCard";
import type { Pet } from "../../../features/pet-registration/types/pet";

interface PetFeedProps {
  pets: Pet[];
}

const PetFeed = ({ pets }: PetFeedProps) => {
  return (
    <div>
      {/* - Contagem de filtrados - */}

      <p className="text-sm font-bold text-black/70 mb-6 ml-4">
        {pets.length} Animais Encontrados
      </p>

      {/* - Grid do feed - */}

      <div className="grid grid-cols-4 grid-rows-3 gap-6 m-4">
        {pets.map((pet, index) => (
          <FeedCard
            key={pet.id}
            pet={pet}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export { PetFeed };
