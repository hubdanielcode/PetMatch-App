import { ChevronRight, CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Modal = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen max-w-full bg-linear-to-br from-orange-100 via-red-100 to-orange-100 flex items-center justify-center p-4 sm:p-6">
      <AnimatePresence>
        <motion.div
          className="bg-white border border-black/40 w-full sm:w-[90%] md:w-125 lg:w-150 h-auto rounded-lg p-4 sm:p-6 flex flex-col mx-auto"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* - Ícone de sucesso - */}

          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <CircleCheck className="text-green-600 w-8 h-8" />
            </div>
          </div>

          {/* - Título e mensagem - */}

          <h1 className="font-semibold text-2xl sm:text-3xl text-black text-center mb-2">
            Bem-vindo ao PetMatch!
          </h1>
          <p className="text-base sm:text-lg text-black/60 text-center mb-6">
            Sua conta foi criada com sucesso
          </p>

          <div className="bg-linear-to-br from-amber-100 via-orange-100 to-red-100 border border-black/40 w-full h-auto p-4 sm:p-6 rounded-lg">
            <p className="font-semibold text-black text-lg sm:text-xl mb-3">
              O que você gostaria de fazer?
            </p>

            {/* - Cadastrar pet - */}

            <div
              onClick={() =>
                navigate("/registrar-pet", {
                  replace: true,
                  state: { from: "/bem-vindo", fromScreen: 2 },
                })
              }
              className="w-full border border-black/40 rounded-lg flex items-center justify-between p-4 mb-5 bg-linear-to-r from-amber-500 via-orange-500 to-red-500 cursor-pointer hover:from-amber-300 hover:via-orange-300 hover:to-red-300"
            >
              <div className="flex-1 pr-4">
                <h2 className="text-black font-bold mb-1 text-base sm:text-lg">
                  Cadastrar Pet
                </h2>
                <p className="text-sm text-black">
                  Adicione as informações do seu pet para começar a buscar
                  matches
                </p>
              </div>
              <ChevronRight className="text-black w-5 h-5 shrink-0" />
            </div>

            {/* - Explorar o feed - */}

            <div
              onClick={() => navigate("/pagina-principal", { replace: true })}
              className="w-full border border-black/40 rounded-lg flex items-center justify-between p-4 mb-2 bg-white cursor-pointer hover:bg-gray-100"
            >
              <div className="flex-1 pr-4">
                <h2 className="text-black font-bold mb-1 text-base sm:text-lg">
                  Explorar o Feed
                </h2>
                <p className="text-sm text-black">
                  Veja os pets disponíveis para cruzamento
                </p>
              </div>
              <ChevronRight className="text-black w-5 h-5 shrink-0" />
            </div>
          </div>

          {/* - Dica - */}

          <div className="w-full bg-yellow-100 border border-yellow-300 rounded-lg p-4 mt-4">
            <p className="text-sm font-bold text-black mb-1">💡 Dica</p>
            <p className="text-sm text-black/60">
              Para encontrar o match perfeito, cadastre seu pet com todas as
              informações e fotos! Perfis completos têm mais chances de receber
              contatos.
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export { Modal };
