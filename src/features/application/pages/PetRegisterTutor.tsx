import { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { masks } from "../utils/petRegisterMasks";
import { regex } from "../utils/petRegisterRegex";
import { useApplicationContext } from "../hooks/useApplicationContext";

const PetRegisterTutor = () => {
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
  } = useApplicationContext();

  /* - Erro - */

  const [tutorRegisterError, setTutorRegisterError] = useState("");

  /* - Outros - */

  const completeRegistration = () => {
    if (!phoneNumber || !regex.phone.test(phoneNumber)) {
      setTutorRegisterError("Telefone inválido.");
      return;
    }

    if (!street || !regex.street.test(street)) {
      setTutorRegisterError("Logradouro inválido.");
      return;
    }

    if (!houseNumber || !regex.number.test(houseNumber)) {
      setTutorRegisterError("Número inválido.");
      return;
    }

    if (complement && !regex.complement.test(complement)) {
      setTutorRegisterError("Complemento inválido.");
      return;
    }

    if (!neighborhood || !regex.neighborhood.test(neighborhood)) {
      setTutorRegisterError("Bairro inválido.");
      return;
    }

    if (!city || !regex.city.test(city)) {
      setTutorRegisterError("Cidade inválida.");
      return;
    }

    if (!state || !regex.state.test(state)) {
      setTutorRegisterError("Estado inválido.");
      return;
    }

    setTutorRegisterError("");
  };

  return (
    <>
      {/* - Telefone - */}

      <div className="px-6 mb-6">
        <label
          className="text-lg font-semibold mb-3 block"
          htmlFor="phone"
        >
          Telefone *
        </label>
        <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-4 py-2 focus-within:ring-2 focus-within:ring-amber-500">
          <FaPhone className="h-4 w-4 mr-3 mt-1 text-amber-600" />
          <input
            className="w-full bg-transparent focus:outline-none placeholder:text-gray-500 text-black font-semibold"
            id="phone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(masks.phone(e.target.value))}
          />
        </div>
      </div>

      {/* - Endereço: Cabeçalho - */}

      <div className="px-6 mb-3 flex items-center gap-2">
        <FaLocationDot className="h-5 w-5 text-amber-600" />
        <p className="text-lg font-semibold">Endereço *</p>
      </div>

      <div className="px-6 mb-6 flex flex-col gap-4 border border-black/10 rounded-lg mx-6 p-4 bg-gray-50">
        {/* - Rua + Número - */}

        <div className="flex gap-3">
          <div className="flex-1">
            <label
              className="text-sm font-semibold mb-1 block text-gray-600"
              htmlFor="street"
            >
              Logradouro *
            </label>
            <input
              className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none placeholder:text-gray-500"
              id="street"
              type="text"
              placeholder="Nome da rua"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="w-24">
            <label
              className="text-sm font-semibold mb-1 block text-gray-600"
              htmlFor="number"
            >
              Número *
            </label>
            <input
              className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none placeholder:text-gray-500"
              id="number"
              type="text"
              placeholder="Nº"
              value={houseNumber}
              onChange={(e) => setHouseNumber(e.target.value)}
            />
          </div>
        </div>

        {/* - Complemento + Bairro - */}

        <div className="flex gap-3">
          <div className="flex-1">
            <label
              className="text-sm font-semibold mb-1 block text-gray-600"
              htmlFor="complement"
            >
              Complemento
            </label>
            <input
              className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none placeholder:text-gray-500"
              id="complement"
              type="text"
              placeholder="Apto, bloco, casa..."
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label
              className="text-sm font-semibold mb-1 block text-gray-600"
              htmlFor="neighborhood"
            >
              Bairro *
            </label>
            <input
              className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none placeholder:text-gray-500"
              id="neighborhood"
              type="text"
              placeholder="Nome do bairro"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
            />
          </div>
        </div>

        {/* - Cidade + Estado - */}

        <div className="flex gap-3">
          <div className="flex-1">
            <label
              className="text-sm font-semibold mb-1 block text-gray-600"
              htmlFor="city"
            >
              Cidade *
            </label>
            <input
              className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none placeholder:text-gray-500"
              id="city"
              type="text"
              placeholder="Nome da cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="w-24">
            <label
              className="text-sm font-semibold mb-1 block text-gray-600"
              htmlFor="state"
            >
              Estado *
            </label>
            <input
              className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none placeholder:text-gray-500"
              id="state"
              type="text"
              placeholder="UF"
              maxLength={2}
              value={state}
              onChange={(e) => setState(e.target.value.toUpperCase())}
            />
          </div>
        </div>

        {/* - CEP - */}

        <div className="w-40">
          <label
            className="text-sm font-semibold mb-1 block text-gray-600"
            htmlFor="zipcode"
          >
            CEP *
          </label>
          <input
            className="w-full min-h-10 border border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 focus:bg-amber-50 transition-colors px-4 focus:outline-none placeholder:text-gray-500"
            id="zipcode"
            type="text"
            placeholder="00000-000"
            maxLength={9}
            value={zipcode}
            onChange={(e) => setZipcode(masks.cep(e.target.value))}
          />
        </div>
      </div>

      <button
        type="button"
        className="bg-linear-to-r min-h-10 from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-6 cursor-pointer hover:from-amber-400 hover:via-orange-400 hover:to-red-400 mx-6 mb-6"
        onClick={completeRegistration}
      >
        Cadastrar
      </button>

      <div className="min-h-20">
        {tutorRegisterError && (
          <p className="flex items-center justify-center h-10 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-semibold mx-6 text-center my-3">
            {tutorRegisterError}
          </p>
        )}
      </div>
    </>
  );
};
export { PetRegisterTutor };
