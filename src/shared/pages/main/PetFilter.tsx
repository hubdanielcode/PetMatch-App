import { useEffect, useState } from "react";
import { speciesOptions, matedOptions } from "./../../utils/registerPetOptions";
import { useRegistrationContext } from "../../../features/pet-registration";

const PetFilter = () => {
  const {
    minAge,
    setMinAge,
    maxAge,
    setMaxAge,
    species,
    setSpecies,
    breed,
    setBreed,
    mated,
    setMated,
    setCity,
    setState,
  } = useRegistrationContext();

  const selectedSpecies = speciesOptions.find(
    (option) => option.value === species,
  );

  const [isSpeciesOpen, setIsSpeciesOpen] = useState(false);
  const [isMatedOpen, setIsMatedOpen] = useState(false);
  const [region, setRegion] = useState("");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;

      if (!target.closest("#pet-species-container")) setIsSpeciesOpen(false);
      if (!target.closest("#pet-mated-container")) setIsMatedOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* - Limpando os filtros - */

  const handleClearFilters = (e: React.MouseEvent) => {
    e.preventDefault();
    setSpecies("");
    setBreed("");
    setMinAge("");
    setMaxAge("");
    setMated(null);
    setRegion("");
  };

  return (
    <div className=" bg-white border border-black/40 p-3 rounded-lg w-80 sticky top-6 self-start">
      <form>
        <p className="font-semibold text-lg text-black mb-6">Filtros</p>

        {/* - Filtrar por espécie - */}

        <label
          className="text-sm text-black font-semibold"
          htmlFor="pet-species"
        >
          Espécies
        </label>

        <div
          className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-2 py-1 focus-within:ring-2 focus-within:ring-amber-500 my-1"
          id="pet-species-container"
        >
          <input
            className="w-full h-6 bg-transparent text-sm focus:outline-none rounded-lg placeholder:text-gray-500 text-black ml-2"
            id="pet-species"
            type="text"
            value={selectedSpecies?.label ?? ""}
            onClick={() => setIsSpeciesOpen(true)}
            placeholder="Filtrar por Espécie"
            autoComplete="off"
          />

          {isSpeciesOpen && (
            <div className="absolute w-65  mt-1 bg-white border border-black/20 rounded-lg shadow-lg z-10 overflow-hidden">
              {speciesOptions.map((option) => (
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-amber-100 transition-colors m-1 rounded-lg"
                  key={option.value}
                  onClick={() => {
                    setSpecies(option.value);
                    setBreed("");
                    setIsSpeciesOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
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
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            placeholder="Filtrar por Raça"
            autoComplete="off"
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
            min="0"
            value={minAge}
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value)).toString();
              setMinAge(value);
            }}
            placeholder="Min"
            autoComplete="off"
          />

          <input
            className="w-full border border-black/40 focus:outline-none bg-gray-100 rounded-lg flex px-2 py-1 focus-within:ring-2 focus-within:ring-amber-500 my-1"
            id="max-pet-age"
            type="number"
            min="0"
            value={maxAge}
            onChange={(e) => {
              const value = Math.max(0, Number(e.target.value)).toString();
              setMaxAge(value);
            }}
            placeholder="Max"
            autoComplete="off"
          />
        </div>

        {/* - Filtrar por experiência - */}

        <label
          className="text-sm text-black font-semibold"
          htmlFor="pet-mated"
        >
          Experiência
        </label>

        <div
          className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-2 py-1 focus-within:ring-2 focus-within:ring-amber-500 my-1"
          id="pet-mated-container"
        >
          <input
            className="w-full h-6 bg-transparent text-sm focus:outline-none rounded-lg placeholder:text-gray-500 text-black ml-2"
            id="pet-mated"
            type="text"
            value={mated === null ? "" : mated ? "Já Cruzou" : "Primeira Vez"}
            onClick={() => setIsMatedOpen(true)}
            placeholder="Todas"
            autoComplete="off"
          />

          {isMatedOpen && (
            <div className="absolute w-65  mt-1 bg-white border border-black/20 rounded-lg shadow-lg z-10 overflow-hidden">
              {matedOptions.map((option) => (
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-amber-100 transition-colors m-1 rounded-lg"
                  key={option.value}
                  onClick={() => {
                    setMated(option.value === "true");
                    setIsMatedOpen(false);
                  }}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
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
            value={region}
            onChange={(e) => {
              setRegion(e.target.value);
              setCity(e.target.value);
              setState(e.target.value);
            }}
            placeholder="Ex: Salvador ou BA"
            autoComplete="off"
          />
        </div>

        {/* - Limpar Filtros - */}

        <div className="w-full">
          <button
            className="w-full h-8 mt-3 bg-linear-to-r from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-md rounded-lg px-4 cursor-pointer hover:from-amber-400 hover:via-orange-400 hover:to-red-400 border border-black/40"
            onClick={handleClearFilters}
          >
            Limpar Filtros
          </button>
        </div>
      </form>
    </div>
  );
};

export { PetFilter };
