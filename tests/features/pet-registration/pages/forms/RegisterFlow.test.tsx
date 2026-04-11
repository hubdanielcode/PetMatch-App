import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, vi, test, expect } from "vitest";
import { RegisterFlow } from "@/features/pet-registration";

/* - Criando os Mocks hoistados - */

const {
  mockCreatePet,
  mockCreateTutor,
  mockCreateAnamnese,
  mockResetContext,
  mockNavigate,
  mockGetUser,
  mockFrom,
} = vi.hoisted(() => ({
  mockCreatePet: vi.fn(),
  mockCreateTutor: vi.fn(),
  mockCreateAnamnese: vi.fn(),
  mockResetContext: vi.fn(),
  mockNavigate: vi.fn(),
  mockGetUser: vi.fn(),
  mockFrom: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: null }),
}));

vi.mock("@/features/pet-registration/hooks/pet-hooks/useCreatePet", () => ({
  useCreatePet: () => ({ createPet: mockCreatePet }),
}));

vi.mock("@/features/pet-registration/hooks/tutor-hooks/useCreateTutor", () => ({
  useCreateTutor: () => ({ createTutor: mockCreateTutor }),
}));

vi.mock(
  "@/features/pet-registration/hooks/context-hooks/useRegistrationContext",
  () => ({
    useRegistrationContext: () => ({
      petPhoto: null,
      petName: "Rex",
      species: "Cachorro",
      breed: "Labrador",
      age: "12",
      gender: "Macho",
      pedigree: false,
      vaccinated: true,
      mated: false,
      cryptorchidism_bilateral: false,
      cryptorchidism_unilateral: false,
      phoneNumber: "71999999999",
      street: "Rua das Flores",
      houseNumber: "123",
      complement: "",
      neighborhood: "Centro",
      city: "Salvador",
      state: "BA",
      feedingInfo: "Ração",
      walksInfo: "2x ao dia",
      behaviorInfo: "Calmo",
      surgeriesInfo: "",
      diseasesInfo: "",
      testiclesInfo: "2",
      reproductionInfo: "Não",
      resetContext: mockResetContext,
    }),
  }),
);

vi.mock("../../../../../supabase/supabase", () => ({
  supabase: {
    auth: { getUser: mockGetUser },
    from: mockFrom,
  },
}));

vi.mock("@/features/pet-registration/services/petService", () => ({
  uploadPetPhoto: vi.fn(),
}));

vi.mock("@/features/pet-registration/services/anamneseService", () => ({
  createAnamnese: mockCreateAnamnese,
}));

vi.mock("@/features/pet-registration/pages/anamnese/AnamneseFlow", () => ({
  AnamneseFlow: ({
    onNext,
    onBack,
  }: {
    onNext: () => void;
    onBack: () => void;
  }) => (
    <div>
      <span>AnamneseFlow</span>
      <button onClick={onNext}>Finalizar</button>
      <button onClick={onBack}>Voltar para Pet</button>
    </div>
  ),
}));

vi.mock("@/features/pet-registration/pages/forms/RegisterTutor", () => ({
  RegisterTutor: ({
    onNext,
    onBack,
  }: {
    onNext: () => void;
    onBack: () => void;
  }) => (
    <div>
      <span>RegisterTutor</span>
      <button onClick={onNext}>Próximo</button>
      <button onClick={onBack}>Voltar</button>
    </div>
  ),
}));

vi.mock("@/features/pet-registration/pages/forms/RegisterPet", () => ({
  RegisterPet: ({
    onNext,
    onBack,
  }: {
    onNext: () => void;
    onBack: () => void;
  }) => (
    <div>
      <span>RegisterPet</span>
      <button onClick={onNext}>Próximo</button>
      <button onClick={onBack}>Voltar para Tutor</button>
    </div>
  ),
}));

/* - Configurando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();

  mockCreatePet.mockResolvedValue({ id: "pet-123" });
  mockCreateAnamnese.mockResolvedValue({});

  mockGetUser.mockResolvedValue({
    data: {
      user: {
        id: "user-123",
        email: "joao@email.com",
        user_metadata: { firstName: "João", lastName: "Silva" },
      },
    },
  });

  mockFrom.mockReturnValue({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: { id: "tutor-123" } }),
  });
});

/* - Criando a função de renderizar o componente - */

const renderComponent = () => render(<RegisterFlow />);

/* - Testando a renderização inicial - */

test("renders RegisterTutor on page 1", () => {
  renderComponent();
  expect(screen.getByText("RegisterTutor")).toBeInTheDocument();
});

test("does not render RegisterPet on initial render", () => {
  renderComponent();
  expect(screen.queryByText("RegisterPet")).not.toBeInTheDocument();
});

test("does not render AnamneseFlow on initial render", () => {
  renderComponent();
  expect(screen.queryByText("AnamneseFlow")).not.toBeInTheDocument();
});

/* - Testando a navegação entre páginas - */

test("navigates to RegisterPet when clicking next on RegisterTutor", async () => {
  renderComponent();
  await userEvent.click(screen.getByText("Próximo"));
  expect(screen.getByText("RegisterPet")).toBeInTheDocument();
});

test("navigates to AnamneseFlow when clicking next on RegisterPet", async () => {
  renderComponent();
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Próximo"));
  expect(screen.getByText("AnamneseFlow")).toBeInTheDocument();
});

test("navigates back to RegisterTutor when clicking back on RegisterPet", async () => {
  renderComponent();
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Voltar para Tutor"));
  expect(screen.getByText("RegisterTutor")).toBeInTheDocument();
});

test("navigates back to RegisterPet when clicking back on AnamneseFlow", async () => {
  renderComponent();
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Voltar para Pet"));
  expect(screen.getByText("RegisterPet")).toBeInTheDocument();
});

test("calls navigate to /modal when clicking back on RegisterTutor", async () => {
  renderComponent();
  await userEvent.click(screen.getByText("Voltar"));
  expect(mockNavigate).toHaveBeenCalledWith("/modal", { state: { screen: 2 } });
});

/* - Testando o fluxo de finalização - */

test("calls createAnamnese when finishing registration", async () => {
  renderComponent();
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Finalizar"));
  expect(mockCreateAnamnese).toHaveBeenCalled();
});

test("calls resetContext after finishing registration", async () => {
  renderComponent();
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Finalizar"));
  expect(mockResetContext).toHaveBeenCalled();
});

test("navigates to /pagina-principal after finishing registration", async () => {
  renderComponent();
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Finalizar"));
  expect(mockNavigate).toHaveBeenCalledWith("/pagina-principal", {
    replace: true,
  });
});

test("does not call uploadPetPhoto when petPhoto is null", async () => {
  const { uploadPetPhoto } =
    await import("@/features/pet-registration/services/petService");
  renderComponent();
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Finalizar"));
  expect(uploadPetPhoto).not.toHaveBeenCalled();
});

test("does not call createTutor when tutor already exists", async () => {
  renderComponent();
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Próximo"));
  await userEvent.click(screen.getByText("Finalizar"));
  expect(mockCreateTutor).not.toHaveBeenCalled();
});
