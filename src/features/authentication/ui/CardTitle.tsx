interface CardTitleProps {
  title: string;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ title, className }) => {
  return <div className={className}>{title}</div>;
};
export { CardTitle };
