import { renderHook, act } from "@testing-library/react";
import { vi, test, expect, beforeEach } from "vitest";
import { useDeleteComment } from "@/features/user-profile";
import type { Comment } from "@/features/user-profile";

/* - Criando os Mocks hoistados - */

const { mockDeleteCommentService } = vi.hoisted(() => ({
  mockDeleteCommentService: vi.fn(),
}));

vi.mock("@/features/user-profile/services/commentService", () => ({
  deleteComment: mockDeleteCommentService,
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Testando o estado inicial - */

test("initializes with null updatedCommentList, empty error and isLoading false", () => {
  const { result } = renderHook(() => useDeleteComment());

  expect(result.current.updatedCommentList).toBeNull();
  expect(result.current.deleteCommentError).toBe("");
  expect(result.current.isLoading).toBe(false);
});

/* - Testando o deleteComment - */

test("sets isLoading to true while deleting a comment", async () => {
  mockDeleteCommentService.mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useDeleteComment());

  act(() => {
    result.current.deleteComment("comment-123");
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after comment is deleted successfully", async () => {
  mockDeleteCommentService.mockResolvedValueOnce({});

  const { result } = renderHook(() => useDeleteComment());

  await act(async () => {
    await result.current.deleteComment("comment-123");
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls deleteCommentService with the correct id", async () => {
  mockDeleteCommentService.mockResolvedValueOnce({});

  const { result } = renderHook(() => useDeleteComment());

  await act(async () => {
    await result.current.deleteComment("comment-123");
  });

  expect(mockDeleteCommentService).toHaveBeenCalledWith("comment-123");
});

test("sets updatedCommentList with returned data after deletion", async () => {
  const mockData: Comment = {
    id: "comment-123",
    user_id: "user-456",
    pet_id: "pet-123",
    name: "João Silva",
    rating: 5,
    text: "Ótimo pet!",
    created_at: "2024-01-01",
  };

  mockDeleteCommentService.mockResolvedValueOnce(mockData);

  const { result } = renderHook(() => useDeleteComment());

  await act(async () => {
    await result.current.deleteComment("comment-123");
  });

  expect(result.current.updatedCommentList).toEqual(mockData);
});

test("sets deleteCommentError when service throws", async () => {
  mockDeleteCommentService.mockRejectedValueOnce(new Error("service error"));

  const { result } = renderHook(() => useDeleteComment());

  await act(async () => {
    await result.current.deleteComment("comment-123");
  });

  expect(result.current.deleteCommentError).toBe(
    "Erro ao deletar comentário! Id necessário para a deleção!",
  );
});

test("sets isLoading to false after service throws", async () => {
  mockDeleteCommentService.mockRejectedValueOnce(new Error("service error"));

  const { result } = renderHook(() => useDeleteComment());

  await act(async () => {
    await result.current.deleteComment("comment-123");
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error when comment is deleted successfully", async () => {
  mockDeleteCommentService.mockResolvedValueOnce({});

  const { result } = renderHook(() => useDeleteComment());

  await act(async () => {
    await result.current.deleteComment("comment-123");
  });

  expect(result.current.deleteCommentError).toBe("");
});
