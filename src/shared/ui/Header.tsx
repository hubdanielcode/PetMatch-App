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
    <header className="flex w-full min-h-15 border-b border-black/40 bg-white items-center px-4 md:px-8 lg:px-[10%] relative">
      {/* - Nome do app - */}

      <Link
        to="/pagina-principal"
        replace
        className="text-xl md:text-2xl font-bold bg-linear-to-b from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"
      >
        PetMatch
      </Link>

      {/* - Lado direito - */}

      <div className="flex items-center ml-auto gap-3 md:gap-6">
        {/* - Cadastrar pet - */}

        <button
          className="border border-black/40 bg-linear-to-r from-amber-600 via-orange-600 to-red-600 font-semibold text-white hover:from-amber-400 hover:via-orange-400 hover:to-red-400 rounded-lg px-3 md:px-4 py-2 flex gap-2 cursor-pointer text-sm md:text-base"
          onClick={() =>
            navigate("/registrar-pet", {
              replace: true,
              state: { from: "/pagina-principal" },
            })
          }
        >
          <CirclePlus className="w-4 h-4 md:w-5 md:h-5 my-auto" />
          <span className="hidden sm:inline">Cadastrar Pet</span>
        </button>

        {/* - Sessão do usuário: Nome e foto - */}

        <div className="hidden md:flex items-center text-black text-sm md:text-md font-semibold">
          {tutor?.name ?? null}
        </div>

        <div
          className="flex border border-black/40 h-9 w-9 md:h-10 md:w-10 rounded-full bg-linear-to-br from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg items-center justify-center cursor-pointer overflow-hidden"
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
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-14 right-4 md:right-8 lg:right-[10%] z-10"
          >
            <div className="bg-white border border-black/40 rounded-lg shadow-lg w-44 md:w-50 font-semibold">
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
