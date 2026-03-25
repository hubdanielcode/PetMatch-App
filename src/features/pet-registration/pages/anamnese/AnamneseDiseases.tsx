import { FaVirus } from "react-icons/fa";

const AnamneseDiseases = () => {
  return (
    <>
      {/* - Card flutuante - */}

      <div className="-mt-6 mx-4 bg-white rounded-2xl shadow-lg shadow-gray-500 px-5 py-4 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
          <FaVirus className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Etapa 5</p>
          <p className="text-lg font-bold text-black">Histórico de Doenças</p>
        </div>
      </div>

      {/* - Conteúdo - */}

      <label
        className="px-6 text-lg font-semibold mb-3 block"
        htmlFor="pet-walks"
      >
        Como anda a saúde do seu pet? *
      </label>

      <div className="mx-6 mb-6">
        <textarea
          className="w-full border placeholder:text-gray-500 border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors p-6 min-h-80"
          id="pet-walks"
          placeholder="Como você descreveria a saúde do seu pet? * 
          
Ele apresentou alguma doença nos últimos 90 dias? Está fazendo algum tipo de acompanhamento profissional? Está realizando algum tratamento? Se sim, qual(is)? Está fazendo uso de alguma medicação? Quando foi a última vez que o seu pet foi ao veterinário?"
          required
          maxLength={650}
        />
      </div>
    </>
  );
};

export { AnamneseDiseases };
