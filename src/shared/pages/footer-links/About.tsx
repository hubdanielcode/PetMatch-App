import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      icon: "✅",
      title: "Perfis Verificados",
      description: "Informações completas sobre saúde e histórico.",
    },
    {
      icon: "⭐",
      title: "Avaliações",
      description: "Sistema confiável de reviews entre usuários.",
    },
    {
      icon: "💬",
      title: "Contato Direto",
      description: "Converse facilmente com outros tutores.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 via-orange-100 to-red-100 dark:bg-linear-to-br dark:from-amber-950 dark:via-orange-950 dark:to-red-950 px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white mb-3 leading-tight">
          Sobre o{" "}
          <span className="bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 font-bold">
            PetMatch
          </span>
        </h1>

        <p className="text-sm sm:text-base text-black/70 dark:text-white px-2 sm:px-0">
          Conectamos tutores responsáveis para promover encontros seguros e
          saudáveis entre pets. Nosso objetivo é facilitar conexões confiáveis e
          melhorar o bem-estar animal.
        </p>
      </div>

      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
        {/* - Nossa Missão - */}

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-black/40 dark:border-white/40">
          <h2 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 mb-2">
            Nossa Missão
          </h2>
          <p className="text-sm sm:text-base text-black/70 dark:text-white">
            Garantir que pets encontrem parceiros ideais para cruzamento com
            segurança, promovendo saúde, responsabilidade e transparência entre
            tutores.
          </p>
        </div>

        {/* - O que Oferecemos - */}

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-black/40 dark:border-white/40">
          <h2 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 mb-4">
            Diferenciais
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {features.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 dark:bg-gray-600 rounded-lg p-4 text-center border border-black/20 dark:border-white/20 cursor-pointer shadow-md hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-xl sm:text-2xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-black dark:text-white text-sm sm:text-base">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* - História - */}

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm p-4 sm:p-6 border border-black/40 dark:border-white/40">
          <h2 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 mb-2">
            Nossa História
          </h2>
          <p className="text-sm sm:text-base text-black/70 dark:text-white">
            O PetMatch nasceu com a ideia de resolver um problema comum:
            encontrar parceiros ideais para pets de forma segura. Criamos uma
            plataforma simples, moderna e confiável, pensada para quem realmente
            se preocupa com o bem-estar dos animais.
          </p>
        </div>
      </div>
    </div>
  );
};

export { About };
