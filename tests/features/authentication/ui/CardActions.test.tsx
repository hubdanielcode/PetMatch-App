import { render, screen } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { CardActions } from "@/features/authentication";

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Testando a renderização dos elementos - */

test("renders children correctly", () => {
  render(<CardActions>Conteúdo do CardActions</CardActions>);
  expect(screen.getByText("Conteúdo do CardActions")).toBeInTheDocument();
});

test("applies the className prop correctly", () => {
  render(
    <CardActions className="minha-classe">Conteúdo do CardActions</CardActions>,
  );
  expect(screen.getByText("Conteúdo do CardActions")).toHaveClass(
    "minha-classe",
  );
});

test("renders without className when it is not provided", () => {
  render(<CardActions>Conteúdo do CardActions</CardActions>);
  expect(screen.getByText("Conteúdo do CardActions")).not.toHaveAttribute(
    "class",
    expect.stringContaining("undefined"),
  );
});

test("renders multiple children correctly", () => {
  render(
    <CardActions>
      <p>Primeiro parágrafo</p>
      <p>Segundo parágrafo</p>
    </CardActions>,
  );
  expect(screen.getByText("Primeiro parágrafo")).toBeInTheDocument();
  expect(screen.getByText("Segundo parágrafo")).toBeInTheDocument();
});
