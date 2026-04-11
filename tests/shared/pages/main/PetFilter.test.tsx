import { test, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PetFilter } from "@/shared/pages/main/PetFilter";

/* - Criando os mocks - */

const {
  mockSetSpecies,
  mockSetBreed,
  mockSetMinAge,
  mockSetMaxAge,
  mockSetMated,
  mockSetCity,
  mockSetState,
} = vi.hoisted(() => ({
  mockSetSpecies: vi.fn(),
  mockSetBreed: vi.fn(),
  mockSetMinAge: vi.fn(),
  mockSetMaxAge: vi.fn(),
  mockSetMated: vi.fn(),
  mockSetCity: vi.fn(),
  mockSetState: vi.fn(),
}));

let mockContext = {
  species: "",
  breed: "",
  mated: null as boolean | null,
  minAge: "",
  maxAge: "",
  setSpecies: mockSetSpecies,
  setBreed: mockSetBreed,
  setMinAge: mockSetMinAge,
  setMaxAge: mockSetMaxAge,
  setMated: mockSetMated,
  setCity: mockSetCity,
  setState: mockSetState,
};

vi.mock("@/features/pet-registration", () => ({
  useRegistrationContext: () => mockContext,
}));

vi.mock("@/shared/utils/registerPetOptions", () => ({
  speciesOptions: [
    { value: "dog", label: "Cachorro" },
    { value: "cat", label: "Gato" },
  ],
  matedOptions: [
    { value: "true", label: "Já Cruzou" },
    { value: "false", label: "Primeira Vez" },
  ],
}));

beforeEach(() => {
  vi.clearAllMocks();
  mockContext = {
    species: "",
    breed: "",
    mated: null,
    minAge: "",
    maxAge: "",
    setSpecies: mockSetSpecies,
    setBreed: mockSetBreed,
    setMinAge: mockSetMinAge,
    setMaxAge: mockSetMaxAge,
    setMated: mockSetMated,
    setCity: mockSetCity,
    setState: mockSetState,
  };
});

/* - Testando PetFilter - */

test("renders all filter labels", () => {
  render(<PetFilter />);
  expect(screen.getByText("Filtros")).toBeInTheDocument();
  expect(screen.getByText("Espécies")).toBeInTheDocument();
  expect(screen.getByText("Raça")).toBeInTheDocument();
  expect(screen.getByText("Idade (Anos)")).toBeInTheDocument();
  expect(screen.getByText("Experiência")).toBeInTheDocument();
  expect(screen.getByText("Região")).toBeInTheDocument();
});

test("renders clear filters button", () => {
  render(<PetFilter />);
  expect(screen.getByText("Limpar Filtros")).toBeInTheDocument();
});

test("typing in breed input calls setBreed", () => {
  render(<PetFilter />);
  fireEvent.change(screen.getByPlaceholderText("Filtrar por Raça"), {
    target: { value: "labrador" },
  });
  expect(mockSetBreed).toHaveBeenCalledWith("labrador");
});

test("typing in min age input calls setMinAge", () => {
  render(<PetFilter />);
  fireEvent.change(screen.getByPlaceholderText("Min"), {
    target: { value: "2" },
  });
  expect(mockSetMinAge).toHaveBeenCalled();
});

test("typing in max age input calls setMaxAge", () => {
  render(<PetFilter />);
  fireEvent.change(screen.getByPlaceholderText("Max"), {
    target: { value: "5" },
  });
  expect(mockSetMaxAge).toHaveBeenCalled();
});

test("typing in region input calls setCity and setState", () => {
  render(<PetFilter />);
  fireEvent.change(screen.getByPlaceholderText("Ex: Salvador ou BA"), {
    target: { value: "Salvador" },
  });
  expect(mockSetCity).toHaveBeenCalledWith("Salvador");
  expect(mockSetState).toHaveBeenCalledWith("Salvador");
});

test("clicking species input opens species dropdown", () => {
  render(<PetFilter />);
  fireEvent.click(screen.getByPlaceholderText("Filtrar por Espécie"));
  expect(screen.getByText("Cachorro")).toBeInTheDocument();
  expect(screen.getByText("Gato")).toBeInTheDocument();
});

test("selecting a species calls setSpecies and closes dropdown", () => {
  render(<PetFilter />);
  fireEvent.click(screen.getByPlaceholderText("Filtrar por Espécie"));
  fireEvent.click(screen.getByText("Cachorro"));
  expect(mockSetSpecies).toHaveBeenCalledWith("dog");
  expect(mockSetBreed).toHaveBeenCalledWith("");
});

test("clicking mated input opens mated dropdown", () => {
  render(<PetFilter />);
  fireEvent.click(screen.getByPlaceholderText("Todas"));
  expect(screen.getByText("Já Cruzou")).toBeInTheDocument();
  expect(screen.getByText("Primeira Vez")).toBeInTheDocument();
});

test("selecting mated option calls setMated", () => {
  render(<PetFilter />);
  fireEvent.click(screen.getByPlaceholderText("Todas"));
  fireEvent.click(screen.getByText("Já Cruzou"));
  expect(mockSetMated).toHaveBeenCalledWith(true);
});

test("clear filters button resets all fields", () => {
  render(<PetFilter />);
  fireEvent.click(screen.getByText("Limpar Filtros"));
  expect(mockSetSpecies).toHaveBeenCalledWith("");
  expect(mockSetBreed).toHaveBeenCalledWith("");
  expect(mockSetMinAge).toHaveBeenCalledWith("");
  expect(mockSetMaxAge).toHaveBeenCalledWith("");
  expect(mockSetMated).toHaveBeenCalledWith(null);
});
