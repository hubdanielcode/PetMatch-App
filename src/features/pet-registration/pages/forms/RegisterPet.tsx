import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { usePetBreeds } from "../../hooks/usePetBreeds";
import { genderOptions, yesOrNoOptions } from "../../utils/registerPetOptions";
import { FileUpload } from "../../ui/FileUpload";
import { RadioGroup } from "../../ui/RadioGroup";
import { regex } from "../../utils/registerPetRegex";
import { useRegistrationContext } from "../../hooks/useRegistrationContext";

interface RegisterPetProps {
  onNext: () => void;
  onBack?: () => void;
}

const RegisterPet = ({ onNext, onBack }: RegisterPetProps) => {
  const [registerPetError, setPetRegisterError] = useState("");
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
    <div className="flex flex-col justify-center p-5 bg-linear-to-br from-amber-100 via-orange-100 to-red-100 h-screen w-full">
      {/* - Botão de Voltar Sempre Visível - */}

      <div className="w-[50%] mx-auto mb-4 flex">
        <button
          className="flex items-center text-black font-semibold px-4 py-2 hover:text-black cursor-pointer hover:bg-linear-to-br hover:from-amber-200 hover:via-orange-200 hover:to-red-200 rounded-lg"
          type="button"
          onClick={onBack}
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </button>
      </div>

      {/* - Formulário Centralizado - */}

      <form className="flex flex-col bg-white border border-black/40 rounded-lg w-[50%] mx-auto overflow-y-auto min-h-[90vh]">
        <h1 className="flex text-3xl font-semibold mx-15 py-3 mb-4 justify-center border-b border-black/20">
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

        <label className="px-6 text-lg font-semibold mb-3">Nome *</label>

        <div className="flex items-center min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors mx-6 mb-6 px-4 focus-within:ring-2 focus-within:ring-amber-500">
          <input
            className="bg-transparent w-full focus:outline-none text-black placeholder:text-gray-500"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            placeholder="Nome do seu pet"
          />
        </div>

        {/* - Espécie - */}

        <label className="px-6 text-lg font-semibold mb-3">Espécie *</label>

        <div className="relative mx-6 mb-6">
          <button
            type="button"
            onClick={() => setIsSpeciesOpen(!isSpeciesOpen)}
            className={`w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors px-4 flex items-center justify-between ${
              selectedSpecies ? "text-black" : "text-gray-500"
            }`}
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

        {/* - Raça - */}

        <label className="px-6 text-lg font-semibold mb-3">Raça *</label>

        <div className="relative mx-6 mb-6">
          <button
            type="button"
            disabled={!species}
            onClick={() => species && setIsBreedOpen(!isBreedOpen)}
            className={`w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 transition-colors px-4 flex items-center justify-between focus-within:ring-2 focus-within:ring-amber-500 ${
              species
                ? "hover:bg-amber-50 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            } ${selectedBreed ? "text-black" : "text-gray-500"}`}
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

        {/* - RadioGroups - */}

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

        {/* - Botão Continuar - */}

        <button
          type="button"
          onClick={advanceRegisterPet}
          className="bg-linear-to-r min-h-10 from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-6 mx-6 mb-2 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 cursor-pointer"
        >
          Continuar
        </button>

        {/* - Erro - */}

        <div className="min-h-20">
          {registerPetError && (
            <p className="flex items-center justify-center min-h-10 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-semibold mx-6 text-center my-3">
              {registerPetError}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export { RegisterPet };
