import { renderHook, act } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { updatePet as updatePetService } from "@/features/pet-registration/services/petService";
import { useUpdatePet } from "@/features/pet-registration";

/* - Criando os Mocks - */

vi.mock("@/features/pet-registration/services/petService", () => ({
  updatePet: vi.fn(),
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

/* - Testando os valores iniciais do hook - */

test("provides correct initial values", () => {
  const { result } = renderHook(() => useUpdatePet());

  expect(result.current.updatePetError).toBe("");
  expect(result.current.isLoading).toBe(false);
  expect(result.current.updatedPetList).toEqual([]);
});

/* - Testando o updatePet - */

test("sets isLoading to true while updating pet", () => {
  vi.mocked(updatePetService).mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useUpdatePet());

  act(() => {
    result.current.updatePet(fakePet);
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after successful update", async () => {
  vi.mocked(updatePetService).mockResolvedValueOnce(fakePet);

  const { result } = renderHook(() => useUpdatePet());

  await act(async () => {
    await result.current.updatePet(fakePet);
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls updatePetService with the correct data", async () => {
  vi.mocked(updatePetService).mockResolvedValueOnce(null);

  const { result } = renderHook(() => useUpdatePet());

  await act(async () => {
    await result.current.updatePet(fakePet);
  });

  expect(updatePetService).toHaveBeenCalledWith(fakePet);
});

test("sets updatePetError when service throws", async () => {
  vi.mocked(updatePetService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useUpdatePet());

  await act(async () => {
    await result.current.updatePet(fakePet);
  });

  expect(result.current.updatePetError).toBe(
    "Erro ao atualizar pet! ID é necessário para a atualização!",
  );
});

test("sets isLoading to false even when service throws", async () => {
  vi.mocked(updatePetService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useUpdatePet());

  await act(async () => {
    await result.current.updatePet(fakePet);
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error on successful update", async () => {
  vi.mocked(updatePetService).mockResolvedValueOnce(null);

  const { result } = renderHook(() => useUpdatePet());

  await act(async () => {
    await result.current.updatePet(fakePet);
  });

  expect(result.current.updatePetError).toBe("");
});
