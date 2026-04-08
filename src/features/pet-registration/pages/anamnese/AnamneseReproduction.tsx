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
    <>
      {/* - Card flutuante - */}

      <div className="-mt-6 mx-4 bg-white rounded-2xl shadow-lg shadow-gray-500 px-5 py-4 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
          <FaHeart className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">
            {gender === "Macho" ? "Etapa 7" : "Etapa 6"}
          </p>

          <p className="text-lg font-bold text-black">Histórico Reprodutivo</p>
        </div>
      </div>

      {/* - Conteúdo - */}

      <label
        className="px-6 text-lg font-semibold mb-3 block"
        htmlFor="pet-reproduction"
      >
        Conte-nos mais sobre as outras cruzas do seu pet
      </label>

      <div className="mx-6 mb-6">
        <textarea
          className="w-full border placeholder:text-gray-500 border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors p-4 sm:p-6 h-50   resize-none box-border"
          id="pet-reproduction"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Como você descreveria o histórico reprodutivo do seu pet?
          
Quantas vezes o seu pet já cruzou? Houve alguma complicação com o seu animal ou com os filhotes? A ninhada nasceu saudável? (Em caso de fêmeas: Como foi o parto? Houve intercorrências?)"
          required
          maxLength={650}
        />
      </div>
    </>
  );
};

export { AnamneseReproduction };
