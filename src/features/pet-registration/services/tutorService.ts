import type { Tutor } from "./../types/tutor";
import { supabase } from "../../../../supabase/supabase";

/* - C.R.U.D de tutores - */

// 1. Create

const createTutor = async (
  tutor: Omit<Tutor, "id" | "created_at" | "validated_at" | "user_id">,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("tutors")
    .insert({ ...tutor, user_id: user.id });

  console.log("createTutor data:", data, "error:", error);

  if (error) {
    throw new Error("Erro ao cadastrar tutor!");
  }
  return data;
};

// 2. Read

const getTutors = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("tutors")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw new Error("Erro ao retornar tutores cadastrados!");
  }
  return data;
};

// 3. Update

const updateTutor = async (tutor: Omit<Tutor, "created_at">) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("tutors")
    .update(tutor)
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw new Error(
      "Erro ao atualizar dados do tutor. ID necessário para atualização!",
    );
  }
  return data;
};

// 4. Delete

const deleteTutor = async (id: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("tutors")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(
      "Erro ao deletar dados do tutor. ID necessário para deleção!",
    );
  }
  return data;
};

export { createTutor, getTutors, updateTutor, deleteTutor };
