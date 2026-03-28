import { usePetBadges } from "../../features/pet-registration/hooks/usePetBadges";

interface BadgeProps {
  species: "Cachorro" | "Gato";
  mated: boolean;
  pedigree: boolean;
  vaccinated: boolean;
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
    <div>
      {badges.map((badge) => (
        <span
          className={`${badge.badgeBackground} ${badge.badgeBorder} ${badge.badgeText}`}
        >
          {badge.value}
        </span>
      ))}
    </div>
  );
};
export { Badges };
