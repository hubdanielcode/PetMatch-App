import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, vi, test, expect } from "vitest";
import { AnamneseFlow } from "@/features/pet-registration";
import { RegistrationProvider } from "@/features/pet-registration/context/RegistrationContext";
import type { ReactNode } from "react";

/* - Criando os Mocks - */

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLDivElement> & {
      children?: ReactNode;
    }) => <div {...props}>{children}</div>,
  },
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando a função de renderizar o componente - */

const renderComponent = (onNext = vi.fn(), onBack?: () => void) =>
  render(
    <RegistrationProvider>
      <AnamneseFlow
        onNext={onNext}
        onBack={onBack}
      />
    </RegistrationProvider>,
  );

/* - Testando a renderização dos elementos - */

test("renders the anamnese title", () => {
  renderComponent();
  expect(screen.getByText("Anamnese")).toBeInTheDocument();
});

test("renders the Avançar button", () => {
  renderComponent();
  expect(screen.getByRole("button", { name: /avançar/i })).toBeInTheDocument();
});

test("renders the Retornar button", () => {
  renderComponent();
  expect(screen.getByRole("button", { name: /retornar/i })).toBeInTheDocument();
});

test("does not render the Voltar button when onBack is not provided", () => {
  renderComponent();
  expect(
    screen.queryByRole("button", { name: /voltar/i }),
  ).not.toBeInTheDocument();
});

test("renders the Voltar button when onBack is provided", () => {
  renderComponent(vi.fn(), vi.fn());
  expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
});

/* - Testando o passo inicial - */

test("renders the first step (Alimentação) on mount", () => {
  renderComponent();
  expect(screen.getByText("Etapa 1")).toBeInTheDocument();
  expect(screen.getByText("Alimentação")).toBeInTheDocument();
});

/* - Testando a navegação entre steps - */

test("advances to the next step when clicking Avançar", async () => {
  renderComponent();

  await userEvent.click(screen.getByRole("button", { name: /avançar/i }));

  expect(screen.getByText("Etapa 2")).toBeInTheDocument();
  expect(screen.getByText("Passeios")).toBeInTheDocument();
});

test("goes back to the previous step when clicking Retornar", async () => {
  renderComponent();

  await userEvent.click(screen.getByRole("button", { name: /avançar/i }));
  await userEvent.click(screen.getByRole("button", { name: /retornar/i }));

  expect(screen.getByText("Etapa 1")).toBeInTheDocument();
  expect(screen.getByText("Alimentação")).toBeInTheDocument();
});

test("navigates through all base steps correctly", async () => {
  renderComponent();

  const steps = [
    "Alimentação",
    "Passeios",
    "Comportamento",
    "Histórico de Cirurgias",
    "Histórico de Doenças",
  ];

  for (const step of steps) {
    expect(screen.getByText(step)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /avançar/i }));
  }
});

test("calls onNext when clicking Avançar on the last step", async () => {
  const onNext = vi.fn().mockResolvedValueOnce(undefined);
  renderComponent(onNext);

  const steps = 5;
  for (let i = 0; i < steps; i++) {
    await userEvent.click(screen.getByRole("button", { name: /avançar/i }));
  }

  expect(onNext).toHaveBeenCalledOnce();
});

test("calls onBack when clicking Voltar on the first step", async () => {
  const onBack = vi.fn();
  renderComponent(vi.fn(), onBack);

  await userEvent.click(screen.getByRole("button", { name: /voltar/i }));

  expect(onBack).toHaveBeenCalledOnce();
});

test("calls onBack when clicking Retornar on the first step", async () => {
  const onBack = vi.fn();
  renderComponent(vi.fn(), onBack);

  await userEvent.click(screen.getByRole("button", { name: /retornar/i }));

  expect(onBack).toHaveBeenCalledOnce();
});
