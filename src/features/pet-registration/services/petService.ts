import type { Pet } from "./../types/pet";
import { supabase } from "../../../../supabase/supabase";

/* - Upload da Foto - */

const uploadPetPhoto = async (photo: File, userId: string) => {
  const fileExtension = photo.name.split(".").pop();
  const fileName = `${userId}/${Date.now()}.${fileExtension}`;

  const { error } = await supabase.storage
    .from("pet-photos")
    .upload(fileName, photo);

  if (error) {
    throw new Error("Erro ao fazer upload da foto.");
  }

  const { data } = supabase.storage.from("pet-photos").getPublicUrl(fileName);

  return data.publicUrl;
};

/* - C.R.U.D dos pets - */

// 1. Create

const createPet = async (pet: Omit<Pet, "id" | "created_at" | "user_id">) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("pets")
    .insert({ ...pet, user_id: user.id });

  if (error) {
    throw new Error("Erro ao cadastrar pets!");
  }
  return data;
};

// 2. Read

const getPets = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data: pets, error: petsError } = await supabase
    .from("pets")
    .select("*")
    .eq("user_id", user.id);

  if (petsError) {
    throw new Error("Erro ao retornar pets!");
  }

  const { data: tutor } = await supabase
    .from("tutors")
    .select("city, state")
    .eq("user_id", user.id)
    .single();

  return pets?.map((pet) => ({
    ...pet,
    city: tutor?.city ?? null,
    state: tutor?.state ?? null,
  }));
};

// 3. Update

const updatePet = async (pet: Omit<Pet, "created_at">) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("pets")
    .update(pet)
    .eq("id", pet.id)
    .single();

  if (error) {
    throw new Error("Erro ao atualizar pet. ID necessário para atualização!");
  }
  return data;
};

// 4. Delete

const deletePet = async (id: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("pets")
    .delete()
    .eq("id", id)
    .single();
  if (error) {
    throw new Error("Erro ao deletar pet. ID necessário para deleção!");
  }
  return data;
};

export { createPet, getPets, updatePet, deletePet, uploadPetPhoto };
