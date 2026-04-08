import { FeedCard } from "../../ui/FeedCard";
import type { Pet } from "../../../features/pet-registration/types/pet";
import { useNavigate } from "react-router-dom";
import { getTutors } from "../../../features/pet-registration/services/tutorService";

interface PetFeedProps {
  pets: Pet[];
}

const PetFeed = ({ pets }: PetFeedProps) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* - Contagem de filtrados - */}

      <p className="text-sm font-bold text-black/70 dark:text-white/70 mb-6 ml-8">
        {pets.length}{" "}
        {pets.length === 1 ? "Animal Encontrado" : "Animais Encontrados"}
      </p>

      {/* - Grid do feed - */}

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 w-90 md:w-95 lg:w-full mx-auto gap-6 md:m-8 lg:gap-8">
        {pets.map((pet, index) => (
          <FeedCard
            key={pet.id}
            pet={pet}
            index={index}
            onClick={async () => {
              const tutor = await getTutors(pet.user_id);
              navigate("/perfil-pet", { state: { pet, tutor } });
            }}
          />
        ))}
      </div>
    </div>
  );
};

export { PetFeed };
