import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, vi, test, expect } from "vitest";
import { AnamneseTesticles } from "@/features/pet-registration";
import { RegistrationProvider } from "@/features/pet-registration/context/RegistrationContext";

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando a função de renderizar o componente - */

const renderComponent = (
  value: "0" | "1" | "2" | "" = "",
  onChange = vi.fn(),
) =>
  render(
    <RegistrationProvider>
      <AnamneseTesticles
        value={value}
        onChange={onChange}
      />
    </RegistrationProvider>,
  );

/* - Testando a renderização dos elementos - */

test("renders the step label", () => {
  renderComponent();
  expect(screen.getByText("Etapa 6")).toBeInTheDocument();
});

test("renders the section title", () => {
  renderComponent();
  expect(screen.getByText("Testículos")).toBeInTheDocument();
});

test("renders the question label", () => {
  renderComponent();
  expect(
    screen.getByText("Quantos testículos o seu pet tem? *"),
  ).toBeInTheDocument();
});

test("renders all three testicle options", () => {
  renderComponent();
  expect(screen.getByText("Nenhum testículo")).toBeInTheDocument();
  expect(screen.getByText("Um testículo")).toBeInTheDocument();
  expect(screen.getByText("Dois testículos")).toBeInTheDocument();
});

test("renders all option descriptions", () => {
  renderComponent();
  expect(screen.getByText("Criptorquidismo Bilateral")).toBeInTheDocument();
  expect(screen.getByText("Criptorquidismo unilateral")).toBeInTheDocument();
  expect(screen.getByText("Sem alteração")).toBeInTheDocument();
});

test("renders all option badges", () => {
  renderComponent();
  expect(screen.getByText("Inapto")).toBeInTheDocument();
  expect(screen.getByText("Restrito")).toBeInTheDocument();
  expect(screen.getByText("Apto")).toBeInTheDocument();
});

test("does not render the alert message when no option is selected", () => {
  renderComponent();
  expect(
    screen.queryByText("Este pet não está apto para reprodução."),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByText(/Este pet está apto para reprodução/),
  ).not.toBeInTheDocument();
});

/* - Testando as mensagens de alerta - */

test("renders the correct alert message when value is 0", () => {
  renderComponent("0");
  expect(
    screen.getByText("Este pet não está apto para reprodução."),
  ).toBeInTheDocument();
});

test("renders the correct alert message when value is 1", () => {
  renderComponent("1");
  expect(
    screen.getByText(
      "Este pet está apto para reprodução, porém a venda casada não é recomendada.",
    ),
  ).toBeInTheDocument();
});

test("renders the correct alert message when value is 2", () => {
  renderComponent("2");
  expect(
    screen.getByText("Este pet está apto para reprodução e venda casada."),
  ).toBeInTheDocument();
});

/* - Testando o comportamento dos botões - */

test("calls onChange with 0 when clicking Nenhum testículo", async () => {
  const onChange = vi.fn();
  renderComponent("", onChange);

  await userEvent.click(screen.getByText("Nenhum testículo"));

  expect(onChange).toHaveBeenCalledWith("0");
});

test("calls onChange with 1 when clicking Um testículo", async () => {
  const onChange = vi.fn();
  renderComponent("", onChange);

  await userEvent.click(screen.getByText("Um testículo"));

  expect(onChange).toHaveBeenCalledWith("1");
});

test("calls onChange with 2 when clicking Dois testículos", async () => {
  const onChange = vi.fn();
  renderComponent("", onChange);

  await userEvent.click(screen.getByText("Dois testículos"));

  expect(onChange).toHaveBeenCalledWith("2");
});

test("renders three clickable buttons for the options", () => {
  renderComponent();
  const buttons = screen.getAllByRole("button");
  expect(buttons).toHaveLength(3);
});
