import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";
import { usePetBreeds } from "../../hooks/usePetBreeds";
import { PetRegisterTutor, Anamnese } from "../..";
import { genderOptions, yesOrNoOptions } from "../../utils/petRegisterOptions";
import { FileUpload } from "../../ui/FileUpload";
import { RadioGroup } from "../../ui/RadioGroup";
import { regex } from "../../utils/petRegisterRegex";
import { useRegistrationContext } from "../../hooks/useRegistrationContext";

const PetRegister = () => {
  const [page, setPage] = useState<1 | 2 | 3>(1);
  const [petRegisterError, setPetRegisterError] = useState("");
  const [isSpeciesOpen, setIsSpeciesOpen] = useState(false);
  const [isBreedOpen, setIsBreedOpen] = useState(false);

  const { dogBreeds, catBreeds } = usePetBreeds();

  const {
    petPhoto,
    setPetPhoto,
    petName,
    setPetName,
    species,
    setSpecies,
    breed,
    setBreed,
    gender,
    setGender,
    pedigree,
    setPedigree,
    pedigreeFile,
    setPedigreeFile,
    vaccineFile,
    setVaccineFile,
    mated,
    setMated,
  } = useRegistrationContext();

  /* - Espécie - */

  const speciesOptions = [
    { label: "Cachorro", value: "Cachorro" },
    { label: "Gato", value: "Gato" },
  ];

  const selectedSpecies = speciesOptions.find(
    (option) => option.value === species,
  );

  /* - Raça - */

  const breedOptions = (species === "Cachorro" ? dogBreeds : catBreeds).map(
    (breed) => ({
      label: breed.charAt(0).toUpperCase() + breed.slice(1),
      value: breed,
    }),
  );

  const selectedBreed = breedOptions.find((option) => option.value === breed);

  /* - Outros - */

  const advanceRegisterPet = () => {
    if (!petPhoto) {
      setPetRegisterError("Adicione uma foto do pet.");
      return;
    }

    if (!petName) {
      setPetRegisterError("Preencha o nome do pet.");
      return;
    }

    if (!regex.petName.test(petName)) {
      setPetRegisterError("Nome do pet inválido.");
      return;
    }

    if (!species) {
      setPetRegisterError("Selecione a espécie.");
      return;
    }

    if (!breed) {
      setPetRegisterError("Selecione a raça.");
      return;
    }

    if (!gender) {
      setPetRegisterError("Selecione o sexo.");
      return;
    }

    if (!pedigree) {
      setPetRegisterError("Informe se possui pedigree.");
      return;
    }

    if (pedigree === "Sim" && !pedigreeFile) {
      setPetRegisterError("Anexe o pedigree.");
      return;
    }

    if (!vaccineFile) {
      setPetRegisterError("Anexe a carteira de vacinação.");
      return;
    }

    if (!mated) {
      setPetRegisterError("Informe se já cruzou.");
      return;
    }

    setPetRegisterError("");
    setPage(2);
  };

  const layout = (content: React.ReactNode) => (
    <>
      <div className="flex flex-col justify-center p-5 bg-linear-to-br from-amber-100 via-orange-100 to-red-100 h-screen w-full">
        <button
          className="flex w-fit rounded-lg mx-[25%] mb-5 text-black font-semibold px-4 py-2 hover:bg-amber-200 cursor-pointer"
          onClick={() => (page === 2 ? setPage(1) : undefined)}
        >
          <ArrowLeft className="h-6 w-6 mr-2" />
          Voltar
        </button>

        <form className="flex flex-col bg-white border border-black/40 rounded-lg w-[50%] mx-auto overflow-y-auto max-h-[80vh]">
          <h1 className="text-xl font-semibold px-6 pt-3">Cadastrar Pet</h1>
          <p className="text-sm px-6 pt-2 mb-6">
            Preencha as informações do seu pet para encontrar matches
          </p>
          {content}
        </form>
      </div>
    </>
  );

  if (page === 2) return layout(<Anamnese />);
  if (page === 3) return layout(<PetRegisterTutor />);

  return layout(
    <>
      {/* - Foto do pet - */}

      <FileUpload
        id="pet-picture"
        className="min-h-100"
        label="Foto do Pet *"
        accept="image/*"
        onChange={(file) => setPetPhoto(file!)}
      />

      {/* - Nome do pet - */}

      <label
        className="px-6 text-lg font-semibold mb-3"
        htmlFor="pet-name"
      >
        Nome *
      </label>

      <div className="flex items-center min-h-10 border placeholder:text-gray-500 border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors mx-6 mb-6 px-4 focus-within:ring-2 focus-within:ring-amber-500">
        <input
          className="bg-transparent focus:outline-none rounded-lg placeholder:text-gray-500 text-black w-full"
          id="pet-name"
          type="text"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          placeholder="Nome do seu pet"
          required
        />
      </div>

      {/* - Espécie do pet - */}

      <label className="px-6 text-lg font-semibold mb-3">Espécie *</label>

      <div className="relative mx-6 mb-6">
        <button
          className={`w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors px-4 flex items-center justify-between focus-within:ring-2 focus-within:ring-amber-500 cursor-pointer ${selectedSpecies ? "text-black" : "text-gray-500"}`}
          type="button"
          onClick={() => setIsSpeciesOpen(!isSpeciesOpen)}
        >
          {selectedSpecies ? selectedSpecies.value : "Selecione..."}
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>

        {isSpeciesOpen && (
          <div className="absolute w-full mt-1 bg-white border border-black/20 rounded-lg shadow-lg z-10 overflow-hidden ">
            {speciesOptions.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-amber-100 transition-colors text-black "
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

      {/* - Raça do pet - */}

      <label className="px-6 text-lg font-semibold mb-3">Raça *</label>

      <div className="relative mx-6 mb-6">
        <button
          className={`w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 transition-colors px-4 flex items-center justify-between focus-within:ring-2 focus-within:ring-amber-500 ${species ? "hover:bg-amber-50 cursor-pointer" : "cursor-not-allowed opacity-50"} ${selectedBreed ? "text-black" : "text-gray-500"}`}
          type="button"
          onClick={() => species && setIsBreedOpen(!isBreedOpen)}
          disabled={!species}
        >
          {selectedBreed
            ? selectedBreed.label
            : species
              ? "Selecione a raça do seu pet..."
              : "Selecione a espécie do seu pet..."}
          <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
        </button>

        {isBreedOpen && (
          <div className="absolute w-full mt-1 bg-white border border-black/20 rounded-lg shadow-lg z-10 overflow-hidden max-h-48 overflow-y-auto">
            {breedOptions.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 cursor-pointer hover:bg-amber-100 transition-colors text-black"
                onClick={() => {
                  setBreed(option.value);
                  setIsBreedOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* - Sexo do pet - */}

      <RadioGroup
        label="Sexo *"
        options={genderOptions}
        value={gender}
        onChange={(value) => setGender(value)}
      />

      {/* - Pet possui pedigree? - */}

      <RadioGroup
        label="Possui Pedigree? *"
        options={yesOrNoOptions}
        value={pedigree}
        onChange={(value) => setPedigree(value)}
      />

      {/* - Se sim, anexe aqui - */}

      {pedigree === "Sim" && (
        <FileUpload
          id="pet-pedigree"
          className="min-h-20"
          label="Anexar Pedigree *"
          onChange={(file) => setPedigreeFile(file!)}
        />
      )}

      {/* - Carteira de vacinação do pet - */}

      <FileUpload
        id="pet-vaccine"
        className="min-h-20"
        label="Carteira de Vacinação *"
        onChange={(file) => setVaccineFile(file!)}
      />

      {/* - Pet já cruzou antes? - */}

      <RadioGroup
        label="Já Cruzou? *"
        options={yesOrNoOptions}
        value={mated}
        onChange={(value) => setMated(value)}
      />

      <button
        className="bg-linear-to-r min-h-10 from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-6 cursor-pointer hover:from-amber-400 hover:via-orange-400 hover:to-red-400 mx-6 mb-1"
        type="button"
        onClick={advanceRegisterPet}
      >
        Continuar
      </button>

      <div className="min-h-20">
        {petRegisterError && (
          <p className="flex items-center justify-center h-10 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-semibold mx-6 text-center my-3">
            {petRegisterError}
          </p>
        )}
      </div>
    </>,
  );
};

export { PetRegister };
