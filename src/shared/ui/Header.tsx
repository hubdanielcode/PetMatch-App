import { CirclePlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetTutors } from "../../features/pet-registration";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase/supabase";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const navigate = useNavigate();
  const { getTutors, tutor } = useGetTutors();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) getTutors(user.id);
    });
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;

      if (!target.closest("#header-dropdown-menu")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuOptions = [
    { label: "Meu Perfil", value: "Meu Perfil" },
    { label: "Configurações", value: "Configurações" },
    { label: "Sair", value: "Sair" },
  ];

  return (
    <header className="flex w-full min-h-15 border-b border-black/40 bg-white justify-between items-center px-[10%] relative">
      {/* - Nome do app - */}

      <Link
        to="/pagina-principal"
        replace
        className="text-2xl font-bold bg-linear-to-b from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"
      >
        PetMatch
      </Link>

      <div className="flex items-center ml-auto mr-12">
        {/* - Cadastrar pet - */}

        <button
          className="border border-black/40 bg-linear-to-r from-amber-600 via-orange-600 to-red-600 font-semibold text-white hover:from-amber-400 hover:via-orange-400 hover:to-red-400 rounded-lg px-4 py-2 flex gap-2 cursor-pointer"
          onClick={() =>
            navigate("/registrar-pet", {
              replace: true,
              state: { from: "/pagina-principal" },
            })
          }
        >
          <CirclePlus className="w-5 h-5 my-auto" />
          Cadastrar Pet
        </button>

        {/* - Sessão do usuário: Nome e foto - */}

        <div className="flex absolute right-25">
          <span className="flex items-center text-black text-md font-semibold">
            {tutor?.name ?? null}
          </span>
        </div>

        <div
          className="flex border border-black/40 h-10 w-10 rounded-full bg-linear-to-br from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-xl items-center justify-center cursor-pointer overflow-hidden absolute right-10"
          role="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div>
            {tutor?.photo_url ? (
              <img
                src={tutor.photo_url}
                alt={tutor.name}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              tutor?.name?.charAt(0).toUpperCase()
            )}
          </div>
        </div>
      </div>

      {/* - Menu - */}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="header-dropdown-menu"
            initial={{ y: -155, x: 185, opacity: 0 }}
            animate={{ y: -30, x: 185, opacity: 1 }}
            exit={{ y: -155, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-15 right-5 bg-white border border-t-0 border-black/40 rounded-lg shadow-lg w-50 z-10 font-semibold">
              <ul className="flex flex-col">
                {menuOptions.map((option) => (
                  <li
                    className="px-4 py-2 text-black hover:bg-amber-100 cursor-pointer first:rounded-t-lg last:rounded-b-lg border-t border-black/40"
                    key={option.value}
                    onClick={() => {
                      if (option.value === "Meu Perfil") {
                        navigate("/perfil");
                      }

                      if (option.value === "Sair") {
                        supabase.auth.signOut();
                      }

                      setIsMenuOpen(false);
                    }}
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export { Header };
