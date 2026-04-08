import { type ReactNode } from "react";
import { CircleCheck } from "lucide-react";

interface FeatureItemProps {
  text: ReactNode;
  description: string;
  className?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  text,
  description,
  className,
}) => {
  return (
    <div className={`flex items-start gap-4 ${className}`}>
      {/* - Wrapper fixo do ícone - */}

      <div className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100/80 shrink-0">
        <CircleCheck className="text-green-600 h-9 w-9" />
      </div>

      {/* - Texto - */}
      <div style={{ textShadow: "0 0 2px black" }}>
        <p className="text-lg font-semibold mb-1 leading-tight">{text}</p>

        {description && (
          <p className="text-md text-white/90 leading-snug">{description}</p>
        )}
      </div>
    </div>
  );
};

export { FeatureItem };
