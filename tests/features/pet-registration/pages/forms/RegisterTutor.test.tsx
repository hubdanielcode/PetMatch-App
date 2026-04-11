import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, vi, test, expect } from "vitest";
import { RegisterTutor } from "@/features/pet-registration/pages/forms/RegisterTutor";
import { useRegistrationContext } from "@/features/pet-registration/hooks/context-hooks/useRegistrationContext";

/* - Criando os Mocks hoistados - */

const {
  mockOnNext,
  mockOnBack,
  mockSetPhoneNumber,
  mockSetStreet,
  mockSetComplement,
  mockSetNeighborhood,
  mockSetHouseNumber,
  mockSetCity,
  mockSetState,
  mockSetZipcode,
} = vi.hoisted(() => ({
  mockOnNext: vi.fn(),
  mockOnBack: vi.fn(),
  mockSetPhoneNumber: vi.fn(),
  mockSetStreet: vi.fn(),
  mockSetComplement: vi.fn(),
  mockSetNeighborhood: vi.fn(),
  mockSetHouseNumber: vi.fn(),
  mockSetCity: vi.fn(),
  mockSetState: vi.fn(),
  mockSetZipcode: vi.fn(),
}));

vi.mock(
  "@/features/pet-registration/hooks/context-hooks/useRegistrationContext",
  () => ({
    useRegistrationContext: vi.fn(),
  }),
);

vi.mock("@/shared/utils/masks", () => ({
  masks: {
    phone: (v: string) => v,
    number: (v: string) => v,
    city: (v: string) => v,
    uf: (v: string) => v,
    zipcode: (v: string) => v,
  },
}));

vi.mock("@/shared/utils/regex", () => ({
  regex: {
    phone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    street: /^[\p{L}0-9\s.]*$/u,
    number: /^\d*$/,
    neighborhood: /^[\p{L}\s]*$/u,
    city: /^[\p{L}\s]*$/u,
    complement: /^[\p{L}0-9\s,]*$/u,
    state: /^[A-Z]{0,2}$/,
  },
}));

/* - Configurando os mocks antes de cada teste - */

const defaultContext = {
  phoneNumber: "",
  setPhoneNumber: mockSetPhoneNumber,
  street: "",
  setStreet: mockSetStreet,
  complement: "",
  setComplement: mockSetComplement,
  neighborhood: "",
  setNeighborhood: mockSetNeighborhood,
  houseNumber: "",
  setHouseNumber: mockSetHouseNumber,
  city: "",
  setCity: mockSetCity,
  state: "",
  setState: mockSetState,
  zipcode: "",
  setZipcode: mockSetZipcode,
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useRegistrationContext).mockReturnValue(defaultContext as any);
});

/* - Criando a função de renderizar o componente - */

const renderComponent = () =>
  render(
    <RegisterTutor
      onNext={mockOnNext}
      onBack={mockOnBack}
    />,
  );

const renderWithValues = (values: Partial<typeof defaultContext>) => {
  vi.mocked(useRegistrationContext).mockReturnValue({
    ...defaultContext,
    ...values,
  } as any);
  return render(
    <RegisterTutor
      onNext={mockOnNext}
      onBack={mockOnBack}
    />,
  );
};

/* - Testando a renderização inicial - */

test("renders all form fields", () => {
  renderComponent();
  expect(screen.getByPlaceholderText("(00) 00000-0000")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Nome da rua")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Nº")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Apto, bloco...")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Bairro")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Cidade")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("UF")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("00000-000")).toBeInTheDocument();
});

test("renders the submit button", () => {
  renderComponent();
  expect(
    screen.getByRole("button", { name: /cadastrar/i }),
  ).toBeInTheDocument();
});

test("renders the back button", () => {
  renderComponent();
  expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
});

test("renders the title", () => {
  renderComponent();
  expect(screen.getByText("Dados do Tutor")).toBeInTheDocument();
});

test("does not show error on initial render", () => {
  renderComponent();
  expect(screen.queryByText(/inválido|inválida/i)).not.toBeInTheDocument();
});

/* - Testando a navegação - */

test("calls onBack when clicking the back button", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: /voltar/i }));
  expect(mockOnBack).toHaveBeenCalled();
});

