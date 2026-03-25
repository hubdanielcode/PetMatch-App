import { CirclePlus } from "lucide-react";

const Header = () => {
  return (
    <header className="flex w-full min-h-15 border-b border-black/40 bg-white justify-between items-center px-[15%] relative">
      <h1 className="text-2xl font-bold bg-linear-to-b from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
        PetMatch
      </h1>
      <button className="bg-linear-to-r from-amber-600 via-orange-600 to-red-600 font-semibold text-white hover:from-amber-400 hover:via-orange-400 hover:to-red-400 rounded-lg px-4 py-2 flex gap-2 cursor-pointer ">
        <CirclePlus className="w-5 h-5 my-auto" />
        Cadastrar Pet
      </button>
      <div className="flex h-10 w-10 rounded-full bg-linear-to-br from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-xl items-center justify-center absolute right-58">
        U
      </div>
    </header>
  );
};
export { Header };
