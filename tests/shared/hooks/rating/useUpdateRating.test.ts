import { test, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useUpdateRating } from "@/shared/hooks/rating/useUpdateRating";
import type { Rating } from "@/shared/types/rating";

/* - Criando os mocks - */

const { mockUpdate, mockFrom, mockGetUser } = vi.hoisted(() => ({
  mockUpdate: vi.fn(),
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
    update: mockUpdate,
  });
});

/* - Criando uma função para buscar o usuário autenticado - */

const mockUser = (user: { id: string } | null) => {
  mockGetUser.mockResolvedValue({
    data: { user },
  } as never);
};

const fakeRating: Omit<Rating, "created_at"> = {
  id: "rating-123",
  pet_id: "pet-123",
  rating: 4,
  comment: "Atualizado!",
  user_id: "user-123",
};

/* - Testando useUpdateRating - */

test("updates a rating successfully", async () => {
  mockUser({ id: "user-123" });

  mockUpdate.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      select: vi.fn().mockResolvedValue({
        data: [{ ...fakeRating, rating: 4 }],
        error: null,
      }),
    }),
  });

  const { result } = renderHook(() => useUpdateRating());

  await act(async () => {
    await result.current.updateRating(fakeRating);
  });

  expect(result.current.updatedRatingList[0].id).toBe("rating-123");
  expect(result.current.updatedRatingList[0].rating).toBe(4);
  expect(result.current.isLoading).toBe(false);
  expect(result.current.updateRatingError).toBe("");
});

test("sets error when user is not authenticated", async () => {
  mockUser(null);

  const { result } = renderHook(() => useUpdateRating());

  await act(async () => {
    await result.current.updateRating(fakeRating);
  });

  expect(result.current.updateRatingError).toBe(
    "Erro ao atualizar avaliação! ID é necessário para a atualização!",
  );
  expect(result.current.updatedRatingList).toEqual([]);
  expect(result.current.isLoading).toBe(false);
});

test("sets error when update fails", async () => {
  mockUser({ id: "user-123" });

  mockUpdate.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      select: vi.fn().mockResolvedValue({
        data: null,
        error: { message: "update error" },
      }),
    }),
  });

  const { result } = renderHook(() => useUpdateRating());

  await act(async () => {
    await result.current.updateRating(fakeRating);
  });

  expect(result.current.updateRatingError).toBe(
    "Erro ao atualizar avaliação! ID é necessário para a atualização!",
  );
  expect(result.current.updatedRatingList).toEqual([]);
  expect(result.current.isLoading).toBe(false);
});

test("sets isLoading to true while updating", async () => {
  mockUser({ id: "user-123" });

  let resolvePromise!: (value: unknown) => void;
  mockUpdate.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue(
        new Promise((res) => {
          resolvePromise = res;
        }),
      ),
    }),
  });

  const { result } = renderHook(() => useUpdateRating());

  act(() => {
    result.current.updateRating(fakeRating);
  });

  expect(result.current.isLoading).toBe(true);

  await act(async () => {
    resolvePromise({ data: [], error: null });
  });

  expect(result.current.isLoading).toBe(false);
});
