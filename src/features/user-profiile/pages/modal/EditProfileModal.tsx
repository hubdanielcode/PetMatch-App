import { useState, useEffect } from "react";
import { MdMail, MdPhone } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { regex } from "../../../../shared/utils/regex";
import { masks } from "../../../../shared/utils/masks";
import { useGetTutors, useUpdateTutor } from "../../../pet-registration";

interface EditProfileModalProps {
  onClose: () => void;
  onSave: () => void;
  userId: string;
}

const EditProfileModal = ({
  onClose,
  onSave,
  userId,
}: EditProfileModalProps) => {
  const { getTutors, tutor } = useGetTutors();
  const { updateTutor } = useUpdateTutor();

  const [localName, setLocalName] = useState("");
  const [localEmail, setLocalEmail] = useState("");
  const [localPhone, setLocalPhone] = useState("");
  const [localCity, setLocalCity] = useState("");
  const [localState, setLocalState] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (userId) getTutors(userId);
  }, [userId]);

  useEffect(() => {
    if (tutor) {
      setLocalName(tutor.name ?? "");
      setLocalEmail(tutor.email ?? "");
      setLocalPhone(tutor.phone ?? "");
      setLocalCity(tutor.city ?? "");
      setLocalState(tutor.state ?? "");
    }
  }, [tutor]);

  const handleSave = async () => {
    if (!localName || !regex.petName.test(localName))
      return setError("Nome inválido.");

    if (!localEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(localEmail))
      return setError("Email inválido.");

    if (!localPhone || !regex.phone.test(localPhone))
      return setError("Telefone inválido.");

    if (!localCity || !regex.city.test(localCity))
      return setError("Cidade inválida.");

    if (!localState || !regex.state.test(localState))
      return setError("Estado inválido.");

    await updateTutor({
      ...tutor!,
      name: localName,
      email: localEmail,
      phone: localPhone,
      city: localCity,
      state: localState,
    });

    onSave();
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-black/70 z-10">
      <div className="bg-white rounded-lg p-8 w-[50%] flex flex-col gap-6">
        <h2 className="text-black font-bold text-2xl border-b border-black/20 pb-4">
          Editar Perfil
        </h2>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black/70">Nome</label>
          <div className="flex items-center border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors px-4 py-2 gap-3">
            <FaUser className="text-amber-600 w-4 h-4 shrink-0" />
            <input
              className="bg-transparent w-full focus:outline-none text-black"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              placeholder="Seu nome"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black/70">Email</label>
          <div className="flex items-center border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors px-4 py-2 gap-3">
            <MdMail className="text-amber-600 w-5 h-5 shrink-0" />
            <input
              className="bg-transparent w-full focus:outline-none text-black"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              placeholder="Seu email"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black/70">
            Telefone
          </label>
          <div className="flex items-center border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors px-4 py-2 gap-3">
            <MdPhone className="text-amber-600 w-5 h-5 shrink-0" />
            <input
              className="bg-transparent w-full focus:outline-none text-black"
              value={localPhone}
              onChange={(e) => setLocalPhone(masks.phone(e.target.value))}
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black/70">
            Localização
          </label>
          <div className="flex items-center border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors px-4 py-2 gap-3">
            <FaLocationDot className="text-amber-600 w-5 h-5 shrink-0" />
            <input
              className="bg-transparent w-full focus:outline-none text-black"
              value={localCity}
              onChange={(e) => setLocalCity(e.target.value)}
              placeholder="Cidade"
            />
            <span className="text-black/40">/</span>
            <input
              className="bg-transparent w-16 focus:outline-none text-black"
              value={localState}
              onChange={(e) => setLocalState(e.target.value.toUpperCase())}
              placeholder="UF"
              maxLength={2}
            />
          </div>
        </div>

        {error && (
          <p className="flex items-center justify-center min-h-10 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-semibold text-center px-4">
            {error}
          </p>
        )}

        <div className="flex gap-3 justify-end mt-2">
          <button
            className="px-6 py-2 rounded-lg border border-black/40 bg-black text-white font-semibold hover:bg-gray-600 cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="border border-black/40 bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white rounded-lg font-semibold cursor-pointer px-6 py-2"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export { EditProfileModal };
