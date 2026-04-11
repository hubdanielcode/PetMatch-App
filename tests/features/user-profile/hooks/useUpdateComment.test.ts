import { renderHook, act } from "@testing-library/react";
import { vi, test, expect, beforeEach } from "vitest";
import { useUpdateComment } from "@/features/user-profile";
import type { Comment } from "@/features/user-profile";

/* - Criando os Mocks hoistados - */

const { mockUpdateCommentService } = vi.hoisted(() => ({
  mockUpdateCommentService: vi.fn(),
}));

vi.mock("@/features/user-profile/services/commentService", () => ({
  updateComment: mockUpdateCommentService,
}));

const mockComment: Omit<Comment, "created_at"> = {
  id: "comment-123",
  user_id: "user-123",
  pet_id: "pet-123",
  name: "João Silva",
  rating: 5,
  text: "Ótimo pet!",
};

const mockCommentFull: Comment = {
  ...mockComment,
  created_at: "2024-01-01T00:00:00Z",
};

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Testando o estado inicial - */

test("initializes with null updatedCommentsList, empty error and isLoading false", () => {
  const { result } = renderHook(() => useUpdateComment());

  expect(result.current.updatedCommentsList).toBeNull();
  expect(result.current.updateCommentError).toBe("");
  expect(result.current.isLoading).toBe(false);
});

/* - Testando o updateComment - */

test("sets isLoading to true while updating a comment", () => {
  mockUpdateCommentService.mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useUpdateComment());

  act(() => {
    result.current.updateComment(mockComment);
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after comment is updated successfully", async () => {
  mockUpdateCommentService.mockResolvedValueOnce(mockCommentFull);

  const { result } = renderHook(() => useUpdateComment());

  await act(async () => {
    await result.current.updateComment(mockComment);
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls updateCommentService with the correct comment", async () => {
  mockUpdateCommentService.mockResolvedValueOnce(mockCommentFull);

  const { result } = renderHook(() => useUpdateComment());

  await act(async () => {
    await result.current.updateComment(mockComment);
  });

  expect(mockUpdateCommentService).toHaveBeenCalledWith(mockComment);
});

test("sets updatedCommentsList with the returned data on success", async () => {
  mockUpdateCommentService.mockResolvedValueOnce(mockCommentFull);

  const { result } = renderHook(() => useUpdateComment());

  await act(async () => {
    await result.current.updateComment(mockComment);
  });

  expect(result.current.updatedCommentsList).toEqual(mockCommentFull);
});

test("sets updateCommentError when service throws", async () => {
  mockUpdateCommentService.mockRejectedValueOnce(new Error("service error"));

  const { result } = renderHook(() => useUpdateComment());

  await act(async () => {
    await result.current.updateComment(mockComment);
  });

  expect(result.current.updateCommentError).toBe(
    "Erro ao atualizar comentário! Id necessário para a atualização!",
  );
});

test("sets isLoading to false after service throws", async () => {
  mockUpdateCommentService.mockRejectedValueOnce(new Error("service error"));

  const { result } = renderHook(() => useUpdateComment());

  await act(async () => {
    await result.current.updateComment(mockComment);
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error when comment is updated successfully", async () => {
  mockUpdateCommentService.mockResolvedValueOnce(mockCommentFull);

  const { result } = renderHook(() => useUpdateComment());

  await act(async () => {
    await result.current.updateComment(mockComment);
  });

  expect(result.current.updateCommentError).toBe("");
});

test("does not update updatedCommentsList when service throws", async () => {
  mockUpdateCommentService.mockRejectedValueOnce(new Error("service error"));

  const { result } = renderHook(() => useUpdateComment());

  await act(async () => {
    await result.current.updateComment(mockComment);
  });

  expect(result.current.updatedCommentsList).toBeNull();
});
