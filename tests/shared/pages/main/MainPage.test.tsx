import { test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MainPage } from "@/shared/pages/main/MainPage";

/* - Mockando react-router-dom - */

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ state: null }),
}));

/* - Mockando hooks e componentes - */

const mockGetPets = vi.fn();
let mockPets: object[] = [];
let mockContext: {
  species: string;
  breed: string;
  mated: boolean | null;
  city: string;
  minAge: string;
  maxAge: string;
} = {
  species: "",
  breed: "",
  mated: null,
  city: "",
  minAge: "",
  maxAge: "",
};

vi.mock("@/features/pet-registration/hooks/pet-hooks/useGetAllPets", () => ({
  useGetAllPets: () => ({
    getPets: mockGetPets,
    newPet: mockPets,
    isLoading: false,
    getAllPetsError: "",
  }),
}));

vi.mock("@/features/pet-registration", () => ({
  useRegistrationContext: () => mockContext,
}));

vi.mock("@/shared/pages/main/PetFeed", () => ({
  PetFeed: ({ pets }: { pets: object[] }) => (
    <div data-testid="pet-feed">pets: {pets.length}</div>
  ),
}));

vi.mock("@/shared/pages/main/PetFilter", () => ({
  PetFilter: () => <div data-testid="pet-filter">filtro</div>,
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockPets = [];
  mockContext = {
    species: "",
    breed: "",
    mated: null,
    city: "",
    minAge: "",
    maxAge: "",
  };
});

const fakePet = {
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

/* - Testando MainPage - */

test("renders title and subtitle", () => {
  render(<MainPage />);
  expect(screen.getByText("Feed de Pets")).toBeInTheDocument();
  expect(
    screen.getByText("Encontre o match perfeito para o seu pet!"),
  ).toBeInTheDocument();
});

test("renders PetFilter and PetFeed", () => {
  render(<MainPage />);
  expect(screen.getByTestId("pet-filter")).toBeInTheDocument();
  expect(screen.getByTestId("pet-feed")).toBeInTheDocument();
});

test("calls getPets on mount", () => {
  render(<MainPage />);
  expect(mockGetPets).toHaveBeenCalledTimes(1);
});

test("renders all pets when no filters are applied", () => {
  mockPets = [fakePet, { ...fakePet, id: "pet-2", name: "Mel" }];
  render(<MainPage />);
  expect(screen.getByText("pets: 2")).toBeInTheDocument();
});

test("filters by species", () => {
  mockPets = [fakePet, { ...fakePet, id: "pet-2", species: "cat" }];
  mockContext = { ...mockContext, species: "dog" };
  render(<MainPage />);
  expect(screen.getByText("pets: 1")).toBeInTheDocument();
});

test("filters by breed", () => {
  mockPets = [fakePet, { ...fakePet, id: "pet-2", breed: "poodle" }];
  mockContext = { ...mockContext, breed: "labrador" };
  render(<MainPage />);
  expect(screen.getByText("pets: 1")).toBeInTheDocument();
});

test("filters by mated", () => {
  mockPets = [fakePet, { ...fakePet, id: "pet-2", mated: true }];
  mockContext = { ...mockContext, mated: false };
  render(<MainPage />);
  expect(screen.getByText("pets: 1")).toBeInTheDocument();
});

test("filters by city", () => {
  mockPets = [
    fakePet,
    { ...fakePet, id: "pet-2", city: "Recife", state: "PE" },
  ];
  mockContext = { ...mockContext, city: "Salvador" };
  render(<MainPage />);
  expect(screen.getByText("pets: 1")).toBeInTheDocument();
});

test("filters by minAge", () => {
  mockPets = [fakePet, { ...fakePet, id: "pet-2", age: "48" }];
  mockContext = { ...mockContext, minAge: "3" };
  render(<MainPage />);
  expect(screen.getByText("pets: 1")).toBeInTheDocument();
});

test("filters by maxAge", () => {
  mockPets = [fakePet, { ...fakePet, id: "pet-2", age: "6" }];
  mockContext = { ...mockContext, maxAge: "1" };
  render(<MainPage />);
  expect(screen.getByText("pets: 1")).toBeInTheDocument();
});
