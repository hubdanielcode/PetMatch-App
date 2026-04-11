import { render, screen } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { CardTitle } from "@/features/authentication";

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Testando a renderização dos elementos - */

test("renders the title correctly", () => {
  render(<CardTitle title="Título do Card" />);
  expect(screen.getByText("Título do Card")).toBeInTheDocument();
});

test("applies the className prop correctly", () => {
  render(
    <CardTitle
      title="Título do Card"
      className="minha-classe"
    />,
  );
  expect(screen.getByText("Título do Card")).toHaveClass("minha-classe");
});

test("renders without className when it is not provided", () => {
  render(<CardTitle title="Título do Card" />);
  expect(screen.getByText("Título do Card")).not.toHaveAttribute(
    "class",
    expect.stringContaining("undefined"),
  );
});
