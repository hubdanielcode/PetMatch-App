import { supabase } from "../../../../supabase/supabase";
import type { Comment } from "../types/comment";

/* - C.R.U.D dos comentárioss - */

// 1. Create

const createComment = async (
  comment: Omit<Comment, "id" | "created_at" | "user_id">,
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({ ...comment, user_id: user.id });

  if (error) {
    throw new Error("Falha ao salvar comentário!");
  }
  return data;
};

// 2. Read

const getComments = async (pet_id: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("pet_id", pet_id);

  if (error) {
    throw new Error("Falha ao retornar comentários sobre esse pet!");
  }
  return data;
};

// 3. Update

const updateComment = async (comment: Omit<Comment, "created_at">) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("comments")
    .update(comment)
    .eq("id", comment.id)
    .select()
    .single();

  if (error) {
    throw new Error(
      "Erro ao atualizar comentário! ID necessário para atualização!",
    );
  }

  return data;
};

const deleteComment = async (id: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Usuário não autenticado!");
  }

  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Erro ao deletar comentário! ID necessário para deleção!");
  }
  return data;
};

export { createComment, getComments, updateComment, deleteComment };
