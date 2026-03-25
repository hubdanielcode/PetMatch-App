import { Link } from "react-router-dom";
import PetMatch from "../../../public/logo-petmatch.png";
import {
  Card,
  CardTitle,
  CardText,
  CardActions,
  FeatureItem,
} from "../../features/authentication/index";

const Missing = () => {
  return (
    <div className="grid grid-cols-[1fr_2fr] min-h-screen">
      <div className="bg-[url('/animais-cama.png')] bg-cover bg-center bg-no-repeat text-white font-semibold border border-black/40">
        <div className="bg-linear-to-br from-orange-800/50 to-red-800/50 min-h-screen">
          <Card className="p-4 white text-justify mx-6">
            <CardTitle
              className="text-5xl font-bold pt-[35%]"
              title="Conecte-se com Tutores Responsáveis"
            />

            <CardText
              className="my-12 text-xl"
              text="O PetMatch facilita encontros seguros para cruzamento de pets, conectando tutores que se preocupam com a saúde e bem-estar dos animais."
            />
            <CardActions className="flex-col space-y-8 text-md font-semibold">
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

      <div className="min-h-screen max-w-full bg-linear-to-br from-orange-100 via-red-100 to-orange-100 flex items-center justify-center relative">
        {/* - Logo - */}

        <img
          className="absolute top-73 right-118 h-20 w-30"
          src={PetMatch}
          alt="PetMatch Logo"
        />

        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold bg-linear-to-b from-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
            PetMatch
          </h1>
          <p className="font-semibold text-lg text-black/70 mb-6 text-center">
            Cruzamento com segurança para seu Pet.
          </p>

          {/* - Texto - */}

          <div className="bg-white border border-black/40 w-fit h-auto rounded-lg px-4 py-2 flex flex-col mx-auto">
            <h1 className="text-5xl font-bold bg-linear-to-b from-orange-600 to-red-600 bg-clip-text text-transparent text-center">
              404
            </h1>
            <p className="text-2xl mt-8 bg-linear-to-b from-orange-600 to-red-600 bg-clip-text text-transparent font-bold text-center">
              Página não encontrada
            </p>

            {/* - Botão - */}

            <Link
              className="mt-8 px-4 py-2 bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-400 hover:to-red-400 rounded-lg text-white font-semibold text-sm transition text-center"
              role="link"
              to="/"
            >
              Voltar para a tela de Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export { Missing };
