import React from "react";
import { SortableList } from "../sortable/sortable-list";
import { Button } from "../ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { OptionsInput } from "./options-input";
import { ChevronDown, X } from "lucide-react";

import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { questionsSchema } from "@/db/schema";
import { cn } from "@/lib/utils";
import InputSingle from "./input-single";
import InputMultiple from "./input-multiple";

type QuestionFormProps = {
  form: UseFormReturn<z.infer<typeof questionsSchema>>;
  id: string | number;
  index: number;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean[]>>;
  isCollapsed: boolean;
  setOptions: React.Dispatch<React.SetStateAction<string[][]>>;
  options: string[][];
  setAnswers: React.Dispatch<React.SetStateAction<string[][]>>;
  answers: string[][];
  removeQuestion(indexToRemove: number): void;
};

const QuestionForm = (props: QuestionFormProps) => {
  const {
    form,
    id,
    index,
    setCollapsed,
    isCollapsed,
    setOptions,
    options,
    setAnswers,
    answers,
    removeQuestion,
  } = props;
  return (
    <>
      <div className="flex w-full items-center">
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => {
            setCollapsed((prev) => {
              const upd = [...prev];
              upd[index] = !upd[index];
              return upd;
            });
          }}
          className={"-ml-3 h-8 w-8 p-0"}
        >
          <ChevronDown
            size={20}
            className={cn(
              "transition-all duration-300",
              !isCollapsed && "rotate-180",
            )}
          />
        </Button>
        <SortableList.DragHandle className="ml-2 h-8 w-8 rounded-lg" />

        {isCollapsed && (
          <div className="relative ml-auto flex max-w-[50%] justify-center">
            {form.getFieldState(`questions.${index}`).invalid && (
              <div className="absolute -left-7 top-0 h-6 w-6 rounded-md border bg-destructive text-center font-bold text-destructive-foreground">
                !
              </div>
            )}
            <p className="line-clamp-1 break-all text-center text-muted-foreground">
              {form.watch(`questions.${index}.question`) || "Empty question"}
            </p>
          </div>
        )}
        <Button
          type="button"
          variant={"ghost"}
          onClick={() => removeQuestion(index)}
          className={"-mr-3 ml-auto h-8 w-8 p-0"}
        >
          <X size={20} />
        </Button>
      </div>
      {!isCollapsed && (
        <>
          <FormField
            control={form.control}
            key={`${id}-question`}
            name={`questions.${index}.question`}
            render={({ field }) => (
              <FormItem className="space-y-[3px]">
                <FormLabel className="required">Question</FormLabel>
                <FormControl>
                  <Input placeholder="Type in the question..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            key={`${id}-image`}
            name={`questions.${index}.image`}
            render={({ field }) => (
              <FormItem className="space-y-[3px]">
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input placeholder="Type in an image URL..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`questions.${index}.type`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Question Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select the question type  " />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="multiple">Multiple-choice</SelectItem>
                    <SelectItem value="single">Single-choice</SelectItem>
                    <SelectItem value="open">Open-ended</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch(`questions.${index}.type`) === "single" && (
            <InputSingle {...props} />
          )}
          {/* {form.watch(`questions.${index}.type`) === "open" && <InputOpen {...props}/>} */}
          {form.watch(`questions.${index}.type`) === "multiple" && (
            <InputMultiple {...props} />
          )}
        </>
      )}
    </>
  );
};

export default QuestionForm;
