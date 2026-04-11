import { renderHook, act } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { getAnamnese as getAnamneseService } from "@/features/pet-registration/services/anamneseService";
import { useGetAnamnese } from "@/features/pet-registration";

/* - Criando os Mocks - */

vi.mock("@/features/pet-registration/services/anamneseService", () => ({
  getAnamnese: vi.fn(),
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando o objeto fake para evitar repetições - */

const fakeAnamnese = {
  id: "anamnese-123",
  pet_id: "pet-123",
  feeding_info: "Ração",
  walks_info: "2x ao dia",
  behavior_info: "Calmo",
  surgeries_info: "Nenhuma",
  diseases_info: "Nenhuma",
  testicles_info: "2",
  reproduction_info: "Sim",
  created_at: "2024-01-01",
};

/* - Testando os valores iniciais do hook - */

test("provides correct initial values", () => {
  const { result } = renderHook(() => useGetAnamnese());

  expect(result.current.newAnamnese).toBeNull();
  expect(result.current.getAnamneseError).toBe("");
  expect(result.current.isLoading).toBe(false);
});

/* - Testando o getAnamnese - */

test("sets isLoading to true while fetching anamnese", async () => {
  vi.mocked(getAnamneseService).mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useGetAnamnese());

  act(() => {
    result.current.getAnamnese("pet-123");
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after successful fetch", async () => {
  vi.mocked(getAnamneseService).mockResolvedValueOnce(fakeAnamnese);

  const { result } = renderHook(() => useGetAnamnese());

  await act(async () => {
    await result.current.getAnamnese("pet-123");
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls getAnamneseService with the correct pet_id", async () => {
  vi.mocked(getAnamneseService).mockResolvedValueOnce(fakeAnamnese);

  const { result } = renderHook(() => useGetAnamnese());

  await act(async () => {
    await result.current.getAnamnese("pet-123");
  });

  expect(getAnamneseService).toHaveBeenCalledWith("pet-123");
});

test("sets newAnamnese with the data returned by the service", async () => {
  vi.mocked(getAnamneseService).mockResolvedValueOnce(fakeAnamnese);

  const { result } = renderHook(() => useGetAnamnese());

  await act(async () => {
    await result.current.getAnamnese("pet-123");
  });

  expect(result.current.newAnamnese).toEqual(fakeAnamnese);
});

test("sets getAnamneseError when service throws", async () => {
  vi.mocked(getAnamneseService).mockRejectedValueOnce(
    new Error("Erro inesperado"),
  );

  const { result } = renderHook(() => useGetAnamnese());

  await act(async () => {
    await result.current.getAnamnese("pet-123");
  });

  expect(result.current.getAnamneseError).toBe(
    "Falha ao retornar dados da anamnese!",
  );
});

test("sets isLoading to false even when service throws", async () => {
  vi.mocked(getAnamneseService).mockRejectedValueOnce(
    new Error("Erro inesperado"),
  );

  const { result } = renderHook(() => useGetAnamnese());

  await act(async () => {
    await result.current.getAnamnese("pet-123");
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error on successful fetch", async () => {
  vi.mocked(getAnamneseService).mockResolvedValueOnce(fakeAnamnese);

  const { result } = renderHook(() => useGetAnamnese());

  await act(async () => {
    await result.current.getAnamnese("pet-123");
  });

  expect(result.current.getAnamneseError).toBe("");
});

test("does not set newAnamnese when service throws", async () => {
  vi.mocked(getAnamneseService).mockRejectedValueOnce(
    new Error("Erro inesperado"),
  );

  const { result } = renderHook(() => useGetAnamnese());

  await act(async () => {
    await result.current.getAnamnese("pet-123");
  });

  expect(result.current.newAnamnese).toBeNull();
});
