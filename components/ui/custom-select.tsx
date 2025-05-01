
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const CustomSelect = ({ options, placeholder, value, onChange }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption?.label || placeholder;

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[4.375rem] px-6 py-3 rounded-md flex items-center justify-between
                  bg-[#6D707A66] border border-[#EDEDEDB2] text-white/80
                  transition-all duration-300 hover:bg-[#6D707A80]"
      >
        <span className={!selectedOption ? "text-white/50" : "text-white/90"}>
          {displayValue}
        </span>
        <ChevronDown 
          className={`w-5 h-5 text-white/70 transition-transform duration-300 ${isOpen ? "transform rotate-180" : ""}`} 
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-[#3A3F4C] border border-[#EDEDEDB2] rounded-md shadow-lg max-h-60 overflow-auto scrollbar-none">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-6 py-3 text-left cursor-pointer hover:bg-[#4B505F] transition-colors
                        ${value === option.value ? "bg-[#5A6070] text-white" : "text-white/80"}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
