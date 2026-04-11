import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardTitle, CardText, CardActions, FeatureItem } from "../index";
import PetMatch from "../../../../public/logo-petmatch.png";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { supabase } from "../../../../supabase/supabase";
import { AnimatePresence, motion } from "framer-motion";
import { CircleCheck, Eye, EyeClosed } from "lucide-react";
import { regex } from "../../../shared/utils/regex";
import { masks } from "../../../shared/utils/masks";

const Authentication = () => {
  /* - Nome - */

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  /* - Email - */

  const [email, setEmail] = useState("");

  /* - Senha - */

  const [password, setPassword] = useState("");
  const [confirmPassowrd, setConfirmPassword] = useState("");

  const [isPrivate, setIsPrivate] = useState(true);
  const [isConfirmPrivate, setIsConfirmPrivate] = useState(true);

  /* - Estados de erro e sucesso - */

  const [signUpError, setSignUpError] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  /* - Outros - */

  const signUpRef = useRef<HTMLButtonElement>(null);

  const createNewAccount = async (e: React.MouseEvent) => {
    e.preventDefault();

    // 🧹 limpa estados antes de tudo
    setSignUpError("");
    setSignUpSuccess(false);

    if (!regex.name.test(firstName)) {
      setSignUpError("Nome Inválido.");
      return;
    }

    if (!regex.email.test(email)) {
      setSignUpError("Formato de email inválido.");
      return;
    }

    if (!firstName || !lastName || !email || !password || !confirmPassowrd) {
      setSignUpError("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassowrd) {
      setSignUpError("As senhas não coincidem.");
      return;
    }

    if (password.length <= 5) {
      setSignUpError("A senha deve conter, pelo menos, 6 caracteres.");
      return;
    }

    try {
      const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            email,
          },
          emailRedirectTo: `${redirectUrl}/`,
        },
      });

      if (error) {
        setSignUpError(error.message);
        return;
      }

      if (!data?.user) {
        setSignUpError("Erro ao cadastrar usuário.");
        return;
      }

      await supabase.from("users").insert([
        {
          user_id: data.user.id,
          firstName,
          lastName,
          email,
        },
      ]);

      if (!data.session) {
        setSignUpSuccess(true);
        setTimeout(() => setSignUpSuccess(false), 8000);
      }
    } catch (err) {
      setSignUpError("Erro inesperado. Tente novamente.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!signUpRef.current) return;

      if (!signUpRef.current.contains(e.target as Node)) {
        setSignUpError("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] min-h-screen">
      {/* - Animação de criação de conta - */}

      <AnimatePresence>
        {signUpSuccess && (
          <motion.div
            className="bg-gray-50 border border-green-600 rounded-lg w-72 md:w-80 p-4"
            style={{ position: "fixed", top: 24, right: 24, zIndex: 999 }}
            initial={{ x: 120, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 120, opacity: 0 }}
          >
            <div className="flex items-center mb-2">
              <CircleCheck className="text-green-600 h-5 w-5 mr-2" />
              <p className="text-sm text-green-600 ">
                Confirmação enviada para seu email!
              </p>
            </div>
            <div className="w-full h-1.5 bg-green-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-600 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3.5, ease: "linear" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden lg:block bg-[url('/animais-cama.png')] bg-cover bg-center bg-no-repeat text-white border border-black/40">
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

      <div className="min-h-screen max-w-full bg-linear-to-br from-amber-100 via-orange-100 to-red-100 flex flex-col items-center justify-center relative px-4 py-8 lg:px-0">
        {/* - Logo - */}

        <img
          className="absolute top-4 right-16 md:top-4 md:right-69 lg:top-14 lg:right-122 h-16 w-auto"
          src={PetMatch}
          alt="PetMatch Logo"
        />

        <div className="flex flex-col items-center w-full">
          <h1 className="text-3xl font-bold bg-linear-to-b from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-3">
            PetMatch
          </h1>

          <p className=" text-lg text-black/70 mb-6 text-center">
            Cruzamento com segurança para seu Pet.
          </p>

          <div className="bg-white border border-black/40 w-full max-w-sm lg:max-w-md rounded-lg px-4 py-2 flex flex-col mx-auto">
            {/* -  input do primeiro nome - */}

            <h1 className="font-bold text-3xl text-black text-center py-3">
              Cadastre-se
            </h1>

            <label
              className=" font-semibold my-2"
              htmlFor="firstName"
            >
              Primeiro Nome:
            </label>

            <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-4 py-2 focus-within:ring-2 focus-within:ring-amber-500 mb-1">
              <FaUser className="h-4 w-4 mr-3 mt-1 text-amber-600" />

              <input
                className="w-full bg-transparent focus:outline-none placeholder:text-gray-500 text-black"
                id="firstName"
                type="text"
                placeholder="Seu Nome"
                value={firstName}
                onChange={(e) => setFirstName(masks.name(e.target.value))}
              />
            </div>

            {/* - input do último nome - */}

            <label
              className=" font-semibold my-2"
              htmlFor="lastName"
            >
              Último Nome:
            </label>

            <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-4 py-2 focus-within:ring-2 focus-within:ring-amber-500 mb-1">
              <FaUser className="h-4 w-4 mr-3 mt-1 text-amber-600" />

              <input
                className="w-full bg-transparent focus:outline-none placeholder:text-gray-500 text-black"
                id="lastName"
                type="text"
                placeholder="Seu Sobrenome"
                value={lastName}
                onChange={(e) => setLastName(masks.name(e.target.value))}
              />
            </div>

            {/* - input do email - */}

            <label
              className=" font-semibold my-2"
              htmlFor="email"
            >
              Email:
            </label>

            <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-4 py-2 focus-within:ring-2 focus-within:ring-amber-500 mb-1">
              <MdEmail className="h-4 w-4 mr-3 mt-1 text-amber-600" />

              <input
                className="w-full bg-transparent focus:outline-none placeholder:text-gray-500 text-black"
                id="email"
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* - input da senha - */}

            <label
              className=" font-semibold my-2"
              htmlFor="password"
            >
              Senha:
            </label>

            <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-4 py-2 focus-within:ring-2 focus-within:ring-amber-500 mb-1">
              <RiLockPasswordFill className="h-4 w-4 mr-3 mt-1 text-amber-600" />

              <input
                className="w-full bg-transparent focus:outline-none placeholder:text-gray-500 text-black"
                id="password"
                type={isPrivate ? "password" : "text"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button onClick={() => setIsPrivate(!isPrivate)}>
                {isPrivate ? (
                  <EyeClosed className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>

            {/* - Input de confimação de senha - */}

            <label
              className=" font-semibold my-2"
              htmlFor="confirmPassword"
            >
              Confirme sua Senha:
            </label>

            <div className="w-full border border-black/40 bg-gray-100 rounded-lg flex px-4 py-2 focus-within:ring-2 focus-within:ring-amber-500 mb-4">
              <RiLockPasswordFill className="h-4 w-4 mr-3 mt-1 text-amber-600" />

              <input
                className="w-full bg-transparent focus:outline-none placeholder:text-gray-500 text-black"
                id="confirmPassword"
                type={isConfirmPrivate ? "password" : "text"}
                placeholder="********"
                value={confirmPassowrd}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button onClick={() => setIsConfirmPrivate(!isConfirmPrivate)}>
                {isConfirmPrivate ? (
                  <EyeClosed className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>

            {/* - Botão - */}

            <button
              className="w-full h-10 bg-linear-to-r from-amber-600 via-orange-600 to-red-600 text-white text-lg rounded-lg px-4 cursor-pointer hover:from-amber-400 hover:via-orange-400 hover:to-red-400 font-semibold border border-black/40"
              type="submit"
              ref={signUpRef}
              onClick={createNewAccount}
            >
              Cadastrar
            </button>

            {/* - Erro - */}

            <div className="min-h-16">
              {signUpError && (
                <p className="flex items-center justify-center h-10 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm font-semibold px-4 text-center my-3">
                  {signUpError}
                </p>
              )}
            </div>

            {/* - Cadastro - */}

            <div className="flex gap-2 justify-center">
              <p className="text-sm font-semibold my-2 ">
                Já possui cadastro?{" "}
              </p>

              <Link
                className="text-sm hover:bg-linear-to-b hover:from-amber-600 hover:via-orange-600 hover:to-red-600 hover:bg-clip-text hover:text-transparent hover:underline font-semibold my-2 cursor-pointer"
                to="/"
              >
                Faça Login!
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col pt-8 px-4 text-center">
          <p className="text-black text-sm font-semibold">
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

export { Authentication };
