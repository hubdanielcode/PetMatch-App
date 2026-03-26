import { useState, useEffect } from "react";

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

const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const DogCount = Math.floor(Math.random() * 11) + 1;
    const CatCount = 12 - DogCount;

    const fetchPets = async () => {
      try {
        const responseDog = await fetch(
          `https://api.thedogapi.com/v1/images/search?limit=${DogCount}`,
        );
        const dataDog = await responseDog.json();

        const responseCat = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=${CatCount}`,
        );
        const dataCat = await responseCat.json();

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

  return { pets };
};

export type { Pet };
export { usePets };
