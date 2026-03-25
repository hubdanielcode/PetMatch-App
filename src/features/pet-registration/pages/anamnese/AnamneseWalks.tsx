import { FaWalking } from "react-icons/fa";

const AnamneseWalks = () => {
  return (
    <>
      {/* - Card flutuante - */}

      <div className="-mt-6 mx-4 bg-white rounded-2xl shadow-lg shadow-gray-500 px-5 py-4 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
          <FaWalking className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Etapa 2</p>
          <p className="text-lg font-bold text-black">Passeios</p>
        </div>
      </div>

      {/* - Conteúdo - */}

      <label
        className="px-6 text-lg font-semibold mb-3 block"
        htmlFor="pet-walks"
      >
        Como é a rotina de passeio do seu pet? *
      </label>

      <div className="mx-6 mb-6">
        <textarea
          className="w-full border placeholder:text-gray-500 border-black/40 rounded-lg bg-gray-200 hover:bg-amber-50 transition-colors p-6 min-h-80"
          id="pet-walks"
          placeholder="Descreva como são os passeios do seu pet. 
          
Com que frequência ele(a) passeia? Quanto tempo, em média, dura o passeio? Caso você não possa passear com ele(a), você libera o seu pet para ir na rua? Se sim, você supervisiona?"
          required
          maxLength={650}
        />
      </div>
    </>
  );
};

export { AnamneseWalks };
