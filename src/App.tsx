import { supabase } from "../supabase/supabase";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Route, Routes, Outlet, useNavigate } from "react-router-dom";
import { Header, Footer, Missing } from "./shared";
import {
  Authentication,
  Login,
  RecoverPassword,
  ProtectedRoute,
} from "./features/authentication";
import { RegistrationProvider } from "./features/pet-registration/context/RegistrationContext";
import { MainPage, Modal } from "./shared";
import { RegisterFlow } from "./features/pet-registration/pages/forms/RegisterFlow";
import { TutorProfile } from "./features/user-profiile/pages/profile/TutorProfile";
import { PetProfile } from "./features/user-profiile/pages/profile/PetProfile";

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
  const [session, setSession] = useState<Session | null>(null);

  const navigate = useNavigate();

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
    return <div>Carregando...</div>;
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

          {/* - Rota do Layout Principal: Protegida!! - */}

          <Route element={<ProtectedRoute session={session} />}>
            <Route element={<AppLayout />}>
              <Route
                path="/pagina-principal"
                element={<MainPage />}
              />

              <Route
                path="/modal"
                element={<Modal />}
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
