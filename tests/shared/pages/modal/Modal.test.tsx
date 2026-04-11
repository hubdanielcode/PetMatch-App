import { test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "@/shared";

/* - Criando os mocks - */

const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Testando Modal - */

test("renders welcome title", () => {
  render(<Modal />);
  expect(screen.getByText("Bem-vindo ao PetMatch!")).toBeInTheDocument();
});

test("renders subtitle", () => {
  render(<Modal />);
  expect(
    screen.getByText("Explore as nossas funcionalidades!"),
  ).toBeInTheDocument();
});

test("renders cadastrar pet option", () => {
  render(<Modal />);
  expect(screen.getByText("Cadastrar Pet")).toBeInTheDocument();
});

test("renders explorar feed option", () => {
  render(<Modal />);
  expect(screen.getByText("Explorar o Feed")).toBeInTheDocument();
});

test("renders tip section", () => {
  render(<Modal />);
  expect(screen.getByText("💡 Dica")).toBeInTheDocument();
});

test("clicking cadastrar pet navigates to /registrar-pet", () => {
  render(<Modal />);
  fireEvent.click(screen.getByText("Cadastrar Pet").closest("div")!);
  expect(mockNavigate).toHaveBeenCalledWith("/registrar-pet", {
    replace: true,
    state: { from: "/bem-vindo", fromScreen: 2 },
  });
});

test("clicking explorar feed navigates to /pagina-principal", () => {
  render(<Modal />);
  fireEvent.click(screen.getByText("Explorar o Feed").closest("div")!);
  expect(mockNavigate).toHaveBeenCalledWith("/pagina-principal", {
    replace: true,
  });
});
