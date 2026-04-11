import { renderHook, act } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { updateTutor as updateTutorService } from "@/features/pet-registration/services/tutorService";
import { useUpdateTutor } from "@/features/pet-registration";

/* - Criando os Mocks - */

vi.mock("@/features/pet-registration/services/tutorService", () => ({
  updateTutor: vi.fn(),
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando os objetos fake para evitar repetições - */

const fakeTutorInput = {
  id: "tutor-123",
  user_id: "user-123",
  photo_url: null,
  name: "João Silva",
  phone: "71999999999",
  email: "joao@email.com",
  street: "Rua das Flores",
  complement: null,
  neighborhood: "Centro",
  number: "123",
  city: "Salvador",
  state: "BA",
  validated_at: null,
  has_seen_welcome: false,
};

const fakeTutor = {
  ...fakeTutorInput,
  created_at: "2024-01-01",
};

/* - Testando os valores iniciais do hook - */

test("provides correct initial values", () => {
  const { result } = renderHook(() => useUpdateTutor());

  expect(result.current.updateTutorError).toBe("");
  expect(result.current.isLoading).toBe(false);
  expect(result.current.updatedTutorList).toEqual([]);
});

/* - Testando o updateTutor - */

test("sets isLoading to true while updating tutor", () => {
  vi.mocked(updateTutorService).mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useUpdateTutor());

  act(() => {
    result.current.updateTutor(fakeTutorInput);
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after successful update", async () => {
  vi.mocked(updateTutorService).mockResolvedValueOnce(fakeTutor);

  const { result } = renderHook(() => useUpdateTutor());

  await act(async () => {
    await result.current.updateTutor(fakeTutorInput);
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls updateTutorService with the correct data", async () => {
  vi.mocked(updateTutorService).mockResolvedValueOnce(fakeTutor);

  const { result } = renderHook(() => useUpdateTutor());

  await act(async () => {
    await result.current.updateTutor(fakeTutorInput);
  });

  expect(updateTutorService).toHaveBeenCalledWith(fakeTutorInput);
});

test("sets updateTutorError when service throws", async () => {
  vi.mocked(updateTutorService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useUpdateTutor());

  await act(async () => {
    await result.current.updateTutor(fakeTutorInput);
  });

  expect(result.current.updateTutorError).toBe(
    "Erro ao atualizar tutor! ID é necessário para a atualização!",
  );
});

test("sets isLoading to false even when service throws", async () => {
  vi.mocked(updateTutorService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useUpdateTutor());

  await act(async () => {
    await result.current.updateTutor(fakeTutorInput);
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error on successful update", async () => {
  vi.mocked(updateTutorService).mockResolvedValueOnce(fakeTutor);

  const { result } = renderHook(() => useUpdateTutor());

  await act(async () => {
    await result.current.updateTutor(fakeTutorInput);
  });

  expect(result.current.updateTutorError).toBe("");
});
