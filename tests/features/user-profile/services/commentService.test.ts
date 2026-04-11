import { test, expect, vi, beforeEach } from "vitest";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "@/features/user-profile/services/commentService";
import type { Comment } from "@/features/user-profile";

/* - Criando os mocks - */

const {
  mockSingle,
  mockSelect,
  mockInsert,
  mockUpdate,
  mockDelete,
  mockFrom,
  mockGetUser,
} = vi.hoisted(() => ({
  mockSingle: vi.fn(),
  mockSelect: vi.fn(),
  mockInsert: vi.fn(),
  mockUpdate: vi.fn(),
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
    select: mockSelect,
    insert: mockInsert,
    update: mockUpdate,
    delete: mockDelete,
  });
});

/* - Helper de usuário autenticado - */

const mockUser = (user: { id: string } | null) => {
  mockGetUser.mockResolvedValue({
    data: { user },
  } as never);
};

const fakeComment = {
  pet_id: "pet-123",
  name: "João",
  rating: 5,
  text: "Ótimo pet!",
};

/* - Testando criação de comentário - */

test("creates a comment successfully", async () => {
  mockUser({ id: "user-123" });

  mockInsert.mockResolvedValue({ data: null, error: null });

  const result = await createComment(
    fakeComment as Omit<Comment, "id" | "created_at" | "user_id">,
  );

  expect(result).toBeNull();
});

test("throws error when user is not authenticated on createComment", async () => {
  mockUser(null);

  await expect(
    createComment(
      fakeComment as Omit<Comment, "id" | "created_at" | "user_id">,
    ),
  ).rejects.toThrow("Usuário não autenticado!");
});

test("throws error when insert fails on createComment", async () => {
  mockUser({ id: "user-123" });

  mockInsert.mockResolvedValue({
    data: null,
    error: { message: "insert error" },
  });

  await expect(
    createComment(
      fakeComment as Omit<Comment, "id" | "created_at" | "user_id">,
    ),
  ).rejects.toThrow("Falha ao salvar comentário!");
});

/* - Testando busca de comentários - */

test("returns comments successfully", async () => {
  mockUser({ id: "user-123" });

  mockSelect.mockReturnValue({
    eq: vi.fn().mockResolvedValue({
      data: [{ id: "comment-123", pet_id: "pet-123", text: "Ótimo pet!" }],
      error: null,
    }),
  });

  const result = await getComments("pet-123");

  expect(result?.[0].id).toBe("comment-123");
});

test("throws error when user is not authenticated on getComments", async () => {
  mockUser(null);

  await expect(getComments("pet-123")).rejects.toThrow(
    "Usuário não autenticado!",
  );
});

test("throws error when fetching comments fails", async () => {
  mockUser({ id: "user-123" });

  mockSelect.mockReturnValue({
    eq: vi.fn().mockResolvedValue({
      data: null,
      error: { message: "fetch error" },
    }),
  });

  await expect(getComments("pet-123")).rejects.toThrow(
    "Falha ao retornar comentários sobre esse pet!",
  );
});

/* - Testando atualização de comentário - */

test("updates a comment successfully", async () => {
  mockUser({ id: "user-123" });

  mockUpdate.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: mockSingle,
      }),
    }),
  });

  mockSingle.mockResolvedValue({
    data: { id: "comment-123", text: "Atualizado!" },
    error: null,
  });

  const result = await updateComment({
    id: "comment-123",
    ...fakeComment,
  } as Omit<Comment, "created_at">);

  expect(result.id).toBe("comment-123");
});

test("throws error when user is not authenticated on updateComment", async () => {
  mockUser(null);

  await expect(
    updateComment({ id: "comment-123", ...fakeComment } as Omit<
      Comment,
      "created_at"
    >),
  ).rejects.toThrow("Usuário não autenticado!");
});

test("throws error when update fails", async () => {
  mockUser({ id: "user-123" });

  mockUpdate.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: mockSingle,
      }),
    }),
  });

  mockSingle.mockResolvedValue({
    data: null,
    error: { message: "update error" },
  });

  await expect(
    updateComment({ id: "comment-123", ...fakeComment } as Omit<
      Comment,
      "created_at"
    >),
  ).rejects.toThrow(
    "Erro ao atualizar comentário! ID necessário para atualização!",
  );
});

/* - Testando deleção de comentário - */

test("deletes a comment successfully", async () => {
  mockUser({ id: "user-123" });

  mockDelete.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: mockSingle,
      }),
    }),
  });

  mockSingle.mockResolvedValue({
    data: { id: "comment-123" },
    error: null,
  });

  const result = await deleteComment("comment-123");

  expect(result.id).toBe("comment-123");
});

test("throws error when user is not authenticated on deleteComment", async () => {
  mockUser(null);

  await expect(deleteComment("comment-123")).rejects.toThrow(
    "Usuário não autenticado!",
  );
});

test("throws error when delete fails", async () => {
  mockUser({ id: "user-123" });

  mockDelete.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: mockSingle,
      }),
    }),
  });

  mockSingle.mockResolvedValue({
    data: null,
    error: { message: "delete error" },
  });

  await expect(deleteComment("comment-123")).rejects.toThrow(
    "Erro ao deletar comentário! ID necessário para deleção!",
  );
});
