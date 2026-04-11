import { useLocation, useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 via-orange-100 to-red-100 dark:from-amber-900/90 dark:via-orange-900/90 dark:to-red-900/90 px-4 sm:px-6 py-8 sm:py-12 font-sans text-black/90 dark:text-white/90">
      {/* - Cabeçalho - */}

      <header className="bg-linear-to-br from-amber-600 via-orange-600 to-red-600 text-white p-5 sm:p-8 rounded-lg max-w-5xl mx-auto mb-6 sm:mb-8 shadow-md border border-black/40 dark:border-white/20">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center">
          Política de Privacidade
        </h1>
      </header>

      {/* - Introdução - */}

      <section className="max-w-5xl mx-auto mb-6 sm:mb-8 px-3 sm:px-4 py-3 border border-black/40 dark:border-white/20 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
        <p className="text-xs sm:text-sm text-black dark:text-white/90">
          No <strong>PetMatch</strong>, levamos sua privacidade a sério. Esta
          Política de Privacidade explica como coletamos, usamos, armazenamos e
          protegemos suas informações ao utilizar nossa plataforma.
        </p>
      </section>

      {/* - Conteúdo - */}

      <main className="max-w-5xl mx-auto space-y-5 sm:space-y-6 bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 md:p-8 shadow-md border border-black/40 dark:border-white/20">
        {/* - 1. Informações coletadas - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            1. Informações Coletadas
          </h2>

          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-2">
            Coletamos diferentes tipos de informações para fornecer e melhorar
            nossos serviços:
          </p>

          <ul className="list-disc list-inside text-xs sm:text-sm text-black/70 dark:text-white/70 mt-2 space-y-1">
            <li>Nome completo, e-mail e telefone</li>
            <li>Localização aproximada</li>
            <li>Informações dos pets (nome, raça, idade, fotos)</li>
            <li>Dados de uso, como IP, dispositivo e navegação</li>
          </ul>
        </section>

        {/* - 2. Como usamos suas informações - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold pt-3 sm:pt-4 border-t border-black/20 dark:border-white/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            2. Como Usamos suas Informações
          </h2>

          <ul className="list-disc list-inside text-xs sm:text-sm text-black/70 dark:text-white/70 mt-2 space-y-1">
            <li>Criar e gerenciar sua conta</li>
            <li>Conectar tutores de pets</li>
            <li>Melhorar a experiência do usuário</li>
            <li>Enviar notificações importantes</li>
            <li>Garantir segurança e prevenir fraudes</li>
          </ul>
        </section>

        {/* - 3. Compartilhamento de dados - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold pt-3 sm:pt-4 border-t border-black/20 dark:border-white/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            3. Compartilhamento de Dados
          </h2>

          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-2">
            Seus dados podem ser compartilhados apenas nas seguintes situações:
          </p>

          <ul className="list-disc list-inside text-xs sm:text-sm text-black/70 dark:text-white/70 mt-2 space-y-1">
            <li>Com outros usuários conforme suas configurações</li>
            <li>Com prestadores de serviço (hospedagem, analytics)</li>
            <li>Quando exigido por lei</li>
          </ul>

          <div className="mt-4 px-3 py-2 border-2 border-yellow-300 dark:border-yellow-500 bg-yellow-100 dark:bg-yellow-600/40 rounded-md text-xs sm:text-sm font-semibold text-black/80 dark:text-yellow-200">
            Importante: Nunca vendemos seus dados pessoais.
          </div>
        </section>

        {/* - 4. Segurança dos dados - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold pt-3 sm:pt-4 border-t border-black/20 dark:border-white/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            4. Segurança dos Dados
          </h2>

          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-2">
            Utilizamos medidas técnicas e organizacionais para proteger suas
            informações, incluindo criptografia e monitoramento contínuo. Apesar
            disso, nenhum sistema é 100% seguro.
          </p>
        </section>

        {/* - 5. Seus direitos - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold pt-3 sm:pt-4 border-t border-black/20 dark:border-white/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            5. Seus Direitos
          </h2>

          <ul className="list-disc list-inside text-xs sm:text-sm text-black/70 dark:text-white/70 mt-2 space-y-1">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir informações incorretas</li>
            <li>Solicitar exclusão de dados</li>
            <li>Revogar consentimento</li>
            <li>Solicitar portabilidade de dados</li>
          </ul>
        </section>

        {/* - 6. Cookies - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold pt-3 sm:pt-4 border-t border-black/20 dark:border-white/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            6. Cookies
          </h2>

          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-2">
            Utilizamos cookies para melhorar sua experiência, analisar uso da
            plataforma e personalizar conteúdo. Você pode gerenciar cookies no
            seu navegador.
          </p>
        </section>

        {/* - 7. Retenção de dados - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold pt-3 sm:pt-4 border-t border-black/20 dark:border-white/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            7. Retenção de Dados
          </h2>

          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-2">
            Mantemos seus dados apenas pelo tempo necessário para cumprir nossas
            obrigações legais e fornecer nossos serviços.
          </p>
        </section>

        {/* - 8. Menores de idade - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold pt-3 sm:pt-4 border-t border-black/20 dark:border-white/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            8. Menores de Idade
          </h2>

          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-2">
            Nossa plataforma é destinada a maiores de 18 anos. Não coletamos
            intencionalmente dados de menores.
          </p>
        </section>

        {/* - 9. Alterações nesta Política - */}

        <section>
          <h2 className="text-lg sm:text-xl font-bold pt-3 sm:pt-4 border-t border-black/20 dark:border-white/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            9. Alterações nesta Política
          </h2>

          <p className="text-xs sm:text-sm text-black/70 dark:text-white/70 mt-2">
            Podemos atualizar esta Política periodicamente. Recomendamos revisar
            esta página regularmente.
          </p>
        </section>

        <div className="flex justify-center">
          <button
            className="bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 border border-black/40 dark:border-white/20 text-white font-semibold rounded-lg px-4 py-2 cursor-pointer mt-4 transition"
            onClick={() => navigate(state?.from || "/")}
          >
            Entendi !
          </button>
        </div>
      </main>
    </div>
  );
};

export { PrivacyPolicy };
