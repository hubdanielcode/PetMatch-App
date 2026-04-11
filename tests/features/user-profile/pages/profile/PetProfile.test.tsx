import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, test, expect, beforeEach } from "vitest";
import { PetProfile } from "@/features/user-profile";

/* - Criando os Mocks hoistados - */

const {
  mockGetAnamnese,
  mockGetComments,
  mockUpdateComment,
  mockCreateComment,
  mockDeleteComment,
  mockGetTutors,
  mockNavigate,
  mockLocation,
  mockTutor,
  mockAnamnese,
} = vi.hoisted(() => ({
  mockGetAnamnese: vi.fn(),
  mockGetComments: vi.fn(),
  mockUpdateComment: vi.fn(),
  mockCreateComment: vi.fn(),
  mockDeleteComment: vi.fn(),
  mockGetTutors: vi.fn(),
  mockNavigate: vi.fn(),
  mockLocation: {
    state: {
      pet: {
        id: "pet-123",
        user_id: "user-456",
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
        city: "Salvador",
        state: "BA",
      },
    },
  },
  mockTutor: {
    id: "tutor-123",
    user_id: "user-456",
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
  mockAnamnese: {
    id: "anamnese-123",
    pet_id: "pet-123",
    feeding_info: "Ração premium duas vezes ao dia",
    walks_info: "Dois passeios diários",
    behavior_info: "Muito dócil e brincalhão",
    surgeries_info: "Nenhuma cirurgia",
    diseases_info: "Nenhuma doença",
    testicles_info: null,
    reproduction_info: null,
  },
}));

vi.mock(
  "@/features/pet-registration/hooks/anamnese-hooks/useGetAnamnese",
  () => ({
    useGetAnamnese: () => ({
      newAnamnese: mockAnamnese,
      getAnamnese: mockGetAnamnese,
    }),
  }),
);

vi.mock("@/features/user-profile/hooks/useGetComments", () => ({
  useGetComments: () => ({
    comments: [
      {
        id: "comment-123",
        user_id: "user-123",
        pet_id: "pet-123",
        name: "Maria Souza",
        rating: 5,
        text: "Ótimo pet!",
        created_at: "2024-01-01T00:00:00Z",
      },
    ],
    getComments: mockGetComments,
  }),
}));

vi.mock("@/features/user-profile/hooks/useUpdateComment", () => ({
  useUpdateComment: () => ({ updateComment: mockUpdateComment }),
}));

vi.mock("@/features/user-profile/hooks/useCreateComment", () => ({
  useCreateComment: () => ({ createComment: mockCreateComment }),
}));

vi.mock("@/features/user-profile/services/commentService", () => ({
  deleteComment: mockDeleteComment,
}));

vi.mock("@/features/pet-registration/services/tutorService", () => ({
  getTutors: mockGetTutors,
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
}));

vi.mock("@/shared", () => ({
  Badges: () => <div data-testid="badges" />,
}));

vi.mock("@/shared/ui/StarRating", () => ({
  StarRating: () => <div data-testid="star-rating" />,
}));

vi.mock("../../../../supabase/supabase", () => ({
  supabase: {
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: {
            id: "user-123",
            user_metadata: { firstName: "João", lastName: "Silva" },
          },
        },
      }),
    },
  },
}));

