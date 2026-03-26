const PetFilter = () => {
  return (
    <form className=" bg-white border border-black/40 p-3 rounded-lg w-fullsticky top-6 self-start w-75">
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
  );
};

export { PetFilter };
