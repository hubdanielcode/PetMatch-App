import { Circle, CircleCheck } from "lucide-react";
import { useState } from "react";
import { Welcome } from "./Welcome";
import { useLocation } from "react-router-dom";

const Modal = () => {
  const location = useLocation();

  const [screen, setScreen] = useState<1 | 2>(location.state?.screen ?? 1);

  if (screen === 2) return <Welcome />;

  return (
    <div className="min-h-screen max-w-full bg-linear-to-br from-orange-100 via-red-100 to-orange-100 flex items-center justify-center">
      <div className="bg-white border border-black/40 w-180 h-auto rounded-lg p-6 flex flex-col mx-auto">
        <h1 className="font-semibold text-3xl text-black text-center py-3">
          Cadastro realizado com sucesso! 🎉
        </h1>
        <p className="text-lg text-black/60 mb-6 text-center">
          Vamos configurar seu perfil em alguns passos simples
        </p>

        <div className="flex-col mb-4">
          <div className="flex justify-between mb-1">
            <p className="text-sm text-black/70">Progresso</p>
            <p className="text-sm text-black/70">1 de 3 completo</p>
          </div>
          <div className="w-full h-1.5 bg-gray-300 rounded-lg relative">
            <div className="w-[33%] h-1.5 bg-black rounded-l-lg absolute" />
          </div>
        </div>

        <div className="w-full border border-black/40 bg-green-100 rounded-lg flex p-4 mb-4">
          <CircleCheck className="text-green-600 mr-3 my-1 shrink-0" />
          <div>
            <h2 className="text-green-800 font-bold mb-1">
              Conta criada com sucesso
            </h2>
            <p className="text-sm text-green-600">
              Suas informações básicas foram salvas
            </p>
          </div>
        </div>

        <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex p-4 mb-4">
          <Circle className="text-black mr-3 my-1 shrink-0" />
          <div>
            <h2 className="text-black font-bold mb-1">Cadastrar Pet</h2>
            <p className="text-sm text-black/60">
              Adicione seu primeiro pet ao perfil
            </p>
          </div>
        </div>

        <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex p-4 mb-6">
          <Circle className="text-black mr-3 my-1 shrink-0" />
          <div>
            <h2 className="text-black font-bold mb-1">Explorar Matches</h2>
            <p className="text-sm text-black/60">
              Encontre o par perfeito para seu pet
            </p>
          </div>
        </div>

        <button
          onClick={() => setScreen(2)}
          className="w-full h-10 bg-linear-to-r from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-3 cursor-pointer hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-center"
        >
          Começar Agora
        </button>
      </div>
    </div>
  );
};

export { Modal };
