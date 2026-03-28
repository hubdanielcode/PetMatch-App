import type { Pet } from "./../types/pet";
import { supabase } from "../../../../supabase/supabase";

/* - Create - */

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

/* - Read - */

const getPets = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("pets")
    .select("*")
    .eq("user_id", user.id);

  if (error) {
    throw new Error("Erro ao retornar pets!");
  }
  return data;
};

/* - Update - */

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

/* - Delete - */

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

export { createPet, getPets, updatePet, deletePet };
