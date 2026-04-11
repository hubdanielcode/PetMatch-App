import { test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HowDoesItWork } from "@/shared";

/* - Mockando useNavigate - */

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

/* - Testando HowDoesItWork - */

test("renders main title", () => {
  render(<HowDoesItWork />);
  expect(screen.getByText("Como Funciona")).toBeInTheDocument();
});

test("renders all 4 step cards", () => {
  render(<HowDoesItWork />);
  expect(screen.getByText("Cadastre seu pet")).toBeInTheDocument();
  expect(screen.getByText("Explore o feed")).toBeInTheDocument();
  expect(screen.getByText("Avalie com confiança")).toBeInTheDocument();
  expect(screen.getByText("Entre em contato")).toBeInTheDocument();
});

test("renders all step descriptions", () => {
  render(<HowDoesItWork />);
  expect(
    screen.getByText(
      "Crie um perfil com informações como idade, raça, localização e histórico de saúde.",
    ),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "Encontre pets utilizando filtros como espécie, raça, idade e região.",
    ),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "Veja avaliações e informações detalhadas antes de tomar uma decisão.",
    ),
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      "Converse diretamente com o tutor e combine os detalhes com segurança.",
    ),
  ).toBeInTheDocument();
});

test("renders CTA section", () => {
  render(<HowDoesItWork />);
  expect(screen.getByText("Pronto para começar?")).toBeInTheDocument();
  expect(screen.getByText("Começar agora")).toBeInTheDocument();
});

test("navigates to /pagina-principal when button is clicked", () => {
  render(<HowDoesItWork />);
  fireEvent.click(screen.getByText("Começar agora"));
  expect(mockNavigate).toHaveBeenCalledWith("/pagina-principal");
});
