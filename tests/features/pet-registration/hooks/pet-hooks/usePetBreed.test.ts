import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, vi, test, expect } from "vitest";
import { usePetBreeds } from "@/features/pet-registration";

/* - Criando os Mocks - */

vi.stubGlobal("fetch", vi.fn());

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando as respostas falsas das APIs - */

const fakeDogResponse = {
  message: { labrador: [], poodle: [], bulldog: [] },
  status: "success",
};

const fakeCatResponse = [
  { name: "Persian" },
  { name: "Siamese" },
  { name: "Bengal" },
];

const mockFetch = (dogData = fakeDogResponse, catData = fakeCatResponse) => {
  vi.mocked(fetch).mockImplementation((url) => {
    const isDogApi = String(url).includes("dog.ceo");
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(isDogApi ? dogData : catData),
    } as Response);
  });
};

/* - Testando os valores iniciais - */

test("provides correct initial values", () => {
  mockFetch();
  const { result } = renderHook(() => usePetBreeds());

  expect(result.current.dogBreeds).toEqual([]);
  expect(result.current.catBreeds).toEqual([]);
});

/* - Testando o fetch de raças de cachorro - */

test("fetches and sets dog breeds correctly", async () => {
  mockFetch();
  const { result } = renderHook(() => usePetBreeds());

  await waitFor(() => {
    expect(result.current.dogBreeds.length).toBeGreaterThan(0);
  });

  expect(result.current.dogBreeds).toContain("SRD");
  expect(result.current.dogBreeds).toContain("labrador");
  expect(result.current.dogBreeds).toContain("poodle");
});

test("dog breeds list is sorted alphabetically", async () => {
  mockFetch();
  const { result } = renderHook(() => usePetBreeds());

  await waitFor(() => {
    expect(result.current.dogBreeds.length).toBeGreaterThan(0);
  });

  const sorted = [...result.current.dogBreeds].sort((a, b) =>
    a.localeCompare(b),
  );
  expect(result.current.dogBreeds).toEqual(sorted);
});

/* - Testando o fetch de raças de gato - */

test("fetches and sets cat breeds correctly", async () => {
  mockFetch();
  const { result } = renderHook(() => usePetBreeds());

  await waitFor(() => {
    expect(result.current.catBreeds.length).toBeGreaterThan(0);
  });

  expect(result.current.catBreeds).toContain("SRD");
  expect(result.current.catBreeds).toContain("Persian");
  expect(result.current.catBreeds).toContain("Siamese");
});

test("cat breeds list is sorted alphabetically", async () => {
  mockFetch();
  const { result } = renderHook(() => usePetBreeds());

  await waitFor(() => {
    expect(result.current.catBreeds.length).toBeGreaterThan(0);
  });

  const sorted = [...result.current.catBreeds].sort((a, b) =>
    a.localeCompare(b),
  );
  expect(result.current.catBreeds).toEqual(sorted);
});

/* - Testando erros - */

test("handles dog breeds fetch error gracefully", async () => {
  vi.mocked(fetch).mockImplementation((url) => {
    if (String(url).includes("dog.ceo")) {
      return Promise.resolve({ ok: false } as Response);
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeCatResponse),
    } as Response);
  });

  const { result } = renderHook(() => usePetBreeds());

  await waitFor(() => {
    expect(result.current.catBreeds.length).toBeGreaterThan(0);
  });

  expect(result.current.dogBreeds).toEqual([]);
});

test("handles cat breeds fetch error gracefully", async () => {
  vi.mocked(fetch).mockImplementation((url) => {
    if (String(url).includes("thecatapi")) {
      return Promise.resolve({ ok: false } as Response);
    }
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeDogResponse),
    } as Response);
  });

  const { result } = renderHook(() => usePetBreeds());

  await waitFor(() => {
    expect(result.current.dogBreeds.length).toBeGreaterThan(0);
  });

  expect(result.current.catBreeds).toEqual([]);
});
