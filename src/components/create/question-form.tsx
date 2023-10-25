import { ChevronDown, X } from "lucide-react";
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
import { UseFormReturn } from "react-hook-form";

type QuestionFormProps = {
  form: UseFormReturn;
  id: number;
  index: number;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean[]>>;
  isCollapsed: boolean;
  setOptions: React.Dispatch<React.SetStateAction<string[][]>>;
  options: string[][];
  setAnswers: React.Dispatch<React.SetStateAction<string[][]>>;
  answers: string[][];
  removeQuestion(indexToRemove: number): void;
};

const QuestionForm = ({
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
}: QuestionFormProps) => {
  return (
    <>
      <div className="flex w-full items-center pt-1">
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
          <ChevronDown size={20} />
        </Button>
        <SortableList.DragHandle />

        {isCollapsed && (
          <div className="relative ml-auto mr-auto flex max-w-[50%] justify-center">
            {form.getFieldState(`questions.${index}`).invalid && (
              <div className="absolute -left-7 top-0 h-6 w-6 rounded-md border bg-destructive text-center font-bold text-destructive-foreground">
                !
              </div>
            )}
            <p className="line-clamp-1 break-all text-muted-foreground">
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
          )}
          {form.watch(`questions.${index}.type`) === "open" && <></>}
          {form.watch(`questions.${index}.type`) === "multiple" && (
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
          )}
        </>
      )}
    </>
  );
};

export default QuestionForm;
