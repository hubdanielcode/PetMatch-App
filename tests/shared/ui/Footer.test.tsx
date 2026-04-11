import { test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Footer } from "@/shared/ui/Footer";

/* - Criando os mocks - */

const mockScrollTo = vi.fn();

vi.mock("react-router-dom", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
  useLocation: () => ({
    pathname: "/pagina-teste",
  }),
}));

vi.mock("react-router-dom", () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  useLocation: () => ({
    pathname: "/pagina-teste",
  }),
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
  window.scrollTo = mockScrollTo;
});

/* - Testando o comportamento do Footer - */

test("renders PetMatch name", () => {
  render(<Footer />);
  expect(
    screen.getByRole("heading", { name: /petmatch/i }),
  ).toBeInTheDocument();
});

test("renders description text", () => {
  render(<Footer />);
  expect(
    screen.getByText(/conectando tutores para cruzamentos/i),
  ).toBeInTheDocument();
});

test("renders useful links", () => {
  render(<Footer />);

  expect(screen.getByText("Sobre Nós")).toBeInTheDocument();
  expect(screen.getByText("Como Funciona")).toBeInTheDocument();
  expect(screen.getByText("Termos de Uso")).toBeInTheDocument();
  expect(screen.getByText("Política de Privacidade")).toBeInTheDocument();
});

test("renders contact info", () => {
  render(<Footer />);

  expect(screen.getByText("contato@petmatch.com")).toBeInTheDocument();
  expect(screen.getByText("(99) 99999-9999")).toBeInTheDocument();
});

test("clicking any link scrolls to top", () => {
  render(<Footer />);

  const link = screen.getByText("Sobre Nós");

  fireEvent.click(link);

  expect(mockScrollTo).toHaveBeenCalledWith({
    top: 0,
    behavior: "smooth",
  });
});

test("renders current year", () => {
  render(<Footer />);

  const year = new Date().getFullYear();

  expect(screen.getByText(new RegExp(year.toString()))).toBeInTheDocument();
});
