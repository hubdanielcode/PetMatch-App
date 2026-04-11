import { test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TermsOfUse } from "@/shared";

/* - Mockando react-router-dom - */

const mockNavigate = vi.fn();
let mockLocationState: { from?: string } | null = null;

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: mockLocationState }),
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockLocationState = null;
});

/* - Testando TermsOfUse - */

test("renders main title", () => {
  render(<TermsOfUse />);
  expect(screen.getByText("Termos de Uso")).toBeInTheDocument();
});

test("renders important notice", () => {
  render(<TermsOfUse />);
  expect(screen.getByText("Importante")).toBeInTheDocument();
});

test("renders all 9 section titles", () => {
  render(<TermsOfUse />);
  expect(screen.getByText("1. Aceitação dos Termos")).toBeInTheDocument();
  expect(screen.getByText("2. Descrição do Serviço")).toBeInTheDocument();
  expect(
    screen.getByText("3. Responsabilidades do Usuário"),
  ).toBeInTheDocument();
  expect(screen.getByText("4. Conteúdo do Usuário")).toBeInTheDocument();
  expect(
    screen.getByText("5. Limitação de Responsabilidade"),
  ).toBeInTheDocument();
  expect(screen.getByText("6. Proibições")).toBeInTheDocument();
  expect(screen.getByText("7. Suspensão e Cancelamento")).toBeInTheDocument();
  expect(screen.getByText("8. Modificações dos Termos")).toBeInTheDocument();
  expect(screen.getByText("9. Lei Aplicável")).toBeInTheDocument();
});

test("renders confirm button", () => {
  render(<TermsOfUse />);
  expect(screen.getByText("Entendi !")).toBeInTheDocument();
});

test("navigates to state.from when button is clicked", () => {
  mockLocationState = { from: "/cadastro" };
  render(<TermsOfUse />);
  fireEvent.click(screen.getByText("Entendi !"));
  expect(mockNavigate).toHaveBeenCalledWith("/cadastro");
});

test("navigates to / when state.from is not defined", () => {
  mockLocationState = null;
  render(<TermsOfUse />);
  fireEvent.click(screen.getByText("Entendi !"));
  expect(mockNavigate).toHaveBeenCalledWith("/");
});
