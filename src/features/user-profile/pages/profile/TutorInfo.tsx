import { FaPenAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import { MdMail, MdPhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { EditProfileModal } from "../modal/EditProfileModal";
import { useGetTutors, useGetPets } from "../../../pet-registration";
import { FaCamera } from "react-icons/fa";
import {
  updateTutor,
  uploadTutorPhoto,
} from "../../../pet-registration/services/tutorService";
import { supabase } from "../../../../../supabase/supabase";

const TutorInfo = ({ user_id }: { user_id: string }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { getTutors, tutor } = useGetTutors();
  const { getPets, pets } = useGetPets();

  useEffect(() => {
    const fetchInformation = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        getTutors(user.id);
        getPets();
      }
    };
    fetchInformation();
  }, []);

  return (
    <div className="flex flex-col bg-white dark:bg-gray-800 p-5 sm:p-8 m-8 sm:mx-[10%] lg:mx-[15%] w-auto sm:w-[80%] lg:w-[70%] border border-black/40 dark:border-white/20 rounded-lg mt-6 sm:mt-10 gap-6">
      {/* - Cabeçalho - */}

      <div className="flex justify-between border-b border-black/20 dark:border-white/20 pb-4">
        <span className="text-black dark:text-white font-bold text-xl sm:text-2xl">
          Informações do Tutor
        </span>

        <div
          className="flex border border-black/40 dark:border-white/20 bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 rounded-lg px-3 sm:px-4 py-2 font-semibold cursor-pointer text-white text-sm sm:text-base"
          role="button"
          onClick={() => setIsEditModalOpen(!isEditModalOpen)}
        >
          <FaPenAlt className="h-4 w-4 my-1 mr-2 text-white" />
          Editar
        </div>
      </div>

      {isEditModalOpen && (
        <EditProfileModal
          onClose={() => setIsEditModalOpen(false)}
          userId={user_id}
          onSave={() => {
            getTutors(user_id);
            setIsEditModalOpen(false);
          }}
        />
      )}

      {/* - Foto e Nome - */}

      <div className="flex items-center gap-4 relative">
        <div className="rounded-full h-16 w-16 sm:h-20 sm:w-20 border border-black/40 dark:border-white/20 flex items-center justify-center shrink-0 overflow-hidden bg-linear-to-br from-amber-600 via-orange-600 to-red-600">
          {tutor?.photo_url ? (
            <img
              src={tutor.photo_url}
              alt={tutor.name}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <span className="text-white font-bold text-xl sm:text-2xl">
              {tutor?.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        {/* - Botão de adicionar foto de perfil - */}

        <input
          type="file"
          id="tutor-photo"
          accept="image/*"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const {
              data: { user },
            } = await supabase.auth.getUser();
            if (!user) return;
            const photoUrl = await uploadTutorPhoto(file, user.id);
            await updateTutor({ ...tutor!, photo_url: photoUrl });
            getTutors(user_id);
          }}
        />

        <div
          className="flex justify-center items-center h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-black dark:bg-gray-600 cursor-pointer absolute bottom-0 left-10 sm:left-14 hover:bg-[#333] dark:hover:bg-gray-500"
          role="button"
          onClick={() => document.getElementById("tutor-photo")?.click()}
        >
          <FaCamera className="text-white text-xs sm:text-sm" />
        </div>

        <div className="flex flex-col min-w-0">
          <p className="text-black dark:text-white font-semibold text-xl sm:text-2xl truncate">
            {tutor?.name}
          </p>
          <p className="text-sm text-black/70 dark:text-white/70">
            Tutor de {pets.length} {pets.length === 1 ? "pet" : "pets"}
          </p>
        </div>
      </div>

      {/* - Email - */}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-black/70 dark:text-white/70">
          Email
        </label>
        <div className="flex items-center border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 px-4 py-2 gap-3">
          <MdMail className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="font-semibold text-sm sm:text-base break-all text-black dark:text-white">
            {tutor?.email}
          </p>
        </div>
      </div>

      {/* - Telefone - */}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-black/70 dark:text-white/70">
          Telefone
        </label>
        <div className="flex items-center border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 px-4 py-2 gap-3">
          <MdPhone className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="font-semibold text-sm sm:text-base text-black dark:text-white">
            {tutor?.phone}
          </p>
        </div>
      </div>

      {/* - Localização - */}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-black/70 dark:text-white/70">
          Localização
        </label>
        <div className="flex items-center border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 px-4 py-2 gap-3">
          <FaLocationDot className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="font-semibold text-sm sm:text-base text-black dark:text-white">
            {tutor?.city}{" "}
            <span className="text-sm font-semibold text-black/70 dark:text-white/50">
              /
            </span>{" "}
            {tutor?.state}
          </p>
        </div>
      </div>
    </div>
  );
};

export { TutorInfo };
