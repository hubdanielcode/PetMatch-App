import { test, expect, vi, beforeEach } from "vitest";
import {
  createPet,
  getPets,
  updatePet,
  deletePet,
  uploadPetPhoto,
  getAllPets,
  validateDocument,
} from "@/features/pet-registration/services/petService";
import type { Pet } from "@/features/pet-registration/types/pet";

/* - Criando os mocks - */

const {
  mockSingle,
  mockSelect,
  mockInsert,
  mockUpdate,
  mockDelete,
  mockFrom,
  mockUpload,
  mockGetPublicUrl,
  mockGetUser,
} = vi.hoisted(() => ({
  mockSingle: vi.fn(),
  mockSelect: vi.fn(),
  mockInsert: vi.fn(),
  mockUpdate: vi.fn(),
  mockDelete: vi.fn(),
  mockFrom: vi.fn(),
  mockUpload: vi.fn(),
  mockGetPublicUrl: vi.fn(),
  mockGetUser: vi.fn(),
}));

vi.mock("../../../../supabase/supabase", () => ({
  supabase: {
    auth: { getUser: mockGetUser },
    from: mockFrom,
    storage: {
      from: vi.fn(() => ({
        upload: mockUpload,
        getPublicUrl: mockGetPublicUrl,
      })),
    },
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

/* - Testando upload de foto - */

test("uploads photo and returns public URL", async () => {
  mockUpload.mockResolvedValue({ error: null });
  mockGetPublicUrl.mockReturnValue({
    data: { publicUrl: "https://example.com/photo.jpg" },
  });

  const file = new File([""], "photo.png", { type: "image/png" });
  const result = await uploadPetPhoto(file, "user-123");

  expect(result).toBe("https://example.com/photo.jpg");
});

test("throws error when upload fails", async () => {
  mockUpload.mockResolvedValue({ error: true });

  const file = new File([""], "photo.png", { type: "image/png" });

  await expect(uploadPetPhoto(file, "user-123")).rejects.toThrow(
    "Erro ao fazer upload da foto.",
  );
});

/* - Testando criação de pet - */

test("creates a pet successfully", async () => {
  mockUser({ id: "user-123" });

  mockInsert.mockReturnValue({
    select: () => ({ single: mockSingle }),
  });

  mockSingle.mockResolvedValue({
    data: { id: "pet-123", name: "Rex" },
    error: null,
  });

  const result = await createPet({ name: "Rex" } as Omit<
    Pet,
    "id" | "created_at" | "user_id"
  >);

  expect(result).toEqual({ id: "pet-123", name: "Rex" });
});

test("throws error when user is not authenticated on createPet", async () => {
  mockUser(null);

  await expect(
    createPet({} as Omit<Pet, "id" | "created_at" | "user_id">),
  ).rejects.toThrow("Usuário não autenticado!");
});

test("throws error when insert fails", async () => {
  mockUser({ id: "user-123" });

  mockInsert.mockReturnValue({
    select: () => ({ single: mockSingle }),
  });

  mockSingle.mockResolvedValue({
    data: null,
    error: { message: "insert error" },
  });

  await expect(
    createPet({ name: "Rex" } as Omit<Pet, "id" | "created_at" | "user_id">),
  ).rejects.toThrow("Erro ao cadastrar pets!");
});

/* - Testando busca de pets do usuário - */

test("throws error when user is not authenticated on getPets", async () => {
  mockUser(null);

  await expect(getPets()).rejects.toThrow("Usuário não autenticado!");
});

test("returns pets with city and state from tutor", async () => {
  mockUser({ id: "user-123" });

  mockSelect
    .mockReturnValueOnce({
      eq: vi.fn().mockResolvedValue({
        data: [{ id: "pet-123", user_id: "user-123" }],
        error: null,
      }),
    })
    .mockReturnValueOnce({
      eq: vi.fn().mockReturnValue({
        single: mockSingle,
      }),
    });

  mockSingle.mockResolvedValue({
    data: { city: "Salvador", state: "BA" },
    error: null,
  });

  const result = await getPets();

  expect(result?.[0].city).toBe("Salvador");
  expect(result?.[0].state).toBe("BA");
});

test("throws error when fetching pets fails on getPets", async () => {
  mockUser({ id: "user-123" });

  mockSelect.mockReturnValueOnce({
    eq: vi.fn().mockResolvedValue({
      data: null,
      error: { message: "fetch error" },
    }),
  });

  await expect(getPets()).rejects.toThrow("Erro ao retornar pets!");
});

/* - Testando atualização de pet - */

test("throws error when user is not authenticated on updatePet", async () => {
  mockUser(null);

  await expect(
    updatePet({ id: "pet-123" } as Omit<Pet, "created_at">),
  ).rejects.toThrow("Usuário não autenticado!");
});

test("updates a pet successfully", async () => {
  mockUser({ id: "user-123" });

  mockUpdate.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: mockSingle,
      }),
    }),
  });

  mockSingle.mockResolvedValue({
    data: { id: "pet-123", name: "Rex" },
    error: null,
  });

  const result = await updatePet({ id: "pet-123" } as Omit<Pet, "created_at">);

  expect(result.id).toBe("pet-123");
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
    updatePet({ id: "pet-123" } as Omit<Pet, "created_at">),
  ).rejects.toThrow("Erro ao atualizar pet. ID necessário para atualização!");
});

