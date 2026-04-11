import { renderHook, act } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { deletePet as deletePetService } from "@/features/pet-registration/services/petService";
import { useDeletePet } from "@/features/pet-registration";

/* - Criando os Mocks - */

vi.mock("@/features/pet-registration/services/petService", () => ({
  deletePet: vi.fn(),
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Testando os valores iniciais do hook - */

test("provides correct initial values", () => {
  const { result } = renderHook(() => useDeletePet());

  expect(result.current.deletePetError).toBe("");
  expect(result.current.isLoading).toBe(false);
  expect(result.current.updatedPetList).toEqual([]);
});

/* - Testando o deletePet - */

test("sets isLoading to true while deleting pet", () => {
  vi.mocked(deletePetService).mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useDeletePet());

  act(() => {
    result.current.deletePet("pet-123");
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after successful deletion", async () => {
  vi.mocked(deletePetService).mockResolvedValueOnce(null);

  const { result } = renderHook(() => useDeletePet());

  await act(async () => {
    await result.current.deletePet("pet-123");
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls deletePetService with the correct id", async () => {
  vi.mocked(deletePetService).mockResolvedValueOnce(null);

  const { result } = renderHook(() => useDeletePet());

  await act(async () => {
    await result.current.deletePet("pet-123");
  });

  expect(deletePetService).toHaveBeenCalledWith("pet-123");
});

test("sets deletePetError when service throws", async () => {
  vi.mocked(deletePetService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useDeletePet());

  await act(async () => {
    await result.current.deletePet("pet-123");
  });

  expect(result.current.deletePetError).toBe(
    "Erro ao deleter pet! ID é necessário para a deleção!",
  );
});

test("sets isLoading to false even when service throws", async () => {
  vi.mocked(deletePetService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useDeletePet());

  await act(async () => {
    await result.current.deletePet("pet-123");
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error on successful deletion", async () => {
  vi.mocked(deletePetService).mockResolvedValueOnce(null);

  const { result } = renderHook(() => useDeletePet());

  await act(async () => {
    await result.current.deletePet("pet-123");
  });

  expect(result.current.deletePetError).toBe("");
});
