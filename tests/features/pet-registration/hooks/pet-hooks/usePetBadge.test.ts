import { renderHook } from "@testing-library/react";
import { test, expect } from "vitest";
import { usePetBadges } from "@/features/pet-registration";

/* - Criando a função para renderizzar os badges - */

const renderPetBadges = (
  species: "Cachorro" | "Gato" = "Cachorro",
  mated: boolean | null = null,
  pedigree: boolean | null = null,
  vaccinated: boolean | null = null,
  cryptorchidism_bilateral: boolean | null = null,
  cryptorchidism_unilateral: boolean | null = null,
) =>
  renderHook(() =>
    usePetBadges(
      species,
      mated,
      pedigree,
      vaccinated,
      cryptorchidism_bilateral,
      cryptorchidism_unilateral,
    ),
  ).result.current;

/* - Testando a espécie - */

test("returns Cachorro badge when species is Cachorro", () => {
  const badges = renderPetBadges("Cachorro");
  expect(badges.map((badge) => badge.value)).toContain("Cachorro");
});

test("returns Gato badge when species is Gato", () => {
  const badges = renderPetBadges("Gato");
  expect(badges.map((badge) => badge.value)).toContain("Gato");
});

test("does not return Gato badge when species is Cachorro", () => {
  const badges = renderPetBadges("Cachorro");
  expect(badges.map((badge) => badge.value)).not.toContain("Gato");
});

/* - Testando o cruzamento - */

test("returns Já Cruzou badge when mated is true", () => {
  const badges = renderPetBadges("Cachorro", true);
  expect(badges.map((badge) => badge.value)).toContain("Já Cruzou");
});

test("does not return Já Cruzou badge when mated is false", () => {
  const badges = renderPetBadges("Cachorro", false);
  expect(badges.map((badge) => badge.value)).not.toContain("Já Cruzou");
});

test("does not return Já Cruzou badge when mated is null", () => {
  const badges = renderPetBadges("Cachorro", null);
  expect(badges.map((badge) => badge.value)).not.toContain("Já Cruzou");
});

/* - Testando o pedigree - */

test("returns Com Pedigree badge when pedigree is true", () => {
  const badges = renderPetBadges("Cachorro", null, true);
  expect(badges.map((badge) => badge.value)).toContain("Com Pedigree");
});

test("does not return Com Pedigree badge when pedigree is false", () => {
  const badges = renderPetBadges("Cachorro", null, false);
  expect(badges.map((badge) => badge.value)).not.toContain("Com Pedigree");
});

/* - Testando a vacina - */

test("returns Vacinado badge when vaccinated is true", () => {
  const badges = renderPetBadges("Cachorro", null, null, true);
  expect(badges.map((badge) => badge.value)).toContain("Vacinado");
});

test("does not return Vacinado badge when vaccinated is false", () => {
  const badges = renderPetBadges("Cachorro", null, null, false);
  expect(badges.map((badge) => badge.value)).not.toContain("Vacinado");
});

/* - Testando o criptorquidismo - */

test("returns Criptoquidismo Bilateral badge when cryptorchidism_bilateral is true", () => {
  const badges = renderPetBadges("Cachorro", null, null, null, true, false);
  expect(badges.map((badge) => badge.value)).toContain(
    "Criptoquidismo Bilateral",
  );
});

test("returns Criptoquidismo Unilateral badge when cryptorchidism_unilateral is true", () => {
  const badges = renderPetBadges("Cachorro", null, null, null, false, true);
  expect(badges.map((badge) => badge.value)).toContain(
    "Criptoquidismo Unilateral",
  );
});

test("returns Bilateral over Unilateral when both are true", () => {
  const badges = renderPetBadges("Cachorro", null, null, null, true, true);
  const values = badges.map((badge) => badge.value);
  expect(values).toContain("Criptoquidismo Bilateral");
  expect(values).not.toContain("Criptoquidismo Unilateral");
});

test("does not return any cryptorchidism badge when both are false", () => {
  const badges = renderPetBadges("Cachorro", null, null, null, false, false);
  const values = badges.map((badge) => badge.value);
  expect(values).not.toContain("Criptoquidismo Bilateral");
  expect(values).not.toContain("Criptoquidismo Unilateral");
});

/* - Testando combinações - */

test("returns all badges when all conditions are true", () => {
  const badges = renderPetBadges("Cachorro", true, true, true, true, false);
  const values = badges.map((badge) => badge.value);
  expect(values).toContain("Cachorro");
  expect(values).toContain("Já Cruzou");
  expect(values).toContain("Com Pedigree");
  expect(values).toContain("Vacinado");
  expect(values).toContain("Criptoquidismo Bilateral");
});

test("returns only species badge when all other conditions are false or null", () => {
  const badges = renderPetBadges("Gato", null, null, null, false, false);
  expect(badges).toHaveLength(1);
  expect(badges[0].value).toBe("Gato");
});
