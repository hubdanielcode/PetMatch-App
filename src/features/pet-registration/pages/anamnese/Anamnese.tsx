import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { AnamneseFeeding } from "./AnamneseFeeding";
import { AnamneseWalks } from "./AnamneseWalks";
import { AnamneseBehavior } from "./AnamneseBehavior";
import { AnamneseSurgeries } from "./AnamneseSurgeries";
import { AnamneseDiseases } from "./AnamneseDiseases";
import { AnamneseTesticles } from "./AnamneseTesticles";
import { AnamneseReproduction } from "./AnamneseReproduction";
import { useRegistrationContext } from "../../hooks/useRegistrationContext";

interface AnamneseProps {
  onNext: () => void;
  onBack?: () => void;
}

const Anamnese = ({ onNext, onBack }: AnamneseProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { gender, mated } = useRegistrationContext();

  const steps = [
    "Alimentação",
    "Passeios",
    "Comportamento",
    "Cirurgias",
    "Histórico de Doenças",
    ...(gender === "Macho" ? ["Testículos"] : []),
    ...(mated === "Sim" ? ["Histórico Reprodutivo"] : []),
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      onBack?.();
    }
  };

  return (
    <div className="flex flex-col justify-center p-5 bg-linear-to-br from-amber-100 via-orange-100 to-red-100 h-screen w-full">
      {/* - Botão Voltar - */}

      {onBack && (
        <div className="w-[50%] mx-auto mb-4 flex">
          <button
            className="flex items-center text-black font-semibold px-4 py-2 hover:text-black cursor-pointer hover:bg-linear-to-br hover:from-amber-200 hover:via-orange-200 hover:to-red-200 rounded-lg"
            type="button"
            onClick={onBack}
          >
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </button>
        </div>
      )}

      {/* - Card Branco Centralizado - */}

      <div className="flex flex-col bg-white border border-black/40 rounded-lg w-[50%] mx-auto overflow-y-auto max-h-[80vh]">
        {/* - Header - */}

        <div className="bg-linear-to-br from-amber-500 via-orange-500 to-red-500 px-6 pt-4 pb-12 overflow-hidden rounded-t-lg">
          <h1 className="text-white text-2xl font-bold mb-2">Anamnese</h1>

          <div className="flex gap-1.5">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className="h-1.5 bg-black rounded-full"
                animate={{
                  width: index === currentStep - 1 ? 24 : 12,
                  opacity:
                    index < currentStep
                      ? 0.8
                      : index === currentStep - 1
                        ? 1
                        : 0.3,
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* - Conteúdo - */}

        {steps[currentStep - 1] === "Alimentação" && <AnamneseFeeding />}
        {steps[currentStep - 1] === "Passeios" && <AnamneseWalks />}
        {steps[currentStep - 1] === "Comportamento" && <AnamneseBehavior />}
        {steps[currentStep - 1] === "Cirurgias" && <AnamneseSurgeries />}
        {steps[currentStep - 1] === "Histórico de Doenças" && (
          <AnamneseDiseases />
        )}
        {steps[currentStep - 1] === "Testículos" && <AnamneseTesticles />}
        {steps[currentStep - 1] === "Histórico Reprodutivo" && (
          <AnamneseReproduction />
        )}

        {/* - Navegação Inferior - */}

        <div className="flex justify-around mb-6 mt-2">
          <button
            className="flex items-center bg-linear-to-br min-h-10 from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-4 py-2 cursor-pointer hover:from-amber-400 hover:via-orange-400 hover:to-red-400"
            type="button"
            onClick={handlePreviousStep}
          >
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Retornar
          </button>

          <button
            className="flex items-center bg-linear-to-br min-h-10 from-amber-600 via-orange-600 to-red-600 text-white font-semibold text-lg rounded-lg px-4 py-2 cursor-pointer hover:from-amber-400 hover:via-orange-400 hover:to-red-400"
            type="button"
            onClick={handleNext}
          >
            Avançar
            <FaArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export { Anamnese };
