import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, vi, test, expect } from "vitest";
import { AnamneseReproduction } from "@/features/pet-registration";
import { RegistrationProvider } from "@/features/pet-registration/context/RegistrationContext";

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando a função de renderizar o componente - */

const renderComponent = (value = "", onChange = vi.fn()) =>
  render(
    <RegistrationProvider>
      <AnamneseReproduction
        value={value}
        onChange={onChange}
      />
    </RegistrationProvider>,
  );

/* - Testando a renderização dos elementos - */

test("renders the section title", () => {
  renderComponent();
  expect(screen.getByText("Histórico Reprodutivo")).toBeInTheDocument();
});

test("renders Etapa 6 by default when gender is not Macho", () => {
  renderComponent();
  expect(screen.getByText("Etapa 6")).toBeInTheDocument();
});

test("renders the question label", () => {
  renderComponent();
  expect(
    screen.getByText("Conte-nos mais sobre as outras cruzas do seu pet"),
  ).toBeInTheDocument();
});

test("renders the textarea", () => {
  renderComponent();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("renders the textarea with the correct placeholder", () => {
  renderComponent();
  expect(
    screen.getByPlaceholderText(
      /Como você descreveria o histórico reprodutivo do seu pet/i,
    ),
  ).toBeInTheDocument();
});

test("renders the textarea with the correct value", () => {
  renderComponent("Cruzou uma vez");
  expect(screen.getByRole("textbox")).toHaveValue("Cruzou uma vez");
});

/* - Testando o comportamento do textarea - */

test("calls onChange when typing in the textarea", async () => {
  const onChange = vi.fn();
  renderComponent("", onChange);

  await userEvent.type(screen.getByRole("textbox"), "Cruzou");

  expect(onChange).toHaveBeenCalled();
});

test("calls onChange with the correct value", async () => {
  const onChange = vi.fn();
  renderComponent("", onChange);

  await userEvent.type(screen.getByRole("textbox"), "A");

  expect(onChange).toHaveBeenCalledWith("A");
});

test("textarea has maxLength of 650", () => {
  renderComponent();
  expect(screen.getByRole("textbox")).toHaveAttribute("maxLength", "650");
});

test("textarea is required", () => {
  renderComponent();
  expect(screen.getByRole("textbox")).toBeRequired();
});

test("textarea is associated with the correct label", () => {
  renderComponent();
  expect(
    screen.getByLabelText(/Conte-nos mais sobre as outras cruzas/i),
  ).toBeInTheDocument();
});

/* - Testando o step label de acordo com o gender - */

test("renders Etapa 7 when gender is Macho", () => {
  render(
    <RegistrationProvider>
      <AnamneseReproduction
        value=""
        onChange={vi.fn()}
      />
    </RegistrationProvider>,
  );

  expect(screen.getByText("Etapa 6")).toBeInTheDocument();
});
