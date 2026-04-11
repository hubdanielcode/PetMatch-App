import { renderHook, act } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { createTutor as createTutorService } from "@/features/pet-registration/services/tutorService";
import { useCreateTutor } from "@/features/pet-registration";

/* - Criando os Mocks - */

vi.mock("@/features/pet-registration/services/tutorService", () => ({
  createTutor: vi.fn(),
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando os objetos fake para evitar repetições - */

const fakeTutorInput = {
  name: "João Silva",
  photo_url: null,
  phone: "71999999999",
  email: "joao@email.com",
  street: "Rua das Flores",
  complement: null,
  neighborhood: "Centro",
  number: "123",
  city: "Salvador",
  state: "BA",
};

const fakeTutor = {
  ...fakeTutorInput,
  id: "tutor-123",
  user_id: "user-123",
  created_at: "2024-01-01",
  validated_at: null,
  has_seen_welcome: false,
};

/* - Testando os valores iniciais do hook - */

test("provides correct initial values", () => {
  const { result } = renderHook(() => useCreateTutor());

  expect(result.current.createTutorError).toBe("");
  expect(result.current.isLoading).toBe(false);
});

/* - Testando o createTutor - */

test("sets isLoading to true while creating tutor", () => {
  vi.mocked(createTutorService).mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useCreateTutor());

  act(() => {
    result.current.createTutor(fakeTutorInput);
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after successful creation", async () => {
  vi.mocked(createTutorService).mockResolvedValueOnce([fakeTutor]);

  const { result } = renderHook(() => useCreateTutor());

  await act(async () => {
    await result.current.createTutor(fakeTutorInput);
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls createTutorService with the correct data", async () => {
  vi.mocked(createTutorService).mockResolvedValueOnce([fakeTutor]);

  const { result } = renderHook(() => useCreateTutor());

  await act(async () => {
    await result.current.createTutor(fakeTutorInput);
  });

  expect(createTutorService).toHaveBeenCalledWith(fakeTutorInput);
});

test("sets createTutorError when service throws", async () => {
  vi.mocked(createTutorService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useCreateTutor());

  await act(async () => {
    await result.current.createTutor(fakeTutorInput);
  });

  expect(result.current.createTutorError).toBe("Erro ao cadastrar tutor!");
});

test("sets isLoading to false even when service throws", async () => {
  vi.mocked(createTutorService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useCreateTutor());

  await act(async () => {
    await result.current.createTutor(fakeTutorInput);
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error on successful creation", async () => {
  vi.mocked(createTutorService).mockResolvedValueOnce([fakeTutor]);

  const { result } = renderHook(() => useCreateTutor());

  await act(async () => {
    await result.current.createTutor(fakeTutorInput);
  });

  expect(result.current.createTutorError).toBe("");
});
