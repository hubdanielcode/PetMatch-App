import { FaUtensils } from "react-icons/fa";

interface AnamneseFeedingProps {
  value: string;
  onChange: (value: string) => void;
}

const AnamneseFeeding = ({ value, onChange }: AnamneseFeedingProps) => {
  return (
    <div className="w-full px-4 sm:px-6 pb-6">
      {/* - Card flutuante - */}

      <div className="-mt-6 bg-white rounded-2xl shadow-lg shadow-gray-500 px-4 sm:px-5 py-4 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
          <FaUtensils className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1">
            Etapa 1
          </p>
          <p className="text-lg sm:text-xl font-bold text-black">Alimentação</p>
        </div>
      </div>

      {/* - Conteúdo - */}

      <label
        className="text-lg sm:text-xl font-semibold mb-3 block"
        htmlFor="pet-diet"
      >
        Como é a alimentação do seu pet?
      </label>

      <textarea
        className="w-full border placeholder:text-gray-500 border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors p-4 sm:p-6 h-50 resize-none"
        id="pet-diet"
        placeholder={`Descreva como é a alimentação do seu pet.

Que tipo de ração ele come? Qual é a marca? Ele come só ração, ou come comidas naturais? Ele possui algum tipo de restrição ou alergia alimentar?`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        maxLength={650}
      />
    </div>
  );
};

export { AnamneseFeeding };
