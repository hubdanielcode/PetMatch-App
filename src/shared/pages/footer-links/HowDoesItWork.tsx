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
    <div className="min-h-screen bg-linear-to-br from-amber-100 via-orange-100 to-red-100 px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-black mb-4">Como Funciona</h1>

        <p className="text-black/70">
          Um processo simples, seguro e pensado para conectar você ao par ideal
          para o seu pet.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 top-15 h-140 w-0.5 bg-orange-400 -translate-x-1/2 hidden md:block" />

        <div className="space-y-12">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col md:flex-row items-center ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* - Card - */}

                <div className="w-full md:w-1/2">
                  <div className="bg-white rounded-xl p-6 shadow-md border border-black/40 hover:shadow-xl transition">
                    <div className="flex text-2xl mb-2 items-center">
                      <p className="mb-2 mr-1">{step.icon}</p>
                      <h2 className="text-lg font-semibold text-black mb-1">
                        {step.title}
                      </h2>
                    </div>

                    <p className="text-black/70 text-sm">{step.description}</p>
                  </div>
                </div>

                {/* - Passos - */}

                <div className="hidden md:flex items-center justify-center mx-2 w-11 h-10 rounded-full bg-linear-to-br from-amber-600 via-orange-600 to-red-600 border border-orange-400 text-orange-600 font-bold shadow-sm z-10">
                  <span className="font-bold text-white">{index + 1}</span>
                </div>

                {/* - Espaçamento - */}

                <div className="w-full md:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-xl mx-auto mt-20 text-center">
        <h2 className="text-xl font-semibold text-black mb-3">
          Pronto para começar?
        </h2>

        <p className="text-black/70 mb-6">
          Encontre o parceiro ideal para o seu pet em poucos passos.
        </p>

        <button
          className="bg-linear-to-br border border-black/40 from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 text-white px-4 py-2 rounded-xl font-semibold transition cursor-pointer"
          onClick={() => navigate("/pagina-principal")}
        >
          Começar agora
        </button>
      </div>
    </div>
  );
};

export { HowDoesItWork };
