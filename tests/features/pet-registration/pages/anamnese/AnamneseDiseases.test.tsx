import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, vi, test, expect } from "vitest";
import { AnamneseDiseases } from "@/features/pet-registration";

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando a função de renderizar o componente - */

const renderComponent = (value = "", onChange = vi.fn()) =>
  render(
    <AnamneseDiseases
      value={value}
      onChange={onChange}
    />,
  );

/* - Testando a renderização dos elementos - */

test("renders the step label", () => {
  renderComponent();
  expect(screen.getByText("Etapa 5")).toBeInTheDocument();
});

test("renders the section title", () => {
  renderComponent();
  expect(screen.getByText("Histórico de Doenças")).toBeInTheDocument();
});

test("renders the question label", () => {
  renderComponent();
  expect(screen.getByText("Como anda a saúde do seu pet?")).toBeInTheDocument();
});

test("renders the textarea", () => {
  renderComponent();
  expect(screen.getByRole("textbox")).toBeInTheDocument();
});

test("renders the textarea with the correct placeholder", () => {
  renderComponent();
  expect(
    screen.getByPlaceholderText(/Como você descreveria a saúde do seu pet/i),
  ).toBeInTheDocument();
});

test("renders the textarea with the correct value", () => {
  renderComponent("Saudável");
  expect(screen.getByRole("textbox")).toHaveValue("Saudável");
});

/* - Testando o comportamento do textarea - */

test("calls onChange when typing in the textarea", async () => {
  const onChange = vi.fn();
  renderComponent("", onChange);

  await userEvent.type(screen.getByRole("textbox"), "Saudável");

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
    screen.getByLabelText(/Como anda a saúde do seu pet/i),
  ).toBeInTheDocument();
});
