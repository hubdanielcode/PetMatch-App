import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaLocationDot } from "react-icons/fa6";
import { type Pet, type Tutor } from "../../../pet-registration";
import { Badges } from "../../../../shared";
import { MdMail, MdPhone } from "react-icons/md";
import { useGetAnamnese } from "../../../pet-registration/hooks/anamnese-hooks/useGetAnamnese";
import { TesticleOptions } from "../../../pet-registration/pages/anamnese/AnamneseTesticles";
import { StarRating } from "../../../../shared/ui/StarRating";
import { useGetComments } from "../../hooks/useGetComments";
import { useUpdateComment } from "../../../user-profiile/hooks/useUpdateComment";
import {
  FaBrain,
  FaHeart,
  FaMars,
  FaStar,
  FaSyringe,
  FaUtensils,
  FaVirus,
  FaPenAlt,
  FaTrashAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { useCreateComment } from "../../hooks/useCreateComment";
import { supabase } from "../../../../../supabase/supabase";
import { getTutors } from "../../../pet-registration/services/tutorService";
import { deleteComment } from "../../services/commentService";

const PetProfile = () => {
  const { newAnamnese, getAnamnese } = useGetAnamnese();
  const { comments, getComments } = useGetComments();
  const { updateComment } = useUpdateComment();
  const { createComment } = useCreateComment();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("Usuário não autenticado!");
      }
      setUserId(user?.id ?? null);
    };
    fetchActiveUser();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const pet: Pet = location.state?.pet;

  /* - Definindo dados do tutor - */

  const [tutorPhotos, setTutorPhotos] = useState<Record<string, string>>({});
  const [tutor, setTutor] = useState<Tutor | null>(null);

  /* - Definindo comentários - */

  const [text, setText] = useState<string>("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(0);
  const [commentError, setCommentError] = useState("");

  /* - Definindo avaliações - */

  const [isRatingFormOpen, setIsRatingFormOpen] = useState(false);

  const [actualRating, setActualRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const stars = Array.from({ length: 5 }, (_, index) => index + 1);

  /* - Adicionando comentários - */

  const addComment = async () => {
    try {
      if (!actualRating) {
        setCommentError("Adicione uma avaliação!");
        return;
      }
      setCommentError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();
      const fullName = `${user?.user_metadata.firstName} ${user?.user_metadata.lastName}`;
      await createComment({
        name: fullName,
        rating: actualRating,
        text,
        pet_id: pet.id,
      });
      await getComments(pet.id);
    } catch {
      setCommentError("Erro ao adicionar comentário.");
    }
  };

  /* - Deletando comentários - */

  const handleDeleteComment = async (id: string) => {
    await deleteComment(id);
    await getComments(pet.id);
  };

  /* - Editando comentários (até um minuto após a postagem) - */

  const handleEditComment = async (id: string) => {
    if (!editRating) throw new Error("Adicione uma avaliação!");
    const comment = comments.find((comment) => comment.id === id);

    if (!comment) {
      return;
    }

    await updateComment({ ...comment, text: editText, rating: editRating });
    await getComments(pet.id);
    setEditingId(null);
  };

  /* - Calculando a média das avaliações - */

  const handleCalculateRating = (rating: number[]): number => {
    if (rating.length === 0) {
      return 0;
    }
    const realRatingValue = rating.reduce(
      (accumulator, rating) => accumulator + rating,
      0,
    );
    return realRatingValue / rating.length;
  };

  useEffect(() => {
    const fetch = async () => {
      getAnamnese(pet.id);
      getComments(pet.id);
      const data = await getTutors(pet.user_id);
      setTutor(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (comments.length === 0) return;

    comments.map(async (comment) => {
      const tutor = await getTutors(comment.user_id);

      if (tutor?.photo_url) {
        setTutorPhotos((prev) => ({
          ...prev,
          [comment.user_id]: tutor.photo_url,
        }));
      }
    });
  }, [comments]);

  return (
    <div className="flex flex-col p-3 sm:p-5 bg-linear-to-br from-amber-100 via-orange-100 to-red-100 min-h-screen w-full">
      {/* Botão voltar */}
      <div className="w-full sm:w-[50%] sm:mx-[12%] mb-4 flex">
        <button
          className="flex items-center text-black font-semibold px-4 py-2 cursor-pointer hover:bg-linear-to-br hover:from-amber-200 hover:via-orange-200 hover:to-red-200 rounded-lg"
          type="button"
          onClick={() => navigate("/pagina-principal", { replace: true })}
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </button>
      </div>

      {/* - Carta do pet + Informações do tutor - */}

      <div className="flex flex-col lg:flex-row lg:items-start px-0 sm:px-[12%] lg:px-0">
        {/* Carta do pet */}
        <div className="flex flex-col mx-3 sm:mx-0 lg:ml-[12%] lg:mr-[2%] bg-white border border-black/40 rounded-xl w-auto lg:w-[40%]">
          <img
            className="w-full h-64 sm:h-96 lg:h-130 object-cover object-center rounded-t-xl"
            src={pet?.photo_url}
            alt={pet?.name}
          />

          <div className="flex flex-col p-3 relative">
            <div className="flex items-start">
              <p className="text-xl sm:text-2xl text-black font-bold ml-2 sm:ml-4 mb-2 whitespace-nowrap">
                {pet?.name}
              </p>

              <div className="flex w-full justify-end">
                <StarRating
                  className="mt-1"
                  reviews={comments.length || undefined}
                  rating={handleCalculateRating(
                    comments.map((comment) => comment.rating),
                  )}
                />
              </div>
            </div>

            <p className="text-sm sm:text-lg text-black/70 mx-2 sm:mx-4">
              {pet?.breed ?? "Raça indisponível"} •{" "}
              {pet?.gender ?? "Gênero indisponível"} •{" "}
              {(() => {
                const petAge = Number(pet?.age ?? 0);
                return petAge < 12
                  ? `${petAge} ${petAge === 1 ? "Mês" : "Meses"}`
                  : `${Math.floor(petAge / 12)} ${Math.floor(petAge / 12) === 1 ? "Ano" : "Anos"}`;
              })()}
            </p>

            <div className="mt-2 mx-1 sm:mx-0">
              <Badges
                size="md"
                species={pet?.species as "Cachorro" | "Gato"}
                mated={pet?.mated}
                pedigree={pet?.pedigree ?? false}
                vaccinated={pet?.vaccinated}
                cryptorchidism_bilateral={pet?.cryptorchidism_bilateral}
                cryptorchidism_unilateral={pet?.cryptorchidism_unilateral}
              />
            </div>
          </div>
        </div>

        {/* - Informações do tutor - */}

        <div className="bg-white border border-black/40 rounded-xl p-5 sm:p-6 flex flex-col gap-4 mx-3 sm:mx-0 mt-4 lg:mt-0 lg:w-90 shrink-0">
          <p className="text-lg font-bold text-black border-b border-black/20 pb-3">
            Informações do Tutor
          </p>

          <div className="flex items-center gap-3">
            <div className="rounded-full h-12 w-12 flex items-center justify-center shrink-0 bg-linear-to-br from-amber-600 via-orange-600 to-red-600">
              <div className="rounded-full h-12 w-12 border border-black/40 flex items-center justify-center shrink-0 overflow-hidden bg-linear-to-br from-amber-600 via-orange-600 to-red-600">
                {tutor?.photo_url ? (
                  <img
                    src={tutor.photo_url}
                    alt={tutor.name}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <span className="text-white font-bold text-2xl">
                    {tutor?.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <p className="text-black font-semibold text-lg">{tutor?.name}</p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-black/70">
            <div className="flex items-center gap-3">
              <FaLocationDot className="h-4 w-4 text-amber-600 shrink-0" />
              <p>
                {pet?.city && pet?.state ? `${pet.city}, ${pet.state}` : "—"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <MdMail className="h-4 w-4 text-amber-600 shrink-0" />
              <p className="break-all">{tutor?.email}</p>
            </div>

            <div className="flex items-center gap-3">
              <MdPhone className="h-4 w-4 text-amber-600 shrink-0" />
              <p>{tutor?.phone}</p>
            </div>
          </div>

          <a
            href={`https://wa.me/${tutor?.phone?.replace(/\D/g, "")}?text=${encodeURIComponent(
              `Olá! Vi o perfil ${pet.gender === "Macho" ? "do" : "da"} ${pet.name} no PetMatch e gostaria de conversar sobre um possível cruzamento!`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-lg px-4 py-2 transition-colors"
          >
            <FaWhatsapp className="h-5 w-5" />
            Entrar em Contato
          </a>

          <p className="text-xs text-black/70 text-center">
            Ao clicar, você será direcionado para o WhatsApp do tutor.
          </p>
        </div>
      </div>

      {/* - Seção da anamnese - */}

      <div className="flex flex-col mx-3 sm:mx-[12%] lg:ml-[12%] lg:mr-[2%] mt-8 bg-white border border-black/40 rounded-xl lg:w-[40%] p-5 sm:p-6 shrink-0 h-full">
        <div className="flex flex-col mb-2">
          <p className="text-xl font-bold text-black border-b border-black/20 pb-3">
            Resumo da Anamnese
          </p>

          {/* - Passo 1: Alimentação - */}

          <div className="flex items-center gap-2 py-3">
            <div className="w-7 h-7 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
              <FaUtensils className="w-4 h-4" />
            </div>
            <p className="text-md font-semibold text-black">Alimentação</p>
          </div>

          <p className="text-sm text-black/70 w-full mb-3">
            {newAnamnese?.feeding_info}
          </p>
        </div>

        {/* - Passo 2: Passeios - */}

        <div className="flex flex-col border-t border-black/20 mb-2">
          <div className="flex items-center gap-2 py-2">
            <div className="w-7 h-7 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
              <FaUtensils className="w-4 h-4" />
            </div>
            <p className="text-md font-semibold text-black">Passeios</p>
          </div>

          <p className="text-sm text-black/70 w-full mb-3">
            {newAnamnese?.walks_info}
          </p>
        </div>

        {/* - Passo 3: Comportamento - */}

        <div className="flex flex-col border-t border-black/20 mb-2">
          <div className="flex items-center gap-2 py-2">
            <div className="w-7 h-7 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
              <FaBrain className="w-4 h-4" />
            </div>
            <p className="text-md font-semibold text-black">Comportamento</p>
          </div>

          <p className="text-sm text-black/70 w-full mb-3">
            {newAnamnese?.behavior_info}
          </p>
        </div>

        {/* - Passo 4: Histórico de cirurgias - */}

        <div className="flex flex-col border-t border-black/20 mb-2">
          <div className="flex items-center gap-2 py-2">
            <div className="w-7 h-7 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
              <FaSyringe className="w-4 h-4" />
            </div>
            <p className="text-md font-semibold text-black">
              Histórico de Cirurgias
            </p>
          </div>

          <p className="text-sm text-black/70 w-full mb-3">
            {newAnamnese?.surgeries_info}
          </p>
        </div>

        {/* - Passo 5: Histórico de doenças - */}

        <div className="flex flex-col border-t border-black/20 mb-2">
          <div className="flex items-center gap-2 py-2">
            <div className="w-7 h-7 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
              <FaVirus className="w-4 h-4" />
            </div>
            <p className="text-md font-semibold text-black">
              Histórico de Doenças
            </p>
          </div>

          <p className="text-sm text-black/70 w-full mb-3">
            {newAnamnese?.diseases_info}
          </p>
        </div>

        {/* - Passo 6: Testículos - */}

        {pet.gender === "Macho" && (
          <div className="flex flex-col border-t border-black/20 mb-2">
            <div className="flex items-center gap-2 py-2">
              <div className="w-7 h-7 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
                <FaMars className="w-4 h-4" />
              </div>
              <p className="text-md font-semibold text-black">Testículos</p>
            </div>

            <div className="text-sm text-black/70 w-full mb-3">
              {(() => {
                const selected = TesticleOptions.find(
                  (option) => option.value === newAnamnese?.testicles_info,
                );

                if (!selected) return null;
                return (
                  <div className="flex items-center gap-3 rounded-lg bg-gray-100 px-4 py-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-black">
                        {selected.label}
                      </p>
                      <p className="text-xs text-black/70">
                        {selected.description}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-md border px-2 py-1 text-sm font-semibold ${selected.badgeBg} ${selected.badgeBorder} ${selected.badgeText}`}
                    >
                      {selected.badge}
                    </span>
                  </div>
                );
              })()}
            </div>
          </div>
        )}

        {/* - Passo 7: Histórico reprodutivo - */}

        {pet?.mated && (
          <div className="flex flex-col mb-2">
            <div className="flex items-center gap-2 py-2">
              <div className="w-7 h-7 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
                <FaHeart className="w-4 h-4" />
              </div>
              <p className="text-md font-semibold text-black">
                Histórico Reprodutivo
              </p>
            </div>

            <p className="text-sm text-black/70 w-full mb-3">
              {newAnamnese?.reproduction_info}
            </p>
          </div>
        )}
      </div>

      {/* - Seção de comentários - */}

      <div className="flex flex-col mx-3 sm:mx-[12%] lg:ml-[12%] lg:mr-[2%] mt-8 bg-white border border-black/40 rounded-xl lg:w-[40%] p-5 sm:p-6 shrink-0 h-full">
        <div className="flex items-center">
          <p className="font-bold text-base mr-auto">
            Avaliações ({comments?.length})
          </p>

          {userId !== pet.user_id && (
            <button
              className="flex bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white font-semibold px-4 py-2 border border-black/40 rounded-lg cursor-pointer"
              type="button"
              onClick={() => setIsRatingFormOpen(!isRatingFormOpen)}
            >
              Avaliar
            </button>
          )}
        </div>

        {isRatingFormOpen && (
          <div className="w-full h-fit bg-gray-100 rounded-lg p-4 sm:p-6 my-5">
            <div>
              <label className="text-md font-semibold text-black mt-5">
                Sua Avaliação
              </label>

              <ul className="flex p-1 gap-1 sm:gap-2 mb-1">
                {stars.map((star, index) => (
                  <li key={index}>
                    <FaStar
                      className={`flex gap-3 h-8 w-8 sm:h-12 sm:w-12 cursor-pointer ${star <= (hoveredStar ?? actualRating) ? "text-amber-400" : "text-gray-400"}`}
                      onClick={() => setActualRating(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(null)}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <label className="text-md font-semibold text-black mt-5">
              Comentário
            </label>

            <textarea
              className="w-full p-3 min-h-24 sm:min-h-30 border-black-40 bg-gray-200 hover:bg-amber-50 rounded-lg focus-within:ring-2 focus-within:ring-amber-600 placeholder:text-gray-500 my-4"
              placeholder="Compartilhe a sua experiência..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="flex justify-between gap-3 px-0 sm:px-8">
              <button
                className="flex bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white font-semibold px-3 sm:px-4 py-2 border border-black/40 rounded-lg cursor-pointer text-sm sm:text-base"
                onClick={addComment}
              >
                Enviar Avaliação
              </button>

              <button
                className="flex bg-black hover:bg-gray-600 text-white font-semibold px-3 sm:px-4 py-2 border border-black/40 rounded-lg cursor-pointer text-sm sm:text-base"
                onClick={() => setIsRatingFormOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {isRatingFormOpen && (
          <div className="min-h-20">
            {commentError && (
              <p className="flex items-center justify-center h-10 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-semibold px-4 text-center my-3">
                {commentError}
              </p>
            )}
          </div>
        )}

        {comments.length > 0 ? (
          <div className="mt-4">
            <ul>
              {comments.map((comment, index) => (
                <li
                  className="flex flex-col gap-2 border-t border-black/20 py-4"
                  key={index}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 border border-black/40 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                      {tutorPhotos[comment.user_id] ? (
                        <img
                          className="h-full w-full object-cover"
                          src={tutorPhotos[comment.user_id]}
                          alt={comment.name}
                        />
                      ) : (
                        <div className="h-full w-full bg-linear-to-br from-amber-600 via-orange-600 to-red-600 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {comment.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="font-bold text-base sm:text-lg text-black truncate">
                      {comment.name}
                    </p>

                    <p className="text-xs sm:text-sm text-black/50 ml-auto shrink-0">
                      {new Date(comment.created_at).toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  <div className="flex gap-1">
                    {stars.map((star) => (
                      <FaStar
                        key={star}
                        className={`h-4 w-4 ${star <= comment.rating ? "text-amber-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-3 items-start sm:items-center">
                    <div className="text-sm text-black/70 text-start flex-1">
                      {editingId === comment.id ? (
                        <div className="flex flex-col gap-2 w-full">
                          <textarea
                            className="w-full p-3 bg-gray-200 rounded-lg"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                          />

                          <div className="flex gap-1">
                            {stars.map((star) => (
                              <FaStar
                                key={star}
                                className={`h-4 w-4 cursor-pointer ${star <= editRating ? "text-amber-400" : "text-gray-300"}`}
                                onClick={() => setEditRating(star)}
                              />
                            ))}
                          </div>

                          <div className="flex gap-3">
                            {userId === comment.user_id && (
                              <button
                                className="flex bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white font-semibold px-4 py-2 border border-black/40 rounded-lg cursor-pointer text-sm"
                                onClick={() => handleEditComment(comment.id)}
                              >
                                Salvar
                              </button>
                            )}

                            <button
                              className="flex bg-black hover:bg-gray-600 text-white font-semibold px-4 py-2 border border-black/40 rounded-lg cursor-pointer text-sm"
                              onClick={() => setEditingId(null)}
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-black/70">{comment.text}</p>
                      )}
                    </div>

                    <div className="flex shrink-0">
                      {new Date(comment.created_at).getTime() >=
                        Date.now() - 60000 && (
                        <button
                          className="rounded-lg p-2 hover:bg-gray-200 cursor-pointer text-black hover:text-blue-500 mr-1"
                          type="button"
                          onClick={() => {
                            setEditingId(comment.id);
                            setEditText(comment.text);
                            setEditRating(comment.rating);
                          }}
                        >
                          <FaPenAlt className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      )}
                      {userId === comment.user_id && (
                        <button
                          className="rounded-lg p-2 hover:bg-gray-200 cursor-pointer text-black hover:text-red-500 ml-1"
                          type="button"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <FaTrashAlt className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            {userId === pet.user_id ? (
              <p className="text-md text-black/70 text-center mt-2">
                Ainda não há avaliações para o seu pet!
              </p>
            ) : (
              <p className="text-md text-black/70 text-center mt-2">
                Ainda não há avaliações para este pet! Seja o primeiro.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export { PetProfile };
