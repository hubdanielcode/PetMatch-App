import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, vi, test, expect } from "vitest";
import {
  RegisterPet,
  useRegistrationContext,
} from "@/features/pet-registration";

/* - Criando os Mocks - */

const mockContext = {
  petPhoto: null,
  setPetPhoto: vi.fn(),
  petName: "",
  setPetName: vi.fn(),
  age: "",
  setAge: vi.fn(),
  species: "",
  setSpecies: vi.fn(),
  breed: "",
  setBreed: vi.fn(),
  gender: "",
  setGender: vi.fn(),
  pedigree: null,
  setPedigree: vi.fn(),
  pedigreeFile: null,
  setPedigreeFile: vi.fn(),
  vaccinated: null,
  setVaccinated: vi.fn(),
  vaccineFile: null,
  setVaccineFile: vi.fn(),
  mated: null,
  setMated: vi.fn(),
} as unknown as ReturnType<typeof useRegistrationContext>;

vi.mock(
  "@/features/pet-registration/hooks/context-hooks/useRegistrationContext",
  () => ({ useRegistrationContext: () => mockContext }),
);

vi.mock("@/features/pet-registration/hooks/pet-hooks/usePetBreeds", () => ({
  usePetBreeds: () => ({
    dogBreeds: ["labrador", "poodle"],
    catBreeds: ["siamês", "persa"],
  }),
}));

vi.mock("@/features/pet-registration/services/petService", () => ({
  validateDocument: vi.fn(),
}));

vi.mock("@/features/pet-registration/ui/FileUpload", () => ({
  FileUpload: ({
    label,
    onChange,
    id,
  }: {
    label: string;
    onChange: (file: File) => void;
    id: string;
  }) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="file"
        onChange={(e) => onChange(e.target.files![0])}
      />
    </div>
  ),
}));

vi.mock("@/features/pet-registration/ui/RadioGroup", () => ({
  RadioGroup: ({
    label,
    options,
    value,
    onChange,
  }: {
    label: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
  }) => (
    <fieldset>
      <legend>{label}</legend>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={label}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
          />
          {option.label}
        </label>
      ))}
    </fieldset>
  ),
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
  Object.assign(mockContext, {
    petPhoto: null,
    petName: "",
    age: "",
    species: "",
    breed: "",
    gender: "",
    pedigree: null,
    pedigreeFile: null,
    vaccinated: null,
    vaccineFile: null,
    mated: null,
  });
});

/* - Criando a função de renderizar o componente - */

const renderComponent = (onNext = vi.fn(), onBack = vi.fn()) =>
  render(
    <RegisterPet
      onNext={onNext}
      onBack={onBack}
    />,
  );

/* - Testando a renderização dos elementos - */

test("renders the form title", () => {
  renderComponent();
  expect(screen.getByText("Cadastrar Pet")).toBeInTheDocument();
});

test("renders the back button", () => {
  renderComponent();
  expect(screen.getByText("Voltar")).toBeInTheDocument();
});

test("renders the continue button", () => {
  renderComponent();
  expect(screen.getByText("Continuar")).toBeInTheDocument();
});

test("renders the pet name input", () => {
  renderComponent();
  expect(screen.getByPlaceholderText("Nome do seu pet")).toBeInTheDocument();
});

test("renders the age dropdown button", () => {
  renderComponent();
  expect(screen.getAllByText("Selecione...").length).toBeGreaterThanOrEqual(1);
});

test("renders the species dropdown", () => {
  renderComponent();
  expect(screen.getByText("Espécie *")).toBeInTheDocument();
});

test("renders the breed dropdown", () => {
  renderComponent();
  expect(screen.getByText("Raça *")).toBeInTheDocument();
});

test("renders the gender radio group", () => {
  renderComponent();
  expect(screen.getByText("Sexo *")).toBeInTheDocument();
});

test("renders the pedigree radio group", () => {
  renderComponent();
  expect(screen.getByText("Possui Pedigree? *")).toBeInTheDocument();
});

test("renders the vaccination radio group", () => {
  renderComponent();
  expect(
    screen.getByText("Possui Carteira de Vacinação? *"),
  ).toBeInTheDocument();
});

test("renders the mated radio group", () => {
  renderComponent();
  expect(screen.getByText("Já cruzou? *")).toBeInTheDocument();
});

/* - Testando o comportamento do botão voltar - */

test("calls onBack when clicking the back button", async () => {
  const onBack = vi.fn();
  renderComponent(vi.fn(), onBack);

  await userEvent.click(screen.getByText("Voltar"));

  expect(onBack).toHaveBeenCalled();
});

/* - Testando as validações ao avançar - */

test("shows error when petPhoto is missing", async () => {
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(screen.getByText("Adicione uma foto do pet.")).toBeInTheDocument();
});

test("shows error when petName is missing", async () => {
  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(screen.getByText("Preencha o nome do pet.")).toBeInTheDocument();
});

