const speciesBadges = [
  {
    value: "Cachorro" as const,
    badgeBackground: "bg-violet-300",
    badgeBorder: "border-violet-500",
    badgeText: "text-white",
  },
  {
    value: "Gato" as const,
    badgeBackground: "bg-pink-300",
    badgeBorder: "border-pink-500",
    badgeText: "text-white",
  },
];

const matedBadges = [
  {
    value: "Já Cruzou" as const,
    badgeBackground: "bg-orange-300",
    badgeBorder: "border-orange-500",
    badgeText: "text-white",
  },
];

const pedigreeBadges = [
  {
    value: "Com Pedigree" as const,
    badgeBackground: "bg-blue-300",
    badgeBorder: "border-blue-500",
    badgeText: "text-white",
  },
];

const vaccineBadges = [
  {
    value: "Vacinado" as const,
    badgeBackground: "bg-green-300",
    badgeBorder: "border-green-500",
    badgeText: "text-white",
  },
];

const testiclesBadges = [
  {
    value: "Criptoquidismo Bilateral" as const,
    badgeBackground: "bg-cyan-300",
    badgeBorder: "border-cyan-500",
    badgeText: "text-white",
  },
  {
    value: "Criptoquidismo Unilateral" as const,
    badgeBackground: "bg-teal-300",
    badgeBorder: "border-teal-500",
    badgeText: "text-white",
  },
];

const allBadges = [
  ...speciesBadges,
  ...matedBadges,
  ...pedigreeBadges,
  ...vaccineBadges,
  ...testiclesBadges,
];

const usePetBadges = (
  species: "Cachorro" | "Gato",
  mated: boolean,
  pedigree: boolean | null,
  vaccinated: boolean,
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
