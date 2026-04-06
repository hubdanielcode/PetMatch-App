const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-amber-100 via-orange-100 to-red-100 px-6 py-12 font-sans text-black/90">
      {/* - Cabeçalho - */}

      <header className="bg-linear-to-br from-amber-600 via-orange-600 to-red-600 text-white p-8 rounded-lg max-w-5xl mx-auto mb-8 shadow-md border border-black/40">
        <h1 className="text-3xl font-extrabold text-center">
          Política de Privacidade
        </h1>
      </header>

      {/* - Introdução - */}

      <section className="max-w-5xl mx-auto mb-8 px-4 py-3 border border-black/40 rounded-lg bg-white shadow-sm">
        <p className="text-sm text-black">
          No <strong>PetMatch</strong>, levamos sua privacidade a sério. Esta
          Política de Privacidade explica como coletamos, usamos, armazenamos e
          protegemos suas informações ao utilizar nossa plataforma.
        </p>
      </section>

      {/* - Conteúdo - */}

      <main className="max-w-5xl mx-auto space-y-6 bg-white rounded-xl p-8 shadow-md border border-black/40">
        {/* - 1. Informações coletadas - */}

        <section>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            1. Informações Coletadas
          </h2>

          <p className="text-sm text-black/70 mt-2">
            Coletamos diferentes tipos de informações para fornecer e melhorar
            nossos serviços:
          </p>

          <ul className="list-disc list-inside text-sm text-black/70 mt-2 space-y-1">
            <li>Nome completo, e-mail e telefone</li>
            <li>Localização aproximada</li>
            <li>Informações dos pets (nome, raça, idade, fotos)</li>
            <li>Dados de uso, como IP, dispositivo e navegação</li>
          </ul>
        </section>

        {/* - 2. Como usamos suas informações - */}

        <section>
          <h2 className="text-xl font-bold pt-4 border-t border-black/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            2. Como Usamos suas Informações
          </h2>

          <ul className="list-disc list-inside text-sm text-black/70 mt-2 space-y-1">
            <li>Criar e gerenciar sua conta</li>
            <li>Conectar tutores de pets</li>
            <li>Melhorar a experiência do usuário</li>
            <li>Enviar notificações importantes</li>
            <li>Garantir segurança e prevenir fraudes</li>
          </ul>
        </section>

        {/* - 3. Compartilhamento de dados - */}

        <section>
          <h2 className="text-xl font-bold pt-4 border-t border-black/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            3. Compartilhamento de Dados
          </h2>

          <p className="text-sm text-black/70 mt-2">
            Seus dados podem ser compartilhados apenas nas seguintes situações:
          </p>

          <ul className="list-disc list-inside text-sm text-black/70 mt-2 space-y-1">
            <li>Com outros usuários conforme suas configurações</li>
            <li>Com prestadores de serviço (hospedagem, analytics)</li>
            <li>Quando exigido por lei</li>
          </ul>

          <div className="mt-4 px-3 py-2 border-2 border-yellow-300 bg-yellow-100 rounded-md text-sm font-semibold">
            Importante: Nunca vendemos seus dados pessoais.
          </div>
        </section>

        {/* - 4. Segurança dos dados - */}
        <section>
          <h2 className="text-xl font-bold pt-4 border-t border-black/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            4. Segurança dos Dados
          </h2>

          <p className="text-sm text-black/70 mt-2">
            Utilizamos medidas técnicas e organizacionais para proteger suas
            informações, incluindo criptografia e monitoramento contínuo. Apesar
            disso, nenhum sistema é 100% seguro.
          </p>
        </section>

        {/* - 5. Seus direitos - */}
        <section>
          <h2 className="text-xl font-bold pt-4 border-t border-black/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            5. Seus Direitos
          </h2>

          <ul className="list-disc list-inside text-sm text-black/70 mt-2 space-y-1">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir informações incorretas</li>
            <li>Solicitar exclusão de dados</li>
            <li>Revogar consentimento</li>
            <li>Solicitar portabilidade de dados</li>
          </ul>
        </section>

        {/* - 6. Cookies - */}
        <section>
          <h2 className="text-xl font-bold pt-4 border-t border-black/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            6. Cookies
          </h2>

          <p className="text-sm text-black/70 mt-2">
            Utilizamos cookies para melhorar sua experiência, analisar uso da
            plataforma e personalizar conteúdo. Você pode gerenciar cookies no
            seu navegador.
          </p>
        </section>

        {/* - 7. Retenção de dados - */}
        <section>
          <h2 className="text-xl font-bold pt-4 border-t border-black/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            7. Retenção de Dados
          </h2>

          <p className="text-sm text-black/70 mt-2">
            Mantemos seus dados apenas pelo tempo necessário para cumprir nossas
            obrigações legais e fornecer nossos serviços.
          </p>
        </section>

        {/* - 8. Menores de idade - */}
        <section>
          <h2 className="text-xl font-bold pt-4 border-t border-black/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            8. Menores de Idade
          </h2>

          <p className="text-sm text-black/70 mt-2">
            Nossa plataforma é destinada a maiores de 18 anos. Não coletamos
            intencionalmente dados de menores.
          </p>
        </section>

        {/* - 9. Alterações nesta Política - */}
        <section>
          <h2 className="text-xl font-bold pt-4 border-t border-black/20 bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
            9. Alterações nesta Política
          </h2>

          <p className="text-sm text-black/70 mt-2">
            Podemos atualizar esta Política periodicamente. Recomendamos revisar
            esta página regularmente.
          </p>
        </section>
      </main>
    </div>
  );
};

export { PrivacyPolicy };