test("shows error when petName is invalid", async () => {
  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "R3x!!!";
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(screen.getByText("Nome do pet inválido.")).toBeInTheDocument();
});

test("shows error when species is missing", async () => {
  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(screen.getByText("Selecione a espécie.")).toBeInTheDocument();
});

test("shows error when breed is missing", async () => {
  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  mockContext.species = "Cachorro";
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(screen.getByText("Selecione a raça.")).toBeInTheDocument();
});

test("shows error when gender is missing", async () => {
  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  mockContext.species = "Cachorro";
  mockContext.breed = "labrador";
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(screen.getByText("Selecione o sexo.")).toBeInTheDocument();
});

test("shows error when pedigree is null", async () => {
  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  mockContext.species = "Cachorro";
  mockContext.breed = "labrador";
  mockContext.gender = "Macho";
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(
    screen.getByText("Informe se o pet possui pedigree."),
  ).toBeInTheDocument();
});

test("shows error when pedigree is true but file is missing", async () => {
  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  mockContext.species = "Cachorro";
  mockContext.breed = "labrador";
  mockContext.gender = "Macho";
  mockContext.pedigree = true;
  mockContext.pedigreeFile = null;
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(screen.getByText("Anexe o pedigree.")).toBeInTheDocument();
});

test("shows error when vaccinated is null", async () => {
  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  mockContext.species = "Cachorro";
  mockContext.breed = "labrador";
  mockContext.gender = "Macho";
  mockContext.pedigree = false;
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(
    screen.getByText("Informe se o pet possui carteira de vacinação."),
  ).toBeInTheDocument();
});

test("shows error when vaccinated is true but file is missing", async () => {
  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  mockContext.species = "Cachorro";
  mockContext.breed = "labrador";
  mockContext.gender = "Macho";
  mockContext.pedigree = false;
  mockContext.vaccinated = true;
  mockContext.vaccineFile = null;
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(
    screen.getByText("Anexe a carteira de vacinação."),
  ).toBeInTheDocument();
});

test("shows error when mated is null", async () => {
  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  mockContext.species = "Cachorro";
  mockContext.breed = "labrador";
  mockContext.gender = "Macho";
  mockContext.pedigree = false;
  mockContext.vaccinated = false;
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(screen.getByText("Informe se o pet já cruzou.")).toBeInTheDocument();
});

/* - Testando o comportamento dos dropdowns - */

test("opens age dropdown when clicking the age button", async () => {
  renderComponent();

  const ageContainer = document.getElementById("pet-age-container")!;
  await userEvent.click(within(ageContainer).getByRole("button"));

  expect(screen.getByText("MESES")).toBeInTheDocument();
  expect(screen.getByText("ANOS")).toBeInTheDocument();
});

test("calls setAge when selecting a month", async () => {
  renderComponent();

  const ageContainer = document.getElementById("pet-age-container")!;
  await userEvent.click(within(ageContainer).getByRole("button"));
  await userEvent.click(screen.getByText("1 Mês"));

  expect(mockContext.setAge).toHaveBeenCalledWith("1");
});

test("calls setAge when selecting a year", async () => {
  renderComponent();

  const ageContainer = document.getElementById("pet-age-container")!;
  await userEvent.click(within(ageContainer).getByRole("button"));
  await userEvent.click(screen.getByText("2 Anos"));

  expect(mockContext.setAge).toHaveBeenCalledWith("24");
});

test("opens species dropdown when clicking the species button", async () => {
  renderComponent();

  const speciesContainer = document.getElementById("pet-species-container")!;
  await userEvent.click(within(speciesContainer).getByRole("button"));

  expect(screen.getByText("Cachorro")).toBeInTheDocument();
  expect(screen.getByText("Gato")).toBeInTheDocument();
});

test("calls setSpecies and setBreed when selecting a species", async () => {
  renderComponent();

  const speciesContainer = document.getElementById("pet-species-container")!;
  await userEvent.click(within(speciesContainer).getByRole("button"));
  await userEvent.click(screen.getByText("Cachorro"));

  expect(mockContext.setSpecies).toHaveBeenCalledWith("Cachorro");
  expect(mockContext.setBreed).toHaveBeenCalledWith("");
});

test("breed button is disabled when no species is selected", () => {
  renderComponent();

  const breedContainer = document.getElementById("pet-breed-container")!;
  expect(within(breedContainer).getByRole("button")).toBeDisabled();
});

test("breed button is enabled when species is selected", () => {
  mockContext.species = "Cachorro";
  renderComponent();

  const breedContainer = document.getElementById("pet-breed-container")!;
  expect(within(breedContainer).getByRole("button")).not.toBeDisabled();
});

test("shows dog breeds when species is Cachorro", async () => {
  mockContext.species = "Cachorro";
  renderComponent();

  const breedContainer = document.getElementById("pet-breed-container")!;
  await userEvent.click(within(breedContainer).getByRole("button"));

  expect(screen.getByText("Labrador")).toBeInTheDocument();
  expect(screen.getByText("Poodle")).toBeInTheDocument();
});

