import { test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "@/shared/ui/Header";
import userEvent from "@testing-library/user-event";

/* - Criando os mocks - */

const { mockNavigate, mockGetUser, mockSignOut } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockGetUser: vi.fn(),
  mockSignOut: vi.fn(),
}));

let mockTutor: { name: string; photo_url: string | null } | null = null;
const mockGetTutors = vi.fn();
let mockTheme = "Light";
const mockToggleTheme = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

vi.mock("../../../supabase/supabase", () => ({
  supabase: {
    auth: {
      getUser: mockGetUser,
      signOut: mockSignOut,
    },
  },
}));

vi.mock("@/features/pet-registration", () => ({
  useGetTutors: () => ({
    getTutors: mockGetTutors,
    tutor: mockTutor,
  }),
}));

vi.mock("@/shared/hooks/theme/useTheme", () => ({
  useTheme: () => ({
    theme: mockTheme,
    toggleTheme: mockToggleTheme,
  }),
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

/* - Limpando os Mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
  mockTutor = null;
  mockTheme = "Light";
  mockGetUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
});

/* - Testando Header - */

test("renders PetMatch link", () => {
  render(<Header />);
  expect(screen.getByText("PetMatch")).toBeInTheDocument();
});

test("renders the 'cadastrar pet' button", () => {
  render(<Header />);
  expect(
    screen.getByRole("button", { name: /cadastrar pet/i }),
  ).toBeInTheDocument();
});

test("clicking 'cadastrar pet' navigates to /registrar-pet", () => {
  render(<Header />);
  fireEvent.click(screen.getByRole("button", { name: /cadastrar pet/i }));

  expect(mockNavigate).toHaveBeenCalledWith("/registrar-pet", {
    replace: true,
    state: { from: "/pagina-principal" },
  });
});

test("renders tutor name when tutor is loaded", () => {
  mockTutor = { name: "João", photo_url: null };
  render(<Header />);
  expect(screen.getByText("João")).toBeInTheDocument();
});

test("renders tutor initial when no photo", () => {
  mockTutor = { name: "João", photo_url: null };
  render(<Header />);
  expect(screen.getByText("J")).toBeInTheDocument();
});

test("opens dropdown menu when avatar is clicked", () => {
  render(<Header />);

  fireEvent.click(screen.getByLabelText("Abrir menu do usuário"));

  expect(screen.getByText("Meu Perfil")).toBeInTheDocument();
  expect(screen.getByText("Sair")).toBeInTheDocument();
});

test("clicking Meu Perfil navigates to /perfil", () => {
  render(<Header />);

  fireEvent.click(screen.getByLabelText("Abrir menu do usuário"));
  fireEvent.click(screen.getByText("Meu Perfil"));

  expect(mockNavigate).toHaveBeenCalledWith("/perfil");
});

test("clicking Sair calls supabase signOut", async () => {
  const user = userEvent.setup();

  render(<Header />);

  await user.click(screen.getByLabelText(/abrir menu do usuário/i));
  await user.click(screen.getByText("Sair"));

  expect(mockSignOut).toHaveBeenCalled();
});

test("shows 'Tema Escuro' option when theme is Light", () => {
  mockTheme = "Light";
  render(<Header />);

  fireEvent.click(screen.getByLabelText("Abrir menu do usuário"));

  expect(screen.getByText("Tema Escuro")).toBeInTheDocument();
});

test("shows 'Tema Claro' option when theme is Dark", () => {
  mockTheme = "Dark";
  render(<Header />);

  fireEvent.click(screen.getByLabelText("Abrir menu do usuário"));

  expect(screen.getByText("Tema Claro")).toBeInTheDocument();
});

test("clicking theme option calls toggleTheme", () => {
  render(<Header />);

  fireEvent.click(screen.getByLabelText("Abrir menu do usuário"));
  fireEvent.click(screen.getByText(/tema/i));

  expect(mockToggleTheme).toHaveBeenCalled();
});
