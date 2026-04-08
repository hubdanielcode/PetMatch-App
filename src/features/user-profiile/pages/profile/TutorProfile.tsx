import { useEffect, useState } from "react";
import { PetInfo } from "./PetInfo";
import { TutorInfo } from "./TutorInfo";
import { supabase } from "../../../../../supabase/supabase";

const TutorProfile = () => {
  const [activeTab, setActiveTab] = useState<"Tutor" | "Pet">("Tutor");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-amber-100 via-orange-100 to-red-100">
      <div className="flex flex-col">
        <h1 className="text-black font-bold text-2xl sm:text-3xl pl-4 py-6 sm:py-10 ml-3 sm:ml-[15%]">
          Meu Perfil
        </h1>

        <div className="flex h-fit w-[90%] sm:w-[50%] lg:w-[25%] bg-linear-to-br from-amber-300 via-orange-300 to-red-300 px-2 py-1 gap-1 ml-3 sm:ml-[15%] rounded-full justify-center text-black font-semibold text-sm">
          <button
            className={`rounded-full px-3 sm:px-4 py-1 min-w-[50%] cursor-pointer ${activeTab === "Tutor" ? "bg-white border border-black/40" : "bg-transparent"}`}
            onClick={() => setActiveTab("Tutor")}
          >
            Minhas Informações
          </button>

          <button
            className={`rounded-full px-3 sm:px-4 py-1 min-w-[50%] cursor-pointer ${activeTab === "Pet" ? "bg-white border border-black/40" : "bg-transparent"}`}
            onClick={() => setActiveTab("Pet")}
          >
            Meus Pets
          </button>
        </div>
      </div>

      {activeTab === "Pet" ? <PetInfo /> : <TutorInfo user_id={userId} />}
    </div>
  );
};

export { TutorProfile };
