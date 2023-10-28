import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { OptionsInput } from "./options-input";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { questionsSchema } from "@/db/schema";

type InputSingleProps = {
  form: UseFormReturn<z.infer<typeof questionsSchema>>;
  id: string | number;
  index: number;
  setAnswers: React.Dispatch<React.SetStateAction<string[][]>>;
  answers: string[][];
  setOptions: React.Dispatch<React.SetStateAction<string[][]>>;
  options: string[][];
};

const InputMultiple = ({
  form,
  id,
  index,
  answers,
  setAnswers,
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
            <FormLabel className="required">Answers</FormLabel>
            <FormControl>
              <OptionsInput
                {...field}
                placeholder="Type in a new answer..."
                options={answers}
                index={index}
                setOptions={(newOptions) => {
                  console.log(newOptions);
                  setAnswers(newOptions);
                  form.setValue(
                    `questions.${index}.answer`,
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

export default InputMultiple;
