import { Link } from "react-router-dom";
import PetMatch from "../../../../public/logo-petmatch.png";
import {
  Card,
  CardActions,
  CardText,
  CardTitle,
  FeatureItem,
} from "../../../features/authentication";

const Missing = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] min-h-screen">
      <div className="hidden lg:block bg-[url('/animais-cama.png')] bg-cover bg-center bg-no-repeat text-white border border-black/40 dark:border-white/20">
        <div className="bg-linear-to-br from-orange-800/50 to-red-800/50 min-h-screen flex items-center justify-center">
          <Card className="p-4 text-white text-justify mx-6">
            {/* - Título - */}

            <CardTitle
              className="text-5xl font-bold pt-[35%]"
              title="Conecte-se com Tutores Responsáveis"
            />

            {/* - Texto descritivo - */}

            <CardText
              className="my-12 text-xl"
              text="O PetMatch facilita encontros seguros para cruzamento de pets, conectando tutores que se preocupam com a saúde e bem-estar dos animais."
            />

            {/* - Features do serviço - */}

            <CardActions className="flex flex-col space-y-8 text-md">
              <FeatureItem
                text="Perfis Verificados"
                description="Informações completas sobre saúde e histórico dos pets."
              />

              <FeatureItem
                text="Avaliações Confiáveis"
                description="Sistema de reviews para garantir segurança."
              />

              <FeatureItem
                text="Contato Direto"
                description="Converse diretamente com outros tutores."
              />
            </CardActions>
          </Card>
        </div>
      </div>

      <div className="min-h-screen max-w-full bg-linear-to-br from-amber-100 via-orange-100 to-red-100 dark:from-amber-900/90 dark:via-orange-900/90 dark:to-red-900/90 flex flex-col items-center justify-center relative px-4 py-8 lg:px-0">
        {/* - Logo PetMatch - */}

        <img
          className="absolute top-52 right-15 md:top-4 md:right-68 lg:top-69 lg:right-122 h-16 w-auto"
          src={PetMatch}
          alt="PetMatch Logo"
        />

        {/* - Container central - */}

        <div className="flex flex-col items-center w-full">
          <h1 className="text-3xl font-bold bg-linear-to-b from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
            PetMatch
          </h1>

          <p className="text-lg text-black/70 dark:text-white/70 mb-6 text-center">
            Cruzamento com segurança para seu Pet.
          </p>

          {/* - Box central do 404 - */}

          <div className="bg-white dark:bg-gray-800 border border-black/40 dark:border-white/20 w-full max-w-sm lg:max-w-md rounded-lg px-6 py-6 flex flex-col items-center mx-auto">
            <h1 className="text-5xl font-bold bg-linear-to-b from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent text-center">
              404
            </h1>

            <p className="text-2xl mt-6 bg-linear-to-b from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent font-bold text-center">
              Página não encontrada
            </p>

            {/* - Botão de voltar - */}

            <Link
              className="mt-6 px-4 py-2 bg-linear-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-400 hover:via-orange-400 hover:to-red-400 rounded-lg text-white font-semibold text-sm transition text-center"
              to="/"
            >
              Voltar para a tela de Login
            </Link>
          </div>
        </div>

        {/* - Rodapé com termos - */}

        <div className="flex flex-col pt-8 px-4 text-center">
          <p className="text-black dark:text-white/90 text-sm font-semibold">
            Ao continuar, você concorda com nossos{" "}
            <Link
              className="bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 hover:underline cursor-pointer"
              to="/termos-de-uso"
            >
              Termos de Uso{" "}
            </Link>
            e{" "}
            <Link
              className="bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600 hover:underline cursor-pointer"
              to="/politica-de-privacidade"
            >
              Política de Privacidade
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { Missing };
