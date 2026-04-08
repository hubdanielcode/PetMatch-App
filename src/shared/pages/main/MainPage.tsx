import { useEffect, useMemo } from "react";
import { useGetAllPets } from "../../../features/pet-registration/hooks/pet-hooks/useGetAllPets";
import { useRegistrationContext } from "../../../features/pet-registration";
import { PetFeed } from "./PetFeed";
import { PetFilter } from "./PetFilter";

const MainPage = () => {
  const { getPets, newPet } = useGetAllPets();
  const { species, breed, mated, city, minAge, maxAge } =
    useRegistrationContext();

  useEffect(() => {
    getPets();
  }, []);

  const filteredPets = useMemo(() => {
    return newPet.filter((pet) => {
      if (species && pet.species !== species) return false;

      if (breed && !pet.breed?.toLowerCase().includes(breed.toLowerCase()))
        return false;

      if (mated !== null && pet.mated !== mated) return false;

      if (
        city &&
        !pet.city?.toLowerCase().includes(city.toLowerCase()) &&
        !pet.state?.toLowerCase().includes(city.toLowerCase())
      ) {
        return false;
      }

      if (minAge && Number(pet.age) < Number(minAge) * 12) return false;

      if (maxAge && Number(pet.age) > Number(maxAge) * 12) return false;

      return true;
    });
  }, [newPet, species, breed, mated, city, minAge, maxAge]);

  return (
    <div className="bg-linear-to-br from-amber-100 via-orange-100 to-red-100 min-h-screen w-full px-4 md:px-8 lg:px-[10%] py-8">
      {/* - Título - */}

      <div className="mb-6 md:mb-10 max-w-xl">
        <h1 className="text-2xl md:text-3xl font-bold text-black mb-1">
          Feed de Pets
        </h1>

        <p className="text-sm md:text-base font-semibold text-black/70">
          Encontre o match perfeito para o seu pet!
        </p>
      </div>

      {/* - Conteúdo - */}

      <div className="flex flex-col md:flex-row lg:flex-row gap-2 lg:gap-8 items-stretch">
        {/* - Filtro - */}

        <div className="flex w-full landscape:w-70 shrink-0">
          <PetFilter />
        </div>

        {/* - Feed - */}

        <div className="flex-1">
          <PetFeed pets={filteredPets} />
        </div>
      </div>
    </div>
  );
};

export { MainPage };
