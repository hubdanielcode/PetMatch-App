import type { ReactNode } from "react";

interface CardActionsProps {
  children: ReactNode;
  className?: string;
}

const CardActions: React.FC<CardActionsProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};
export { CardActions };
