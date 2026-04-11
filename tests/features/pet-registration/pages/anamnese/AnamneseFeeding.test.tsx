import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, vi, test, expect } from "vitest";
import { AnamneseFeeding } from "@/features/pet-registration";

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando a função de renderizar o componente - */

const renderComponent = (value = "", onChange = vi.fn()) =>
  render(
    <AnamneseFeeding
      value={value}
      onChange={onChange}
    />,
  );

/* - Testando a renderização dos elementos - */

test("renders the step label", () => {
  renderComponent();
  expect(screen.getByText("Etapa 1")).toBeInTheDocument();
});

test("renders the section title", () => {
  renderComponent();
  expect(screen.getByText("Alimentação")).toBeInTheDocument();
});

test("renders the question label", () => {
  renderComponent();
  expect(
    screen.getByText("Como é a alimentação do seu pet?"),
  ).toBeInTheDocument();
});

test("renders the textarea", () => {
  renderComponent();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("renders the textarea with the correct placeholder", () => {
  renderComponent();
  expect(
    screen.getByPlaceholderText(/Descreva como é a alimentação do seu pet/i),
  ).toBeInTheDocument();
});

test("renders the textarea with the correct value", () => {
  renderComponent("Ração Premium");
  expect(screen.getByRole("textbox")).toHaveValue("Ração Premium");
});

/* - Testando o comportamento do textarea - */

test("calls onChange when typing in the textarea", async () => {
  const onChange = vi.fn();
  renderComponent("", onChange);

  await userEvent.type(screen.getByRole("textbox"), "Ração");

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
    screen.getByLabelText(/Como é a alimentação do seu pet/i),
  ).toBeInTheDocument();
});
