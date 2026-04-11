import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Missing } from "@/shared";

/* - Mockando dependências - */

vi.mock("react-router-dom", () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

vi.mock("@/features/authentication", () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  CardTitle: ({ title }: { title: string }) => <h2>{title}</h2>,
  CardText: ({ text }: { text: string }) => <p>{text}</p>,
  CardActions: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  FeatureItem: ({
    text,
    description,
  }: {
    text: string;
    description: string;
  }) => (
    <div>
      <span>{text}</span>
      <span>{description}</span>
    </div>
  ),
}));

/* - Testando Missing - */

test("renders 404 heading", () => {
  render(<Missing />);
  expect(screen.getByText("404")).toBeInTheDocument();
});

test("renders page not found message", () => {
  render(<Missing />);
  expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
});

test("renders link to login page", () => {
  render(<Missing />);
  const link = screen.getByText("Voltar para a tela de Login");
  expect(link).toBeInTheDocument();
  expect(link.closest("a")).toHaveAttribute("href", "/");
});

test("renders terms of use link", () => {
  render(<Missing />);
  const link = screen.getByText(/Termos de Uso/);
  expect(link.closest("a")).toHaveAttribute("href", "/termos-de-uso");
});

test("renders privacy policy link", () => {
  render(<Missing />);
  const link = screen.getByText("Política de Privacidade");
  expect(link.closest("a")).toHaveAttribute("href", "/politica-de-privacidade");
});

test("renders feature items", () => {
  render(<Missing />);
  expect(screen.getByText("Perfis Verificados")).toBeInTheDocument();
  expect(screen.getByText("Avaliações Confiáveis")).toBeInTheDocument();
  expect(screen.getByText("Contato Direto")).toBeInTheDocument();
});
