import { FaPenAlt } from "react-icons/fa";
import { useRegistrationContext } from "../../../pet-registration";
import { useMemo, useState } from "react";
import { MdMail, MdPhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { EditProfileModal } from "../modal/EditProfileModal";

const TutorInfo = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { photo, name, email, phoneNumber, city, state } =
    useRegistrationContext();

  const photoURL = useMemo(
    () => (photo ? URL.createObjectURL(photo) : null),
    [photo],
  );

  const myPets = [];

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
        <EditProfileModal onClose={() => setIsEditModalOpen(false)} />
      )}

      {/* - Foto e Nome - */}

      <div className="flex items-center gap-4">
        <div
          className={`rounded-full h-20 w-20 border border-black/40 flex items-center justify-center shrink-0 ${photo ? "" : "bg-linear-to-br from-amber-600 via-orange-600 to-red-600"}`}
        >
          {photo ? (
            <img
              className="rounded-full h-full w-full object-cover object-center"
              src={photoURL!}
              alt={name}
            />
          ) : (
            <span className="text-white font-bold text-2xl">
              {name?.charAt(0).toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-black font-semibold text-2xl">{name}</p>

          <p className="text-sm text-black/70">
            Tutor de {myPets.length} {myPets.length === 1 ? "pet" : "pets"}
          </p>
        </div>
      </div>

      {/* - Email - */}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-black/70">Email</label>

        <div className="flex items-center border border-black/40 rounded-lg bg-gray-200 px-4 py-2 gap-3">
          <MdMail className="h-5 w-5 text-amber-600 shrink-0" />

          <p className="font-semibold text-base">{email}</p>
        </div>
      </div>

      {/* - Telefone - */}

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-black/70">Telefone</label>

        <div className="flex items-center border border-black/40 rounded-lg bg-gray-200 px-4 py-2 gap-3">
          <MdPhone className="h-5 w-5 text-amber-600 shrink-0" />

          <p className="font-semibold text-base">{phoneNumber}</p>
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
            {city}{" "}
            <span className="text-sm font-semibold text-black/70">/</span>{" "}
            {state}
          </p>
        </div>
      </div>
    </div>
  );
};

export { TutorInfo };
