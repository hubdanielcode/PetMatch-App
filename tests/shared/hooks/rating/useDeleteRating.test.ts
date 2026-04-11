import { test, expect, vi, beforeEach } from "vitest";
import {
  createRating,
  getRatings,
  updateRating,
  deleteRating,
} from "@/shared/services/ratingService";
import type { Rating } from "@/shared/types/rating";

/* - Criando os mocks - */

const {
  mockSelect,
  mockInsert,
  mockUpdate,
  mockDelete,
  mockFrom,
  mockGetUser,
} = vi.hoisted(() => ({
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

/* - Criando uma função para buscar o usuário autenticado - */

const mockUser = (user: { id: string } | null) => {
  mockGetUser.mockResolvedValue({
    data: { user },
  } as never);
};

const fakeRating = {
  pet_id: "pet-123",
  rating: 5,
  comment: "Ótimo!",
};

/* - Testando criação de avaliação - */

test("creates a rating successfully", async () => {
  mockUser({ id: "user-123" });

  mockInsert.mockResolvedValue({ data: null, error: null });

  const result = await createRating(
    fakeRating as Omit<Rating, "id" | "created_at" | "user_id">,
  );

  expect(result).toBeNull();
});

test("throws error when user is not authenticated on createRating", async () => {
  mockUser(null);

  await expect(
    createRating(fakeRating as Omit<Rating, "id" | "created_at" | "user_id">),
  ).rejects.toThrow("Usuário não autenticado!");
});

test("throws error when insert fails on createRating", async () => {
  mockUser({ id: "user-123" });

  mockInsert.mockResolvedValue({
    data: null,
    error: { message: "insert error" },
  });

  await expect(
    createRating(fakeRating as Omit<Rating, "id" | "created_at" | "user_id">),
  ).rejects.toThrow("Erro ao adicionar avaliação!");
});

/* - Testando busca de avaliações - */

test("returns ratings successfully", async () => {
  mockUser({ id: "user-123" });

  mockSelect.mockReturnValue({
    eq: vi.fn().mockResolvedValue({
      data: [{ id: "rating-123", pet_id: "pet-123", rating: 5 }],
      error: null,
    }),
  });

  const result = await getRatings("pet-123");

  expect(result?.[0].id).toBe("rating-123");
});

test("throws error when user is not authenticated on getRatings", async () => {
  mockUser(null);

  await expect(getRatings("pet-123")).rejects.toThrow(
    "Usuário não autenticado!",
  );
});

test("throws error when fetching ratings fails", async () => {
  mockUser({ id: "user-123" });

  mockSelect.mockReturnValue({
    eq: vi.fn().mockResolvedValue({
      data: null,
      error: { message: "fetch error" },
    }),
  });

  await expect(getRatings("pet-123")).rejects.toThrow(
    "Erro ao retornar avaliações!",
  );
});

/* - Testando atualização de avaliação - */

test("updates a rating successfully", async () => {
  mockUser({ id: "user-123" });

  mockUpdate.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      select: vi.fn().mockResolvedValue({
        data: [{ id: "rating-123", rating: 4 }],
        error: null,
      }),
    }),
  });

  const result = await updateRating({ id: "rating-123", ...fakeRating } as Omit<
    Rating,
    "created_at"
  >);

  expect(result?.[0].id).toBe("rating-123");
});

test("throws error when user is not authenticated on updateRating", async () => {
  mockUser(null);

  await expect(
    updateRating({ id: "rating-123", ...fakeRating } as Omit<
      Rating,
      "created_at"
    >),
  ).rejects.toThrow("Usuário não autenticado!");
});

test("throws error when update fails", async () => {
  mockUser({ id: "user-123" });

  mockUpdate.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      select: vi.fn().mockResolvedValue({
        data: null,
        error: { message: "update error" },
      }),
    }),
  });

  await expect(
    updateRating({ id: "rating-123", ...fakeRating } as Omit<
      Rating,
      "created_at"
    >),
  ).rejects.toThrow(
    "Erro ao atualizar avaliações! ID necessário para atualização!",
  );
});

/* - Testando deleção de avaliação - */

test("deletes a rating successfully", async () => {
  mockUser({ id: "user-123" });

  mockDelete.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      single: vi.fn().mockResolvedValue({
        data: { id: "rating-123" },
        error: null,
      }),
    }),
  });

  const result = await deleteRating("rating-123");

  expect(result.id).toBe("rating-123");
});

test("throws error when user is not authenticated on deleteRating", async () => {
  mockUser(null);

  await expect(deleteRating("rating-123")).rejects.toThrow(
    "Usuário não autenticado!",
  );
});

test("throws error when delete fails", async () => {
  mockUser({ id: "user-123" });

  mockDelete.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      single: vi.fn().mockResolvedValue({
        data: null,
        error: { message: "delete error" },
      }),
    }),
  });

  await expect(deleteRating("rating-123")).rejects.toThrow(
    "Erro ao deletar avaliações! ID necessário para deleção!",
  );
});
