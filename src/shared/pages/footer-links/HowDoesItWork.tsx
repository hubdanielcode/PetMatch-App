import { useNavigate } from "react-router-dom";

const HowDoesItWork = () => {
  const navigate = useNavigate();
  const steps = [
    {
      title: "Cadastre seu pet",
      description:
        "Crie um perfil com informações como idade, raça, localização e histórico de saúde.",
      icon: "🐶",
    },
    {
      title: "Explore o feed",
      description:
        "Encontre pets utilizando filtros como espécie, raça, idade e região.",
      icon: "🔎",
    },
    {
      title: "Avalie com confiança",
      description:
        "Veja avaliações e informações detalhadas antes de tomar uma decisão.",
      icon: "⭐",
    },
    {
      title: "Entre em contato",
      description:
        "Converse diretamente com o tutor e combine os detalhes com segurança.",
      icon: "💬",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 via-orange-100 to-red-100 dark:bg-linear-to-br dark:from-amber-950 dark:via-orange-950 dark:to-red-950 px-4 sm:px-6 py-10 sm:py-16">
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white mb-3 sm:mb-4">
          Como Funciona
        </h1>

        <p className="text-sm sm:text-base text-black/70 dark:text-white/70 px-2 sm:px-0">
          Um processo simples, seguro e pensado para conectar você ao par ideal
          para o seu pet.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 top-18 h-130 bottom-10 w-0.5 bg-orange-400 -translate-x-1/2 hidden md:block" />

        <div className="space-y-8 sm:space-y-12">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex md:hidden items-center justify-center mt-3 mb-3 w-8 h-8 rounded-full bg-linear-to-br from-amber-600 via-orange-600 to-red-600 text-white font-bold shadow-sm">
                  {index + 1}
                </div>

                <div className="w-full md:w-1/2">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md border border-black/40 dark:border-white/20 hover:shadow-xl transition">
                    <div className="flex items-center text-xl sm:text-2xl">
                      <p className="mr-2 mb-1">{step.icon}</p>
                      <h2 className="text-base sm:text-lg font-semibold text-black dark:text-white">
                        {step.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-black/70 dark:text-white/70">
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center mx-2 w-10 h-10 rounded-full bg-linear-to-br from-amber-600 via-orange-600 to-red-600 text-white font-bold shadow-sm z-10">
                  <span>{index + 1}</span>
                </div>

                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-xl mx-auto mt-14 sm:mt-20 text-center px-2">
        <h2 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2 sm:mb-3">
          Pronto para começar?
        </h2>

        <p className="text-sm sm:text-base text-black/70 dark:text-white/70 mb-5 sm:mb-6">
          Encontre o parceiro ideal para o seu pet em poucos passos.
        </p>

        <button
          className="bg-linear-to-br border border-black/40 dark:border-white/20 from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold transition cursor-pointer text-sm sm:text-base"
          onClick={() => navigate("/pagina-principal")}
        >
          Começar agora
        </button>
      </div>
    </div>
  );
};

export { HowDoesItWork };
