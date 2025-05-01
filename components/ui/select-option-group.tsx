import CustomSelect from "./custom-select";

interface SelectOption {
  id: string;
  options: { value: string; label: string }[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

interface SelectOptionsGroupProps {
  options: SelectOption[];
}

const SelectOptionsGroup = ({ options }: SelectOptionsGroupProps) => {
  return (
    <div className="flex flex-col gap-3 mt-4">
      {options.map((option) => (
        <CustomSelect
          key={option.id}
          options={option.options}
          placeholder={option.placeholder}
          value={option.value}
          onChange={option.onChange}
        />
      ))}
    </div>
  );
};

export default SelectOptionsGroup;
