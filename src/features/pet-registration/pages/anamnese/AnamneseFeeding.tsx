import { useState } from "react";
import { FaUtensils } from "react-icons/fa";

const AnamneseFeeding = () => {
  const [diet, setDiet] = useState("");
  return (
    <>
      {/* - Card flutuante - */}

      <div className="-mt-6 mx-4 bg-white rounded-2xl shadow-lg shadow-gray-500 px-5 py-4 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
          <FaUtensils className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Etapa 1</p>
          <p className="text-lg font-bold text-black">Alimentação</p>
        </div>
      </div>

      {/* - Conteúdo - */}

      <label
        className="px-6 text-lg font-semibold mb-3 block"
        htmlFor="pet-diet"
      >
        Como é a alimentação do seu pet? *
      </label>
      <div className="mx-6 mb-6">
        <textarea
          className="w-full border placeholder:text-gray-500 border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors p-6 min-h-80"
          id="pet-diet"
          placeholder="Descreva como é a alimentação do seu pet. 
          
Que tipo de ração ele come? Qual é a marca? Ele come só ração, ou come comidas naturais? Ele possui algum tipo de restrição ou alergia alimentar?"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
          required
          maxLength={650}
        />
      </div>
    </>
  );
};

export { AnamneseFeeding };
