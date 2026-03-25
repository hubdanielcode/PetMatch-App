const RadioGroup = ({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="px-6 mb-6">
      <p className="text-lg font-semibold mb-3">{label}</p>
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <div
            className="flex gap-3 items-center"
            key={option.value}
          >
            <button
              className={`h-4 w-4 rounded-full border border-black/40 transition-colors cursor-pointer ${
                value === option.value
                  ? "bg-amber-400 border-black/40"
                  : "bg-gray-200 border-black/40 hover:bg-amber-100"
              }`}
              type="button"
              onClick={() => onChange(option.value)}
            />

            <span className="text-gray-700">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export { RadioGroup };
