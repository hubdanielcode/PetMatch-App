import { usePetBadges } from "../../features/pet-registration/hooks/pet-hooks/usePetBadges";

interface BadgeProps {
  size?: "sm" | "md";
  species: "Cachorro" | "Gato";
  mated: boolean | null;
  pedigree: boolean | null;
  vaccinated: boolean | null;
  cryptorchidism_bilateral: boolean | null;
  cryptorchidism_unilateral: boolean | null;
}

const Badges: React.FC<BadgeProps> = ({
  size = "sm",
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

  const badgeSize = size === "md" ? "text-sm px-3 py-1" : "text-xs px-2 py-0.5";

  return (
    <div className="flex flex-wrap px-2 py-1">
      {badges.map((badge) => (
        <span
          key={badge.value}
          className={`${badgeSize} font-semibold w-fit border rounded-full m-1 ${badge.badgeBackground} ${badge.badgeBorder} ${badge.badgeText}`}
        >
          {badge.value}
        </span>
      ))}
    </div>
  );
};

export { Badges };
