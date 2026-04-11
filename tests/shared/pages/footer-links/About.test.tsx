import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "@/shared";

/* - Testando About - */

test("renders main title", () => {
  render(<About />);
  expect(screen.getByText("PetMatch")).toBeInTheDocument();
});

test("renders mission section", () => {
  render(<About />);
  expect(screen.getByText("Nossa Missão")).toBeInTheDocument();
});

test("renders history section", () => {
  render(<About />);
  expect(screen.getByText("Nossa História")).toBeInTheDocument();
});

test("renders diferenciais section", () => {
  render(<About />);
  expect(screen.getByText("Diferenciais")).toBeInTheDocument();
});

test("renders all 3 feature cards", () => {
  render(<About />);
  expect(screen.getByText("Perfis Verificados")).toBeInTheDocument();
  expect(screen.getByText("Avaliações")).toBeInTheDocument();
  expect(screen.getByText("Contato Direto")).toBeInTheDocument();
});

test("renders feature descriptions", () => {
  render(<About />);
  expect(
    screen.getByText("Informações completas sobre saúde e histórico."),
  ).toBeInTheDocument();
  expect(
    screen.getByText("Sistema confiável de reviews entre usuários."),
  ).toBeInTheDocument();
  expect(
    screen.getByText("Converse facilmente com outros tutores."),
  ).toBeInTheDocument();
});
