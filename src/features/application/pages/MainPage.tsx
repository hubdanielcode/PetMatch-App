import { useState, useEffect } from "react";
import { FeedCard } from "../ui/FeedCard";

interface Pet {
  id: string;
  url: string;
  badge?: string;
  name: string;
  rating?: string;
  description: {
    breed: string;
    gender: string;
    age: string;
  };
  location: string;
}

const MainPage = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const DogCount = Math.floor(Math.random() * 11) + 1;
    const CatCount = 11 - DogCount;

    const fetchPets = async () => {
      /* - Buscando as fotos dos cachorros - */

      try {
        const responseDog = await fetch(
          `https://api.thedogapi.com/v1/images/search?limit=${DogCount}`,
        );
        const dataDog = await responseDog.json();

        /* - Buscando as fotos dos gatos - */

        const responseCat = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=${CatCount}`,
        );

        const dataCat = await responseCat.json();

        /* - Juntando as duas para criar o feed - */

        setPets(
          [...dataDog, ...dataCat]
            .sort(() => Math.random() - 0.5)
            .slice(0, 12)
            .map((pet) => ({
              id: pet.id,
              url: pet.url,
              name: "Thor",
              location: "São Paulo, SP",
              description: {
                breed: "Golden Retriever",
                gender: "Macho",
                age: "3 Anos",
              },
            })),
        );
      } catch (error) {
        console.error("Erro ao buscar pets:", error);
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="bg-linear-to-br from-amber-100 via-orange-100 to-red-100 min-h-screen max-w-full">
      <div className="flex flex-col w-[25%] ml-[15%] py-12">
        <h1 className="text-3xl font-bold text-black mb-1">Feed de Pets</h1>
        <p className="text-base font-semibold text-black/70">
          Encontre o match perfeito para o seu pet!
        </p>
      </div>

      <div className="flex gap-8 items-start min-h-screen">
        {/* - Filtro - */}

        <form className="bg-white border border-black/40 p-3 rounded-lg w-full max-w-[15%] ml-[15%] h-fit sticky top-6">
          <p className="font-semibold text-lg text-black mb-8">Filtros</p>

          {/* - Filtrar por espécie - */}

          <label
            className="text-sm text-black font-semibold"
            htmlFor="pet-species"
          >
            Espécies
          </label>

          <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-2 py-1 focus-within:ring-2 focus-within:ring-amber-500 my-1">
            <input
              className="w-full h-6 bg-transparent text-sm focus:outline-none rounded-lg placeholder:text-gray-500 text-black ml-2"
              id="pet-species"
              type="text"
              placeholder="Filtrar por Espécie"
            />
          </div>

          {/* - Filtrar por raça - */}

          <label
            className="text-sm text-black font-semibold"
            htmlFor="pet-breed"
          >
            Raça
          </label>

          <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-2 py-1 focus-within:ring-2 focus-within:ring-amber-500 my-1">
            <input
              className="w-full h-6 bg-transparent text-sm focus:outline-none rounded-lg placeholder:text-gray-500 text-black ml-2"
              id="pet-breed"
              type="text"
              placeholder="Filtrar por Raça"
            />
          </div>

          {/* - Filtrar por idade - */}

          <label
            className="text-sm text-black font-semibold"
            htmlFor="pet-age"
          >
            Idade (Anos)
          </label>

          <div className="w-full flex px-2 py-1 my-1 gap-3">
            <input
              className="w-full border border-black/40 focus:outline-none bg-gray-100 rounded-lg flex px-2 py-1 focus-within:ring-2 focus-within:ring-amber-500 my-1"
              id="min-pet-age"
              type="number"
              placeholder="Min"
            />

            <input
              className="w-full border border-black/40 focus:outline-none bg-gray-100 rounded-lg flex px-2 py-1 focus-within:ring-2 focus-within:ring-amber-500 my-1"
              id="max-pet-age"
              type="number"
              placeholder="Max"
            />
          </div>

          {/* - Filtrar por experiência - */}

          <label
            className="text-sm text-black font-semibold"
            htmlFor="pet-experience"
          >
            Experiência
          </label>

          <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-2 py-1 focus-within:ring-2 focus-within:ring-amber-500 my-1">
            <input
              className="w-full h-6 bg-transparent text-sm focus:outline-none rounded-lg placeholder:text-gray-500 text-black ml-2"
              id="pet-experience"
              type="text"
              placeholder="Todas"
            />
          </div>

          {/* - Filtrar por localização - */}

          <label
            className="text-sm text-black font-semibold"
            htmlFor="pet-region"
          >
            Região
          </label>

          <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-2 py-1 focus-within:ring-2 focus-within:ring-amber-500 my-1">
            <input
              className="w-full h-6 bg-transparent text-sm focus:outline-none rounded-lg placeholder:text-gray-500 text-black ml-2"
              id="pet-region"
              type="text"
              placeholder="Ex: Salvador"
            />
          </div>
        </form>

        {/* - Contagem de filtrados - */}

        <div>
          <p className="text-sm font-bold text-black/70 mb-6 ml-4">
            {pets.length} Animais Encontrados
          </p>

          {/* - Grid do feed - */}

          <div className="grid grid-cols-4 grid-rows-3 gap-6 m-4">
            {pets.map((pet) => (
              <FeedCard
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
      </div>
    </div>
  );
};
export { MainPage };
