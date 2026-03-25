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
    <div className={`flex items-center gap-3 ${className}`}>
      <CircleCheck className="rounded-full bg-gray-100/80 text-green-600 h-10 w-10" />

      <div style={{ textShadow: "0 0 2px black" }}>
        <p className="text-lg font-semibold mb-1">{text}</p>
        {description && <p className="text-md text-white/90">{description}</p>}
      </div>
    </div>
  );
};
export { FeatureItem };
