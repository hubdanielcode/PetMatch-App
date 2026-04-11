import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, vi, test, expect } from "vitest";
import { Login } from "@/features/authentication";

/* - Criando os Mocks - */

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../../../supabase/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
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
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando a função de renderizar o componente - */

import { supabase } from "../../../../supabase/supabase";

const renderComponent = () =>
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>,
  );

/* - Criando a função fake para preencher o formulário de login - */

const fillForm = async ({
  email = "joao@email.com",
  password = "senha123",
} = {}) => {
  await userEvent.type(screen.getByPlaceholderText("exemplo@email.com"), email);
  await userEvent.type(screen.getByPlaceholderText("********"), password);
};

/* - Testando a renderização dos elementos - */

test("renders all form fields", () => {
  renderComponent();

  expect(screen.getByRole("heading", { name: "Entrar" })).toBeInTheDocument();
  expect(screen.getByLabelText("Email:")).toBeInTheDocument();
  expect(screen.getByLabelText("Senha:")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
});

test("renders the register link", () => {
  renderComponent();
  expect(screen.getByText("Cadastre-se")).toBeInTheDocument();
});

test("renders the forgot password link", () => {
  renderComponent();
  expect(screen.getByText("Esqueci minha senha")).toBeInTheDocument();
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

test("password field starts as type password", () => {
  renderComponent();
  expect(screen.getByPlaceholderText("********")).toHaveAttribute(
    "type",
    "password",
  );
});

/* - Testando a visibilidade da senha - */

test("toggles password field visibility when clicking the icon", async () => {
  renderComponent();
  const passwordField = screen.getByPlaceholderText("********");
  const toggleButton = screen
    .getAllByRole("button")
    .find((btn) => !btn.textContent?.includes("Entrar"))!;

  await userEvent.click(toggleButton);
  expect(passwordField).toHaveAttribute("type", "text");

  await userEvent.click(toggleButton);
  expect(passwordField).toHaveAttribute("type", "password");
});

/* - Testando as validações - */

test("shows error when fields are empty", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

  expect(
    await screen.findByText("Por favor preencha todos os campos!"),
  ).toBeInTheDocument();
});

test("shows error when only email is filled", async () => {
  renderComponent();
  await userEvent.type(
    screen.getByPlaceholderText("exemplo@email.com"),
    "joao@email.com",
  );
  await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

  expect(
    await screen.findByText("Por favor preencha todos os campos!"),
  ).toBeInTheDocument();
});

test("shows error when only password is filled", async () => {
  renderComponent();
  await userEvent.type(screen.getByPlaceholderText("********"), "senha123");
  await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

  expect(
    await screen.findByText("Por favor preencha todos os campos!"),
  ).toBeInTheDocument();
});

test("shows error when email format is invalid", async () => {
  renderComponent();
  await fillForm({ email: "emailinvalido" });
  await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

  expect(
    await screen.findByText("Formato de email inválido."),
  ).toBeInTheDocument();
});

/* - Testando a integração com o Supabase - */

test("navigates to /bem-vindo on successful login", async () => {
  vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
    data: { user: {} as any, session: {} as any },
    error: null,
  } as any);

  renderComponent();
  await fillForm();
  await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith("/bem-vindo", { replace: true });
  });
});

test("shows error when supabase returns an auth error", async () => {
  vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
    data: { user: null, session: null },
    error: { message: "Invalid login credentials" } as any,
  } as any);

  renderComponent();
  await fillForm();
  await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

  expect(
    await screen.findByText("Email ou senha inválidos."),
  ).toBeInTheDocument();
});

test("does not navigate when supabase returns an error", async () => {
  vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
    data: { user: null, session: null },
    error: { message: "Invalid login credentials" } as any,
  } as any);

  renderComponent();
  await fillForm();
  await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

  await waitFor(() => {
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

/* - Testando o comportamento da UI - */

test("clears error when clicking outside the submit button", async () => {
  vi.mocked(supabase.auth.signInWithPassword).mockResolvedValueOnce({
    data: { user: null, session: null },
    error: { message: "Invalid login credentials" } as any,
  } as any);

  renderComponent();
  await fillForm();
  await userEvent.click(screen.getByRole("button", { name: /entrar/i }));
  expect(
    await screen.findByText("Email ou senha inválidos."),
  ).toBeInTheDocument();

  fireEvent.mouseDown(document.body);

  await waitFor(() => {
    expect(
      screen.queryByText("Email ou senha inválidos."),
    ).not.toBeInTheDocument();
  });
});
