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
    <div className="flex flex-col bg-white p-8 mx-[15%] w-[70%] border border-black/40 rounded-lg mt-10 gap-6">
      {/* - Cabeçalho - */}

      <div className="flex justify-between border-b border-black/20 pb-4">
        <span className="text-black font-bold text-2xl">
          Informações do Tutor
        </span>

        <div
          className="flex border border-black/40 bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 rounded-lg px-4 py-2 font-semibold cursor-pointer text-white"
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
        <div className="rounded-full h-20 w-20 border border-black/40 flex items-center justify-center shrink-0 overflow-hidden bg-linear-to-br from-amber-600 via-orange-600 to-red-600">
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
          className="flex justify-center items-center h-7 w-7 rounded-full bg-black cursor-pointer absolute bottom-0 left-14 hover:bg-[#333]"
          role="button"
          onClick={() => document.getElementById("tutor-photo")?.click()}
        >
          <FaCamera className="text-white" />
        </div>

        <div className="flex flex-col">
          <p className="text-black font-semibold text-2xl">{tutor?.name}</p>
          <p className="text-sm text-black/70">
            Tutor de {pets.length} {pets.length === 1 ? "pet" : "pets"}
          </p>
        </div>
      </div>

      {/* - Email - */}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-black/70">Email</label>
        <div className="flex items-center border border-black/40 rounded-lg bg-gray-200 px-4 py-2 gap-3">
          <MdMail className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="font-semibold text-base">{tutor?.email}</p>
        </div>
      </div>

      {/* - Telefone - */}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-black/70">Telefone</label>
        <div className="flex items-center border border-black/40 rounded-lg bg-gray-200 px-4 py-2 gap-3">
          <MdPhone className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="font-semibold text-base">{tutor?.phone}</p>
        </div>
      </div>

      {/* - Localização - */}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-black/70">
          Localização
        </label>
        <div className="flex items-center border border-black/40 rounded-lg bg-gray-200 px-4 py-2 gap-3">
          <FaLocationDot className="h-5 w-5 text-amber-600 shrink-0" />
          <p className="font-semibold text-base">
            {tutor?.city}{" "}
            <span className="text-sm font-semibold text-black/70">/</span>{" "}
            {tutor?.state}
          </p>
        </div>
      </div>
    </div>
  );
};

export { TutorInfo };
