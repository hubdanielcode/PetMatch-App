import { vi, test, expect, beforeEach } from "vitest";
import {
  getAnamnese,
  createAnamnese,
} from "@/features/pet-registration/services/anamneseService";
import type { Anamnese } from "@/features/pet-registration";

/* - Criando os Mocks hoistados - */

const { mockGetUser, mockFrom } = vi.hoisted(() => ({
  mockGetUser: vi.fn(),
  mockFrom: vi.fn(),
}));

vi.mock("../../../../supabase/supabase", () => ({
  supabase: {
    auth: { getUser: mockGetUser },
    from: mockFrom,
  },
}));

/* - Configurando os mocks antes de cada teste - */

const mockAnamnese: Omit<Anamnese, "id" | "created_at"> = {
  pet_id: "pet-456",
  feeding_info: "Ração",
  walks_info: "2x ao dia",
  behavior_info: "Calmo",
  surgeries_info: "",
  diseases_info: "",
  testicles_info: "2",
  reproduction_info: "Não",
};

beforeEach(() => {
  vi.clearAllMocks();

  mockGetUser.mockResolvedValue({
    data: { user: { id: "user-123" } },
  });
});

/* - Testando o createAnamnese - */

test("inserts anamnese and returns data on success", async () => {
  mockFrom.mockReturnValueOnce({
    insert: vi.fn().mockResolvedValue({ data: mockAnamnese, error: null }),
  });

  const result = await createAnamnese(mockAnamnese);

  expect(mockFrom).toHaveBeenCalledWith("anamnese");
  expect(result).toEqual(mockAnamnese);
});

test("throws when user is not authenticated on createAnamnese", async () => {
  mockGetUser.mockResolvedValueOnce({ data: { user: null } });

  await expect(createAnamnese(mockAnamnese)).rejects.toThrow(
    "Usuário não autenticado!",
  );
  expect(mockFrom).not.toHaveBeenCalled();
});

test("throws when supabase insert returns an error", async () => {
  mockFrom.mockReturnValueOnce({
    insert: vi
      .fn()
      .mockResolvedValue({ data: null, error: { message: "insert error" } }),
  });

  await expect(createAnamnese(mockAnamnese)).rejects.toThrow(
    "Erro ao salvar dados da anamnese!",
  );
});

/* - Testando o getAnamnese - */

test("returns anamnese data for the given pet_id", async () => {
  mockFrom.mockReturnValueOnce({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: mockAnamnese, error: null }),
  });

  const result = await getAnamnese("pet-456");

  expect(mockFrom).toHaveBeenCalledWith("anamnese");
  expect(result).toEqual(mockAnamnese);
});

test("throws when user is not authenticated on getAnamnese", async () => {
  mockGetUser.mockResolvedValueOnce({ data: { user: null } });

  await expect(getAnamnese("pet-456")).rejects.toThrow(
    "Usuário não autenticado!",
  );
  expect(mockFrom).not.toHaveBeenCalled();
});

test("throws when supabase select returns an error", async () => {
  mockFrom.mockReturnValueOnce({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi
      .fn()
      .mockResolvedValue({ data: null, error: { message: "not found" } }),
  });

  await expect(getAnamnese("pet-456")).rejects.toThrow(
    "Erro ao retornar dados das anamneses!",
  );
});

test("queries by the correct pet_id", async () => {
  const eqMock = vi.fn().mockReturnThis();
  mockFrom.mockReturnValueOnce({
    select: vi.fn().mockReturnThis(),
    eq: eqMock,
    single: vi.fn().mockResolvedValue({ data: mockAnamnese, error: null }),
  });

  await getAnamnese("pet-456");

  expect(eqMock).toHaveBeenCalledWith("pet_id", "pet-456");
});
