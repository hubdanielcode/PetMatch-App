import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, test, expect, beforeEach } from "vitest";
import { PetInfo } from "@/features/user-profile";

/* - Criando os Mocks hoistados - */

const {
  mockGetPets,
  mockGetTutors,
  mockDeletePet,
  mockNavigate,
  mockPets,
  mockTutor,
} = vi.hoisted(() => ({
  mockGetPets: vi.fn(),
  mockGetTutors: vi.fn(),
  mockDeletePet: vi.fn(),
  mockNavigate: vi.fn(),
  mockPets: [
    {
      id: "pet-123",
      user_id: "user-123",
      photo_url: "https://example.com/pet.jpg",
      name: "Rex",
      species: "Cachorro",
      gender: "Macho",
      breed: "Labrador",
      age: "24",
      mated: false,
      pedigree: false,
      cryptorchidism_bilateral: false,
      cryptorchidism_unilateral: false,
      vaccinated: true,
      created_at: "2024-01-01T00:00:00Z",
    },
    {
      id: "pet-456",
      user_id: "user-123",
      photo_url: "https://example.com/pet2.jpg",
      name: "Mia",
      species: "Gato",
      gender: "Fêmea",
      breed: "Siamês",
      age: "12",
      mated: false,
      pedigree: true,
      cryptorchidism_bilateral: false,
      cryptorchidism_unilateral: false,
      vaccinated: false,
      created_at: "2024-01-02T00:00:00Z",
    },
  ],
  mockTutor: {
    id: "tutor-123",
    user_id: "user-123",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(71) 99999-9999",
    street: "Rua das Flores",
    number: "123",
    complement: "",
    neighborhood: "Centro",
    city: "Salvador",
    state: "BA",
    photo_url: null,
    has_seen_welcome: false,
    created_at: "2024-01-01T00:00:00Z",
    validated_at: null,
  },
}));

vi.mock("@/features/pet-registration", () => ({
  useGetPets: () => ({
    getPets: mockGetPets,
    pets: mockPets,
    isLoading: false,
  }),
  useGetTutors: () => ({ getTutors: mockGetTutors, tutor: mockTutor }),
}));

vi.mock("@/features/pet-registration/services/petService", () => ({
  deletePet: mockDeletePet,
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
    img: ({ ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      <img {...props} />
    ),
  },
}));

vi.mock("@/shared/ui/Badges", () => ({
  Badges: () => <div data-testid="badges" />,
}));

vi.mock("../../../../supabase/supabase", () => ({
  supabase: {
    auth: {
      getUser: vi
        .fn()
        .mockResolvedValue({ data: { user: { id: "user-123" } } }),
    },
  },
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
  mockGetPets.mockResolvedValue({});
  mockGetTutors.mockResolvedValue({});
  mockDeletePet.mockResolvedValue({});
});

/* - Criando a função de renderizar o componente - */

const renderComponent = () => render(<PetInfo />);

/* - Testando a renderização inicial - */

test("renders the section title", () => {
  renderComponent();
  expect(screen.getByText("Meus Pets Cadastrados")).toBeInTheDocument();
});

test("renders the Cadastrar Pet button", () => {
  renderComponent();
  expect(
    screen.getByRole("button", { name: /cadastrar pet/i }),
  ).toBeInTheDocument();
});

test("calls getPets on mount", async () => {
  renderComponent();
  await waitFor(() => expect(mockGetPets).toHaveBeenCalled());
});

/* - Testando a lista de pets - */

test("renders the pet list when pets exist", async () => {
  renderComponent();
  await waitFor(() => {
    expect(screen.getByText("Rex")).toBeInTheDocument();
    expect(screen.getByText("Mia")).toBeInTheDocument();
  });
});

test("renders Ver Perfil buttons for each pet", async () => {
  renderComponent();
  await waitFor(() => {
    const buttons = screen.getAllByRole("button", { name: /ver perfil/i });
    expect(buttons).toHaveLength(2);
  });
});

test("renders delete buttons for each pet", async () => {
  renderComponent();
  await waitFor(() => {
    const deleteButtons = screen.getAllByRole("button", { name: "" });
    expect(deleteButtons.length).toBeGreaterThanOrEqual(2);
  });
});

/* - Testando a navegação - */

test("navigates to /registrar-pet when clicking Cadastrar Pet", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: /cadastrar pet/i }));
  expect(mockNavigate).toHaveBeenCalledWith("/registrar-pet", {
    state: { from: "/perfil" },
  });
});

test("navigates to /perfil-pet when clicking Ver Perfil", async () => {
  renderComponent();
  await waitFor(() => screen.getAllByRole("button", { name: /ver perfil/i }));
  await userEvent.click(
    screen.getAllByRole("button", { name: /ver perfil/i })[0],
  );
  expect(mockNavigate).toHaveBeenCalledWith(
    "/perfil-pet",
    expect.objectContaining({
      state: expect.objectContaining({ pet: mockPets[0] }),
    }),
  );
});

/* - Testando a deleção de pet - */

test("calls deletePet with the correct id when clicking delete", async () => {
  renderComponent();
  await waitFor(() => screen.getAllByRole("button", { name: "" }));
  const deleteButtons = screen.getAllByRole("button", { name: "" });
  await userEvent.click(deleteButtons[0]);
  await waitFor(() => expect(mockDeletePet).toHaveBeenCalledWith("pet-123"));
});

test("calls getPets again after deleting a pet", async () => {
  renderComponent();
  await waitFor(() => screen.getAllByRole("button", { name: "" }));
  const deleteButtons = screen.getAllByRole("button", { name: "" });
  await userEvent.click(deleteButtons[0]);
  await waitFor(() => expect(mockGetPets).toHaveBeenCalledTimes(2));
});
