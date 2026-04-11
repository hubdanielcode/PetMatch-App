import { renderHook, act } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { getAllPets as getAllPetsService } from "@/features/pet-registration/services/petService";
import { useGetAllPets } from "@/features/pet-registration/hooks/pet-hooks/useGetAllPets";

/* - Criando os Mocks - */

vi.mock("@/features/pet-registration/services/petService", () => ({
  getAllPets: vi.fn(),
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando os objetos fake para evitar repetições - */

const fakePetList = [
  {
    id: "pet-123",
    user_id: "user-123",
    photo_url: "foto.png",
    name: "Rex",
    species: "Cachorro",
    gender: "Macho",
    breed: "Labrador",
    age: "3",
    mated: false,
    pedigree: false,
    cryptorchidism_bilateral: false,
    cryptorchidism_unilateral: false,
    vaccinated: true,
    created_at: "2024-01-01",
    city: "Salvador",
    state: "BA",
  },
];

/* - Testando os valores iniciais do hook - */

test("provides correct initial values", () => {
  const { result } = renderHook(() => useGetAllPets());

  expect(result.current.getAllPetsError).toBe("");
  expect(result.current.isLoading).toBe(false);
  expect(result.current.newPet).toEqual([]);
});

/* - Testando o getPets - */

test("sets isLoading to true while fetching pets", () => {
  vi.mocked(getAllPetsService).mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useGetAllPets());

  act(() => {
    result.current.getPets();
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after successful fetch", async () => {
  vi.mocked(getAllPetsService).mockResolvedValueOnce(fakePetList);

  const { result } = renderHook(() => useGetAllPets());

  await act(async () => {
    await result.current.getPets();
  });

  expect(result.current.isLoading).toBe(false);
});

test("sets newPet with the data returned by the service", async () => {
  vi.mocked(getAllPetsService).mockResolvedValueOnce(fakePetList);

  const { result } = renderHook(() => useGetAllPets());

  await act(async () => {
    await result.current.getPets();
  });

  expect(result.current.newPet).toEqual(fakePetList);
});

test("sets getAllPetsError when service throws", async () => {
  vi.mocked(getAllPetsService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useGetAllPets());

  await act(async () => {
    await result.current.getPets();
  });

  expect(result.current.getAllPetsError).toBe(
    "Erro ao retornar pets cadastrados.",
  );
});

test("sets isLoading to false even when service throws", async () => {
  vi.mocked(getAllPetsService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useGetAllPets());

  await act(async () => {
    await result.current.getPets();
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error on successful fetch", async () => {
  vi.mocked(getAllPetsService).mockResolvedValueOnce(fakePetList);

  const { result } = renderHook(() => useGetAllPets());

  await act(async () => {
    await result.current.getPets();
  });

  expect(result.current.getAllPetsError).toBe("");
});
