import { FaSyringe } from "react-icons/fa";

interface AnamneseSurgeriesProps {
  value: string;
  onChange: (value: string) => void;
}

const AnamneseSurgeries = ({ value, onChange }: AnamneseSurgeriesProps) => {
  return (
    <>
      {/* - Card flutuante - */}

      <div className="-mt-6 mx-4 bg-white rounded-2xl shadow-lg shadow-gray-500 px-5 py-4 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
          <FaSyringe className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Etapa 4</p>
          <p className="text-lg font-bold text-black">Histórico de Cirurgias</p>
        </div>
      </div>

      {/* - Conteúdo - */}

      <label
        className="px-6 text-lg font-semibold mb-3 block"
        htmlFor="pet-walks"
      >
        O seu pet já passou por algum procedimento cirúrgico? *
      </label>

      <div className="mx-6 mb-6">
        <textarea
          className="w-full border placeholder:text-gray-500 border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors p-6 min-h-80"
          id="pet-walks"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="O seu pet já realizou algum tipo de cirurgia, mesmo que eletiva?
          
Se sim, qual(is)? Como foi a recuperação dele(a)? Apresentou algum tipo de complicação?"
          required
          maxLength={650}
        />
      </div>
    </>
  );
};

export { AnamneseSurgeries };
