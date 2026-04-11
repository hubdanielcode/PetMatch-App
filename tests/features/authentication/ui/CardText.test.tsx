import { render, screen } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { CardText } from "@/features/authentication";

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Testando a renderização dos elementos - */

test("renders the text correctly", () => {
  render(<CardText text="Texto do Card" />);
  expect(screen.getByText("Texto do Card")).toBeInTheDocument();
});

test("applies the className prop correctly", () => {
  render(
    <CardText
      text="Texto do Card"
      className="minha-classe"
    />,
  );
  expect(screen.getByText("Texto do Card")).toHaveClass("minha-classe");
});

test("renders without className when it is not provided", () => {
  render(<CardText text="Texto do Card" />);
  expect(screen.getByText("Texto do Card")).not.toHaveAttribute(
    "class",
    expect.stringContaining("undefined"),
  );
});
