import type { Pet } from "./../types/pet";
import { supabase } from "../../../../supabase/supabase";

/* - Upload da foto - */

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

/* - Validação de documento usando - */

const validateDocument = async (
  file: File,
  documentType: "vaccination_card" | "pedigree",
) => {
  // Convertendo o arquivo para base64

  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = () => reject(new Error("Erro ao ler o arquivo."));
    reader.readAsDataURL(file);
  });

  const mediaType = file.type as "image/jpeg" | "image/png" | "image/webp";

  const expectedType =
    documentType === "vaccination_card" ? "carteira_vacinacao" : "pedigree";

  const prompt =
    documentType === "vaccination_card"
      ? `Analise esta imagem e responda APENAS em JSON, sem texto adicional:
         { "tipo_documento": "carteira_vacinacao" | "outro", "é_valido": true | false, "confianca": 0-100, "motivo": "explicação breve" }
         Critérios: deve conter registros de vacinas, datas, assinaturas ou carimbos veterinários.`
      : `Analise esta imagem e responda APENAS em JSON, sem texto adicional:
         { "tipo_documento": "pedigree" | "outro", "é_valido": true | false, "confianca": 0-100, "motivo": "explicação breve" }
         Critérios: deve conter árvore genealógica, registro de raça ou entidade certificadora (ex: CBKC).`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: { type: "base64", media_type: mediaType, data: base64 },
            },
            { type: "text", text: prompt },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Erro ao validar documento!.");
  }

  const result = await response.json();
  const text = result.content
    .map((item: { type: string; text?: string }) => item.text || "")
    .join("");
  const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());

  return {
    isValid: parsed.tipo_documento === expectedType && parsed.confianca >= 80,
    confidence: parsed.confianca,
    reason: parsed.motivo,
  };
};

/* - Buscando todos os pets - */

const getAllPets = async () => {
  const { data: pets, error: petError } = await supabase
    .from("pets")
    .select("*");

  if (petError) {
    throw new Error("Erro ao buscar pets!");
  }

  const petsWithLocation = await Promise.all(
    pets.map(async (pet) => {
      const { data: tutor } = await supabase
        .from("tutors")
        .select("city, state")
        .eq("user_id", pet.user_id)
        .single();
      console.log(tutor);

      return {
        ...pet,
        city: tutor?.city ?? null,
        state: tutor?.state ?? null,
      };
    }),
  );
  console.log(pets);
  return petsWithLocation;
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
    .insert({ ...pet, user_id: user.id })
    .select()
    .single();

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

export {
  createPet,
  getPets,
  updatePet,
  deletePet,
  uploadPetPhoto,
  getAllPets,
  validateDocument,
};
