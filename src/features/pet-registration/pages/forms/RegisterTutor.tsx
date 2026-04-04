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
    <div className="flex flex-col justify-center p-5 bg-linear-to-br from-amber-100 via-orange-100 to-red-100 min-h-screen w-full">
      <div className="w-[50%] mx-auto mb-4 flex">
        <button
          className="flex items-center text-black font-semibold px-4 py-2 cursor-pointer hover:bg-linear-to-br hover:from-amber-200 hover:via-orange-200 hover:to-red-200 rounded-lg"
          type="button"
          onClick={onBack}
        >
          <FaArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </button>
      </div>

      <form className="flex flex-col bg-white border border-black/40 rounded-lg w-[50%] mx-auto overflow-y-auto gap-6 p-8">
        <h1 className="text-3xl font-semibold text-center border-b border-black/20 pb-4">
          Dados do Tutor
        </h1>

        {/* - Telefone - */}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-black/70">
            Telefone *
          </label>

          <div className="flex items-center border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors px-4 py-2 gap-3">
            <FaPhone className="h-4 w-4 text-amber-600 shrink-0" />
            <input
              className="w-full bg-transparent focus:outline-none placeholder:text-gray-500 text-black"
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

            <label className="text-sm font-semibold text-black/70">
              Endereço *
            </label>
          </div>

          <div className="flex flex-col gap-4 border border-black/10 rounded-lg p-4 bg-gray-50">
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block text-black/70">
                  Logradouro *
                </label>

                <input
                  className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none"
                  placeholder="Nome da rua"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>

              <div className="w-24">
                <label className="text-sm font-semibold mb-1 block text-black/70">
                  Número *
                </label>

                <input
                  className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none"
                  placeholder="Nº"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(masks.number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block text-black/70">
                  Complemento
                </label>

                <input
                  className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none"
                  placeholder="Apto, bloco..."
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                />
              </div>

              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block text-black/70">
                  Bairro *
                </label>

                <input
                  className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none"
                  placeholder="Bairro"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block text-black/70">
                  Cidade *
                </label>

                <input
                  className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none"
                  placeholder="Cidade"
                  value={city}
                  onChange={(e) => setCity(masks.city(e.target.value))}
                />
              </div>

              <div className="w-24">
                <label className="text-sm font-semibold mb-1 block text-black/70">
                  Estado *
                </label>

                <input
                  className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none"
                  placeholder="UF"
                  maxLength={2}
                  value={state}
                  onChange={(e) =>
                    setState(masks.uf(e.target.value.toUpperCase()))
                  }
                />
              </div>
            </div>

            <div className="w-40">
              <label className="text-sm font-semibold mb-1 block text-black/70">
                CEP *
              </label>

              <input
                className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none"
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
          className="bg-linear-to-r from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-6 py-2 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 cursor-pointer border border-black/40"
        >
          Cadastrar
        </button>

        {/* - Erro - */}

        <div className="min-h-12">
          {tutorRegisterError && (
            <p className="flex items-center justify-center min-h-12 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-semibold text-center py-2">
              {tutorRegisterError}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export { RegisterTutor };
