import { FaMars } from "react-icons/fa";
import { useRegistrationContext } from "../../hooks/context-hooks/useRegistrationContext";

export type Testicles = "0" | "1" | "2" | "";

export const TesticleOptions = [
  {
    value: "0" as const,
    label: "Nenhum testículo",
    description: "Criptorquidismo Bilateral",
    badge: "Inapto",
    badgeBg: "bg-red-100",
    badgeBorder: "border-red-400",
    badgeText: "text-red-800",
    alertBg: "bg-red-50",
    alertBorder: "border-red-800",
    alertText: "text-red-800",
    message: "Este pet não está apto para reprodução.",
  },
  {
    value: "1" as const,
    label: "Um testículo",
    description: "Criptorquidismo unilateral",
    badge: "Restrito",
    badgeBg: "bg-amber-100",
    badgeBorder: "border-amber-400",
    badgeText: "text-amber-800",
    alertBg: "bg-amber-50",
    alertBorder: "border-amber-800",
    alertText: "text-amber-800",
    message:
      "Este pet está apto para reprodução, porém a venda casada não é recomendada.",
  },
  {
    value: "2" as const,
    label: "Dois testículos",
    description: "Sem alteração",
    badge: "Apto",
    badgeBg: "bg-green-100",
    badgeBorder: "border-green-400",
    badgeText: "text-green-800",
    alertBg: "bg-green-50",
    alertBorder: "border-green-800",
    alertText: "text-green-800",
    message: "Este pet está apto para reprodução e venda casada.",
  },
];

interface AnamneseTesticlesProps {
  value: Testicles;
  onChange: (value: Testicles) => void;
}

const AnamneseTesticles = ({ value, onChange }: AnamneseTesticlesProps) => {
  const selectedOption = TesticleOptions.find(
    (option) => option.value === value,
  );
  const { setCryptorchidism_bilateral, setCryptorchidism_unilateral } =
    useRegistrationContext();

  return (
    <>
      {/* - Card flutuante - */}

      <div className="-mt-6 mx-4 bg-white rounded-2xl shadow-lg shadow-gray-500 px-5 py-4 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 rounded-lg">
          <FaMars className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">Etapa 6</p>
          <p className="text-lg font-bold text-black">Testículos</p>
        </div>
      </div>

      {/* - Conteúdo - */}

      <label
        className="px-6 text-lg font-semibold mb-3 block"
        htmlFor="pet-testicles"
      >
        Quantos testículos o seu pet tem? *
      </label>

      <div className="mx-6 -mb-7">
        {TesticleOptions.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              className={`flex min-h-10 w-full cursor-pointer items-center gap-4 rounded-lg bg-gray-200 px-4 py-3 text-start transition-all mb-4 hover:bg-amber-50 ${
                isSelected
                  ? "border border-amber-600 bg-linear-to-br from-amber-200 via-orange-200 to-red-200  hover:bg-linear-to-br hover:from-amber-100 hover:via-orange-100 hover:to-red-100"
                  : "border border-black/40"
              }`}
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setCryptorchidism_bilateral(option.value === "0");
                setCryptorchidism_unilateral(option.value === "1");
              }}
            >
              <div
                className={`h-4 w-4 shrink-0 rounded-full border transition-colors ${
                  isSelected ? "bg-amber-500" : "border-black/40 bg-white"
                }`}
              />

              <div className="flex-1">
                <p className="text-md font-semibold text-black">
                  {option.label}
                </p>
                <p className="text-sm text-black/70">{option.description}</p>
              </div>

              <span
                className={`shrink-0 rounded-md border px-2 py-1 text-sm font-semibold ${option.badgeBg} ${option.badgeBorder} ${option.badgeText}`}
              >
                {option.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* - Mensagem - */}

      <div className="mx-6 mt-10 min-h-20">
        {selectedOption && (
          <p
            className={`flex items-center justify-center rounded-lg border px-4 py-3 text-center text-sm font-semibold ${selectedOption.alertBg} ${selectedOption.alertBorder} ${selectedOption.alertText}`}
          >
            {selectedOption.message}
          </p>
        )}
      </div>
    </>
  );
};

export { AnamneseTesticles };
