import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, vi, test, expect } from "vitest";
import { RecoverPassword } from "@/features/authentication";

/* - Criando os Mocks - */

vi.mock("../../../../supabase/supabase", () => ({
  supabase: {
    auth: {
      resetPasswordForEmail: vi.fn(),
    },
  },
}));

vi.mock("../../../../public/logo-petmatch.png", () => ({
  default: "logo-petmatch.png",
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
      <RecoverPassword />
    </MemoryRouter>,
  );

/* - Testando a renderização dos elementos - */

test("renders all form fields", () => {
  renderComponent();

  expect(
    screen.getByRole("heading", { name: "Recupere sua senha" }),
  ).toBeInTheDocument();
  expect(screen.getByLabelText("Email:")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /enviar email/i }),
  ).toBeInTheDocument();
});

test("renders the back to login link", () => {
  renderComponent();
  expect(screen.getByText("Voltar para a tela de Login")).toBeInTheDocument();
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

/* - Testando as validações - */

test("shows error when email field is empty", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: /enviar email/i }));

  expect(
    await screen.findByText("Digite um endereço de email válido."),
  ).toBeInTheDocument();
});

test("shows error when email format is invalid", async () => {
  renderComponent();
  await userEvent.type(
    screen.getByPlaceholderText("exemplo@email.com"),
    "emailinvalido",
  );
  await userEvent.click(screen.getByRole("button", { name: /enviar email/i }));

  expect(
    await screen.findByText("Digite um endereço de email válido."),
  ).toBeInTheDocument();
});

/* - Testando a integração com o Supabase - */

test("calls resetPasswordForEmail with the correct email", async () => {
  vi.mocked(supabase.auth.resetPasswordForEmail).mockResolvedValueOnce({
    data: {},
    error: null,
  } as any);

  vi.spyOn(window, "alert").mockImplementation(() => {});

  renderComponent();
  await userEvent.type(
    screen.getByPlaceholderText("exemplo@email.com"),
    "joao@email.com",
  );
  await userEvent.click(screen.getByRole("button", { name: /enviar email/i }));

  await waitFor(() => {
    expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
      "joao@email.com",
      expect.objectContaining({ redirectTo: expect.any(String) }),
    );
  });
});

test("shows alert after submitting a valid email", async () => {
  vi.mocked(supabase.auth.resetPasswordForEmail).mockResolvedValueOnce({
    data: {},
    error: null,
  } as any);

  const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});

  renderComponent();
  await userEvent.type(
    screen.getByPlaceholderText("exemplo@email.com"),
    "joao@email.com",
  );
  await userEvent.click(screen.getByRole("button", { name: /enviar email/i }));

  await waitFor(() => {
    expect(alertMock).toHaveBeenCalledWith(
      "Se o email estiver cadastrado, você receberá um link de redefinição de senha.",
    );
  });
});

test("clears the email field after successful submission", async () => {
  vi.mocked(supabase.auth.resetPasswordForEmail).mockResolvedValueOnce({
    data: {},
    error: null,
  } as any);

  vi.spyOn(window, "alert").mockImplementation(() => {});

  renderComponent();
  const emailField = screen.getByPlaceholderText("exemplo@email.com");
  await userEvent.type(emailField, "joao@email.com");
  await userEvent.click(screen.getByRole("button", { name: /enviar email/i }));

  await waitFor(() => {
    expect(emailField).toHaveValue("");
  });
});

test("shows error when supabase returns an error", async () => {
  vi.mocked(supabase.auth.resetPasswordForEmail).mockResolvedValueOnce({
    data: {},
    error: { message: "Email service unavailable" } as any,
  } as any);

  vi.spyOn(window, "alert").mockImplementation(() => {});

  renderComponent();
  await userEvent.type(
    screen.getByPlaceholderText("exemplo@email.com"),
    "joao@email.com",
  );
  await userEvent.click(screen.getByRole("button", { name: /enviar email/i }));

  expect(
    await screen.findByText("Falha ao tentar enviar email."),
  ).toBeInTheDocument();
});

/* - Testando o comportamento da UI - */

test("clears error when clicking outside the submit button", async () => {
  renderComponent();
  await userEvent.type(
    screen.getByPlaceholderText("exemplo@email.com"),
    "emailinvalido",
  );
  await userEvent.click(screen.getByRole("button", { name: /enviar email/i }));
  expect(
    await screen.findByText("Digite um endereço de email válido."),
  ).toBeInTheDocument();

  fireEvent.mouseDown(document.body);

  await waitFor(() => {
    expect(
      screen.queryByText("Digite um endereço de email válido."),
    ).not.toBeInTheDocument();
  });
});
