import { renderHook, act } from "@testing-library/react";
import { useContext } from "react";
import { beforeEach, vi, test, expect } from "vitest";
import {
  RegistrationContext,
  RegistrationProvider,
} from "@/features/pet-registration/context/RegistrationContext";

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando o wrapper e o helper para evitar repetições - */

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <RegistrationProvider>{children}</RegistrationProvider>
);

const renderContext = () =>
  renderHook(() => useContext(RegistrationContext), { wrapper });

/* - Testando os valores iniciais do contexto - */

test("provides correct initial values for pet fields", () => {
  const { result } = renderContext();

  expect(result.current?.petName).toBe("");
  expect(result.current?.age).toBe("");
  expect(result.current?.minAge).toBe("");
  expect(result.current?.maxAge).toBe("");
  expect(result.current?.species).toBe("");
  expect(result.current?.breed).toBe("");
  expect(result.current?.gender).toBe("");
  expect(result.current?.pedigree).toBeNull();
  expect(result.current?.pedigreeFile).toBeNull();
  expect(result.current?.vaccinated).toBeNull();
  expect(result.current?.vaccineFile).toBeNull();
  expect(result.current?.mated).toBeNull();
  expect(result.current?.cryptorchidism_unilateral).toBe(false);
  expect(result.current?.cryptorchidism_bilateral).toBe(false);
});

test("provides correct initial values for tutor fields", () => {
  const { result } = renderContext();

  expect(result.current?.name).toBe("");
  expect(result.current?.phoneNumber).toBe("");
  expect(result.current?.email).toBe("");
  expect(result.current?.street).toBe("");
  expect(result.current?.complement).toBe("");
  expect(result.current?.neighborhood).toBe("");
  expect(result.current?.houseNumber).toBe("");
  expect(result.current?.city).toBe("");
  expect(result.current?.state).toBe("");
  expect(result.current?.zipcode).toBe("");
});

test("provides correct initial values for anamnese fields", () => {
  const { result } = renderContext();

  expect(result.current?.feedingInfo).toBe("");
  expect(result.current?.walksInfo).toBe("");
  expect(result.current?.behaviorInfo).toBe("");
  expect(result.current?.surgeriesInfo).toBe("");
  expect(result.current?.diseasesInfo).toBe("");
  expect(result.current?.testiclesInfo).toBe("");
  expect(result.current?.reproductionInfo).toBe("");
});

/* - Testando os setters do contexto - */

test("updates pet fields correctly via setters", () => {
  const { result } = renderContext();

  act(() => {
    result.current?.setPetName("Rex");
    result.current?.setAge("3");
    result.current?.setMinAge("1");
    result.current?.setMaxAge("5");
    result.current?.setSpecies("Cachorro");
    result.current?.setBreed("Labrador");
    result.current?.setGender("Macho");
    result.current?.setPedigree(true);
    result.current?.setVaccinated(true);
    result.current?.setMated(true);
    result.current?.setCryptorchidism_unilateral(true);
    result.current?.setCryptorchidism_bilateral(true);
  });

  expect(result.current?.petName).toBe("Rex");
  expect(result.current?.age).toBe("3");
  expect(result.current?.minAge).toBe("1");
  expect(result.current?.maxAge).toBe("5");
  expect(result.current?.species).toBe("Cachorro");
  expect(result.current?.breed).toBe("Labrador");
  expect(result.current?.gender).toBe("Macho");
  expect(result.current?.pedigree).toBe(true);
  expect(result.current?.vaccinated).toBe(true);
  expect(result.current?.mated).toBe(true);
  expect(result.current?.cryptorchidism_unilateral).toBe(true);
  expect(result.current?.cryptorchidism_bilateral).toBe(true);
});

test("updates tutor fields correctly via setters", () => {
  const { result } = renderContext();

  act(() => {
    result.current?.setName("João");
    result.current?.setPhoneNumber("71999999999");
    result.current?.setEmail("joao@email.com");
    result.current?.setStreet("Rua A");
    result.current?.setComplement("Apto 1");
    result.current?.setNeighborhood("Centro");
    result.current?.setHouseNumber("123");
    result.current?.setCity("Salvador");
    result.current?.setState("BA");
    result.current?.setZipcode("40000000");
  });

  expect(result.current?.name).toBe("João");
  expect(result.current?.phoneNumber).toBe("71999999999");
  expect(result.current?.email).toBe("joao@email.com");
  expect(result.current?.street).toBe("Rua A");
  expect(result.current?.complement).toBe("Apto 1");
  expect(result.current?.neighborhood).toBe("Centro");
  expect(result.current?.houseNumber).toBe("123");
  expect(result.current?.city).toBe("Salvador");
  expect(result.current?.state).toBe("BA");
  expect(result.current?.zipcode).toBe("40000000");
});

test("updates anamnese fields correctly via setters", () => {
  const { result } = renderContext();

  act(() => {
    result.current?.setFeedingInfo("Ração");
    result.current?.setWalksInfo("2x ao dia");
    result.current?.setBehaviorInfo("Calmo");
    result.current?.setSurgeriesInfo("Nenhuma");
    result.current?.setDiseasesInfo("Nenhuma");
    result.current?.setTesticlesInfo("2");
    result.current?.setReproductionInfo("Sim");
  });

  expect(result.current?.feedingInfo).toBe("Ração");
  expect(result.current?.walksInfo).toBe("2x ao dia");
  expect(result.current?.behaviorInfo).toBe("Calmo");
  expect(result.current?.surgeriesInfo).toBe("Nenhuma");
  expect(result.current?.diseasesInfo).toBe("Nenhuma");
  expect(result.current?.testiclesInfo).toBe("2");
  expect(result.current?.reproductionInfo).toBe("Sim");
});

/* - Testando o resetContext - */

test("resets all fields to initial values when resetContext is called", () => {
  const { result } = renderContext();

  act(() => {
    result.current?.setPetName("Rex");
    result.current?.setName("João");
    result.current?.setFeedingInfo("Ração");
    result.current?.setPedigree(true);
    result.current?.setVaccinated(true);
    result.current?.setMated(true);
    result.current?.setCryptorchidism_unilateral(true);
    result.current?.setCryptorchidism_bilateral(true);
  });

  act(() => {
    result.current?.resetContext();
  });

  expect(result.current?.petName).toBe("");
  expect(result.current?.name).toBe("");
  expect(result.current?.feedingInfo).toBe("");
  expect(result.current?.pedigree).toBeNull();
  expect(result.current?.vaccinated).toBeNull();
  expect(result.current?.mated).toBeNull();
  expect(result.current?.cryptorchidism_unilateral).toBe(false);
  expect(result.current?.cryptorchidism_bilateral).toBe(false);
});
