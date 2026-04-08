import { FaHeart } from "react-icons/fa";
import { useRegistrationContext } from "../../hooks/context-hooks/useRegistrationContext";

interface AnamneseReproductionProps {
  value: string;
  onChange: (value: string) => void;
}

const AnamneseReproduction = ({
  value,
  onChange,
}: AnamneseReproductionProps) => {
  const { gender } = useRegistrationContext();

  return (
    <div className="w-full px-4 sm:px-6 pb-6">
      {/* - Card flutuante - */}

      <div className="-mt-6 bg-white dark:bg-gray-200 rounded-2xl shadow-lg shadow-gray-500 px-4 sm:px-5 py-4 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
          <FaHeart className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-800 font-medium mb-1">
            {gender === "Macho" ? "Etapa 7" : "Etapa 6"}
          </p>
          <p className="text-lg sm:text-xl font-bold text-black">
            Histórico Reprodutivo
          </p>
        </div>
      </div>

      {/* - Conteúdo - */}

      <label
        className="text-lg sm:text-xl font-semibold mb-3 block dark:text-white"
        htmlFor="pet-reproduction"
      >
        Conte-nos mais sobre as outras cruzas do seu pet
      </label>

      <textarea
        className="w-full border placeholder:text-gray-500 dark:hover:placeholder:text-gray-200 border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 dark:hover:bg-amber-600/40 transition-colors p-4 sm:p-6 h-50 resize-none"
        id="pet-reproduction"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Como você descreveria o histórico reprodutivo do seu pet?

Quantas vezes o seu pet já cruzou? Houve alguma complicação com o seu animal ou com os filhotes? A ninhada nasceu saudável? (Em caso de fêmeas: Como foi o parto? Houve intercorrências?)`}
        required
        maxLength={650}
      />
    </div>
  );
};

export { AnamneseReproduction };
