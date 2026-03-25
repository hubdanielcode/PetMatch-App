import { Upload } from "lucide-react";
import { useState } from "react";

const FileUpload = ({
  id,
  label,
  accept = "image/*,.pdf",
  onChange,
  className,
}: {
  id: string;
  label: string;
  accept?: string;
  className?: string;
  onChange: (file: File | null) => void;
}) => {
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <>
      <label
        className="px-6 text-lg font-semibold mb-3"
        htmlFor={id}
      >
        {label}
      </label>

      <label
        htmlFor={id}
        className={`flex flex-col items-center justify-center border-2 border-dashed border-black/40 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors mx-6 overflow-hidden ${className ?? ""}`}
      >
        {preview ? (
          <img
            src={preview}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <>
            <Upload
              className="text-gray-500 my-2"
              size={30}
            />

            {fileName ? (
              <span className="text-sm font-semibold text-amber-600">
                {fileName}
              </span>
            ) : (
              <span className="text-sm font-semibold text-gray-400">
                PNG, JPG, PDF até 10MB
              </span>
            )}
          </>
        )}
      </label>

      <p className="px-6 min-h-12 text-sm text-red-500 font-semibold">
        {error}
      </p>

      <input
        className="hidden"
        id={id}
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;

          if (!file) {
            onChange(null);
            return;
          }

          const validTypes =
            accept === "image/*"
              ? ["image/jpeg", "image/png"]
              : ["image/jpeg", "image/png", "application/pdf"];

          if (!validTypes.includes(file.type)) {
            setError(
              accept === "image/*"
                ? "Formato inválido. Use JPG ou PNG."
                : "Formato inválido. Use JPG, PNG ou PDF.",
            );
            e.target.value = "";
            onChange(null);
            return;
          }

          setError("");
          setFileName(file.name);
          setPreview(accept === "image/*" ? URL.createObjectURL(file) : null);
          onChange(file);
        }}
      />
    </>
  );
};

export { FileUpload };
