const speciesBadges = [
  {
    value: "Cachorro" as const,
    badgeBackground: "bg-[#6A03D5]",
    badgeBorder: "border-black/40",
    badgeText: "text-white",
  },
  {
    value: "Gato" as const,
    badgeBackground: "bg-[#F104DF]",
    badgeBorder: "border-black/40",
    badgeText: "text-white",
  },
];

const matedBadges = [
  {
    value: "Já Cruzou" as const,
    badgeBackground: "bg-[#1A8299]",
    badgeBorder: "border-black/40",
    badgeText: "text-white",
  },
];

const pedigreeBadges = [
  {
    value: "Com Pedigree" as const,
    badgeBackground: "bg-[#10A0D9]",
    badgeBorder: "border-black/40",
    badgeText: "text-white",
  },
];

const vaccineBadges = [
  {
    value: "Vacinado" as const,
    badgeBackground: "bg-[#0F9708]",
    badgeBorder: "border-black/40",
    badgeText: "text-white",
  },
];

const testiclesBadges = [
  {
    value: "Criptoquidismo Bilateral" as const,
    badgeBackground: "bg-[#BF0621]",
    badgeBorder: "border-black/40",
    badgeText: "text-white",
  },
  {
    value: "Criptoquidismo Unilateral" as const,
    badgeBackground: "bg-[#E36802]",
    badgeBorder: "border-black/40",
    badgeText: "text-white",
  },
];

const allBadges = [
  ...testiclesBadges,
  ...speciesBadges,
  ...matedBadges,
  ...pedigreeBadges,
  ...vaccineBadges,
];

const usePetBadges = (
  species: "Cachorro" | "Gato",
  mated: boolean | null,
  pedigree: boolean | null,
  vaccinated: boolean | null,
  cryptorchidism_bilateral: boolean | null,
  cryptorchidism_unilateral: boolean | null,
) => {
  const petBadges: string[] = [];

  if (species === "Cachorro") {
    petBadges.push("Cachorro");
  } else {
    petBadges.push("Gato");
  }

  if (mated) {
    petBadges.push("Já Cruzou");
  }

  if (pedigree) {
    petBadges.push("Com Pedigree");
  }

  if (vaccinated) {
    petBadges.push("Vacinado");
  }

  if (cryptorchidism_bilateral) {
    petBadges.push("Criptoquidismo Bilateral");
  } else if (cryptorchidism_unilateral) {
    petBadges.push("Criptoquidismo Unilateral");
  }

  return allBadges.filter((badge) => petBadges.includes(badge.value));
};

export { usePetBadges };
