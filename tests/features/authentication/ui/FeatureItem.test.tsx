import { render, screen } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { FeatureItem } from "@/features/authentication";

/* - Criando os Mocks - */

vi.mock("lucide-react", () => ({
  CircleCheck: () => <svg data-testid="circle-check-icon" />,
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Testando a renderização dos elementos - */

test("renders the text correctly", () => {
  render(
    <FeatureItem
      text="Perfis Verificados"
      description="Descrição."
    />,
  );
  expect(screen.getByText("Perfis Verificados")).toBeInTheDocument();
});

test("renders the description correctly", () => {
  render(
    <FeatureItem
      text="Perfis Verificados"
      description="Descrição."
    />,
  );
  expect(screen.getByText("Descrição.")).toBeInTheDocument();
});

test("renders the CircleCheck icon", () => {
  render(
    <FeatureItem
      text="Perfis Verificados"
      description="Descrição."
    />,
  );
  expect(screen.getByTestId("circle-check-icon")).toBeInTheDocument();
});

test("applies the className prop correctly", () => {
  const { container } = render(
    <FeatureItem
      text="Perfis Verificados"
      description="Descrição."
      className="minha-classe"
    />,
  );
  expect(container.firstChild).toHaveClass("minha-classe");
});

test("renders without className when it is not provided", () => {
  const { container } = render(
    <FeatureItem
      text="Perfis Verificados"
      description="Descrição."
    />,
  );
  expect(container.firstChild).not.toHaveAttribute(
    "class",
    expect.stringContaining("undefined"),
  );
});

test("does not render the description when it is an empty string", () => {
  render(
    <FeatureItem
      text="Perfis Verificados"
      description=""
    />,
  );
  expect(screen.queryByText("Descrição.")).not.toBeInTheDocument();
});

test("renders ReactNode as text prop correctly", () => {
  render(
    <FeatureItem
      text={<strong>Texto em negrito</strong>}
      description="Descrição."
    />,
  );
  expect(screen.getByText("Texto em negrito")).toBeInTheDocument();
});
