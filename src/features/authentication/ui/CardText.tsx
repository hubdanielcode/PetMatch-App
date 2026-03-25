interface CardTextProps {
  text: string;
  className?: string;
}

const CardText: React.FC<CardTextProps> = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};
export { CardText };
