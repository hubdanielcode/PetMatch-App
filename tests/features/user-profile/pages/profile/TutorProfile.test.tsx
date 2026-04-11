import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, test, expect, beforeEach } from "vitest";
import { TutorProfile } from "@/features/user-profile";

/* - Criando os Mocks hoistados - */

const { mockGetUser } = vi.hoisted(() => ({
  mockGetUser: vi.fn(),
}));

/* - Mock do supabase - */

vi.mock("../../../../../supabase/supabase", () => ({
  supabase: {
    auth: {
      getUser: mockGetUser,
    },
  },
}));

/* - Mock dos componentes filhos - */

vi.mock("@/features/user-profile/pages/profile/PetInfo", () => ({
  PetInfo: () => <div data-testid="pet-info">PetInfo</div>,
}));

vi.mock("@/features/user-profile/pages/profile/TutorInfo", () => ({
  TutorInfo: ({ user_id }: { user_id: string }) => (
    <div data-testid="tutor-info">{user_id}</div>
  ),
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  mockGetUser.mockResolvedValue({
    data: { user: { id: "user-123" } },
  });
});

/* - Helper de render - */

const renderComponent = () => render(<TutorProfile />);

/* - Testes - */

test("renders the profile title", () => {
  renderComponent();
  expect(screen.getByText("Meu Perfil")).toBeInTheDocument();
});

test("renders the Tutor tab by default", async () => {
  renderComponent();
  await waitFor(() => {
    expect(screen.getByTestId("tutor-info")).toBeInTheDocument();
  });
});

test("renders user_id in TutorInfo after loading user", async () => {
  renderComponent();
  await waitFor(() => {
    expect(screen.getByText("user-123")).toBeInTheDocument();
  });
});

test("switches to Pets tab when clicking Meus Pets", async () => {
  renderComponent();
  const user = userEvent.setup();
  await user.click(screen.getByText("Meus Pets"));
  expect(screen.getByTestId("pet-info")).toBeInTheDocument();
});

test("switches back to Tutor tab when clicking Minhas Informações", async () => {
  renderComponent();
  const user = userEvent.setup();
  await user.click(screen.getByText("Meus Pets"));
  await user.click(screen.getByText("Minhas Informações"));
  expect(screen.getByTestId("tutor-info")).toBeInTheDocument();
});

test("calls supabase.getUser on mount", async () => {
  renderComponent();
  await waitFor(() => {
    expect(mockGetUser).toHaveBeenCalled();
  });
});
