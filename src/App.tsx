import { supabase } from "../supabase/supabase";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Header,
  Footer,
  Missing,
  TermsOfUse,
  PrivacyPolicy,
  Welcome,
} from "./shared";
import {
  Authentication,
  Login,
  RecoverPassword,
  ProtectedRoute,
} from "./features/authentication";
import { RegistrationProvider } from "./features/pet-registration/context/RegistrationContext";
import { MainPage } from "./shared";
import { RegisterFlow } from "./features/pet-registration/pages/forms/RegisterFlow";
import { TutorProfile } from "./features/user-profile/pages/profile/TutorProfile";
import { PetProfile } from "./features/user-profile/pages/profile/PetProfile";
import { About } from "./shared/pages/footer-links/About";
import { HowDoesItWork } from "./shared/pages/footer-links/HowDoesItWork";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-amber-100 via-orange-100 to-red-100">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingDots, setLoadingDots] = useState<string[]>([]);
  const [session, setSession] = useState<Session | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((prev) => {
        if (prev.length > 3) {
          return [];
        } else {
          return [...prev, "."];
        }
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const getSession = await supabase.auth.getSession();
        setSession(getSession.data.session);
        console.log("Supabase Session:", getSession.data.session);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSession();

    const { data: AuthenticationListener } = supabase.auth.onAuthStateChange(
      (e: AuthChangeEvent, session: Session | null) => {
        if (e === "SIGNED_OUT") {
          navigate("/", { replace: true });
        }
        setSession(session);
      },
    );
    return () => {
      AuthenticationListener.subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return (
      <div className="justify-center items-center min-h-screen flex bg-linear-to-br from-amber-100 via-orange-100 to-red-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
        <span className="flex mx-auto text-5xl w-80 min-h-30 font-bold bg-clip-text text-transparent bg-linear-to-b from-amber-600 via-orange-600 to-red-600">
          Carregando
          <motion.span className="flex">
            {loadingDots.map((dot, index) => (
              <motion.span
                className="ml-1"
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {dot}
              </motion.span>
            ))}
          </motion.span>
        </span>
      </div>
    );
  }

  return (
    <div className="select-none h-full">
      <RegistrationProvider>
        <Routes>
          {/* - Rota de Login - */}

          <Route
            path="/"
            element={<Login />}
          />

          {/* - Rota de Termos de Uso - */}

          <Route
            path="/termos-de-uso"
            element={<TermsOfUse />}
          />

          {/* - Rota de Política de Privacidade - */}

          <Route
            path="/politica-de-privacidade"
            element={<PrivacyPolicy />}
          />

          {/* - Rota do Layout Principal: Protegida!! - */}

          <Route element={<ProtectedRoute session={session} />}>
            <Route element={<AppLayout />}>
              <Route
                path="/pagina-principal"
                element={<MainPage />}
              />

              <Route
                path="/bem-vindo"
                element={<Welcome />}
              />

              <Route
                path="/registrar-pet"
                element={<RegisterFlow />}
              />

              <Route
                path="/perfil"
                element={<TutorProfile />}
              />

              <Route
                path="/perfil-pet"
                element={<PetProfile />}
              />

              {/* - Rotas dos Link do Footer - */}

              <Route
                path="/sobre"
                element={<About />}
              />

              <Route
                path="/como-funciona"
                element={<HowDoesItWork />}
              />
            </Route>
          </Route>

          {/* - Rota de Cadastro - */}

          <Route
            path="/cadastro"
            element={<Authentication />}
          />

          {/* - Rota de Recuperar Senha - */}

          <Route
            path="/recuperar-senha"
            element={<RecoverPassword />}
          />

          {/* - Rota de Erro - */}

          <Route
            path="*"
            element={<Missing />}
          />
        </Routes>
      </RegistrationProvider>
    </div>
  );
};
export default App;
