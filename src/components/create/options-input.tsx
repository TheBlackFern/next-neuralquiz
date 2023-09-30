import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface OptionsInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  index: number;
  options: string[][];
  setOptions: (newOptions: string[][]) => void;
}

const OptionsInput = React.forwardRef<HTMLInputElement, OptionsInputProps>(
  ({ placeholder, index, options, setOptions, className }, ref) => {
    const [inputValue, setInputValue] = React.useState("");
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };

    const handleSubmit = () => {
      const newOption = inputValue.trim();
      if (newOption && !options[index].includes(newOption)) {
        const newFull = [...options];
        const newOptions = [...options[index], newOption];
        newFull[index] = newOptions;
        setOptions(newFull);
      }
      setInputValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        handleSubmit();
      }
    };

    const removeTag = (optionToRemove: string) => {
      const newFull = [...options];
      const newOptions = options[index].filter(
        (option) => option !== optionToRemove
      );
      newFull[index] = newOptions;
      setOptions(newFull);
    };

    return (
      <div>
        <div
          className={`flex flex-col gap-2 rounded-md ${
            options[index].length !== 0 && "mb-3"
          }`}
        >
          {options[index].map((option, index) => (
            <span
              key={index}
              className="transition-all hover:bg-secondary/80 h-fit w-full max-w-[300px] break-all flex items-center text-sm pl-2 rounded-md"
            >
              <div className="bg-primary h-2 w-2 rounded-full shrink-0 mr-2" />
              {option}
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeTag(option)}
                className={cn("py-1 px-3 ml-auto h-full hover:bg-transparent")}
              >
                <X size={14} />
              </Button>
            </span>
          ))}
        </div>
        <div className="flex justify-center items-center gap-2">
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className={className}
          />
          <Button type="button" className="h-9" onClick={handleSubmit}>
            Add
          </Button>
        </div>
      </div>
    );
  }
);

OptionsInput.displayName = "OptionsInput";

export { OptionsInput };
