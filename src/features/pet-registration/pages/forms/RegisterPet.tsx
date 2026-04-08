import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { usePetBreeds } from "../../hooks/pet-hooks/usePetBreeds";
import {
  genderOptions,
  yesOrNoOptions,
} from "../../../../shared/utils/registerPetOptions";
import { FileUpload } from "../../ui/FileUpload";
import { RadioGroup } from "../../ui/RadioGroup";
import { regex } from "../../../../shared/utils/regex";
import { useRegistrationContext } from "../../hooks/context-hooks/useRegistrationContext";
import { validateDocument } from "../../services/petService";

interface RegisterPetProps {
  onNext: () => void;
  onBack?: () => void;
}

const RegisterPet = ({ onNext, onBack }: RegisterPetProps) => {
  const [petRegisterError, setPetRegisterError] = useState("");
  const [isSpeciesOpen, setIsSpeciesOpen] = useState(false);
  const [isBreedOpen, setIsBreedOpen] = useState(false);
  const [isAgeOpen, setIsAgeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { dogBreeds, catBreeds } = usePetBreeds();

  const {
    petPhoto,
    setPetPhoto,
    petName,
    setPetName,
    age,
    setAge,
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
    vaccinated,
    setVaccinated,
    vaccineFile,
    setVaccineFile,
    mated,
    setMated,
  } = useRegistrationContext();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;

      if (!target.closest("#pet-age-container")) setIsAgeOpen(false);
      if (!target.closest("#pet-species-container")) setIsSpeciesOpen(false);
      if (!target.closest("#pet-breed-container")) setIsBreedOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const speciesOptions = [
    { label: "Cachorro", value: "Cachorro" },
    { label: "Gato", value: "Gato" },
  ];

  const selectedSpecies = speciesOptions.find(
    (option) => option.value === species,
  );
  const breedOptions = (species === "Cachorro" ? dogBreeds : catBreeds).map(
    (breed) => ({
      label: breed.charAt(0).toUpperCase() + breed.slice(1),
      value: breed,
    }),
  );

  const selectedBreed = breedOptions.find((option) => option.value === breed);

  const advanceRegisterPet = async () => {
    if (!petPhoto) return setPetRegisterError("Adicione uma foto do pet.");
    if (!petName) return setPetRegisterError("Preencha o nome do pet.");
    if (!regex.petName.test(petName))
      return setPetRegisterError("Nome do pet inválido.");
    if (!species) return setPetRegisterError("Selecione a espécie.");
    if (!breed) return setPetRegisterError("Selecione a raça.");
    if (!gender) return setPetRegisterError("Selecione o sexo.");
    if (pedigree === null)
      return setPetRegisterError("Informe se o pet possui pedigree.");
    if (pedigree && !pedigreeFile)
      return setPetRegisterError("Anexe o pedigree.");
    if (vaccinated === null)
      return setPetRegisterError(
        "Informe se o pet possui carteira de vacinação.",
      );
    if (vaccinated && !vaccineFile)
      return setPetRegisterError("Anexe a carteira de vacinação.");
    if (mated === null)
      return setPetRegisterError("Informe se o pet já cruzou.");

    setIsLoading(true);
    try {
      if (pedigree && pedigreeFile) {
        const result = await validateDocument(pedigreeFile, "pedigree");
        if (!result.isValid)
          return setPetRegisterError(`Pedigree inválido: ${result.reason}`);
      }
      if (vaccinated && vaccineFile) {
        const result = await validateDocument(vaccineFile, "vaccination_card");
        if (!result.isValid)
          return setPetRegisterError(
            `Carteira de vacinação inválida: ${result.reason}`,
          );
      }
    } catch {
      return setPetRegisterError(
        "Erro ao validar documentos. Tente novamente.",
      );
    } finally {
      setIsLoading(false);
    }

    setPetRegisterError("");
    onNext();
  };

  return (
    <div className="flex flex-col justify-center p-5 bg-linear-to-br from-amber-100 via-orange-100 to-red-100 dark:from-amber-950 dark:via-orange-950 dark:to-red-950 min-h-screen w-full">
      <div className="w-full max-w-2xl mx-auto mb-4 flex">
        <button
          className="flex items-center text-black dark:text-white font-semibold px-4 py-2 cursor-pointer hover:bg-linear-to-br hover:from-amber-200 hover:via-orange-200 hover:to-red-200 dark:hover:from-amber-600/40 dark:hover:via-orange-600/40 dark:hover:to-red-600/40 rounded-lg transition-colors"
          type="button"
          onClick={onBack}
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </button>
      </div>

      <form className="flex flex-col bg-white dark:bg-gray-800 border border-black/40 dark:border-white/20 rounded-lg w-full max-w-2xl mx-auto overflow-y-auto gap-6 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center border-b border-black/20 dark:border-white/20 pb-4 text-black dark:text-white">
          Cadastrar Pet
        </h1>

        {/* - Foto - */}

        <FileUpload
          id="pet-picture"
          className="min-h-80 sm:min-h-95"
          label="Foto do Pet *"
          accept="image/*"
          onChange={(file) => setPetPhoto(file!)}
        />

        {/* - Nome - */}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black/70 dark:text-white/70">
            Nome *
          </label>
          <div className="flex items-center border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors px-4 py-2 gap-3">
            <input
              className="bg-transparent w-full focus:outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Nome do seu pet"
            />
          </div>
        </div>

        {/* - Idade - */}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black/70 dark:text-white/70">
            Idade *
          </label>
          <div
            className="relative"
            id="pet-age-container"
          >
            <button
              className={`cursor-pointer w-full border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors px-4 py-2 flex items-center justify-between ${age ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
              type="button"
              onClick={() => setIsAgeOpen(!isAgeOpen)}
            >
              {age
                ? (() => {
                    const petAge = Number(age);
                    return petAge < 12
                      ? `${petAge} ${petAge === 1 ? "Mês" : "Meses"}`
                      : `${petAge} ${petAge / 12 === 1 ? "Ano" : "Anos"}`;
                  })()
                : "Selecione..."}
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
            </button>

            {isAgeOpen && (
              <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-black/20 dark:border-white/20 rounded-lg shadow-lg z-10 overflow-hidden max-h-72 overflow-y-auto">
                <div className="px-4 py-2 font-semibold text-white bg-black dark:bg-gray-900">
                  MESES
                </div>
                <ul>
                  {Array.from({ length: 11 }, (_, index) => index + 1).map(
                    (month) => (
                      <li
                        className="px-4 py-2 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-600/40 text-black dark:text-white"
                        key={`m-${month}`}
                        onClick={() => {
                          setAge(String(month));
                          setIsAgeOpen(false);
                        }}
                      >
                        {month} {month === 1 ? "Mês" : "Meses"}
                      </li>
                    ),
                  )}
                  <li className="px-4 py-2 font-semibold text-white bg-black dark:bg-gray-900">
                    ANOS
                  </li>
                  {Array.from({ length: 20 }, (_, index) => index + 1).map(
                    (year) => (
                      <li
                        className="px-4 py-2 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-600/40 text-black dark:text-white"
                        key={`y-${year}`}
                        onClick={() => {
                          setAge(String(year * 12));
                          setIsAgeOpen(false);
                        }}
                      >
                        {year} {year === 1 ? "Ano" : "Anos"}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* - Espécie - */}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black/70 dark:text-white/70">
            Espécie *
          </label>
          <div
            className="relative"
            id="pet-species-container"
          >
            <button
              className={`w-full border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors px-4 py-2 flex items-center justify-between cursor-pointer ${selectedSpecies ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
              type="button"
              onClick={() => setIsSpeciesOpen(!isSpeciesOpen)}
            >
              {selectedSpecies?.value || "Selecione..."}
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
            </button>

            {isSpeciesOpen && (
              <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-black/20 dark:border-white/20 rounded-lg shadow-lg z-10 overflow-hidden">
                {speciesOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setSpecies(option.value);
                      setBreed("");
                      setIsSpeciesOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-600/40 transition-colors text-black dark:text-white"
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* - Raça - */}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black/70 dark:text-white/70">
            Raça *
          </label>
          <div
            className="relative"
            id="pet-breed-container"
          >
            <button
              type="button"
              disabled={!species}
              onClick={() => species && setIsBreedOpen(!isBreedOpen)}
              className={`w-full border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors px-4 py-2 flex items-center justify-between ${species ? "hover:bg-amber-50 dark:hover:bg-amber-900/30 cursor-pointer" : "opacity-50 cursor-not-allowed"} ${selectedBreed ? "text-black dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
            >
              {selectedBreed?.label || "Selecione..."}
              <ChevronDown className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
            </button>

            {isBreedOpen && (
              <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-black/20 dark:border-white/20 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {breedOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setBreed(option.value);
                      setIsBreedOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-600/40 transition-colors text-black dark:text-white"
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <RadioGroup
          label="Sexo *"
          options={genderOptions}
          value={gender}
          onChange={setGender}
        />

        <RadioGroup
          label="Possui Pedigree? *"
          options={yesOrNoOptions}
          value={pedigree === null ? "" : pedigree ? "Sim" : "Não"}
          onChange={(value) => setPedigree(value === "Sim")}
        />

        {pedigree && (
          <FileUpload
            id="pedigree"
            className="min-h-20"
            label="Anexar Pedigree *"
            onChange={(file) => setPedigreeFile(file!)}
          />
        )}

        <RadioGroup
          label="Possui Carteira de Vacinação? *"
          options={yesOrNoOptions}
          value={vaccinated === null ? "" : vaccinated ? "Sim" : "Não"}
          onChange={(value) => setVaccinated(value === "Sim")}
        />

        {vaccinated && (
          <FileUpload
            id="vaccine"
            className="min-h-20"
            label="Anexar Carteira de Vacinação *"
            onChange={(file) => setVaccineFile(file!)}
          />
        )}

        <RadioGroup
          label="Já cruzou? *"
          options={yesOrNoOptions}
          value={mated === null ? "" : mated ? "Sim" : "Não"}
          onChange={(value) => setMated(value === "Sim")}
        />

        <button
          type="button"
          onClick={advanceRegisterPet}
          disabled={isLoading}
          className="bg-linear-to-r from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-6 py-2 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 cursor-pointer border border-black/40 dark:border-white/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? "Validando..." : "Continuar"}
        </button>

        {/* - Erro - */}

        <div className="min-h-12">
          {petRegisterError && (
            <p className="flex items-center justify-center min-h-12 rounded-lg bg-red-100 dark:bg-red-600/40 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-300 text-sm font-semibold text-center py-2">
              {petRegisterError}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export { RegisterPet };