test("calls setBreed when selecting a breed", async () => {
  mockContext.species = "Cachorro";
  renderComponent();

  const breedContainer = document.getElementById("pet-breed-container")!;
  await userEvent.click(within(breedContainer).getByRole("button"));
  await userEvent.click(screen.getByText("Labrador"));

  expect(mockContext.setBreed).toHaveBeenCalledWith("labrador");
});

/* - Testando renderização condicional de FileUpload - */

test("does not render pedigree file upload when pedigree is false", () => {
  mockContext.pedigree = false;
  renderComponent();

  expect(screen.queryByText("Anexar Pedigree *")).not.toBeInTheDocument();
});

test("renders pedigree file upload when pedigree is true", () => {
  mockContext.pedigree = true;
  renderComponent();

  expect(screen.getByText("Anexar Pedigree *")).toBeInTheDocument();
});

test("does not render vaccine file upload when vaccinated is false", () => {
  mockContext.vaccinated = false;
  renderComponent();

  expect(
    screen.queryByText("Anexar Carteira de Vacinação *"),
  ).not.toBeInTheDocument();
});

test("renders vaccine file upload when vaccinated is true", () => {
  mockContext.vaccinated = true;
  renderComponent();

  expect(
    screen.getByText("Anexar Carteira de Vacinação *"),
  ).toBeInTheDocument();
});

/* - Testando validateDocument - */

test("shows error when pedigree validation fails", async () => {
  const { validateDocument } =
    await import("@/features/pet-registration/services/petService");

  vi.mocked(validateDocument).mockResolvedValueOnce({
    isValid: false,
    confidence: 30,
    reason: "documento ilegível",
  });

  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  mockContext.species = "Cachorro";
  mockContext.breed = "labrador";
  mockContext.gender = "Macho";
  mockContext.pedigree = true;
  mockContext.pedigreeFile = new File(["pdf"], "pedigree.pdf", {
    type: "application/pdf",
  });
  mockContext.vaccinated = false;
  mockContext.mated = false;
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(
    screen.getByText("Pedigree inválido: documento ilegível"),
  ).toBeInTheDocument();
});

test("shows error when vaccine validation fails", async () => {
  const { validateDocument } =
    await import("@/features/pet-registration/services/petService");

  vi.mocked(validateDocument).mockResolvedValueOnce({
    isValid: false,
    confidence: 30,
    reason: "documento ilegível",
  });

  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  mockContext.species = "Cachorro";
  mockContext.breed = "labrador";
  mockContext.gender = "Macho";
  mockContext.pedigree = false;
  mockContext.vaccinated = true;
  mockContext.vaccineFile = new File(["pdf"], "vacina.pdf", {
    type: "application/pdf",
  });
  mockContext.mated = false;
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(
    screen.getByText("Carteira de vacinação inválida: documento ilegível"),
  ).toBeInTheDocument();
});

test("shows error when validateDocument throws", async () => {
  const { validateDocument } =
    await import("@/features/pet-registration/services/petService");

  vi.mocked(validateDocument).mockRejectedValueOnce(new Error("Erro de rede"));

  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  mockContext.species = "Cachorro";
  mockContext.breed = "labrador";
  mockContext.gender = "Macho";
  mockContext.pedigree = true;
  mockContext.pedigreeFile = new File(["pdf"], "pedigree.pdf", {
    type: "application/pdf",
  });
  mockContext.vaccinated = false;
  mockContext.mated = false;
  renderComponent();

  await userEvent.click(screen.getByText("Continuar"));

  expect(
    screen.getByText("Erro ao validar documentos. Tente novamente."),
  ).toBeInTheDocument();
});

test("shows Validando... while loading", async () => {
  const { validateDocument } =
    await import("@/features/pet-registration/services/petService");

  vi.mocked(validateDocument).mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 200)),
  );

  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  mockContext.species = "Cachorro";
  mockContext.breed = "labrador";
  mockContext.gender = "Macho";
  mockContext.pedigree = true;
  mockContext.pedigreeFile = new File(["pdf"], "pedigree.pdf", {
    type: "application/pdf",
  });
  mockContext.vaccinated = false;
  mockContext.mated = false;
  renderComponent();

  userEvent.click(screen.getByText("Continuar"));

  expect(await screen.findByText("Validando...")).toBeInTheDocument();
});

test("calls onNext when all fields are valid and no document validation needed", async () => {
  const onNext = vi.fn();

  mockContext.petPhoto = new File(["foto"], "foto.png", { type: "image/png" });
  mockContext.petName = "Rex";
  mockContext.species = "Cachorro";
  mockContext.breed = "labrador";
  mockContext.gender = "Macho";
  mockContext.pedigree = false;
  mockContext.vaccinated = false;
  mockContext.mated = false;
  renderComponent(onNext);

  await userEvent.click(screen.getByText("Continuar"));

  expect(onNext).toHaveBeenCalled();
});
