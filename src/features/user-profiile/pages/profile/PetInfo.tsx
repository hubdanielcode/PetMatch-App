import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetPets, useGetTutors } from "../../../pet-registration";
import { deletePet } from "../../../pet-registration/services/petService";
import { FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import { Badges } from "../../../../shared/ui/Badges";
import { supabase } from "../../../../../supabase/supabase";

const PetInfo = () => {
  const navigate = useNavigate();
  const { getPets, pets } = useGetPets();
  const { getTutors, tutor } = useGetTutors();

  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [fetchActiveUserError, setFetchActiveUserError] = useState("");

  useEffect(() => {
    const fetchActiveUser = async () => {
      setIsLoading(true);
      try {
        await getPets();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) getTutors(user.id);
      } catch (error) {
        if (fetchActiveUserError) {
          setFetchActiveUserError("Erro ao buscar usuário logado");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchActiveUser();
  }, []);

  const handleDeletePet = async (id: string) => {
    await deletePet(id);
    await getPets();
  };

  return (
    <div className="flex flex-col bg-white p-8 mx-[15%] w-[70%] border border-black/40 rounded-lg my-10 gap-6">
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
          Cadastrar Pet
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* - Carregando a lista de pets - */}

        {isLoading && (
          <p className="text-black/50 text-sm">Carregando seus pets...</p>
        )}

        {/* - Mostrando a lista de pets (com pets) - */}

        {!isLoading &&
          pets.length >= 1 &&
          pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              className="flex flex-col bg-white border border-black/40 rounded-xl w-72 overflow-hidden shadow-sm hover:shadow-lg shadow-black/20 cursor-pointer"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={pet.photo_url}
                  alt={pet.name}
                  className="w-full h-48 object-cover object-center"
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
              </div>

              <div className="flex flex-col p-4 gap-3">
                <div>
                  <p className="text-black font-bold text-lg">{pet.name}</p>
                  <p className="text-sm text-black/70 mt-1">
                    {pet?.breed ?? "Raça indisponível"} •{" "}
                    {pet?.gender ?? "Gênero indisponível"} •{" "}
                    {(() => {
                      const petAge = Number(pet?.age ?? 0);
                      return petAge < 12
                        ? `${petAge} ${petAge === 1 ? "Mês" : "Meses"}`
                        : `${Math.floor(petAge / 12)} ${Math.floor(petAge / 12) === 1 ? "Ano" : "Anos"}`;
                    })()}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    className="flex-1 border border-black/40 rounded-lg py-2 text-sm font-semibold text-white bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 cursor-pointer"
                    onClick={() => {
                      console.log("tutor ao navegar:", tutor);
                      navigate("/perfil-pet", {
                        state: { pet, tutor },
                        replace: true,
                      });
                    }}
                  >
                    Ver Perfil
                  </button>

                  <button
                    className="rounded-lg p-2 hover:bg-gray-200 cursor-pointer text-black hover:text-red-500"
                    onClick={() => handleDeletePet(pet.id)}
                  >
                    <FaTrashAlt className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

        {/* - Carregando a lista de pets (sem pets) - */}

        {!isLoading && pets.length === 0 && (
          <p className="text-black/50 text-sm">
            Ainda não há nenhum pet cadastrado.
          </p>
        )}
      </div>
    </div>
  );
};

export { PetInfo };
