import { CirclePlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useGetTutors } from "../../features/pet-registration";
import { useEffect } from "react";
import { supabase } from "../../../supabase/supabase";

const Header = () => {
  const navigate = useNavigate();
  const { getTutors, tutor } = useGetTutors();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) getTutors(user.id);
    });
  }, []);

  return (
    <header className="flex w-full min-h-15 border-b border-black/40 bg-white justify-between items-center px-[15%] relative">
      <Link
        to="/pagina-principal"
        replace
        className="text-2xl font-bold bg-linear-to-b from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"
      >
        PetMatch
      </Link>

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

      <div
        className="flex border border-black/40 h-10 w-10 rounded-full bg-linear-to-br from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-xl items-center justify-center absolute right-48 cursor-pointer overflow-hidden"
        role="button"
        onClick={() => navigate("/perfil", { replace: true })}
      >
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
    </header>
  );
};

export { Header };
