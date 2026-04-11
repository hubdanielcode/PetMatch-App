import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { beforeEach, vi, test, expect } from "vitest";
import { ProtectedRoute } from "@/features/authentication";

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando a função de renderizar o componente - */

const renderComponent = (session: any) =>
  render(
    <MemoryRouter initialEntries={["/protegido"]}>
      <Routes>
        <Route
          path="/"
          element={<p>Página de Login</p>}
        />
        <Route element={<ProtectedRoute session={session} />}>
          <Route
            path="/protegido"
            element={<p>Página Protegida</p>}
          />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

/* - Testando o redirecionamento sem sessão - */

test("redirects to / when session is null", () => {
  renderComponent(null);
  expect(screen.getByText("Página de Login")).toBeInTheDocument();
});

test("does not render the protected page when session is null", () => {
  renderComponent(null);
  expect(screen.queryByText("Página Protegida")).not.toBeInTheDocument();
});

/* - Testando o acesso com sessão ativa - */

test("renders the protected page when session is valid", () => {
  renderComponent({ user: { id: "user-123" } });
  expect(screen.getByText("Página Protegida")).toBeInTheDocument();
});

test("does not redirect when session is valid", () => {
  renderComponent({ user: { id: "user-123" } });
  expect(screen.queryByText("Página de Login")).not.toBeInTheDocument();
});
