import { renderHook, act } from "@testing-library/react";
import { vi, test, expect, beforeEach } from "vitest";
import { useGetComments } from "@/features/user-profile";
import type { Comment } from "@/features/user-profile";

/* - Criando os Mocks hoistados - */

const { mockGetCommentsService } = vi.hoisted(() => ({
  mockGetCommentsService: vi.fn(),
}));

vi.mock("@/features/user-profile/services/commentService", () => ({
  getComments: mockGetCommentsService,
}));

const mockComments: Comment[] = [
  {
    id: "comment-123",
    user_id: "user-456",
    pet_id: "pet-123",
    name: "João Silva",
    rating: 5,
    text: "Ótimo pet!",
    created_at: "2024-01-01",
  },
  {
    id: "comment-456",
    user_id: "user-789",
    pet_id: "pet-123",
    name: "Maria Souza",
    rating: 4,
    text: "Pet muito fofo!",
    created_at: "2024-01-02",
  },
];

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Testando o estado inicial - */

test("initializes with empty comments, empty error and isLoading false", () => {
  const { result } = renderHook(() => useGetComments());

  expect(result.current.comments).toEqual([]);
  expect(result.current.getCommentError).toBe("");
  expect(result.current.isLoading).toBe(false);
});

/* - Testando o getComments - */

test("sets isLoading to true while fetching comments", async () => {
  mockGetCommentsService.mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useGetComments());

  act(() => {
    result.current.getComments("pet-123");
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after comments are fetched successfully", async () => {
  mockGetCommentsService.mockResolvedValueOnce(mockComments);

  const { result } = renderHook(() => useGetComments());

  await act(async () => {
    await result.current.getComments("pet-123");
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls getCommentsService with the correct pet_id", async () => {
  mockGetCommentsService.mockResolvedValueOnce(mockComments);

  const { result } = renderHook(() => useGetComments());

  await act(async () => {
    await result.current.getComments("pet-123");
  });

  expect(mockGetCommentsService).toHaveBeenCalledWith("pet-123");
});

test("sets comments with returned data after fetching", async () => {
  mockGetCommentsService.mockResolvedValueOnce(mockComments);

  const { result } = renderHook(() => useGetComments());

  await act(async () => {
    await result.current.getComments("pet-123");
  });

  expect(result.current.comments).toEqual(mockComments);
});

test("sets getCommentError when service throws", async () => {
  mockGetCommentsService.mockRejectedValueOnce(new Error("service error"));

  const { result } = renderHook(() => useGetComments());

  await act(async () => {
    await result.current.getComments("pet-123");
  });

  expect(result.current.getCommentError).toBe(
    "Erro ao retornar comentários encontrados!",
  );
});

test("sets isLoading to false after service throws", async () => {
  mockGetCommentsService.mockRejectedValueOnce(new Error("service error"));

  const { result } = renderHook(() => useGetComments());

  await act(async () => {
    await result.current.getComments("pet-123");
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error when comments are fetched successfully", async () => {
  mockGetCommentsService.mockResolvedValueOnce(mockComments);

  const { result } = renderHook(() => useGetComments());

  await act(async () => {
    await result.current.getComments("pet-123");
  });

  expect(result.current.getCommentError).toBe("");
});
