import { usePetBadges } from "../../features/pet-registration/hooks/usePetBadges";

interface BadgeProps {
  species: "Cachorro" | "Gato";
  mated: boolean | null;
  pedigree: boolean | null;
  vaccinated: boolean | null;
  cryptorchidism_bilateral: boolean | null;
  cryptorchidism_unilateral: boolean | null;
}

const Badges: React.FC<BadgeProps> = ({
  species,
  mated,
  pedigree,
  vaccinated,
  cryptorchidism_bilateral,
  cryptorchidism_unilateral,
}) => {
  const badges = usePetBadges(
    species,
    mated,
    pedigree,
    vaccinated,
    cryptorchidism_bilateral,
    cryptorchidism_unilateral,
  );
  return (
    <div className="flex flex-wrap px-2 py-1">
      {badges.map((badge) => (
        <span
          key={badge.value}
          className={`text-xs font-semibold px-2 py-0.5 w-fit border rounded-full m-1 ${badge.badgeBackground} ${badge.badgeBorder} ${badge.badgeText}`}
        >
          {badge.value}
        </span>
      ))}
    </div>
  );
};
export { Badges };
