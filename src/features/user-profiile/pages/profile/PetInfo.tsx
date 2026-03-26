import { CirclePlus } from "lucide-react";
import { FeedCard } from "../../../../shared";
import type { Pet } from "../../../../shared/hooks/usePets";
import { useNavigate } from "react-router-dom";

const PetInfo = () => {
  const navigate = useNavigate();

  const myPets: Pet[] = [];

  return (
    <div className="flex flex-col bg-white p-8 mx-[15%] w-[70%] border border-black/40 rounded-lg mt-10 gap-6">
      {/* - Cabeçalho - */}

      <div className="flex justify-between border-b border-black/20 pb-4">
        <span className="text-black font-bold text-2xl">
          Meus Pets Cadastrados
        </span>

        <div
          className="flex border border-black/40 bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 rounded-lg px-4 py-2 font-semibold cursor-pointer text-white"
          role="button"
          onClick={() =>
            navigate("/registrar-pet", { state: { from: "/perfil" } })
          }
        >
          <CirclePlus className="h-4 w-4 my-1 mr-2 text-white" />
          Adicionar Pet
        </div>
      </div>

      {/* - Lista de Pets - */}

      <div className="flex flex-wrap gap-4">
        {myPets.length === 0 ? (
          <p className="text-black/50 text-sm">
            Ainda não há nenhum pet cadastrado.
          </p>
        ) : (
          myPets.map((pet, index) => (
            <FeedCard
              key={pet.id}
              index={index}
              image={pet.url}
              badge={pet.badge}
              name={pet.name}
              rating={pet.rating}
              description={pet.description}
              location={pet.location}
            />
          ))
        )}
      </div>
    </div>
  );
};

export { PetInfo };