vi.mock("@/features/pet-registration/pages/anamnese/AnamneseTesticles", () => ({
  TesticleOptions: [],
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  mockGetAnamnese.mockReset().mockResolvedValue({});
  mockGetComments.mockReset().mockResolvedValue({});
  mockGetTutors.mockReset().mockResolvedValue(mockTutor);
  mockCreateComment.mockReset().mockResolvedValue({});
  mockUpdateComment.mockReset().mockResolvedValue({});
  mockDeleteComment.mockReset().mockResolvedValue({});
  mockNavigate.mockReset();
});

/* - Criando a função de renderizar o componente - */

const renderComponent = () => render(<PetProfile />);

/* - Testando a renderização inicial - */

test("renders the pet name", () => {
  renderComponent();
  expect(screen.getByText("Rex")).toBeInTheDocument();
});

test("renders the pet breed, gender and age", () => {
  renderComponent();
  expect(screen.getByText(/Labrador/)).toBeInTheDocument();
  expect(screen.getByText(/Macho/)).toBeInTheDocument();
});

test("renders the pet photo", () => {
  renderComponent();
  expect(screen.getByAltText("Rex")).toBeInTheDocument();
});

test("renders the tutor info section", () => {
  renderComponent();
  expect(screen.getByText("Informações do Tutor")).toBeInTheDocument();
});

test("renders the anamnese section", () => {
  renderComponent();
  expect(screen.getByText("Resumo da Anamnese")).toBeInTheDocument();
});

test("renders the anamnese feeding info", () => {
  renderComponent();
  expect(
    screen.getByText("Ração premium duas vezes ao dia"),
  ).toBeInTheDocument();
});

test("renders the comments section", () => {
  renderComponent();
  expect(screen.getByText(/Avaliações/)).toBeInTheDocument();
});

test("renders existing comments", () => {
  renderComponent();
  expect(screen.getByText("Maria Souza")).toBeInTheDocument();
  expect(screen.getByText("Ótimo pet!")).toBeInTheDocument();
});

test("renders the Voltar button", () => {
  renderComponent();
  expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();
});

test("renders the Avaliar button when user is not the pet owner", () => {
  renderComponent();
  expect(screen.getByRole("button", { name: /avaliar/i })).toBeInTheDocument();
});

test("renders the contact button", () => {
  renderComponent();
  expect(screen.getByText(/Entrar em Contato/i)).toBeInTheDocument();
});

/* - Testando a navegação - */

test("navigates to /pagina-principal when clicking Voltar", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: /voltar/i }));
  expect(mockNavigate).toHaveBeenCalledWith("/pagina-principal", {
    replace: true,
  });
});

/* - Testando o formulário de avaliação - */

test("opens rating form when clicking Avaliar", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: /avaliar/i }));
  expect(
    screen.getByPlaceholderText("Compartilhe a sua experiência..."),
  ).toBeInTheDocument();
});

test("closes rating form when clicking Cancelar", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: /avaliar/i }));
  await userEvent.click(screen.getByRole("button", { name: /cancelar/i }));
  expect(
    screen.queryByPlaceholderText("Compartilhe a sua experiência..."),
  ).not.toBeInTheDocument();
});

test("shows error when submitting comment without rating", async () => {
  renderComponent();
  await userEvent.click(screen.getByRole("button", { name: /avaliar/i }));
  await userEvent.click(
    screen.getByRole("button", { name: /enviar avaliação/i }),
  );
  expect(screen.getByText("Adicione uma avaliação!")).toBeInTheDocument();
});

/* - Testando os dados iniciais - */

test("calls getAnamnese on mount", async () => {
  renderComponent();
  await waitFor(() => expect(mockGetAnamnese).toHaveBeenCalledWith("pet-123"));
});

test("calls getComments on mount", async () => {
  renderComponent();
  await waitFor(() => expect(mockGetComments).toHaveBeenCalledWith("pet-123"));
});

test("calls getTutors on mount", async () => {
  renderComponent();
  await waitFor(() => expect(mockGetTutors).toHaveBeenCalled());
});

/* - Testando a deleção de comentário - */

test("calls deleteComment and refreshes comments when deleting", async () => {
  renderComponent();
  const deleteButton = await screen.findByTestId("delete-comment-button");
  await userEvent.click(deleteButton);
  await waitFor(() =>
    expect(mockDeleteComment).toHaveBeenCalledWith("comment-123"),
  );
  await waitFor(() => expect(mockGetComments).toHaveBeenCalledTimes(2));
});
