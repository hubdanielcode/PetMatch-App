import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, test, expect, beforeEach } from "vitest";
import { FileUpload } from "@/features/pet-registration";

/* - Criando os Mocks hoistados - */

const { mockCreateObjectURL } = vi.hoisted(() => ({
  mockCreateObjectURL: vi.fn(() => "blob:http://localhost/mock-url"),
}));

vi.stubGlobal("URL", { createObjectURL: mockCreateObjectURL });

const mockOnChange = vi.fn();

/* - Limpando os mocks antes de cada teste - */

beforeEach(() => {
  vi.clearAllMocks();
});

/* - Criando a função de renderizar o componente - */

const renderComponent = (props: { accept?: string } = {}) =>
  render(
    <FileUpload
      id="file-upload"
      label="Foto do Pet"
      onChange={mockOnChange}
      {...props}
    />,
  );

const makeFile = (name: string, type: string) =>
  new File(["content"], name, { type });

/* - Testando a renderização inicial - */

test("renders the label text", () => {
  renderComponent();
  expect(screen.getByText("Foto do Pet")).toBeInTheDocument();
});

test("renders the placeholder text when no file is selected", () => {
  renderComponent();
  expect(screen.getByText("PNG, JPG, PDF até 10MB")).toBeInTheDocument();
});

test("does not render a preview image on initial render", () => {
  renderComponent();
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});

test("does not render an error message on initial render", () => {
  renderComponent();
  expect(screen.queryByText(/Formato inválido/)).not.toBeInTheDocument();
});

/* - Testando upload de arquivos válidos - */

test("calls onChange with the file when a valid image is selected", async () => {
  renderComponent();
  const file = makeFile("photo.jpg", "image/jpeg");
  const input = document.getElementById("file-upload") as HTMLInputElement;

  await userEvent.upload(input, file);

  expect(mockOnChange).toHaveBeenCalledWith(file);
});

test("displays the file name after a valid file is selected", async () => {
  renderComponent();
  const file = makeFile("photo.jpg", "image/jpeg");
  const input = document.getElementById("file-upload") as HTMLInputElement;

  await userEvent.upload(input, file);

  expect(screen.getByText("photo.jpg")).toBeInTheDocument();
});

test("shows preview image when accept is image/* and a valid image is selected", async () => {
  renderComponent({ accept: "image/*" });
  const file = makeFile("photo.jpg", "image/jpeg");
  const input = document.getElementById("file-upload") as HTMLInputElement;

  await userEvent.upload(input, file);

  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute(
    "src",
    "blob:http://localhost/mock-url",
  );
});

test("calls createObjectURL when accept is image/* and a valid image is selected", async () => {
  renderComponent({ accept: "image/*" });
  const file = makeFile("photo.jpg", "image/jpeg");
  const input = document.getElementById("file-upload") as HTMLInputElement;

  await userEvent.upload(input, file);

  expect(mockCreateObjectURL).toHaveBeenCalledWith(file);
});

test("does not show preview when accept is image/* pdf and a pdf is selected", async () => {
  renderComponent();
  const file = makeFile("document.pdf", "application/pdf");
  const input = document.getElementById("file-upload") as HTMLInputElement;

  await userEvent.upload(input, file);

  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});

test("calls onChange with a png file when accept is image/*", async () => {
  renderComponent({ accept: "image/*" });
  const file = makeFile("photo.png", "image/png");
  const input = document.getElementById("file-upload") as HTMLInputElement;

  await userEvent.upload(input, file);

  expect(mockOnChange).toHaveBeenCalledWith(file);
});

/* - Testando upload de arquivos inválidos - */

test("shows error and calls onChange with null when an invalid file type is selected", () => {
  renderComponent();
  const input = document.getElementById("file-upload") as HTMLInputElement;
  const file = makeFile(
    "document.docx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  );

  Object.defineProperty(input, "files", { value: [file], configurable: true });
  fireEvent.change(input);

  expect(
    screen.getByText(/Formato inválido. Use JPG, PNG ou PDF/),
  ).toBeInTheDocument();
  expect(mockOnChange).toHaveBeenCalledWith(null);
});

test("shows image-only error message when accept is image/* and an invalid file is selected", () => {
  renderComponent({ accept: "image/*" });
  const input = document.getElementById("file-upload") as HTMLInputElement;
  const file = makeFile("document.pdf", "application/pdf");

  Object.defineProperty(input, "files", { value: [file], configurable: true });
  fireEvent.change(input);

  expect(
    screen.getByText(/Formato inválido. Use JPG ou PNG/),
  ).toBeInTheDocument();
});

test("clears error after a valid file is selected following an invalid one", () => {
  renderComponent();
  const input = document.getElementById("file-upload") as HTMLInputElement;

  const invalidFile = makeFile(
    "file.docx",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  );
  Object.defineProperty(input, "files", {
    value: [invalidFile],
    configurable: true,
  });
  fireEvent.change(input);
  expect(
    screen.getByText(/Formato inválido. Use JPG, PNG ou PDF/),
  ).toBeInTheDocument();

  const validFile = makeFile("photo.jpg", "image/jpeg");
  Object.defineProperty(input, "files", {
    value: [validFile],
    configurable: true,
  });
  fireEvent.change(input);
  expect(screen.queryByText(/Formato inválido/)).not.toBeInTheDocument();
});

test("calls onChange with null when no file is selected", () => {
  renderComponent();
  const input = document.getElementById("file-upload") as HTMLInputElement;

  Object.defineProperty(input, "files", { value: [], configurable: true });
  fireEvent.change(input);

  expect(mockOnChange).toHaveBeenCalledWith(null);
});
