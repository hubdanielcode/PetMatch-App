import { test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badges } from "@/shared/ui/Badges";

/* - Mockando usePetBadges - */

const { mockUsePetBadges } = vi.hoisted(() => ({
  mockUsePetBadges: vi.fn(),
}));

vi.mock("@/features/pet-registration/hooks/pet-hooks/usePetBadges", () => ({
  usePetBadges: mockUsePetBadges,
}));

const defaultProps = {
  species: "Cachorro" as const,
  mated: false,
  pedigree: false,
  vaccinated: false,
  cryptorchidism_bilateral: false,
  cryptorchidism_unilateral: false,
};

/* - Testando Badges - */

test("renders species badge", () => {
  mockUsePetBadges.mockReturnValue([
    {
      value: "Cachorro",
      badgeBackground: "bg-purple-600",
      badgeBorder: "border-black/40",
      badgeText: "text-white",
    },
  ]);

  render(<Badges {...defaultProps} />);
  expect(screen.getByText("Cachorro")).toBeInTheDocument();
});

test("renders multiple badges", () => {
  mockUsePetBadges.mockReturnValue([
    {
      value: "Cachorro",
      badgeBackground: "bg-purple-600",
      badgeBorder: "border-black/40",
      badgeText: "text-white",
    },
    {
      value: "Vacinado",
      badgeBackground: "bg-green-600",
      badgeBorder: "border-black/40",
      badgeText: "text-white",
    },
    {
      value: "Com Pedigree",
      badgeBackground: "bg-blue-500",
      badgeBorder: "border-black/40",
      badgeText: "text-white",
    },
  ]);

  render(
    <Badges
      {...defaultProps}
      vaccinated
      pedigree
    />,
  );
  expect(screen.getByText("Cachorro")).toBeInTheDocument();
  expect(screen.getByText("Vacinado")).toBeInTheDocument();
  expect(screen.getByText("Com Pedigree")).toBeInTheDocument();
});

test("renders no badges when hook returns empty array", () => {
  mockUsePetBadges.mockReturnValue([]);

  const { container } = render(<Badges {...defaultProps} />);
  expect(container.querySelectorAll("span")).toHaveLength(0);
});

test("calls usePetBadges with correct props", () => {
  mockUsePetBadges.mockReturnValue([]);

  render(
    <Badges
      species="Gato"
      mated={true}
      pedigree={true}
      vaccinated={true}
      cryptorchidism_bilateral={false}
      cryptorchidism_unilateral={false}
    />,
  );

  expect(mockUsePetBadges).toHaveBeenCalledWith(
    "Gato",
    true,
    true,
    true,
    false,
    false,
  );
});

test("applies sm size classes by default", () => {
  mockUsePetBadges.mockReturnValue([
    {
      value: "Cachorro",
      badgeBackground: "bg-purple-600",
      badgeBorder: "border-black/40",
      badgeText: "text-white",
    },
  ]);

  render(<Badges {...defaultProps} />);
  const badge = screen.getByText("Cachorro");
  expect(badge.className).toContain("text-[10px]");
});

test("applies md size classes when size is md", () => {
  mockUsePetBadges.mockReturnValue([
    {
      value: "Cachorro",
      badgeBackground: "bg-purple-600",
      badgeBorder: "border-black/40",
      badgeText: "text-white",
    },
  ]);

  render(
    <Badges
      {...defaultProps}
      size="md"
    />,
  );
  const badge = screen.getByText("Cachorro");
  expect(badge.className).toContain("text-xs");
});