/* - Testando deleção de pet - */

test("throws error when user is not authenticated on deletePet", async () => {
  mockUser(null);

  await expect(deletePet("pet-123")).rejects.toThrow(
    "Usuário não autenticado!",
  );
});

test("deletes a pet successfully", async () => {
  mockUser({ id: "user-123" });

  mockDelete.mockReturnValue({
    eq: vi.fn().mockReturnValue({
      select: vi.fn().mockReturnValue({
        single: mockSingle,
      }),
    }),
  });

  mockSingle.mockResolvedValue({
    data: { id: "pet-123" },
    error: null,
  });

  const result = await deletePet("pet-123");

  expect(result.id).toBe("pet-123");
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

  await expect(deletePet("pet-123")).rejects.toThrow(
    "Erro ao deletar pet. ID necessário para deleção!",
  );
});

/* - Testando busca de todos os pets - */

test("returns all pets with city and state", async () => {
  const mockEq = vi.fn().mockReturnValue({ single: mockSingle });

  mockFrom
    .mockReturnValueOnce({
      select: vi.fn().mockResolvedValue({
        data: [{ id: "pet-123", user_id: "user-123" }],
        error: null,
      }),
    })
    .mockReturnValueOnce({
      select: vi.fn().mockReturnValue({ eq: mockEq }),
    });

  mockSingle.mockResolvedValue({
    data: { city: "Salvador", state: "BA" },
    error: null,
  });

  const result = await getAllPets();

  expect(result[0].city).toBe("Salvador");
  expect(result[0].state).toBe("BA");
});

test("throws error when fetching all pets fails", async () => {
  mockFrom.mockReturnValueOnce({
    select: vi.fn().mockResolvedValue({
      data: null,
      error: { message: "fetch error" },
    }),
  });

  await expect(getAllPets()).rejects.toThrow("Erro ao buscar pets!");
});

test("returns null city and state when tutor not found", async () => {
  const mockEq = vi.fn().mockReturnValue({ single: mockSingle });

  mockFrom
    .mockReturnValueOnce({
      select: vi.fn().mockResolvedValue({
        data: [{ id: "pet-123", user_id: "user-123" }],
        error: null,
      }),
    })
    .mockReturnValueOnce({
      select: vi.fn().mockReturnValue({ eq: mockEq }),
    });

  mockSingle.mockResolvedValue({
    data: null,
    error: null,
  });

  const result = await getAllPets();

  expect(result[0].city).toBeNull();
  expect(result[0].state).toBeNull();
});

/* - Testando validação de documentos - */

const setupFileReaderMock = () => {
  class MockFileReader {
    result = "data:image/png;base64,AAA";
    onload: (() => void) | null = null;

    readAsDataURL() {
      this.onload?.();
    }
  }

  vi.stubGlobal("FileReader", MockFileReader as unknown as typeof FileReader);
};

const setupFetchMock = (
  tipoDocumento: string,
  confianca: number,
  ok = true,
) => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      json: () =>
        Promise.resolve({
          content: [
            {
              type: "text",
              text: JSON.stringify({
                tipo_documento: tipoDocumento,
                confianca,
                motivo: "motivo teste",
              }),
            },
          ],
        }),
    }),
  ) as unknown as typeof fetch;
};

test("returns isValid true for a valid vaccination card", async () => {
  setupFileReaderMock();
  setupFetchMock("carteira_vacinacao", 90);

  const file = new File([""], "doc.png", { type: "image/png" });
  const result = await validateDocument(file, "vaccination_card");

  expect(result.isValid).toBe(true);
  expect(result.confidence).toBe(90);
});

test("returns isValid false when confidence is below 80", async () => {
  setupFileReaderMock();
  setupFetchMock("carteira_vacinacao", 50);

  const file = new File([""], "doc.png", { type: "image/png" });
  const result = await validateDocument(file, "vaccination_card");

  expect(result.isValid).toBe(false);
});

test("returns isValid false when document type does not match", async () => {
  setupFileReaderMock();
  setupFetchMock("outro", 95);

  const file = new File([""], "doc.png", { type: "image/png" });
  const result = await validateDocument(file, "vaccination_card");

  expect(result.isValid).toBe(false);
});

test("throws error when fetch fails", async () => {
  setupFileReaderMock();

  globalThis.fetch = vi.fn(() =>
    Promise.resolve({ ok: false, json: () => Promise.resolve({}) }),
  ) as unknown as typeof fetch;

  const file = new File([""], "doc.png", { type: "image/png" });

  await expect(validateDocument(file, "vaccination_card")).rejects.toThrow(
    "Erro ao validar documento!.",
  );
});

test("returns isValid true for a valid pedigree", async () => {
  setupFileReaderMock();
  setupFetchMock("pedigree", 85);

  const file = new File([""], "pedigree.png", { type: "image/png" });
  const result = await validateDocument(file, "pedigree");

  expect(result.isValid).toBe(true);
  expect(result.confidence).toBe(85);
});
