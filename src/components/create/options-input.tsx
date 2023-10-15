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
        (option) => option !== optionToRemove,
      );
      newFull[index] = newOptions;
      setOptions(newFull);
    };

    return (
      <>
        <div
          className={`flex w-full flex-col gap-2 rounded-md ${
            options[index].length !== 0 && "mb-3"
          }`}
        >
          {options[index].map((option, index) => (
            <div
              key={index}
              className="flex h-fit w-full items-center break-all rounded-md pl-2 text-sm transition-all hover:bg-secondary/80"
            >
              <div className="mr-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <p>{option}</p>
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeTag(option)}
                className={cn(
                  "ml-auto h-full px-0.5 py-1 hover:bg-transparent",
                )}
              >
                <X size={14} />
              </Button>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2">
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
      </>
    );
  },
);

OptionsInput.displayName = "OptionsInput";

export { OptionsInput };
