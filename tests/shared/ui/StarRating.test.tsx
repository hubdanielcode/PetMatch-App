import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StarRating } from "@/shared/ui/StarRating";

/* - Testando StarRating - */

test("renders rating value correctly", () => {
  render(<StarRating rating={4.5} />);

  expect(screen.getByText("4.5")).toBeInTheDocument();
});

test("formats rating to one decimal place", () => {
  render(<StarRating rating={4} />);

  expect(screen.getByText("4.0")).toBeInTheDocument();
});

test("renders star icon", () => {
  const { container } = render(<StarRating rating={5} />);

  expect(container.querySelector("svg")).toBeInTheDocument();
});

test("renders reviews when provided", () => {
  render(
    <StarRating
      rating={4.5}
      reviews={10}
    />,
  );

  expect(screen.getByText("10 Avaliações")).toBeInTheDocument();
});

test("renders singular review text when reviews is 1", () => {
  render(
    <StarRating
      rating={4.5}
      reviews={1}
    />,
  );

  expect(screen.getByText("1 Avaliação")).toBeInTheDocument();
});

test("does not render reviews when not provided", () => {
  render(<StarRating rating={4.5} />);

  expect(screen.queryByText(/avaliação/i)).not.toBeInTheDocument();
});

test("applies custom className when provided", () => {
  const { container } = render(
    <StarRating
      rating={4.5}
      className="custom-class"
    />,
  );

  expect(container.firstChild).toHaveClass("custom-class");
});

test("has aria-readonly attribute", () => {
  const { container } = render(<StarRating rating={4.5} />);

  const root = container.firstChild as HTMLElement;

  expect(root).toHaveAttribute("aria-readonly");
});
