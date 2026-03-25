import { usePetBadges } from "../hooks/usePetBadges";
import type { Testicles } from "../pages/anamnese/AnamneseTesticles";

interface BadgeProps {
  species: "Cachorro" | "Gato";
  mated: "Yes" | "No";
  pedigree: "Yes" | "No";
  vaccineFile: File | null;
  testicles: Testicles;
}

const Badges: React.FC<BadgeProps> = ({
  species,
  mated,
  pedigree,
  vaccineFile,
  testicles,
}) => {
  const badges = usePetBadges(species, mated, pedigree, vaccineFile, testicles);
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
