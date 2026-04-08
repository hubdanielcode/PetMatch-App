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
import { useRegistrationContext } from "../../hooks/context-hooks/useRegistrationContext";

interface AnamneseProps {
  onNext: () => Promise<void>;
  onBack?: () => void;
}

const AnamneseFlow = ({ onNext, onBack }: AnamneseProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    gender,
    mated,
    feedingInfo,
    setFeedingInfo,
    walksInfo,
    setWalksInfo,
    behaviorInfo,
    setBehaviorInfo,
    surgeriesInfo,
    setSurgeriesInfo,
    diseasesInfo,
    setDiseasesInfo,
    testiclesInfo,
    setTesticlesInfo,
    reproductionInfo,
    setReproductionInfo,
  } = useRegistrationContext();

  const steps = [
    "Alimentação",
    "Passeios",
    "Comportamento",
    "Cirurgias",
    "Histórico de Doenças",
    ...(gender === "Macho" ? ["Testículos"] : []),
    ...(mated ? ["Histórico Reprodutivo"] : []),
  ];

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await onNext();
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
    <div className="flex flex-col p-5 bg-linear-to-br from-amber-100 via-orange-100 to-red-100 dark:from-amber-950 dark:via-orange-950 dark:to-red-950 min-h-screen w-full">
      {/* - Botão Voltar - */}

      {onBack && (
        <div className="w-full max-w-2xl mx-auto mb-4 flex">
          <button
            className="flex items-center text-black dark:text-white font-semibold px-4 py-2 cursor-pointer hover:bg-linear-to-br hover:from-amber-200 hover:via-orange-200 hover:to-red-200 dark:hover:from-amber-700/60 dark:hover:via-orange-700/60 dark:hover:to-red-700/60 rounded-lg transition-colors"
            type="button"
            onClick={onBack}
          >
            <FaArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </button>
        </div>
      )}

      {/* - Card Branco Centralizado - */}

      <div className="flex flex-col bg-white dark:bg-gray-800 border border-black/40 dark:border-white/20 rounded-lg w-full max-w-2xl mx-auto overflow-y-auto max-h-[80vh]">
        {/* - Header - */}

        <div className="bg-linear-to-br from-amber-500 via-orange-500 to-red-500 px-6 pt-4 pb-16 rounded-t-lg">
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

        {steps[currentStep - 1] === "Alimentação" && (
          <AnamneseFeeding
            value={feedingInfo}
            onChange={(value) => setFeedingInfo(value)}
          />
        )}

        {steps[currentStep - 1] === "Passeios" && (
          <AnamneseWalks
            value={walksInfo}
            onChange={(value) => setWalksInfo(value)}
          />
        )}

        {steps[currentStep - 1] === "Comportamento" && (
          <AnamneseBehavior
            value={behaviorInfo}
            onChange={(value) => setBehaviorInfo(value)}
          />
        )}

        {steps[currentStep - 1] === "Cirurgias" && (
          <AnamneseSurgeries
            value={surgeriesInfo}
            onChange={(value) => setSurgeriesInfo(value)}
          />
        )}

        {steps[currentStep - 1] === "Histórico de Doenças" && (
          <AnamneseDiseases
            value={diseasesInfo}
            onChange={(value) => setDiseasesInfo(value)}
          />
        )}

        {steps[currentStep - 1] === "Testículos" && (
          <AnamneseTesticles
            value={testiclesInfo}
            onChange={(value) => setTesticlesInfo(value)}
          />
        )}

        {steps[currentStep - 1] === "Histórico Reprodutivo" && (
          <AnamneseReproduction
            value={reproductionInfo}
            onChange={(value) => setReproductionInfo(value)}
          />
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

export { AnamneseFlow };
