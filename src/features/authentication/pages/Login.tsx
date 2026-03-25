import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardTitle, CardText, CardActions, Card, FeatureItem } from "../index";
import PetMatch from "../../../../public/logo-petmatch.png";
import { supabase } from "../../../../supabase/supabase";
import { MdMail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Eye, EyeClosed } from "lucide-react";
import { regex } from "../utils/AuthenticationRegex";

const Login = () => {
  /* - Email - */

  const [email, setEmail] = useState("");

  /* - Senha - */

  const [password, setPassword] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);

  /* - Erro - */

  const [signInError, setSignInError] = useState("");

  /* - Outros - */

  const navigate = useNavigate();

  const signInRef = useRef<HTMLButtonElement>(null);

  const loginWithAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setSignInError("Por favor preencha todos os campos!");
      return;
    }

    if (!regex.email.test(email)) {
      setSignInError("Formato de email inválido.");
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setSignInError("Email ou senha inválidos.");
      return;
    }

    navigate("/modal", { replace: true });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!signInRef.current) return;

      if (!signInRef.current.contains(e.target as Node)) {
        setSignInError("");
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
          className="absolute top-43 right-118 h-20 w-30"
          src={PetMatch}
          alt="PetMatch Logo"
        />

        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold bg-linear-to-b from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
            PetMatch
          </h1>
          <p className="font-semibold text-lg text-black/70 mb-6 text-center">
            Cruzamento com segurança para seu Pet.
          </p>

          <div className="bg-white border border-black/40 w-120 h-auto rounded-lg px-4 py-2 flex flex-col mx-auto">
            {/* - Input de email - */}

            <h1 className="font-bold text-3xl text-black text-center py-3">
              Entrar
            </h1>

            <label
              className="font-semibold my-2"
              htmlFor="email"
            >
              Email:
            </label>

            <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-4 py-2 focus-within:ring-2 focus-within:ring-amber-500 mb-1">
              <MdMail className="h-4 w-4 mr-3 mt-1 text-amber-600" />
              <input
                className="w-full h-fit bg-transparent focus:outline-none rounded-lg placeholder:text-gray-500 text-black"
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* - Input de senha - */}

            <label
              className="font-semibold my-2"
              htmlFor="password"
            >
              Senha:
            </label>

            <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-4 py-2 focus-within:ring-2 focus-within:ring-amber-500 mb-1">
              <RiLockPasswordFill className="h-4 w-4 mr-3 mt-1 text-amber-600" />
              <input
                className="w-full h-fit bg-transparent focus:outline-none rounded-lg placeholder:text-gray-500 text-black"
                id="password"
                type={isPrivate ? "password" : "text"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="flex items-center gap-2 bg-transparent rounded-lg py-1 px-2 font-semibold whitespace-nowrap outline-none cursor-pointer"
                onClick={() => setIsPrivate(!isPrivate)}
              >
                {isPrivate ? (
                  <EyeClosed className="text-gray-500 h-4 w-4" />
                ) : (
                  <Eye className="text-gray-500 h-4 w-4" />
                )}
              </button>
            </div>

            {/* - Recupere sua senha - */}

            <div className="flex gap-2 justify-center">
              <Link
                className="flex justify-center text-sm hover:bg-linear-to-r hover:from-amber-600 hover:via-orange-600 hover:to-red-600 hover:bg-clip-text hover:text-transparent hover:underline my-2 cursor-pointer font-semibold"
                to="/recuperar-senha"
              >
                Esqueci minha senha
              </Link>
            </div>

            {/* - Botão - */}

            <button
              className="w-full h-10 bg-linear-to-r from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-4 cursor-pointer hover:from-amber-400 hover:via-orange-400 hover:to-red-400"
              ref={signInRef}
              onClick={loginWithAccount}
            >
              Entrar
            </button>

            {/* - Mensagem de erro - */}

            <div className="min-h-16">
              {signInError && (
                <p className="flex items-center justify-center h-10 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-semibold px-4 text-center my-3">
                  {signInError}
                </p>
              )}
            </div>

            {/* - Cadastro - */}

            <div className="flex gap-2 justify-center">
              <p className="text-sm my-2 font-semibold">
                Ainda não possui uma conta?{" "}
              </p>

              <Link
                className="text-sm hover:bg-linear-to-r hover:from-amber-600 hover:via-orange-600 hover:to-red-600 hover:bg-clip-text hover:text-transparent hover:underline my-2 cursor-pointer font-semibold"
                to="/cadastro"
              >
                Cadastre-se
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { Login };
