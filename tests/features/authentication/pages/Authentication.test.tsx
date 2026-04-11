import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, vi, test, expect } from "vitest";
import { Authentication } from "@/features/authentication";
import { supabase } from "../../../../supabase/supabase";

/* - Criando os Mocks - */

vi.mock("../../../../supabase/supabase", () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
    },
    from: vi.fn(() => ({
      insert: vi.fn().mockResolvedValue({ error: null }),
    })),
  },
}));

vi.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & {
      children?: React.ReactNode;
    }) => <div {...props}>{children}</div>,
  },
}));

vi.mock("../../../../public/logo-petmatch.png", () => ({
  default: "logo-petmatch.png",
}));

vi.mock("../../../shared/utils/regex", () => ({
  regex: {
    name: /^[a-zA-ZÀ-ÿ\s]{2,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
}));

vi.mock("../../../shared/utils/masks", () => ({
  masks: {
    name: (value: string) => value,
  },
}));

/* - Limpando os mocks antes dos testes - */

beforeEach(() => {
  vi.clearAllMocks();

  vi.mocked(supabase.from).mockReturnValue({
    insert: vi.fn().mockResolvedValue({ error: null }),
  } as any);
});

/* - Criando a função de renderizar o componente - */

const renderComponent = () =>
  render(
    <MemoryRouter>
      <Authentication />
    </MemoryRouter>,
  );

/* - Criando a função fake para preencher o formulário de cadastro - */

const fillForm = async ({
  firstName = "João",
  lastName = "Silva",
  email = "joao@email.com",
  password = "senha123",
  confirmPassword = "senha123",
} = {}) => {
  await userEvent.type(screen.getByPlaceholderText("Seu Nome"), firstName);
  await userEvent.type(screen.getByPlaceholderText("Seu Sobrenome"), lastName);
  await userEvent.type(screen.getByPlaceholderText("exemplo@email.com"), email);
  const passwordFields = screen.getAllByPlaceholderText(/^\*+$/);
  await userEvent.type(passwordFields[0], password);
  await userEvent.type(passwordFields[1], confirmPassword);
};

/* - Testando a renderiazção dos elementos - */

test("renders all form fields", () => {
  renderComponent();

  expect(screen.getByText("Cadastre-se")).toBeInTheDocument();
  expect(screen.getByLabelText("Primeiro Nome:")).toBeInTheDocument();
  expect(screen.getByLabelText("Último Nome:")).toBeInTheDocument();
  expect(screen.getByLabelText("Email:")).toBeInTheDocument();
  expect(screen.getByLabelText("Senha:")).toBeInTheDocument();
  expect(screen.getByLabelText("Confirme sua Senha:")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /cadastrar/i }),
  ).toBeInTheDocument();
});

test("renders the login link", () => {
  renderComponent();
  expect(screen.getByText("Faça Login!")).toBeInTheDocument();
});

test("renders Terms of Use and Privacy Policy links", () => {
  renderComponent();
  expect(screen.getByText("Termos de Uso")).toBeInTheDocument();
  expect(screen.getByText("Política de Privacidade")).toBeInTheDocument();
});

test("renders the PetMatch logo", () => {
  renderComponent();
  expect(screen.getByAltText("PetMatch Logo")).toBeInTheDocument();
});

test("password fields start as type password", () => {
  renderComponent();
  const passwordFields = screen.getAllByPlaceholderText(/^\*+$/);
  passwordFields.forEach((field) => {
    expect(field).toHaveAttribute("type", "password");
  });
});

/* - Testando a visibilidade da senha - */

test("toggles password field visibility when clicking the icon", async () => {
  renderComponent();
  const toggleButtons = screen
    .getAllByRole("button")
    .filter((btn) => !btn.textContent?.includes("Cadastrar"));
  const passwordField = screen.getAllByPlaceholderText(/^\*+$/)[0];

  await userEvent.click(toggleButtons[0]);
  expect(passwordField).toHaveAttribute("type", "text");

  await userEvent.click(toggleButtons[0]);
  expect(passwordField).toHaveAttribute("type", "password");
});

test("toggles confirm password field visibility when clicking the icon", async () => {
  renderComponent();
  const toggleButtons = screen
    .getAllByRole("button")
    .filter((btn) => !btn.textContent?.includes("Cadastrar"));
  const confirmPasswordField = screen.getAllByPlaceholderText(/^\*+$/)[1];

  await userEvent.click(toggleButtons[1]);
  expect(confirmPasswordField).toHaveAttribute("type", "text");

  await userEvent.click(toggleButtons[1]);
  expect(confirmPasswordField).toHaveAttribute("type", "password");
});

/* - Testando as validações - */

test("shows error when first name is invalid", async () => {
  renderComponent();
  await userEvent.type(screen.getByPlaceholderText("Seu Nome"), "J");
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

  expect(await screen.findByLabelText(/Primeiro Nome/i)).toBeInTheDocument();
});

