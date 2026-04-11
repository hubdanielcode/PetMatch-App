import { test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Welcome } from "@/shared/pages/modal/Welcome";

/* - Criando os mocks - */

const { mockGetUser, mockToggleHasSeenWelcome, mockNavigate } = vi.hoisted(
  () => ({
    mockGetUser: vi.fn(),
    mockToggleHasSeenWelcome: vi.fn(),
    mockNavigate: vi.fn(),
  }),
);

let mockLocationState: { screen?: number } | null = null;
let mockTutor: { has_seen_welcome: boolean } | null = null;
let mockIsLoading = false;
const mockGetTutors = vi.fn();

vi.mock("react-router-dom", () => ({
  useLocation: () => ({ state: mockLocationState }),
  useNavigate: () => mockNavigate,
}));

vi.mock("../../../../supabase/supabase", () => ({
  supabase: {
    auth: { getUser: mockGetUser },
  },
}));

vi.mock("@/features/pet-registration", () => ({
  useGetTutors: () => ({
    tutor: mockTutor,
    getTutors: mockGetTutors,
    isLoading: mockIsLoading,
  }),
}));

vi.mock("@/features/pet-registration/services/tutorService", () => ({
  toggleHasSeenWelcome: mockToggleHasSeenWelcome,
}));

vi.mock("@/shared/pages/modal/Modal", () => ({
  Modal: () => <div data-testid="modal">Modal</div>,
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockLocationState = null;
  mockTutor = null;
  mockIsLoading = false;
  mockGetUser.mockResolvedValue({ data: { user: { id: "user-1" } } });
  mockToggleHasSeenWelcome.mockResolvedValue(undefined);
});

/* - Testando Welcome - */

test("renders nothing while loading", () => {
  mockIsLoading = true;
  const { container } = render(<Welcome />);
  expect(container).toBeEmptyDOMElement();
});

test("renders Modal when tutor has already seen welcome", () => {
  mockTutor = { has_seen_welcome: true };
  render(<Welcome />);
  expect(screen.getByTestId("modal")).toBeInTheDocument();
});

test("renders Modal when screen is 2 from location state", () => {
  mockLocationState = { screen: 2 };
  render(<Welcome />);
  expect(screen.getByTestId("modal")).toBeInTheDocument();
});

test("renders welcome screen when tutor has not seen welcome", () => {
  mockTutor = { has_seen_welcome: false };
  render(<Welcome />);
  expect(
    screen.getByText("Cadastro realizado com sucesso! 🎉"),
  ).toBeInTheDocument();
});

test("renders all 3 steps", () => {
  mockTutor = { has_seen_welcome: false };
  render(<Welcome />);
  expect(screen.getByText("Conta criada com sucesso")).toBeInTheDocument();
  expect(screen.getByText("Cadastrar Pet")).toBeInTheDocument();
  expect(screen.getByText("Explorar Matches")).toBeInTheDocument();
});

test("renders progress bar text", () => {
  mockTutor = { has_seen_welcome: false };
  render(<Welcome />);
  expect(screen.getByText("1 de 3 completo")).toBeInTheDocument();
});

test("renders start button", () => {
  mockTutor = { has_seen_welcome: false };
  render(<Welcome />);
  expect(screen.getByText("Começar Agora")).toBeInTheDocument();
});

test("clicking start button calls toggleHasSeenWelcome and shows Modal", async () => {
  mockTutor = { has_seen_welcome: false };
  render(<Welcome />);
  fireEvent.click(screen.getByText("Começar Agora"));
  await waitFor(() => {
    expect(mockToggleHasSeenWelcome).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
});

test("calls getTutors with user id on mount", async () => {
  mockTutor = { has_seen_welcome: false };
  render(<Welcome />);
  await waitFor(() => {
    expect(mockGetTutors).toHaveBeenCalledWith("user-1");
  });
});
