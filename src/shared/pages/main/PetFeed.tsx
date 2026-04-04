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

      <p className="text-sm font-bold text-black/70 mb-6 ml-4">
        {pets.length}{" "}
        {pets.length === 1 ? "Animal Encontrado" : "Animais Encontrados"}
      </p>

      {/* - Grid do feed - */}

      <div className="grid grid-cols-4 grid-rows-3 gap-6 m-4">
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
