import { usePets } from "../../hooks/usePets";
import { PetFeed } from "./PetFeed";
import { PetFilter } from "./PetFilter";

const MainPage = () => {
  const { pets } = usePets();

  return (
    <div className="bg-linear-to-br from-amber-100 via-orange-100 to-red-100 min-h-screen max-w-full">
      <div className="flex flex-col w-[25%] ml-[15%] py-12">
        <h1 className="text-3xl font-bold text-black mb-1">Feed de Pets</h1>
        <p className="text-base font-semibold text-black/70">
          Encontre o match perfeito para o seu pet!
        </p>
      </div>

      <div className="flex gap-8 items-start ml-[15%]">
        <PetFilter />
        <PetFeed pets={pets} />
      </div>
    </div>
  );
};

export { MainPage };
