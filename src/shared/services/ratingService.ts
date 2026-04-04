import type { Rating } from "../types/rating";
import { supabase } from "../../../supabase/supabase";

/* - C.R.U.D das avaliações - */

// 1. Create

const createRating = async (
  rating: Omit<Rating, "id" | "created_at" | "user_id">,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("ratings")
    .insert({ ...rating, user_id: user.id });

  if (error) {
    throw new Error("Erro ao adicionar avaliação!");
  }

  return data;
};

// 2. Read

const getRatings = async (pet_id: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("ratings")
    .select("*")
    .eq("pet_id", pet_id);

  if (error) {
    throw new Error("Erro ao retornar avaliações!");
  }

  return data;
};

// 3.Update

const updateRating = async (rating: Omit<Rating, "created_at">) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("ratings")
    .update(rating)
    .eq("id", rating.id)
    .select();

  if (error) {
    throw new Error(
      "Erro ao atualizar avaliações! ID necessário para atualização!",
    );
  }
  return data;
};

// 4. Delete

const deleteRating = async (id: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("ratings")
    .delete()
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Erro ao deletar avaliações! ID necessário para deleção!");
  }

  return data;
};

export { createRating, getRatings, updateRating, deleteRating };
