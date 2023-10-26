import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { OptionsInput } from "./options-input";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { questionsSchema } from "@/db/schema";

type InputSingleProps = {
  form: UseFormReturn<z.infer<typeof questionsSchema>>;
  id: string | number;
  index: number;
  setOptions: React.Dispatch<React.SetStateAction<string[][]>>;
  options: string[][];
};

const InputSingle = ({
  form,
  id,
  index,
  options,
  setOptions,
}: InputSingleProps) => {
  return (
    <>
      <FormField
        control={form.control}
        key={`${id}-answer`}
        name={`questions.${index}.answer`}
        render={({ field }) => (
          <FormItem className="space-y-[3px]">
            <FormLabel className="required">Answer</FormLabel>
            <FormControl>
              <Input
                {...field}
                onChange={(e) => {
                  field.onChange([e.target.value]);
                }}
                placeholder="Type in the correct answer..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        key={`${id}-options`}
        name={`questions.${index}.options`}
        render={({ field }) => (
          <FormItem className="space-y-[3px]">
            <FormLabel className="required">Options</FormLabel>
            <FormControl>
              <OptionsInput
                {...field}
                placeholder="Type in a new option..."
                options={options}
                index={index}
                setOptions={(newOptions) => {
                  console.log(newOptions);
                  setOptions(newOptions);
                  form.setValue(
                    `questions.${index}.options`,
                    newOptions[index] as [string, ...string[]],
                  );
                  return setOptions;
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default InputSingle;
