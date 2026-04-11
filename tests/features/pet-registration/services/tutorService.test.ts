import { vi, test, expect, beforeEach } from "vitest";
import {
  getTutors,
  createTutor,
  updateTutor,
  deleteTutor,
  uploadTutorPhoto,
  toggleHasSeenWelcome,
} from "@/features/pet-registration/services/tutorService";
import type { Tutor } from "@/features/pet-registration";

/* - Criando os Mocks hoistados - */

const { mockGetUser, mockFrom, mockStorageFrom } = vi.hoisted(() => ({
  mockGetUser: vi.fn(),
  mockFrom: vi.fn(),
  mockStorageFrom: vi.fn(),
}));

vi.mock("../../../../supabase/supabase", () => ({
  supabase: {
    auth: { getUser: mockGetUser },
    from: mockFrom,
    storage: { from: mockStorageFrom },
  },
}));

const mockTutor: Omit<
  Tutor,
  "id" | "created_at" | "validated_at" | "user_id" | "has_seen_welcome"
> = {
  name: "João Silva",
  email: "joao@email.com",
  phone: "71999999999",
  street: "Rua das Flores",
  number: "123",
  complement: "",
  neighborhood: "Centro",
  city: "Salvador",
  state: "BA",
  photo_url: null,
};

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();

  mockGetUser.mockResolvedValue({
    data: { user: { id: "user-123" } },
  });
});

/* - Testando o toggleHasSeenWelcome - */

test("updates has_seen_welcome to true on success", async () => {
  mockFrom.mockReturnValueOnce({
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ error: null }),
  });

  await expect(toggleHasSeenWelcome()).resolves.not.toThrow();
  expect(mockFrom).toHaveBeenCalledWith("tutors");
});

test("throws when user is not authenticated on toggleHasSeenWelcome", async () => {
  mockGetUser.mockResolvedValueOnce({ data: { user: null } });

  await expect(toggleHasSeenWelcome()).rejects.toThrow(
    "Usuário não autenticado!",
  );
  expect(mockFrom).not.toHaveBeenCalled();
});

test("throws when supabase update returns an error on toggleHasSeenWelcome", async () => {
  mockFrom.mockReturnValueOnce({
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ error: { message: "update error" } }),
  });

  await expect(toggleHasSeenWelcome()).rejects.toThrow(
    "Erro ao atualizar has_seen_welcome!",
  );
});

/* - Testando o uploadTutorPhoto - */

test("uploads photo and returns public url on success", async () => {
  const mockFile = new File(["photo"], "photo.jpg", { type: "image/jpeg" });

  mockStorageFrom.mockReturnValue({
    upload: vi.fn().mockResolvedValue({ error: null }),
    getPublicUrl: vi.fn().mockReturnValue({
      data: { publicUrl: "https://storage.example.com/photo.jpg" },
    }),
  });

  const result = await uploadTutorPhoto(mockFile, "user-123");

  expect(mockStorageFrom).toHaveBeenCalledWith("tutor-photos");
  expect(result).toBe("https://storage.example.com/photo.jpg");
});

test("throws when storage upload returns an error", async () => {
  const mockFile = new File(["photo"], "photo.jpg", { type: "image/jpeg" });

  mockStorageFrom.mockReturnValue({
    upload: vi.fn().mockResolvedValue({ error: { message: "upload error" } }),
  });

  await expect(uploadTutorPhoto(mockFile, "user-123")).rejects.toThrow(
    "Erro ao fazer upload da foto.",
  );
});

/* - Testando o createTutor - */

test("inserts tutor and returns data on success", async () => {
  mockFrom.mockReturnValueOnce({
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockResolvedValue({ data: [mockTutor], error: null }),
  });

  const result = await createTutor(mockTutor);

  expect(mockFrom).toHaveBeenCalledWith("tutors");
  expect(result).toEqual([mockTutor]);
});

test("throws when user is not authenticated on createTutor", async () => {
  mockGetUser.mockResolvedValueOnce({ data: { user: null } });

  await expect(createTutor(mockTutor)).rejects.toThrow(
    "Usuário não autenticado!",
  );
  expect(mockFrom).not.toHaveBeenCalled();
});

test("throws when supabase insert returns an error on createTutor", async () => {
  mockFrom.mockReturnValueOnce({
    insert: vi.fn().mockReturnThis(),
    select: vi
      .fn()
      .mockResolvedValue({ data: null, error: { message: "insert error" } }),
  });

  await expect(createTutor(mockTutor)).rejects.toThrow(
    "Erro ao cadastrar tutor!",
  );
});