test("shows error when email format is invalid", async () => {
  renderComponent();
  await userEvent.type(screen.getByPlaceholderText("Seu Nome"), "João");
  await userEvent.type(
    screen.getByPlaceholderText("exemplo@email.com"),
    "invalidemail",
  );
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

  expect(
    await screen.findByText("Formato de email inválido."),
  ).toBeInTheDocument();
});

test("shows error when required fields are empty", async () => {
  renderComponent();
  await userEvent.type(screen.getByPlaceholderText("Seu Nome"), "João");
  await userEvent.type(
    screen.getByPlaceholderText("exemplo@email.com"),
    "joao@email.com",
  );
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

  expect(
    await screen.findByText("Preencha todos os campos."),
  ).toBeInTheDocument();
});

test("shows error when passwords do not match", async () => {
  renderComponent();
  await fillForm({ confirmPassword: "differentpassword" });
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

  expect(
    await screen.findByText("As senhas não coincidem."),
  ).toBeInTheDocument();
});

test("shows error when password is shorter than 6 characters", async () => {
  renderComponent();
  await fillForm({ password: "abc", confirmPassword: "abc" });
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

  expect(
    await screen.findByText("A senha deve conter, pelo menos, 6 caracteres."),
  ).toBeInTheDocument();
});

/* - Testando a integração com o Supabase - */

test("shows success toast after sign up with no active session", async () => {
  vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({
    data: { user: { id: "user-123" } as any, session: null },
    error: null,
  } as any);

  renderComponent();
  await fillForm();
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

  expect(
    await screen.findByText("Confirmação enviada para seu email!"),
  ).toBeInTheDocument();
});

test("shows error returned by Supabase", async () => {
  vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({
    data: { user: null, session: null },
    error: { message: "Email already registered" } as any,
  } as any);

  renderComponent();
  await fillForm();
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

  expect(
    await screen.findByText("Email already registered"),
  ).toBeInTheDocument();
});

test("shows error when supabase returns null user without error", async () => {
  vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({
    data: { user: null, session: null },
    error: null,
  } as any);

  renderComponent();
  await fillForm();
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

  expect(
    await screen.findByText("Erro ao cadastrar usuário."),
  ).toBeInTheDocument();
});

test("shows generic error on unexpected exception", async () => {
  vi.mocked(supabase.auth.signUp).mockRejectedValueOnce(
    new Error("Network error"),
  );

  renderComponent();
  await fillForm();
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

  expect(
    await screen.findByText("Erro inesperado. Tente novamente."),
  ).toBeInTheDocument();
});

test("inserts user into the users table after successful sign up", async () => {
  const insertMock = vi.fn().mockResolvedValue({ error: null });
  vi.mocked(supabase.from).mockReturnValueOnce({ insert: insertMock } as any);
  vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({
    data: { user: { id: "user-123" } as any, session: null },
    error: null,
  } as any);

  renderComponent();
  await fillForm();
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

  await waitFor(() => {
    expect(supabase.from).toHaveBeenCalledWith("users");
    expect(insertMock).toHaveBeenCalledWith([
      expect.objectContaining({
        user_id: "user-123",
        firstName: "João",
        lastName: "Silva",
        email: "joao@email.com",
      }),
    ]);
  });
});

test("does not call supabase.from when signUp returns an error", async () => {
  vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({
    data: { user: null, session: null },
    error: { message: "Some error" } as any,
  } as any);

  renderComponent();
  await fillForm();
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

  await waitFor(() => {
    expect(supabase.from).not.toHaveBeenCalled();
  });
});

/* - Testando o comportamento da UI - */

test("clears error when clicking outside the submit button", async () => {
  vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({
    data: { user: null, session: null },
    error: { message: "Some error" } as any,
  } as any);

  renderComponent();
  await fillForm();
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));
  expect(await screen.findByText("Some error")).toBeInTheDocument();

  fireEvent.mouseDown(document.body);

  await waitFor(() => {
    expect(screen.queryByText("Some error")).not.toBeInTheDocument();
  });
});

test("hides success toast after 8 seconds", async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true });

  vi.mocked(supabase.auth.signUp).mockResolvedValueOnce({
    data: { user: { id: "user-123" } as any, session: null },
    error: null,
  } as any);

  renderComponent();
  await fillForm();
  await userEvent.click(screen.getByRole("button", { name: /cadastrar/i }));

  expect(
    await screen.findByText("Confirmação enviada para seu email!"),
  ).toBeInTheDocument();

  act(() => {
    vi.advanceTimersByTime(8000);
  });

  await waitFor(() => {
    expect(
      screen.queryByText("Confirmação enviada para seu email!"),
    ).not.toBeInTheDocument();
  });

  vi.useRealTimers();
});
