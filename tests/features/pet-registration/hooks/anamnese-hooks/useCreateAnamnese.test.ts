import { renderHook, act } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { createAnamnese as createAnamneseService } from "@/features/pet-registration/services/anamneseService";
import { useCreateAnamnese } from "@/features/pet-registration";

/* - Criando os Mocks - */

vi.mock("@/features/pet-registration/services/anamneseService", () => ({
  createAnamnese: vi.fn(),
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando o objeto fake para evitar repetições - */

const fakeAnamnese = {
  pet_id: "pet-123",
  feeding_info: "Ração",
  walks_info: "2x ao dia",
  behavior_info: "Calmo",
  surgeries_info: "Nenhuma",
  diseases_info: "Nenhuma",
  testicles_info: "2",
  reproduction_info: "Sim",
};

/* - Testando os valores iniciais do hook - */

test("provides correct initial values", () => {
  const { result } = renderHook(() => useCreateAnamnese());

  expect(result.current.createAnamneseError).toBe("");
  expect(result.current.isLoading).toBe(false);
});

/* - Testando o createAnamnese - */

test("sets isLoading to true while creating anamnese", async () => {
  vi.mocked(createAnamneseService).mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useCreateAnamnese());

  act(() => {
    result.current.createAnamnese(fakeAnamnese);
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after successful creation", async () => {
  vi.mocked(createAnamneseService).mockResolvedValueOnce(null);

  const { result } = renderHook(() => useCreateAnamnese());

  await act(async () => {
    await result.current.createAnamnese(fakeAnamnese);
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls createAnamneseService with the correct data", async () => {
  vi.mocked(createAnamneseService).mockResolvedValueOnce(null);

  const { result } = renderHook(() => useCreateAnamnese());

  await act(async () => {
    await result.current.createAnamnese(fakeAnamnese);
  });

  expect(createAnamneseService).toHaveBeenCalledWith(fakeAnamnese);
});

test("sets createAnamneseError when service throws", async () => {
  vi.mocked(createAnamneseService).mockRejectedValueOnce(
    new Error("Erro inesperado"),
  );

  const { result } = renderHook(() => useCreateAnamnese());

  await act(async () => {
    await result.current.createAnamnese(fakeAnamnese);
  });

  expect(result.current.createAnamneseError).toBe("Erro ao salvar dados!");
});

test("sets isLoading to false even when service throws", async () => {
  vi.mocked(createAnamneseService).mockRejectedValueOnce(
    new Error("Erro inesperado"),
  );

  const { result } = renderHook(() => useCreateAnamnese());

  await act(async () => {
    await result.current.createAnamnese(fakeAnamnese);
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error on successful creation", async () => {
  vi.mocked(createAnamneseService).mockResolvedValueOnce(null);

  const { result } = renderHook(() => useCreateAnamnese());

  await act(async () => {
    await result.current.createAnamnese(fakeAnamnese);
  });

  expect(result.current.createAnamneseError).toBe("");
});
