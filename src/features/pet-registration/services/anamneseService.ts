import type { Anamnese } from "../types/anamnsese";
import { supabase } from "../../../../supabase/supabase";

/* - C.R.U.D da anamnese - */

// 1. Create

const createAnamnese = async (
  anamnese: Omit<Anamnese, "id" | "created_at">,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase.from("anamnese").insert(anamnese);

  if (error) {
    throw new Error("Erro ao salvar dados da anamnese!");
  }
  return data;
};

// 2. Read

const getAnamnese = async (pet_id: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("anamnese")
    .select("*")
    .eq("pet_id", pet_id)
    .single();

  if (error) {
    throw new Error("Erro ao retornar dados das anamneses!");
  }

  return data;
};

// 3. Update

const updateAnamnese = async (
  anamnese: Omit<Anamnese, "created_at" | "id">,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("anamnese")
    .update(anamnese)
    .eq("pet_id", anamnese.pet_id)
    .single();

  if (error) {
    throw new Error(
      "Falha ao atualizar anamnese! Id necessário para atualização!",
    );
  }

  return data;
};

// 4. Delete

const deleteAnamnese = async (id: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }
  const { data, error } = await supabase
    .from("anamnese")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Falha ao deletar anamnese! Id necessário para deleção!");
  }
  return data;
};

export { createAnamnese, getAnamnese, updateAnamnese, deleteAnamnese };