test("inserts tutor with user_id from authenticated user", async () => {
  const insertMock = vi.fn().mockReturnThis();
  mockFrom.mockReturnValueOnce({
    insert: insertMock,
    select: vi.fn().mockResolvedValue({ data: [mockTutor], error: null }),
  });

  await createTutor(mockTutor);

  expect(insertMock).toHaveBeenCalledWith(
    expect.objectContaining({ user_id: "user-123" }),
  );
});

/* - Testando o getTutors - */

test("returns tutor data for the given user_id", async () => {
  mockFrom.mockReturnValueOnce({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: mockTutor, error: null }),
  });

  const result = await getTutors("user-123");

  expect(mockFrom).toHaveBeenCalledWith("tutors");
  expect(result).toEqual(mockTutor);
});

test("throws when user is not authenticated on getTutors", async () => {
  mockGetUser.mockResolvedValueOnce({ data: { user: null } });

  await expect(getTutors("user-123")).rejects.toThrow(
    "Usuário não autenticado!",
  );
  expect(mockFrom).not.toHaveBeenCalled();
});

test("throws when supabase select returns an error on getTutors", async () => {
  mockFrom.mockReturnValueOnce({
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi
      .fn()
      .mockResolvedValue({ data: null, error: { message: "not found" } }),
  });

  await expect(getTutors("user-123")).rejects.toThrow(
    "Erro ao retornar tutores cadastrados!",
  );
});

test("queries tutors by the correct user_id", async () => {
  const eqMock = vi.fn().mockReturnThis();
  mockFrom.mockReturnValueOnce({
    select: vi.fn().mockReturnThis(),
    eq: eqMock,
    single: vi.fn().mockResolvedValue({ data: mockTutor, error: null }),
  });

  await getTutors("user-123");

  expect(eqMock).toHaveBeenCalledWith("user_id", "user-123");
});

/* - Testando o updateTutor - */

const mockFullTutor: Omit<Tutor, "created_at"> = {
  id: "tutor-789",
  user_id: "user-123",
  name: "João Silva",
  email: "joao@email.com",
  phone: "71999999999",
  street: "Rua das Flores",
  number: "123",
  complement: "",
  neighborhood: "Centro",
  city: "Salvador",
  state: "BA",
  photo_url: null,
  has_seen_welcome: false,
  validated_at: null,
};

test("updates tutor and returns data on success", async () => {
  mockFrom.mockReturnValueOnce({
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: mockFullTutor, error: null }),
  });

  const result = await updateTutor(mockFullTutor);

  expect(mockFrom).toHaveBeenCalledWith("tutors");
  expect(result).toEqual(mockFullTutor);
});

test("throws when user is not authenticated on updateTutor", async () => {
  mockGetUser.mockResolvedValueOnce({ data: { user: null } });

  await expect(updateTutor(mockFullTutor)).rejects.toThrow(
    "Usuário não autenticado!",
  );
  expect(mockFrom).not.toHaveBeenCalled();
});

test("throws when supabase update returns an error on updateTutor", async () => {
  mockFrom.mockReturnValueOnce({
    update: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi
      .fn()
      .mockResolvedValue({ data: null, error: { message: "update error" } }),
  });

  await expect(updateTutor(mockFullTutor)).rejects.toThrow(
    "Erro ao atualizar dados do tutor. ID necessário para atualização!",
  );
});

/* - Testando o deleteTutor - */

test("deletes tutor and returns data on success", async () => {
  mockFrom.mockReturnValueOnce({
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: mockFullTutor, error: null }),
  });

  const result = await deleteTutor("tutor-789");

  expect(mockFrom).toHaveBeenCalledWith("tutors");
  expect(result).toEqual(mockFullTutor);
});

test("throws when user is not authenticated on deleteTutor", async () => {
  mockGetUser.mockResolvedValueOnce({ data: { user: null } });

  await expect(deleteTutor("tutor-789")).rejects.toThrow(
    "Usuário não autenticado!",
  );
  expect(mockFrom).not.toHaveBeenCalled();
});

test("throws when supabase delete returns an error on deleteTutor", async () => {
  mockFrom.mockReturnValueOnce({
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi
      .fn()
      .mockResolvedValue({ data: null, error: { message: "delete error" } }),
  });

  await expect(deleteTutor("tutor-789")).rejects.toThrow(
    "Erro ao deletar dados do tutor. ID necessário para deleção!",
  );
});

test("deletes tutor by the correct id", async () => {
  const eqMock = vi.fn().mockReturnThis();
  mockFrom.mockReturnValueOnce({
    delete: vi.fn().mockReturnThis(),
    eq: eqMock,
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: mockFullTutor, error: null }),
  });

  await deleteTutor("tutor-789");

  expect(eqMock).toHaveBeenCalledWith("id", "tutor-789");
});
