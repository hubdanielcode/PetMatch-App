import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { usePetBreeds } from "../../hooks/usePetBreeds";
import {
  genderOptions,
  yesOrNoOptions,
} from "../../../../shared/utils/registerPetOptions";
import { FileUpload } from "../../ui/FileUpload";
import { RadioGroup } from "../../ui/RadioGroup";
import { regex } from "../../../../shared/utils/regex";
import { useRegistrationContext } from "../../hooks/useRegistrationContext";

interface RegisterPetProps {
  onNext: () => void;
  onBack?: () => void;
}

const RegisterPet = ({ onNext, onBack }: RegisterPetProps) => {
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

  const advanceRegisterPet = () => {
    if (!petPhoto) return setPetRegisterError("Adicione uma foto do pet.");
    if (!petName) return setPetRegisterError("Preencha o nome do pet.");
    if (!regex.petName.test(petName))
      return setPetRegisterError("Nome do pet inválido.");
    if (!species) return setPetRegisterError("Selecione a espécie.");
    if (!breed) return setPetRegisterError("Selecione a raça.");
    if (!gender) return setPetRegisterError("Selecione o sexo.");
    if (!pedigree) return setPetRegisterError("Informe se possui pedigree.");
    if (pedigree === "Sim" && !pedigreeFile)
      return setPetRegisterError("Anexe o pedigree.");
    if (!vaccineFile)
      return setPetRegisterError("Anexe a carteira de vacinação.");
    if (!mated) return setPetRegisterError("Informe se já cruzou.");
    setPetRegisterError("");
    onNext();
  };

  return (
    <div className="flex flex-col justify-center p-5 bg-linear-to-br from-amber-100 via-orange-100 to-red-100 min-h-screen w-full">
      <div className="w-[50%] mx-auto mb-4 flex">
        <button
          className="flex items-center text-black font-semibold px-4 py-2 cursor-pointer hover:bg-linear-to-br hover:from-amber-200 hover:via-orange-200 hover:to-red-200 rounded-lg"
          type="button"
          onClick={onBack}
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </button>
      </div>

      <form className="flex flex-col bg-white border border-black/40 rounded-lg w-[50%] mx-auto overflow-y-auto gap-6 p-8">
        <h1 className="text-3xl font-semibold text-center border-b border-black/20 pb-4">
          Cadastrar Pet
        </h1>

        {/* - Foto - */}

        <FileUpload
          id="pet-picture"
          className="min-h-95"
          label="Foto do Pet *"
          accept="image/*"
          onChange={(file) => setPetPhoto(file!)}
        />

        {/* - Nome - */}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black/70">Nome *</label>
          <div className="flex items-center border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors px-4 py-2 gap-3">
            <input
              className="bg-transparent w-full focus:outline-none text-black placeholder:text-gray-500"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Nome do seu pet"
            />
          </div>
        </div>

        {/* - Espécie - */}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black/70">
            Espécie *
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsSpeciesOpen(!isSpeciesOpen)}
              className={`w-full border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors px-4 py-2 flex items-center justify-between ${selectedSpecies ? "text-black" : "text-gray-500"}`}
            >
              {selectedSpecies?.value || "Selecione..."}
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {isSpeciesOpen && (
              <div className="absolute w-full mt-1 bg-white border border-black/20 rounded-lg shadow-lg z-10 overflow-hidden">
                {speciesOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setSpecies(option.value);
                      setBreed("");
                      setIsSpeciesOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-amber-100 transition-colors"
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
          <label className="text-sm font-semibold text-black/70">Raça *</label>
          <div className="relative">
            <button
              type="button"
              disabled={!species}
              onClick={() => species && setIsBreedOpen(!isBreedOpen)}
              className={`w-full border border-black/40 rounded-lg bg-gray-200 transition-colors px-4 py-2 flex items-center justify-between ${species ? "hover:bg-amber-50 cursor-pointer" : "opacity-50 cursor-not-allowed"} ${selectedBreed ? "text-black" : "text-gray-500"}`}
            >
              {selectedBreed?.label || "Selecione..."}
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {isBreedOpen && (
              <div className="absolute w-full mt-1 bg-white border border-black/20 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                {breedOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      setBreed(option.value);
                      setIsBreedOpen(false);
                    }}
                    className="px-4 py-2 cursor-pointer hover:bg-amber-100 transition-colors"
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
          value={pedigree}
          onChange={setPedigree}
        />

        {pedigree === "Sim" && (
          <FileUpload
            id="pedigree"
            className="min-h-20"
            label="Anexar Pedigree *"
            onChange={(file) => setPedigreeFile(file!)}
          />
        )}

        <FileUpload
          id="vaccine"
          className="min-h-20"
          label="Carteira de Vacinação *"
          onChange={(file) => setVaccineFile(file!)}
        />

        <RadioGroup
          label="Já cruzou? *"
          options={yesOrNoOptions}
          value={mated}
          onChange={setMated}
        />

        <button
          type="button"
          onClick={advanceRegisterPet}
          className="bg-linear-to-r from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-6 py-2 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 cursor-pointer"
        >
          Continuar
        </button>

        {/* - Erro - */}

        <div className="min-h-10">
          {petRegisterError && (
            <p className="flex items-center justify-center min-h-10 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-semibold text-center py-2">
              {petRegisterError}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export { RegisterPet };
