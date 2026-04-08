import { Circle, CircleCheck } from "lucide-react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "./Modal";

const Welcome = () => {
  const location = useLocation();

  const [screen, setScreen] = useState<1 | 2>(location.state?.screen ?? 1);

  if (screen === 2) return <Modal />;

  return (
    <div className="min-h-screen max-w-full bg-linear-to-br from-orange-100 via-red-100 to-orange-100 dark:from-amber-950 dark:via-orange-950 dark:to-red-950 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white dark:bg-gray-800 border border-black/40 dark:border-white/20 w-full sm:w-[90%] md:w-125 lg:w-150 h-auto rounded-lg p-4 sm:p-6 flex flex-col mx-auto">
        {/* - Título principal - */}

        <h1 className="font-semibold text-2xl sm:text-3xl text-black dark:text-white text-center py-3">
          Cadastro realizado com sucesso! 🎉
        </h1>
        <p className="text-base sm:text-lg text-black/60 dark:text-white/60 mb-6 text-center">
          Vamos configurar seu perfil em alguns passos simples
        </p>

        {/* - Barra de progresso - */}

        <div className="flex flex-col mb-4">
          <div className="flex justify-between mb-1">
            <p className="text-sm text-black/70 dark:text-white/70">
              Progresso
            </p>
            <p className="text-sm text-black/70 dark:text-white/70">
              1 de 3 completo
            </p>
          </div>
          <div className="w-full h-1.5 bg-gray-300 dark:bg-gray-600 rounded-lg relative">
            <div className="w-[33%] h-1.5 bg-black dark:bg-white rounded-l-lg absolute" />
          </div>
        </div>

        {/* - Conta criada - */}

        <div className="w-full border border-black/40 dark:border-white/20 bg-green-100 dark:bg-green-900/40 rounded-lg flex p-4 mb-4">
          <CircleCheck className="text-green-600 dark:text-green-400 mr-3 my-1 shrink-0" />
          <div>
            <h2 className="text-green-800 dark:text-green-300 font-bold mb-1">
              Conta criada com sucesso
            </h2>
            <p className="text-sm text-green-600 dark:text-green-400/80">
              Suas informações básicas foram salvas
            </p>
          </div>
        </div>

        {/* - Cadastrar pet - */}

        <div className="w-full border border-black/40 dark:border-white/20 bg-gray-100 dark:bg-gray-700 rounded-lg flex p-4 mb-4">
          <Circle className="text-black dark:text-white/70 mr-3 my-1 shrink-0" />
          <div>
            <h2 className="text-black dark:text-white font-bold mb-1">
              Cadastrar Pet
            </h2>
            <p className="text-sm text-black/60 dark:text-white/60">
              Adicione seu primeiro pet ao perfil
            </p>
          </div>
        </div>

        {/* - Explorar matches - */}

        <div className="w-full border border-black/40 dark:border-white/20 bg-gray-100 dark:bg-gray-700 rounded-lg flex p-4 mb-6">
          <Circle className="text-black dark:text-white/70 mr-3 my-1 shrink-0" />
          <div>
            <h2 className="text-black dark:text-white font-bold mb-1">
              Explorar Matches
            </h2>
            <p className="text-sm text-black/60 dark:text-white/60">
              Encontre o par perfeito para seu pet
            </p>
          </div>
        </div>

        {/* - Botão - */}

        <button
          onClick={() => setScreen(2)}
          className="w-full h-10 bg-linear-to-r from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-3 cursor-pointer hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-center border border-black/40 dark:border-white/20 transition"
        >
          Começar Agora
        </button>
      </div>
    </div>
  );
};

export { Welcome };
