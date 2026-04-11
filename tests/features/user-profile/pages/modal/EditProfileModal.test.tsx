import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, test, expect, beforeEach } from "vitest";
import { EditProfileModal } from "@/features/user-profile";

/* - Criando os Mocks hoistados - */

const { mockGetTutors, mockUpdateTutor, mockTutor } = vi.hoisted(() => ({
  mockGetTutors: vi.fn(),
  mockUpdateTutor: vi.fn(),
  mockTutor: {
    id: "tutor-123",
    user_id: "user-123",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(71) 99999-9999",
    street: "Rua das Flores",
    number: "123",
    complement: "",
    neighborhood: "Centro",
    city: "Salvador",
    state: "BA",
    photo_url: null,
    has_seen_welcome: false,
    created_at: "2024-01-01T00:00:00Z",
    validated_at: null,
  },
}));

vi.mock("@/features/pet-registration", () => ({
  useGetTutors: () => ({ getTutors: mockGetTutors, tutor: mockTutor }),
  useUpdateTutor: () => ({ updateTutor: mockUpdateTutor }),
}));

vi.mock("@/shared/utils/masks", () => ({
  masks: {
    phone: (value: string) => value,
  },
}));

vi.mock("@/shared/utils/regex", () => ({
  regex: {
    petName: /^[\p{L}\s]*$/u,
    phone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    city: /^[\p{L}\s]*$/u,
    state: /^[A-Z]{0,2}$/,
  },
}));

const mockOnClose = vi.fn();
const mockOnSave = vi.fn();

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
  mockUpdateTutor.mockResolvedValue({});
});

/* - Criando a função de renderizar o componente - */

const renderComponent = () =>
  render(
    <EditProfileModal
      onClose={mockOnClose}
      onSave={mockOnSave}
      userId="user-123"
    />,
  );

/* - Testando a renderização inicial - */

test("renders the modal title", () => {
  renderComponent();
  expect(screen.getByText("Editar Perfil")).toBeInTheDocument();
});

test("renders all input fields", () => {
  renderComponent();
  expect(screen.getByPlaceholderText("Seu nome")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Seu email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("(00) 00000-0000")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Cidade")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("UF")).toBeInTheDocument();
});

test("renders Cancelar and Salvar buttons", () => {
  renderComponent();
  expect(screen.getByRole("button", { name: "Cancelar" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
});

test("calls getTutors with the userId on mount", () => {
  renderComponent();
  expect(mockGetTutors).toHaveBeenCalledWith("user-123");
});

test("populates fields with tutor data", () => {
  renderComponent();
  expect(screen.getByPlaceholderText("Seu nome")).toHaveValue("João Silva");
  expect(screen.getByPlaceholderText("Seu email")).toHaveValue(
    "joao@email.com",
  );
  expect(screen.getByPlaceholderText("(00) 00000-0000")).toHaveValue(
    "(71) 99999-9999",
  );
  expect(screen.getByPlaceholderText("Cidade")).toHaveValue("Salvador");
  expect(screen.getByPlaceholderText("UF")).toHaveValue("BA");
});

/* - Testando o botão Cancelar - */

test("calls onClose when clicking Cancelar", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: "Cancelar" }));
  expect(mockOnClose).toHaveBeenCalled();
});

/* - Testando as validações - */

test("shows error when name is empty", async () => {
  renderComponent();
  await userEvent.clear(screen.getByPlaceholderText("Seu nome"));
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(screen.getByText("Nome inválido.")).toBeInTheDocument();
});

test("shows error when email is invalid", async () => {
  renderComponent();
  await userEvent.clear(screen.getByPlaceholderText("Seu email"));
  await userEvent.type(
    screen.getByPlaceholderText("Seu email"),
    "emailinvalido",
  );
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(screen.getByText("Email inválido.")).toBeInTheDocument();
});

test("shows error when email is empty", async () => {
  renderComponent();
  await userEvent.clear(screen.getByPlaceholderText("Seu email"));
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(screen.getByText("Email inválido.")).toBeInTheDocument();
});

test("shows error when phone is invalid", async () => {
  renderComponent();
  await userEvent.clear(screen.getByPlaceholderText("(00) 00000-0000"));
  await userEvent.type(screen.getByPlaceholderText("(00) 00000-0000"), "123");
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(screen.getByText("Telefone inválido.")).toBeInTheDocument();
});

test("shows error when city is empty", async () => {
  renderComponent();
  await userEvent.clear(screen.getByPlaceholderText("Cidade"));
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(screen.getByText("Cidade inválida.")).toBeInTheDocument();
});

test("shows error when state is empty", async () => {
  renderComponent();
  await userEvent.clear(screen.getByPlaceholderText("UF"));
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(screen.getByText("Estado inválido.")).toBeInTheDocument();
});

/* - Testando o fluxo de salvar - */

test("calls updateTutor with the correct data on save", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));

  await waitFor(() => {
    expect(mockUpdateTutor).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "João Silva",
        email: "joao@email.com",
        phone: "(71) 99999-9999",
        city: "Salvador",
        state: "BA",
      }),
    );
  });
});

test("calls onSave after updating tutor successfully", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));

  await waitFor(() => {
    expect(mockOnSave).toHaveBeenCalled();
  });
});

test("does not call updateTutor when form has validation errors", async () => {
  renderComponent();
  await userEvent.clear(screen.getByPlaceholderText("Seu nome"));
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(mockUpdateTutor).not.toHaveBeenCalled();
});

test("does not call onSave when form has validation errors", async () => {
  renderComponent();
  await userEvent.clear(screen.getByPlaceholderText("Seu nome"));
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(mockOnSave).not.toHaveBeenCalled();
});
