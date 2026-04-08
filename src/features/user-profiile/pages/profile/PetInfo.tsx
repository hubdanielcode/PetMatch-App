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
    <div className="flex flex-col bg-white dark:bg-gray-800 p-5 sm:p-8 m-8 sm:mx-[10%] lg:mx-[15%] w-auto sm:w-[80%] lg:w-[70%] border border-black/40 dark:border-white/20 rounded-lg mt-6 sm:mt-10 gap-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center border-b border-black/20 dark:border-white/20 pb-4">
        <span className="text-black dark:text-white font-bold text-xl sm:text-2xl">
          Meus Pets Cadastrados
        </span>

        <div
          className="flex justify-center sm:justify-start border border-black/40 dark:border-white/20 bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 rounded-lg px-4 py-2 font-semibold cursor-pointer text-white text-sm sm:text-base"
          role="button"
          onClick={() =>
            navigate("/registrar-pet", { state: { from: "/perfil" } })
          }
        >
          <CirclePlus className="h-4 w-4 my-1 mr-2 text-white" />
          Cadastrar Pet
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* - Carregando a lista de pets - */}

        {isLoading && (
          <p className="text-black/50 dark:text-white/50 text-sm">
            Carregando seus pets...
          </p>
        )}

        {/* - Mostrando a lista de pets (com pets) - */}

        {!isLoading &&
          pets.length >= 1 &&
          pets.map((pet, index) => (
            <motion.div
              key={pet.id}
              className="flex flex-col bg-white dark:bg-gray-700 border border-black/40 dark:border-white/20 rounded-xl w-full overflow-hidden shadow-sm hover:shadow-lg shadow-black/20 cursor-pointer"
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative overflow-hidden">
                <motion.img
                  src={pet.photo_url}
                  alt={pet.name}
                  className="w-full h-40 sm:h-48 object-cover object-center"
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
                  <p className="text-black dark:text-white font-bold text-base sm:text-lg">
                    {pet.name}
                  </p>
                  <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-1">
                    {pet?.breed ?? "Raça indisponível"} •{" "}
                    {pet?.gender ?? "Gênero indisponível"} •{" "}
                    {(() => {
                      const petAge = Number(pet?.age ?? 0);
                      return petAge < 12
                        ? `${petAge} ${petAge === 1 ? "Mês" : "Meses"}`
                        : `${Math.floor(petAge / 12)} ${
                            Math.floor(petAge / 12) === 1 ? "Ano" : "Anos"
                          }`;
                    })()}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <button
                    className="flex-1 border border-black/40 dark:border-white/20 rounded-lg py-2 text-xs sm:text-sm font-semibold text-white bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 cursor-pointer"
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
                    className="rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer text-black dark:text-white/70 hover:text-red-500 dark:hover:text-red-400 transition-colors"
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
          <p className="text-black/50 dark:text-white/50 text-sm">
            Ainda não há nenhum pet cadastrado.
          </p>
        )}
      </div>
    </div>
  );
};

export { PetInfo };
