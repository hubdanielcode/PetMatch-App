import { test, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useTheme } from "@/shared/hooks/theme/useTheme";
import { ThemeContext } from "@/shared/context/ThemeContext";
import React, { type ReactNode } from "react";

/* - Testando useTheme - */

test("returns context when inside ThemeProvider", () => {
  const fakeContext = { theme: "light", toggleTheme: vi.fn() };

  const wrapper = ({ children }: { children: ReactNode }) =>
    React.createElement(
      ThemeContext.Provider,
      { value: fakeContext as never },
      children,
    );

  const { result } = renderHook(() => useTheme(), { wrapper });

  expect(result.current).toEqual(fakeContext);
});

test("throws error when used outside ThemeProvider", () => {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});

  expect(() => renderHook(() => useTheme())).toThrow(
    "useTheme must be used inside ThemeProvider",
  );

  spy.mockRestore();
});
