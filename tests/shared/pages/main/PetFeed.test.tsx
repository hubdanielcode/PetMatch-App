import { test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PetFeed } from "@/shared/pages/main/PetFeed";
import type { Pet } from "@/features/pet-registration/types/pet";

/* - Criando os mocks - */

const { mockNavigate, mockGetTutors } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  mockGetTutors: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("@/features/pet-registration/services/tutorService", () => ({
  getTutors: mockGetTutors,
}));

vi.mock("@/shared/ui/FeedCard", () => ({
  FeedCard: ({
    pet,
    onClick,
  }: {
    pet: Pet;
    index: number;
    onClick: () => void;
  }) => (
    <div
      data-testid={`feed-card-${pet.id}`}
      onClick={onClick}
    >
      {pet.name}
    </div>
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const fakePet: Pet = {
  id: "pet-1",
  user_id: "user-1",
  photo_url: "",
  name: "Rex",
  species: "dog",
  gender: "male",
  breed: "labrador",
  age: "24",
  mated: false,
  pedigree: null,
  cryptorchidism_bilateral: null,
  cryptorchidism_unilateral: null,
  vaccinated: null,
  created_at: "2024-01-01",
  city: "Salvador",
  state: "BA",
};

/* - Testando PetFeed - */

test("renders singular count when there is 1 pet", () => {
  render(<PetFeed pets={[fakePet]} />);
  expect(screen.getByText(/1 Animal Encontrado/)).toBeInTheDocument();
});

test("renders plural count when there are multiple pets", () => {
  render(
    <PetFeed pets={[fakePet, { ...fakePet, id: "pet-2", name: "Mel" }]} />,
  );
  expect(screen.getByText(/2 Animais Encontrados/)).toBeInTheDocument();
});

test("renders zero pets count", () => {
  render(<PetFeed pets={[]} />);
  expect(screen.getByText(/0 Animais Encontrados/)).toBeInTheDocument();
});

test("renders a card for each pet", () => {
  render(
    <PetFeed pets={[fakePet, { ...fakePet, id: "pet-2", name: "Mel" }]} />,
  );
  expect(screen.getByTestId("feed-card-pet-1")).toBeInTheDocument();
  expect(screen.getByTestId("feed-card-pet-2")).toBeInTheDocument();
});

test("navigates to /perfil-pet with pet and tutor on card click", async () => {
  const fakeTutor = { id: "tutor-1", name: "João" };
  mockGetTutors.mockResolvedValue(fakeTutor);

  render(<PetFeed pets={[fakePet]} />);
  fireEvent.click(screen.getByTestId("feed-card-pet-1"));

  await waitFor(() => {
    expect(mockGetTutors).toHaveBeenCalledWith("user-1");
    expect(mockNavigate).toHaveBeenCalledWith("/perfil-pet", {
      state: { pet: fakePet, tutor: fakeTutor },
    });
  });
});
