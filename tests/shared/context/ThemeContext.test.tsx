import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi, beforeEach } from "vitest";
import { ThemeContext, ThemeProvider } from "@/shared/context/ThemeContext";
import { useContext } from "react";

/* - Criando os mocks - */

const { mockGetTheme, mockSaveTheme, mockApplyTheme } = vi.hoisted(() => ({
  mockGetTheme: vi.fn<() => "Light" | "Dark">(() => "Light"),
  mockSaveTheme: vi.fn(),
  mockApplyTheme: vi.fn(),
}));

vi.mock("@/shared/utils/theme", () => ({
  getTheme: mockGetTheme,
  saveTheme: mockSaveTheme,
  applyTheme: mockApplyTheme,
}));

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
  mockGetTheme.mockReturnValue("Light");
});

/* - Componente auxiliar para consumir o contexto - */

const TestConsumer = () => {
  const ctx = useContext(ThemeContext);
  return (
    <div>
      <span data-testid="theme">{ctx?.theme}</span>
      <button onClick={ctx?.toggleTheme}>toggle</button>
    </div>
  );
};

/* - Testes - */

test("provides Light theme by default", () => {
  render(
    <ThemeProvider>
      <TestConsumer />
    </ThemeProvider>,
  );

  expect(screen.getByTestId("theme").textContent).toBe("Light");
});

test("toggleTheme switches from Light to Dark", () => {
  render(
    <ThemeProvider>
      <TestConsumer />
    </ThemeProvider>,
  );

  fireEvent.click(screen.getByText("toggle"));

  expect(screen.getByTestId("theme").textContent).toBe("Dark");
});

test("toggleTheme switches from Dark back to Light", () => {
  mockGetTheme.mockReturnValue("Dark");

  render(
    <ThemeProvider>
      <TestConsumer />
    </ThemeProvider>,
  );

  fireEvent.click(screen.getByText("toggle"));

  expect(screen.getByTestId("theme").textContent).toBe("Light");
});

test("calls saveTheme with new theme on toggle", () => {
  render(
    <ThemeProvider>
      <TestConsumer />
    </ThemeProvider>,
  );

  fireEvent.click(screen.getByText("toggle"));

  expect(mockSaveTheme).toHaveBeenCalledWith("Dark");
});

test("calls applyTheme with new theme on toggle", () => {
  render(
    <ThemeProvider>
      <TestConsumer />
    </ThemeProvider>,
  );

  fireEvent.click(screen.getByText("toggle"));

  expect(mockApplyTheme).toHaveBeenCalledWith("Dark");
});

test("context is null outside of ThemeProvider", () => {
  const TestOutside = () => {
    const ctx = useContext(ThemeContext);
    return <span data-testid="ctx">{ctx === null ? "null" : "not null"}</span>;
  };

  render(<TestOutside />);

  expect(screen.getByTestId("ctx").textContent).toBe("null");
});
