import { useEffect, useState } from "react";

const usePetBreeds = () => {
  const [dogBreeds, setDogBreeds] = useState<string[]>([]);
  const [catBreeds, setCatBreeds] = useState<string[]>([]);

  useEffect(() => {
    /* - Buscando na API de raças de cachorro - */

    const fetchDogBreeds = async () => {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all");
        if (!response.ok) {
          throw new Error("Erro ao acessar dados.");
        }
        const data = await response.json();

        const dogBreedsList = Object.keys(data.message);
        setDogBreeds(dogBreedsList);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCatBreeds = async () => {
      try {
        const response = await fetch("https://api.thecatapi.com/v1/breeds");
        if (!response.ok) {
          throw new Error("Erro ao acessar dados.");
        }
        const data = await response.json();

        const catBreedsList = data.map((breed: { name: string }) => breed.name);
        setCatBreeds(catBreedsList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDogBreeds();
    fetchCatBreeds();
  }, []);

  return { dogBreeds, catBreeds };
};

export { usePetBreeds };
