import { renderHook, act } from "@testing-library/react";
import { test, expect } from "vitest";
import { useRegistrationContext } from "@/features/pet-registration";
import { RegistrationProvider } from "@/features/pet-registration/context/RegistrationContext";
import type { ReactNode } from "react";

/* - Wrapper com o Provider - */

const wrapper = ({ children }: { children: ReactNode }) => (
  <RegistrationProvider>{children}</RegistrationProvider>
);

/* - Testando os valores iniciais do hook - */

test("throws error when used outside of RegistrationProvider", () => {
  expect(() => renderHook(() => useRegistrationContext())).toThrow(
    "useRegistrationContext must be used within ApplicationProvider",
  );
});

test("provides correct initial values for pet fields", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  expect(result.current.petPhoto).toBeNull();
  expect(result.current.petName).toBe("");
  expect(result.current.age).toBe("");
  expect(result.current.minAge).toBe("");
  expect(result.current.maxAge).toBe("");
  expect(result.current.species).toBe("");
  expect(result.current.breed).toBe("");
  expect(result.current.gender).toBe("");
  expect(result.current.pedigree).toBeNull();
  expect(result.current.pedigreeFile).toBeNull();
  expect(result.current.vaccinated).toBeNull();
  expect(result.current.vaccineFile).toBeNull();
  expect(result.current.mated).toBeNull();
  expect(result.current.cryptorchidism_unilateral).toBe(false);
  expect(result.current.cryptorchidism_bilateral).toBe(false);
});

test("provides correct initial values for tutor fields", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  expect(result.current.name).toBe("");
  expect(result.current.photo).toBeNull();
  expect(result.current.phoneNumber).toBe("");
  expect(result.current.email).toBe("");
  expect(result.current.street).toBe("");
  expect(result.current.complement).toBe("");
  expect(result.current.neighborhood).toBe("");
  expect(result.current.houseNumber).toBe("");
  expect(result.current.city).toBe("");
  expect(result.current.state).toBe("");
  expect(result.current.zipcode).toBe("");
});

test("provides correct initial values for anamnese fields", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  expect(result.current.feedingInfo).toBe("");
  expect(result.current.walksInfo).toBe("");
  expect(result.current.behaviorInfo).toBe("");
  expect(result.current.surgeriesInfo).toBe("");
  expect(result.current.diseasesInfo).toBe("");
  expect(result.current.testiclesInfo).toBe("");
  expect(result.current.reproductionInfo).toBe("");
});

/* - Testando os setters dos campos do pet - */

test("updates petName correctly", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => result.current.setPetName("Rex"));

  expect(result.current.petName).toBe("Rex");
});

test("updates species correctly", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => result.current.setSpecies("Cachorro"));

  expect(result.current.species).toBe("Cachorro");
});

test("updates pedigree correctly", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => result.current.setPedigree(true));

  expect(result.current.pedigree).toBe(true);
});

test("updates mated correctly", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => result.current.setMated(false));

  expect(result.current.mated).toBe(false);
});

test("updates cryptorchidism_unilateral correctly", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => result.current.setCryptorchidism_unilateral(true));

  expect(result.current.cryptorchidism_unilateral).toBe(true);
});

/* - Testando os setters dos campos do tutor - */

test("updates name correctly", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => result.current.setName("João"));

  expect(result.current.name).toBe("João");
});

test("updates email correctly", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => result.current.setEmail("joao@email.com"));

  expect(result.current.email).toBe("joao@email.com");
});

test("updates city and state correctly", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => {
    result.current.setCity("Salvador");
    result.current.setState("BA");
  });

  expect(result.current.city).toBe("Salvador");
  expect(result.current.state).toBe("BA");
});

/* - Testando os setters dos campos da anamnese - */

test("updates feedingInfo correctly", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => result.current.setFeedingInfo("Ração 2x ao dia"));

  expect(result.current.feedingInfo).toBe("Ração 2x ao dia");
});

test("updates testiclesInfo correctly", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => result.current.setTesticlesInfo("2"));

  expect(result.current.testiclesInfo).toBe("2");
});

/* - Testando o resetContext - */

test("resetContext resets all pet fields to initial values", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => {
    result.current.setPetName("Rex");
    result.current.setSpecies("Cachorro");
    result.current.setPedigree(true);
    result.current.setVaccinated(true);
    result.current.setMated(true);
    result.current.setCryptorchidism_unilateral(true);
    result.current.setCryptorchidism_bilateral(true);
  });

  act(() => result.current.resetContext());

  expect(result.current.petPhoto).toBeNull();
  expect(result.current.petName).toBe("");
  expect(result.current.species).toBe("");
  expect(result.current.pedigree).toBeNull();
  expect(result.current.vaccinated).toBeNull();
  expect(result.current.mated).toBeNull();
  expect(result.current.cryptorchidism_unilateral).toBe(false);
  expect(result.current.cryptorchidism_bilateral).toBe(false);
});

test("resetContext resets all tutor fields to initial values", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => {
    result.current.setName("João");
    result.current.setEmail("joao@email.com");
    result.current.setCity("Salvador");
    result.current.setState("BA");
    result.current.setZipcode("40000-000");
  });

  act(() => result.current.resetContext());

  expect(result.current.name).toBe("");
  expect(result.current.email).toBe("");
  expect(result.current.city).toBe("");
  expect(result.current.state).toBe("");
  expect(result.current.zipcode).toBe("");
});

test("resetContext resets all anamnese fields to initial values", () => {
  const { result } = renderHook(() => useRegistrationContext(), { wrapper });

  act(() => {
    result.current.setFeedingInfo("Ração");
    result.current.setWalksInfo("2x ao dia");
    result.current.setBehaviorInfo("Calmo");
    result.current.setTesticlesInfo("2");
    result.current.setReproductionInfo("Sim");
  });

  act(() => result.current.resetContext());

  expect(result.current.feedingInfo).toBe("");
  expect(result.current.walksInfo).toBe("");
  expect(result.current.behaviorInfo).toBe("");
  expect(result.current.testiclesInfo).toBe("");
  expect(result.current.reproductionInfo).toBe("");
});