/* - Testando as validações - */

test("shows error when phone is empty", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
  expect(screen.getByText("Telefone inválido.")).toBeInTheDocument();
});

test("shows error when phone format is invalid", async () => {
  renderWithValues({ phoneNumber: "123" });
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
  expect(screen.getByText("Telefone inválido.")).toBeInTheDocument();
});

test("shows error when street is empty", async () => {
  renderWithValues({ phoneNumber: "(71) 99999-9999" });
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
  expect(screen.getByText("Logradouro inválido.")).toBeInTheDocument();
});

test("shows error when house number is empty", async () => {
  renderWithValues({
    phoneNumber: "(71) 99999-9999",
    street: "Rua das Flores",
  });
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
  expect(screen.getByText("Número inválido.")).toBeInTheDocument();
});

test("shows error when neighborhood is empty", async () => {
  renderWithValues({
    phoneNumber: "(71) 99999-9999",
    street: "Rua das Flores",
    houseNumber: "123",
  });
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
  expect(screen.getByText("Bairro inválido.")).toBeInTheDocument();
});

test("shows error when city is empty", async () => {
  renderWithValues({
    phoneNumber: "(71) 99999-9999",
    street: "Rua das Flores",
    houseNumber: "123",
    neighborhood: "Centro",
  });
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
  expect(screen.getByText("Cidade inválida.")).toBeInTheDocument();
});

test("shows error when state is empty", async () => {
  renderWithValues({
    phoneNumber: "(71) 99999-9999",
    street: "Rua das Flores",
    houseNumber: "123",
    neighborhood: "Centro",
    city: "Salvador",
  });
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
  expect(screen.getByText("Estado inválido.")).toBeInTheDocument();
});

test("calls onNext when all fields are valid", async () => {
  renderWithValues({
    phoneNumber: "(71) 99999-9999",
    street: "Rua das Flores",
    houseNumber: "123",
    neighborhood: "Centro",
    city: "Salvador",
    state: "BA",
  });
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
  expect(mockOnNext).toHaveBeenCalled();
});

test("does not call onNext when fields are invalid", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
  expect(mockOnNext).not.toHaveBeenCalled();
});

test("clears error after successful submission", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
  expect(screen.getByText("Telefone inválido.")).toBeInTheDocument();
});

/* - Testando as máscaras - */

test("calls setPhoneNumber when typing in phone field", async () => {
  renderComponent();
  await userEvent.type(screen.getByPlaceholderText("(00) 00000-0000"), "7");
  expect(mockSetPhoneNumber).toHaveBeenCalled();
});

test("calls setStreet when typing in street field", async () => {
  renderComponent();
  await userEvent.type(screen.getByPlaceholderText("Nome da rua"), "R");
  expect(mockSetStreet).toHaveBeenCalled();
});

test("calls setHouseNumber when typing in house number field", async () => {
  renderComponent();
  await userEvent.type(screen.getByPlaceholderText("Nº"), "1");
  expect(mockSetHouseNumber).toHaveBeenCalled();
});

test("calls setComplement when typing in complement field", async () => {
  renderComponent();
  await userEvent.type(screen.getByPlaceholderText("Apto, bloco..."), "A");
  expect(mockSetComplement).toHaveBeenCalled();
});

test("calls setNeighborhood when typing in neighborhood field", async () => {
  renderComponent();
  await userEvent.type(screen.getByPlaceholderText("Bairro"), "C");
  expect(mockSetNeighborhood).toHaveBeenCalled();
});

test("calls setCity when typing in city field", async () => {
  renderComponent();
  await userEvent.type(screen.getByPlaceholderText("Cidade"), "S");
  expect(mockSetCity).toHaveBeenCalled();
});

test("calls setState when typing in state field", async () => {
  renderComponent();
  await userEvent.type(screen.getByPlaceholderText("UF"), "B");
  expect(mockSetState).toHaveBeenCalled();
});

test("calls setZipcode when typing in zipcode field", async () => {
  renderComponent();
  await userEvent.type(screen.getByPlaceholderText("00000-000"), "1");
  expect(mockSetZipcode).toHaveBeenCalled();
});
