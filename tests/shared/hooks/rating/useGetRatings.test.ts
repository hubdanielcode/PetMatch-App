import { test, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDeleteRating } from "@/shared/hooks/rating/useDeleteRating";
import type { Rating } from "@/shared/types/rating";

/* - Criando os mocks - */

const { mockDelete, mockFrom, mockGetUser } = vi.hoisted(() => ({
  mockDelete: vi.fn(),
  mockFrom: vi.fn(),
  mockGetUser: vi.fn(),
}));

vi.mock("../../../../supabase/supabase", () => ({
  supabase: {
    auth: { getUser: mockGetUser },
    from: mockFrom,
  },
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();

  mockFrom.mockReturnValue({
    delete: mockDelete,
  });
});

/* - Criando uma função para buscar o usuário autenticado - */

const mockUser = (user: { id: string } | null) => {
  mockGetUser.mockResolvedValue({
    data: { user },
  } as never);
};

const fakeRating: Rating = {
  id: "rating-123",
  pet_id: "pet-123",
  rating: 5,
  comment: "Ótimo!",
  user_id: "user-123",
  created_at: "2024-01-01",
};

/* - Testando useDeleteRating - */

test("deletes a rating successfully and removes it from list", async () => {
  mockUser({ id: "user-123" });

  mockDelete.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      single: vi.fn().mockResolvedValue({
        data: fakeRating,
        error: null,
      }),
    }),
  });

  const { result } = renderHook(() => useDeleteRating());

  await act(async () => {
    await result.current.deleteRating("rating-123");
  });

  expect(result.current.isLoading).toBe(false);
  expect(result.current.deleteRatingError).toBe("");
});

test("sets error when user is not authenticated", async () => {
  mockUser(null);

  const { result } = renderHook(() => useDeleteRating());

  await act(async () => {
    await result.current.deleteRating("rating-123");
  });

  expect(result.current.deleteRatingError).toBe(
    "Erro ao deletar avaliação! ID é necessário para a deleção!",
  );
  expect(result.current.isLoading).toBe(false);
});

test("sets error when delete fails", async () => {
  mockUser({ id: "user-123" });

  mockDelete.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      single: vi.fn().mockResolvedValue({
        data: null,
        error: { message: "delete error" },
      }),
    }),
  });

  const { result } = renderHook(() => useDeleteRating());

  await act(async () => {
    await result.current.deleteRating("rating-123");
  });

  expect(result.current.deleteRatingError).toBe(
    "Erro ao deletar avaliação! ID é necessário para a deleção!",
  );
  expect(result.current.isLoading).toBe(false);
});

test("filters deleted rating from updatedRatingList", async () => {
  mockUser({ id: "user-123" });

  mockDelete.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      single: vi.fn().mockResolvedValue({
        data: fakeRating,
        error: null,
      }),
    }),
  });

  const { result } = renderHook(() => useDeleteRating());

  // - Simula lista com dois itens antes da deleção -
  const secondRating: Rating = { ...fakeRating, id: "rating-456" };

  // -  Acessa o estado interno pra pré-popular a lista -
  act(() => {
    result.current.updatedRatingList.push(fakeRating, secondRating);
  });

  await act(async () => {
    await result.current.deleteRating("rating-123");
  });

  expect(
    result.current.updatedRatingList.every((r) => r.id !== "rating-123"),
  ).toBe(true);
});
