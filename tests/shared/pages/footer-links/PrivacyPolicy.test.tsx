import { test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PrivacyPolicy } from "@/shared";

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

/* - Testando PrivacyPolicy - */

test("renders main title", () => {
  render(<PrivacyPolicy />);
  expect(screen.getByText("Política de Privacidade")).toBeInTheDocument();
});

test("renders all 9 section titles", () => {
  render(<PrivacyPolicy />);
  expect(screen.getByText("1. Informações Coletadas")).toBeInTheDocument();
  expect(
    screen.getByText("2. Como Usamos suas Informações"),
  ).toBeInTheDocument();
  expect(screen.getByText("3. Compartilhamento de Dados")).toBeInTheDocument();
  expect(screen.getByText("4. Segurança dos Dados")).toBeInTheDocument();
  expect(screen.getByText("5. Seus Direitos")).toBeInTheDocument();
  expect(screen.getByText("6. Cookies")).toBeInTheDocument();
  expect(screen.getByText("7. Retenção de Dados")).toBeInTheDocument();
  expect(screen.getByText("8. Menores de Idade")).toBeInTheDocument();
  expect(screen.getByText("9. Alterações nesta Política")).toBeInTheDocument();
});

test("renders important data warning", () => {
  render(<PrivacyPolicy />);
  expect(
    screen.getByText("Importante: Nunca vendemos seus dados pessoais."),
  ).toBeInTheDocument();
});

test("renders confirm button", () => {
  render(<PrivacyPolicy />);
  expect(screen.getByText("Entendi !")).toBeInTheDocument();
});

test("navigates to state.from when button is clicked", () => {
  mockLocationState = { from: "/cadastro" };
  render(<PrivacyPolicy />);
  fireEvent.click(screen.getByText("Entendi !"));
  expect(mockNavigate).toHaveBeenCalledWith("/cadastro");
});

test("navigates to / when state.from is not defined", () => {
  mockLocationState = null;
  render(<PrivacyPolicy />);
  fireEvent.click(screen.getByText("Entendi !"));
  expect(mockNavigate).toHaveBeenCalledWith("/");
});
