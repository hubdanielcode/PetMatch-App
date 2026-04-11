import { renderHook, act } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { deleteTutor as deleteTutorService } from "@/features/pet-registration/services/tutorService";
import { useDeleteTutor } from "@/features/pet-registration";

/* - Criando os Mocks - */

vi.mock("@/features/pet-registration/services/tutorService", () => ({
  deleteTutor: vi.fn(),
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando o objeto fake para evitar repetições - */

const fakeTutor = {
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
  created_at: "2024-01-01",
  validated_at: null,
  has_seen_welcome: false,
};

/* - Testando os valores iniciais do hook - */

test("provides correct initial values", () => {
  const { result } = renderHook(() => useDeleteTutor());

  expect(result.current.deleteTutorError).toBe("");
  expect(result.current.isLoading).toBe(false);
  expect(result.current.updatedTutorList).toEqual([]);
});

/* - Testando o deleteTutor - */

test("sets isLoading to true while deleting tutor", () => {
  vi.mocked(deleteTutorService).mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useDeleteTutor());

  act(() => {
    result.current.deleteTutor("tutor-123");
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after successful deletion", async () => {
  vi.mocked(deleteTutorService).mockResolvedValueOnce(fakeTutor);

  const { result } = renderHook(() => useDeleteTutor());

  await act(async () => {
    await result.current.deleteTutor("tutor-123");
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls deleteTutorService with the correct id", async () => {
  vi.mocked(deleteTutorService).mockResolvedValueOnce(fakeTutor);

  const { result } = renderHook(() => useDeleteTutor());

  await act(async () => {
    await result.current.deleteTutor("tutor-123");
  });

  expect(deleteTutorService).toHaveBeenCalledWith("tutor-123");
});

test("sets deleteTutorError when service throws", async () => {
  vi.mocked(deleteTutorService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useDeleteTutor());

  await act(async () => {
    await result.current.deleteTutor("tutor-123");
  });

  expect(result.current.deleteTutorError).toBe(
    "Erro ao deletar tutor! ID é necessário para a deleção",
  );
});

test("sets isLoading to false even when service throws", async () => {
  vi.mocked(deleteTutorService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useDeleteTutor());

  await act(async () => {
    await result.current.deleteTutor("tutor-123");
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error on successful deletion", async () => {
  vi.mocked(deleteTutorService).mockResolvedValueOnce(fakeTutor);

  const { result } = renderHook(() => useDeleteTutor());

  await act(async () => {
    await result.current.deleteTutor("tutor-123");
  });

  expect(result.current.deleteTutorError).toBe("");
});
