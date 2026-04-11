import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, test, expect, beforeEach } from "vitest";
import { RadioGroup } from "@/features/pet-registration";

/* - Configurando os mocks antes de cada teste - */

const mockOnChange = vi.fn();

const defaultOptions = [
  { label: "Macho", value: "macho" },
  { label: "Fêmea", value: "femea" },
];

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando a função de renderizar o componente - */

const renderComponent = (value = "") =>
  render(
    <RadioGroup
      label="Sexo"
      options={defaultOptions}
      value={value}
      onChange={mockOnChange}
    />,
  );

/* - Testando a renderização inicial - */

test("renders the group label", () => {
  renderComponent();
  expect(screen.getByText("Sexo")).toBeInTheDocument();
});

test("renders all option labels", () => {
  renderComponent();
  expect(screen.getByText("Macho")).toBeInTheDocument();
  expect(screen.getByText("Fêmea")).toBeInTheDocument();
});

test("renders a button for each option", () => {
  renderComponent();
  expect(screen.getAllByRole("button")).toHaveLength(defaultOptions.length);
});

/* - Testando a seleção de opções - */

test("calls onChange with the correct value when an option is clicked", async () => {
  renderComponent();
  const buttons = screen.getAllByRole("button");

  await userEvent.click(buttons[0]);

  expect(mockOnChange).toHaveBeenCalledWith("macho");
});

test("calls onChange with the correct value when the second option is clicked", async () => {
  renderComponent();
  const buttons = screen.getAllByRole("button");

  await userEvent.click(buttons[1]);

  expect(mockOnChange).toHaveBeenCalledWith("femea");
});

test("calls onChange once per click", async () => {
  renderComponent();
  const buttons = screen.getAllByRole("button");

  await userEvent.click(buttons[0]);

  expect(mockOnChange).toHaveBeenCalledTimes(1);
});

/* - Testando o estilo do botão selecionado - */

test("applies selected styles to the active option button", () => {
  renderComponent("macho");
  const buttons = screen.getAllByRole("button");

  expect(buttons[0].className).toContain("bg-amber-400");
});

test("does not apply selected styles to inactive option buttons", () => {
  renderComponent("macho");
  const buttons = screen.getAllByRole("button");

  expect(buttons[1].className).not.toContain("bg-amber-400");
});

test("applies unselected styles when no option is selected", () => {
  renderComponent();
  const buttons = screen.getAllByRole("button");

  buttons.forEach((button) => {
    expect(button.className).toContain("bg-gray-200");
  });
});
