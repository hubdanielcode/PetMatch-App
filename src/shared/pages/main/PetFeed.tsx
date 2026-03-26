import { FeedCard } from "../../ui/FeedCard";
import type { Pet } from "../../hooks/usePets";

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
            index={index}
            key={pet.id}
            image={pet.url}
            badge={pet.badge}
            name={pet.name}
            rating={pet.rating}
            description={pet.description}
            location={pet.location}
          />
        ))}
      </div>
    </div>
  );
};

export { PetFeed };
