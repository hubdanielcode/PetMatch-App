import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../../../supabase/supabase";
import { Card, CardTitle, CardText, CardActions, FeatureItem } from "../index";
import PetMatch from "../../../../public/logo-petmatch.png";
import { MdMail } from "react-icons/md";

const RecoverPassword = () => {
  /* - Email - */

  const [recoverEmail, setRecoverEmail] = useState("");

  /* - Erro - */

  const [recoverErrorMessage, setRecoverErrorMessage] = useState("");

  /* - Outros - */

  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleResetPassword = async (e: React.MouseEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!recoverEmail || !emailRegex.test(recoverEmail)) {
      setRecoverErrorMessage("Digite um endereço de email válido.");
      return;
    }
    const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

    const { error } = await supabase.auth.resetPasswordForEmail(recoverEmail, {
      redirectTo: `${redirectUrl}/`,
    });

    if (error) {
      setRecoverErrorMessage("Falha ao tentar enviar email.");
    }

    alert(
      "Se o email estiver cadastrado, você receberá um link de redefinição de senha.",
    );

    setRecoverEmail("");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!buttonRef.current) return;

      if (!buttonRef.current.contains(e.target as Node)) {
        setRecoverErrorMessage("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      <div className="min-h-screen max-w-full bg-linear-to-br from-amber-100 via-orange-100 to-red-100 flex items-center justify-center relative">
        {/* - Logo - */}

        <img
          className="absolute top-58 right-118 h-20 w-30"
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

          <div className="bg-white border border-black/40 w-120 h-auto rounded-lg px-4 py-2 flex flex-col mx-auto">
            {/* - Input de email - */}

            <h1 className="font-bold text-3xl text-black text-center py-3">
              Recupere sua senha
            </h1>

            <label
              className="font-semibold my-2"
              htmlFor="recoverEmail"
            >
              Email:
            </label>

            <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-4 py-2 focus-within:ring-2 focus-within:ring-amber-500 mb-4">
              <MdMail className="h-4 w-4 mr-3 mt-1 text-amber-600" />
              <input
                className="w-full h-fit bg-transparent focus:outline-none rounded-lg placeholder:text-gray-500 text-black"
                id="recoverEmail"
                type="email"
                placeholder="exemplo@email.com"
                value={recoverEmail}
                onChange={(e) => setRecoverEmail(e.target.value)}
              />
            </div>

            {/* - Botão - */}

            <button
              className="w-full h-10 bg-linear-to-r from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-4 cursor-pointer hover:from-amber-400 hover:via-orange-400 hover:to-red-400"
              ref={buttonRef}
              onClick={handleResetPassword}
            >
              Enviar Email
            </button>

            {/* - Mensagem de erro - */}

            <div className="min-h-16">
              {recoverErrorMessage && (
                <p className="flex items-center justify-center h-10 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-semibold px-4 text-center my-3">
                  {recoverErrorMessage}
                </p>
              )}
            </div>

            {/* - Login - */}

            <div className="flex gap-2 justify-center">
              <Link
                className="text-sm hover:bg-linear-to-r hover:from-amber-600 via-orange-600 hover:to-red-600 hover:bg-clip-text hover:text-transparent hover:underline my-2 cursor-pointer font-semibold"
                to="/"
              >
                Voltar para a tela de Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { RecoverPassword };
