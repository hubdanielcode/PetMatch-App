import { test, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCreateRating } from "@/shared/hooks/rating/useCreateRating";
import type { Rating } from "@/shared/types/rating";

/* - Criando os mocks - */

const { mockCreateRatingService } = vi.hoisted(() => ({
  mockCreateRatingService: vi.fn(),
}));

vi.mock("@/shared/services/ratingService", () => ({
  createRating: mockCreateRatingService,
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const fakeRating: Omit<Rating, "id" | "created_at" | "user_id"> = {
  pet_id: "pet-123",
  rating: 5,
  comment: "Ótimo!",
};

/* - Testando useCreateRating - */

test("creates a rating successfully", async () => {
  mockCreateRatingService.mockResolvedValue(null);

  const { result } = renderHook(() => useCreateRating());

  await act(async () => {
    await result.current.createRating(fakeRating);
  });

  expect(mockCreateRatingService).toHaveBeenCalledWith(fakeRating);
  expect(result.current.createRatingError).toBe("");
  expect(result.current.isLoading).toBe(false);
});

test("sets error when createRating fails", async () => {
  mockCreateRatingService.mockRejectedValue(
    new Error("Erro ao cadastrar avaliação"),
  );

  const { result } = renderHook(() => useCreateRating());

  await act(async () => {
    await result.current.createRating(fakeRating);
  });

  expect(result.current.createRatingError).toBe("Erro ao cadastrar avaliação");
  expect(result.current.isLoading).toBe(false);
});

test("sets isLoading to true while creating", async () => {
  let resolvePromise!: (value: null) => void;
  mockCreateRatingService.mockReturnValue(
    new Promise((res) => {
      resolvePromise = res;
    }),
  );

  const { result } = renderHook(() => useCreateRating());

  act(() => {
    result.current.createRating(fakeRating);
  });

  expect(result.current.isLoading).toBe(true);

  await act(async () => {
    resolvePromise(null);
  });

  expect(result.current.isLoading).toBe(false);
});
