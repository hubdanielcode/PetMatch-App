import { renderHook, act } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { createPet as createPetService } from "@/features/pet-registration/services/petService";
import { useCreatePet } from "@/features/pet-registration";

/* - Criando os Mocks - */

vi.mock("@/features/pet-registration/services/petService", () => ({
  createPet: vi.fn(),
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando os objetos fake para evitar repetições - */

const fakePet = {
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
};

const fakePetInput = {
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
  city: "Salvador",
  state: "BA",
};

/* - Testando os valores iniciais do hook - */

test("provides correct initial values", () => {
  const { result } = renderHook(() => useCreatePet());

  expect(result.current.createPetError).toBe("");
  expect(result.current.isLoading).toBe(false);
});

/* - Testando o createPet - */

test("sets isLoading to true while creating pet", () => {
  vi.mocked(createPetService).mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useCreatePet());

  act(() => {
    result.current.createPet(fakePetInput);
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after successful creation", async () => {
  vi.mocked(createPetService).mockResolvedValueOnce(fakePet);

  const { result } = renderHook(() => useCreatePet());

  await act(async () => {
    await result.current.createPet(fakePetInput);
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls createPetService with the correct data", async () => {
  vi.mocked(createPetService).mockResolvedValueOnce(fakePet);

  const { result } = renderHook(() => useCreatePet());

  await act(async () => {
    await result.current.createPet(fakePetInput);
  });

  expect(createPetService).toHaveBeenCalledWith(fakePetInput);
});

test("returns the data from the service", async () => {
  vi.mocked(createPetService).mockResolvedValueOnce(fakePet);

  const { result } = renderHook(() => useCreatePet());

  let returnedData;
  await act(async () => {
    returnedData = await result.current.createPet(fakePetInput);
  });

  expect(returnedData).toEqual(fakePet);
});

test("sets createPetError when service throws", async () => {
  vi.mocked(createPetService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useCreatePet());

  await act(async () => {
    await result.current.createPet(fakePetInput);
  });

  expect(result.current.createPetError).toBe("Erro ao cadastrar pet.");
});

test("sets isLoading to false even when service throws", async () => {
  vi.mocked(createPetService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useCreatePet());

  await act(async () => {
    await result.current.createPet(fakePetInput);
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error on successful creation", async () => {
  vi.mocked(createPetService).mockResolvedValueOnce(fakePet);

  const { result } = renderHook(() => useCreatePet());

  await act(async () => {
    await result.current.createPet(fakePetInput);
  });

  expect(result.current.createPetError).toBe("");
});
