import { render, screen } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { Card } from "@/features/authentication";

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Testando a renderização dos elementos - */

test("renders children correctly", () => {
  render(<Card>Conteúdo do Card</Card>);
  expect(screen.getByText("Conteúdo do Card")).toBeInTheDocument();
});

test("applies the className prop correctly", () => {
  render(<Card className="minha-classe">Conteúdo do Card</Card>);
  expect(screen.getByText("Conteúdo do Card")).toHaveClass("minha-classe");
});

test("renders without className when it is not provided", () => {
  render(<Card>Conteúdo do Card</Card>);
  expect(screen.getByText("Conteúdo do Card")).not.toHaveAttribute(
    "class",
    expect.stringContaining("undefined"),
  );
});

test("renders multiple children correctly", () => {
  render(
    <Card>
      <p>Primeiro parágrafo</p>
      <p>Segundo parágrafo</p>
    </Card>,
  );
  expect(screen.getByText("Primeiro parágrafo")).toBeInTheDocument();
  expect(screen.getByText("Segundo parágrafo")).toBeInTheDocument();
});
