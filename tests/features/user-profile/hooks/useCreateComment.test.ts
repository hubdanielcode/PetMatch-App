import { renderHook, act } from "@testing-library/react";
import { vi, test, expect, beforeEach } from "vitest";
import { useCreateComment } from "@/features/user-profile";
import type { Comment } from "@/features/user-profile";

/* - Criando os Mocks hoistados - */

const { mockCreateCommentService } = vi.hoisted(() => ({
  mockCreateCommentService: vi.fn(),
}));

vi.mock("@/features/user-profile/services/commentService", () => ({
  createComment: mockCreateCommentService,
}));

const mockComment: Omit<Comment, "id" | "user_id" | "created_at"> = {
  pet_id: "pet-123",
  name: "João Silva",
  rating: 5,
  text: "Ótimo pet!",
};

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Testando o estado inicial - */

test("initializes with empty error and isLoading false", () => {
  const { result } = renderHook(() => useCreateComment());

  expect(result.current.createCommentError).toBe("");
  expect(result.current.isLoading).toBe(false);
});

/* - Testando o createComment - */

test("sets isLoading to true while creating a comment", async () => {
  mockCreateCommentService.mockImplementation(
    () => new Promise((resolve) => setTimeout(resolve, 100)),
  );

  const { result } = renderHook(() => useCreateComment());

  act(() => {
    result.current.createComment(mockComment);
  });

  expect(result.current.isLoading).toBe(true);
});

test("sets isLoading to false after comment is created successfully", async () => {
  mockCreateCommentService.mockResolvedValueOnce({});

  const { result } = renderHook(() => useCreateComment());

  await act(async () => {
    await result.current.createComment(mockComment);
  });

  expect(result.current.isLoading).toBe(false);
});

test("calls createCommentService with the correct comment", async () => {
  mockCreateCommentService.mockResolvedValueOnce({});

  const { result } = renderHook(() => useCreateComment());

  await act(async () => {
    await result.current.createComment(mockComment);
  });

  expect(mockCreateCommentService).toHaveBeenCalledWith(mockComment);
});

test("sets createCommentError when service throws", async () => {
  mockCreateCommentService.mockRejectedValueOnce(new Error("service error"));

  const { result } = renderHook(() => useCreateComment());

  await act(async () => {
    await result.current.createComment(mockComment);
  });

  expect(result.current.createCommentError).toBe("Erro ao criar comentário!");
});

test("sets isLoading to false after service throws", async () => {
  mockCreateCommentService.mockRejectedValueOnce(new Error("service error"));

  const { result } = renderHook(() => useCreateComment());

  await act(async () => {
    await result.current.createComment(mockComment);
  });

  expect(result.current.isLoading).toBe(false);
});

test("does not set error when comment is created successfully", async () => {
  mockCreateCommentService.mockResolvedValueOnce({});

  const { result } = renderHook(() => useCreateComment());

  await act(async () => {
    await result.current.createComment(mockComment);
  });

  expect(result.current.createCommentError).toBe("");
});
