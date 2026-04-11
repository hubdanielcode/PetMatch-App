import { renderHook, act } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { getTutors as getTutorsService } from "@/features/pet-registration/services/tutorService";
import { useGetTutors } from "@/features/pet-registration";

/* - Criando os Mocks - */

vi.mock("@/features/pet-registration/services/tutorService", () => ({
  getTutors: vi.fn(),
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
  const { result } = renderHook(() => useGetTutors());

  expect(result.current.getTutorError).toBe("");
  expect(result.current.isLoading).toBe(true);
  expect(result.current.tutor).toBeNull();
});

/* - Testando o getTutors - */

test("sets isLoading to true while fetching tutor", () => {
  vi.mocked(getTutorsService).mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useGetTutors());

  act(() => {
    result.current.getTutors("user-123");
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after successful fetch", async () => {
  vi.mocked(getTutorsService).mockResolvedValueOnce(fakeTutor);

  const { result } = renderHook(() => useGetTutors());

  await act(async () => {
    await result.current.getTutors("user-123");
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls getTutorsService with the correct user_id", async () => {
  vi.mocked(getTutorsService).mockResolvedValueOnce(fakeTutor);

  const { result } = renderHook(() => useGetTutors());

  await act(async () => {
    await result.current.getTutors("user-123");
  });

  expect(getTutorsService).toHaveBeenCalledWith("user-123");
});

test("sets tutor with the data returned from service", async () => {
  vi.mocked(getTutorsService).mockResolvedValueOnce(fakeTutor);

  const { result } = renderHook(() => useGetTutors());

  await act(async () => {
    await result.current.getTutors("user-123");
  });

  expect(result.current.tutor).toEqual(fakeTutor);
});

test("sets getTutorError when service throws", async () => {
  vi.mocked(getTutorsService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useGetTutors());

  await act(async () => {
    await result.current.getTutors("user-123");
  });

  expect(result.current.getTutorError).toBe(
    "Erro ao retornar os tutores cadastrados!",
  );
});

test("sets isLoading to false even when service throws", async () => {
  vi.mocked(getTutorsService).mockRejectedValueOnce(new Error("Erro"));

  const { result } = renderHook(() => useGetTutors());

  await act(async () => {
    await result.current.getTutors("user-123");
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error on successful fetch", async () => {
  vi.mocked(getTutorsService).mockResolvedValueOnce(fakeTutor);

  const { result } = renderHook(() => useGetTutors());

  await act(async () => {
    await result.current.getTutors("user-123");
  });

  expect(result.current.getTutorError).toBe("");
});
