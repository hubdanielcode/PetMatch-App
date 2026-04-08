import { useLocation, useNavigate } from "react-router-dom";

const TermsOfUse = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 via-orange-100 to-red-100 px-4 sm:px-6 py-8 sm:py-12 font-sans text-black/90">
      {/* - Cabeçalho com gradiente - */}

      <header className="bg-linear-to-br from-amber-600 via-orange-600 to-red-600 text-white p-5 sm:p-8 rounded-lg max-w-5xl mx-auto mb-6 sm:mb-8 shadow-md border border-black/40">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold mx-auto text-center">
            Termos de Uso
          </h1>
        </div>
      </header>

      {/* Importante */}

      <section className="max-w-5xl mx-auto mb-6 sm:mb-8 px-3 sm:px-4 py-3 border border-black/40 rounded-lg bg-white flex gap-3 items-start text-black shadow-sm">
        <p className="text-xs sm:text-sm font-semibold leading-relaxed">
          <strong>Importante</strong> <br />
          Ao utilizar o PetMatch, você concorda com todos os termos descritos
          abaixo. Leia atentamente antes de prosseguir.
        </p>
      </section>

      {/* - Conteúdo - */}

      <main className="max-w-5xl mx-auto space-y-5 sm:space-y-6 bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-md border border-black/40">
        {/* - 1. Aceitação dos Termos - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold pt-2 sm:pt-4 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            1. Aceitação dos Termos
          </h2>
          <p className="text-xs sm:text-sm text-black/70">
            Ao acessar e usar o PetMatch, você aceita e concorda em cumprir
            estes Termos de Uso. Se você não concordar com qualquer parte destes
            termos, não deve utilizar nossa plataforma.
          </p>
        </section>

        {/* - 2. Descrição do Serviço - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold mb-1 pt-3 sm:pt-4 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 border-t border-black/20">
            2. Descrição do Serviço
          </h2>
          <p className="text-xs sm:text-sm text-black/70 mb-1">
            O PetMatch é uma plataforma que conecta tutores de animais de
            estimação interessados em realizar cruzamentos responsáveis. Nossos
            serviços incluem:
          </p>
          <ul className="list-disc list-inside text-black/70 space-y-1 text-xs sm:text-sm">
            <li>Cadastro de perfis de pets com informações detalhadas</li>
            <li>Sistema de busca e filtros avançados</li>
            <li>Facilitação de contato direto entre tutores</li>
            <li>Sistema de avaliações e reputação</li>
          </ul>
        </section>

        {/* - 3. Responsabilidades do Usuário - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold mb-1 pt-3 sm:pt-4 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 border-t border-black/20">
            3. Responsabilidades do Usuário
          </h2>
          <p className="text-xs sm:text-sm text-black/70 mb-1">
            Ao utilizar o PetMatch, você se compromete a:
          </p>
          <ul className="list-disc list-inside text-black/70 space-y-1 text-xs sm:text-sm">
            <li>
              Fornecer informações verdadeiras e precisas sobre você e seus pets
            </li>
            <li>Manter a confidencialidade de sua senha e conta</li>
            <li>Não usar a plataforma para fins ilegais ou não autorizados</li>
            <li>Respeitar outros usuários e seus animais</li>
            <li>
              Garantir que seus pets estejam saudáveis e aptos para cruzamento
            </li>
            <li>
              Cumprir todas as leis locais aplicáveis sobre criação de animais
            </li>
          </ul>
        </section>

        {/* - 4. Conteúdo do Usuário - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold mb-1 pt-3 sm:pt-4 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 border-t border-black/20">
            4. Conteúdo do Usuário
          </h2>
          <p className="text-xs sm:text-sm text-black/70">
            Você é responsável por todo o conteúdo que publica na plataforma,
            incluindo fotos, descrições e informações sobre seus pets. Você
            garante que possui todos os direitos necessários sobre o conteúdo
            publicado e que ele não viola direitos de terceiros.
          </p>
        </section>

        {/* - 5. Limitação de Responsabilidade - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold mb-1 pt-3 sm:pt-4 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 border-t border-black/20">
            5. Limitação de Responsabilidade
          </h2>
          <p className="text-xs sm:text-sm text-black/70 mb-1">
            O PetMatch atua apenas como intermediário para conectar tutores. Não
            somos responsáveis por:
          </p>
          <ul className="list-disc list-inside text-black/70 space-y-1 text-xs sm:text-sm">
            <li>Acordos feitos entre usuários fora da plataforma</li>
            <li>Saúde ou condição dos animais envolvidos</li>
            <li>Resultados de cruzamentos realizados</li>
            <li>Disputas entre usuários</li>
            <li>Veracidade das informações fornecidas pelos usuários</li>
          </ul>
        </section>

        {/* - 6. Proibições - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold mb-1 pt-3 sm:pt-4 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 border-t border-black/20">
            6. Proibições
          </h2>
          <p className="text-xs sm:text-sm text-black/70 mb-1">
            É expressamente proibido na plataforma:
          </p>
          <ul className="list-disc list-inside text-black/70 space-y-1 text-xs sm:text-sm">
            <li>Venda ou comercialização de animais</li>
            <li>Maus-tratos ou negligência animal</li>
            <li>Falsificação de documentos ou informações</li>
            <li>Assédio ou comportamento abusivo com outros usuários</li>
            <li>Uso de bots ou automação não autorizada</li>
          </ul>
        </section>

        {/* - 7. Suspensão e Cancelamento - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold mb-1 pt-3 sm:pt-4 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 border-t border-black/20">
            7. Suspensão e Cancelamento
          </h2>
          <p className="text-xs sm:text-sm text-black/70">
            Reservamo-nos o direito de suspender ou cancelar contas que violem
            estes Termos de Uso, sem aviso prévio e sem reembolso de valores
            pagos, quando aplicável.
          </p>
        </section>

        {/* - 8. Modificações dos Termos - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold mb-1 pt-3 sm:pt-4 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 border-t border-black/20">
            8. Modificações dos Termos
          </h2>
          <p className="text-xs sm:text-sm text-black/70">
            Podemos atualizar estes Termos de Uso periodicamente. Mudanças
            significativas serão comunicadas através da plataforma. O uso
            continuado após as alterações constitui aceitação dos novos termos.
          </p>
        </section>

        {/* - 9. Lei Aplicável - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold mb-1 pt-3 sm:pt-4 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 border-t border-black/20">
            9. Lei Aplicável
          </h2>
          <p className="text-xs sm:text-sm text-black/70">
            Estes Termos de Uso são regidos pelas leis do Brasil. Qualquer
            disputa será resolvida nos tribunais competentes do Brasil.
          </p>
        </section>
        <div className="flex justify-center">
          <button
            className="bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 border-black/40 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer mt-4"
            onClick={() => navigate(state?.from || "/")}
          >
            Entendi !
          </button>
        </div>
      </main>
    </div>
  );
};

export { TermsOfUse };
