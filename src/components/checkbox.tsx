interface CheckboxProps {
  checked: boolean;
  label: string;
  onChange: () => void;
}

const Checkbox = ({ checked, label, onChange }: CheckboxProps) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div className="relative">
        {/* Custom checkbox container */}
        <div
          className={`
            w-6 h-6 border-2 rounded transition-all duration-200 
            ${
              checked
                ? "bg-black border-black"
                : "bg-[#CCCCCC] border-gray-300 hover:border-gray-400"
            }
          `}
        >
          {/* Checkmark */}
          {checked && (
            <svg
              className="absolute top-0 left-0 w-full h-full text-white p-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                d="M5 13l4 4L19 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>

        {/* Hidden real checkbox for accessibility */}
        <input
          type="checkbox"
          className="absolute w-0 h-0 opacity-0"
          checked={checked}
          onChange={onChange}
        />
      </div>

      {/* Label */}
      <span className="text-lg text-black group-hover:text-gray-900">
        {label}
      </span>
    </label>
  );
};

export default Checkbox;
