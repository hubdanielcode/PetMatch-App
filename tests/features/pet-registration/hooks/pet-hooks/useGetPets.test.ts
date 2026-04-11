import { renderHook, act } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { getPets as getPetsService } from "@/features/pet-registration/services/petService";
import { useGetPets } from "@/features/pet-registration";

/* - Criando os Mocks - */

vi.mock("@/features/pet-registration/services/petService", () => ({
  getPets: vi.fn(),
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
  const { result } = renderHook(() => useGetPets());

  expect(result.current.getPetError).toBe("");
  expect(result.current.isLoading).toBe(false);
  expect(result.current.pets).toEqual([]);
});

/* - Testando o getPets - */

test("sets isLoading to true while fetching pets", () => {
  vi.mocked(getPetsService).mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useGetPets());

  act(() => {
    result.current.getPets();
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after successful fetch", async () => {
  vi.mocked(getPetsService).mockResolvedValueOnce(fakePetList);

  const { result } = renderHook(() => useGetPets());

  await act(async () => {
    await result.current.getPets();
  });

  expect(result.current.isLoading).toBe(false);
});

test("sets pets with the data returned by the service", async () => {
  vi.mocked(getPetsService).mockResolvedValueOnce(fakePetList);

  const { result } = renderHook(() => useGetPets());

  await act(async () => {
    await result.current.getPets();
  });

  expect(result.current.pets).toEqual(fakePetList);
});

test("sets getPetError when service throws", async () => {
  vi.mocked(getPetsService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useGetPets());

  await act(async () => {
    await result.current.getPets();
  });

  expect(result.current.getPetError).toBe("Erro ao retornar pets cadastrados.");
});

test("sets isLoading to false even when service throws", async () => {
  vi.mocked(getPetsService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useGetPets());

  await act(async () => {
    await result.current.getPets();
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error on successful fetch", async () => {
  vi.mocked(getPetsService).mockResolvedValueOnce(fakePetList);

  const { result } = renderHook(() => useGetPets());

  await act(async () => {
    await result.current.getPets();
  });

  expect(result.current.getPetError).toBe("");
});
