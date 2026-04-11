import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { masks } from "../../../../shared/utils/masks";
import { regex } from "../../../../shared/utils/regex";
import { useRegistrationContext } from "../../hooks/context-hooks/useRegistrationContext";

interface RegisterTutorProps {
  onNext: () => void;
  onBack?: () => void;
  userId?: string;
}

const RegisterTutor = ({ onNext, onBack }: RegisterTutorProps) => {
  const {
    phoneNumber,
    setPhoneNumber,
    street,
    setStreet,
    complement,
    setComplement,
    neighborhood,
    setNeighborhood,
    houseNumber,
    setHouseNumber,
    city,
    setCity,
    state,
    setState,
    zipcode,
    setZipcode,
  } = useRegistrationContext();

  const [tutorRegisterError, setTutorRegisterError] = useState("");

  const completeRegistration = () => {
    if (!phoneNumber || !regex.phone.test(phoneNumber)) {
      return setTutorRegisterError("Telefone inválido.");
    }

    if (!street || !regex.street.test(street)) {
      return setTutorRegisterError("Logradouro inválido.");
    }

    if (!houseNumber || !regex.number.test(houseNumber)) {
      return setTutorRegisterError("Número inválido.");
    }

    if (complement && !regex.complement.test(complement)) {
      return setTutorRegisterError("Complemento inválido.");
    }

    if (!neighborhood || !regex.neighborhood.test(neighborhood)) {
      return setTutorRegisterError("Bairro inválido.");
    }

    if (!city || !regex.city.test(city)) {
      return setTutorRegisterError("Cidade inválida.");
    }

    if (!state || !regex.state.test(state)) {
      return setTutorRegisterError("Estado inválido.");
    }

    setTutorRegisterError("");
    onNext();
  };

  return (
    <div className="flex flex-col justify-center p-5 bg-linear-to-br from-amber-100 via-orange-100 to-red-100 dark:from-amber-900/90 dark:via-orange-900/90 dark:to-red-900/90 min-h-screen w-full">
      <div className="w-full sm:w-[50%] mx-auto mb-4 flex">
        <button
          className="flex items-center text-black dark:text-white font-semibold px-4 py-2 cursor-pointer hover:bg-linear-to-br hover:from-amber-200 hover:via-orange-200 hover:to-red-200 dark:hover:from-amber-600/40 dark:hover:via-orange-600/40 dark:hover:to-red-600/40 rounded-lg transition-colors"
          type="button"
          onClick={onBack}
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </button>
      </div>

      <form className="flex flex-col bg-white dark:bg-gray-800 border border-black/40 dark:border-white/20 rounded-lg w-full sm:w-[50%] mx-auto overflow-y-auto gap-6 p-8">
        <h1 className="text-3xl font-semibold text-center border-b border-black/20 dark:border-white/20 pb-4 text-black dark:text-white">
          Dados do Tutor
        </h1>

        {/* - Telefone - */}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black/70 dark:text-white/70">
            Telefone *
          </label>

          <div className="flex sm:flex-row items-center sm:items-stretch border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 transition-colors px-4 py-2 gap-3">
            <FaPhone className="h-4 w-4 text-amber-600 shrink-0" />
            <input
              className="w-full bg-transparent focus:outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 text-black dark:text-white"
              type="tel"
              placeholder="(00) 00000-0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(masks.phone(e.target.value))}
            />
          </div>
        </div>

        {/* - Endereço - */}

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <FaLocationDot className="h-5 w-5 text-amber-600" />
            <label className="text-sm font-semibold text-black/70 dark:text-white/70">
              Endereço *
            </label>
          </div>

          <div className="flex flex-col gap-4 border border-black/10 dark:border-white/10 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block text-black/70 dark:text-white/70">
                  Logradouro *
                </label>

                <input
                  className="w-full min-h-10 border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 focus:bg-amber-50 dark:focus:bg-amber-900/30 transition-colors px-4 focus:outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  placeholder="Nome da rua"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              <div className="w-full sm:w-24">
                <label className="text-sm font-semibold mb-1 block text-black/70 dark:text-white/70">
                  Número *
                </label>

                <input
                  className="w-full min-h-10 border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 focus:bg-amber-50 dark:focus:bg-amber-900/30 transition-colors px-4 focus:outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  placeholder="Nº"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(masks.number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block text-black/70 dark:text-white/70">
                  Complemento
                </label>

                <input
                  className="w-full min-h-10 border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 focus:bg-amber-50 dark:focus:bg-amber-900/30 transition-colors px-4 focus:outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  placeholder="Apto, bloco..."
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block text-black/70 dark:text-white/70">
                  Bairro *
                </label>

                <input
                  className="w-full min-h-10 border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 focus:bg-amber-50 dark:focus:bg-amber-900/30 transition-colors px-4 focus:outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  placeholder="Bairro"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block text-black/70 dark:text-white/70">
                  Cidade *
                </label>

                <input
                  className="w-full min-h-10 border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 focus:bg-amber-50 dark:focus:bg-amber-900/30 transition-colors px-4 focus:outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => setCity(masks.city(e.target.value))}
                />
              </div>

              <div className="w-full sm:w-24">
                <label className="text-sm font-semibold mb-1 block text-black/70 dark:text-white/70">
                  Estado *
                </label>

                <input
                  className="w-full min-h-10 border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 focus:bg-amber-50 dark:focus:bg-amber-900/30 transition-colors px-4 focus:outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  placeholder="UF"
                  maxLength={2}
                  value={state}
                  onChange={(e) =>
                    setState(masks.uf(e.target.value.toUpperCase()))
                  }
                />
              </div>
            </div>

            <div className="w-full sm:w-40">
              <label className="text-sm font-semibold mb-1 block text-black/70 dark:text-white/70">
                CEP *
              </label>

              <input
                className="w-full min-h-10 border border-black/40 dark:border-white/20 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-amber-50 dark:hover:bg-amber-900/30 focus:bg-amber-50 dark:focus:bg-amber-900/30 transition-colors px-4 focus:outline-none text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                placeholder="00000-000"
                value={zipcode}
                onChange={(e) => setZipcode(masks.zipcode(e.target.value))}
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={completeRegistration}
          className="bg-linear-to-r from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-6 py-2 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 cursor-pointer border border-black/40 dark:border-white/20"
        >
          Cadastrar
        </button>

        {/* - Erro - */}

        <div className="min-h-12">
          {tutorRegisterError && (
            <p className="flex items-center justify-center min-h-12 rounded-lg bg-red-100 dark:bg-red-600/40 border border-red-300 dark:border-red-500 text-red-700 dark:text-red-300 text-sm font-semibold text-center py-2">
              {tutorRegisterError}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export { RegisterTutor };
