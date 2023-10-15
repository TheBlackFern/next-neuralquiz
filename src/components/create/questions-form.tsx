"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "@/components/ui/input";
import { OptionsInput } from "./options-input";
import { ChevronDown, X } from "lucide-react";
import { m } from "framer-motion";

import { useToast } from "../ui/use-toast";
import { useFieldArray, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { createTestWithQuestions } from "@/db";

import { questionsSchema } from "@/db/schema";

const questionsInitial: FormQuestion[] = [
  {
    question: "What is 2 + 2?",
    answer: ["4"],
    options: ["3", "4", "5"],
    type: "single",
  },
];

type FormQuestion = z.infer<typeof questionsSchema>["questions"][number];

type QuestionsFormProps = {
  test: {
    topic: string;
    description?: string | undefined;
  };
  resetTestForm: () => void;
};

export function QuestionsForm({ test, resetTestForm }: QuestionsFormProps) {
  const { toast } = useToast();
  const [collapsed, setCollapsed] = React.useState<boolean[]>([false]);
  // TODO: rewrite with form.setValue!
  const [answers, setAnswers] = React.useState<string[][]>([["4"]]);
  const [options, setOptions] = React.useState<string[][]>([["3", "4", "5"]]);
  const form = useForm<z.infer<typeof questionsSchema>>({
    resolver: zodResolver(questionsSchema),
    defaultValues: {
      questions: questionsInitial,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  // const isSubmittable = form.formState.isDirty && form.formState.isValid;

  async function onSubmit(values: z.infer<typeof questionsSchema>) {
    const res = await createTestWithQuestions(values.questions, test);
    if (res?.error) {
      toast({
        title: "Something went wrong!",
        description:
          "Failed to create a test: " + res.error + ". Please, try again.",
      });
    }
    // console.log(values.questions);
    form.reset();
    resetTestForm();
  }

  function removeQuestion(indexToRemove: number) {
    setOptions(options.filter((_, index) => index !== indexToRemove));
    setAnswers(answers.filter((_, index) => index !== indexToRemove));
    setCollapsed(collapsed.filter((_, index) => index !== indexToRemove));
    remove(indexToRemove);
  }

  // TODO: masonry layout
  // TODO: rearrange
  /*   grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] */
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-[300px] space-y-[6px]"
      >
        <div className="grid grid-cols-1 place-content-center gap-3">
          {fields.map((field, index) => (
            <m.div
              key={index}
              className={cn(
                "relative h-auto w-full space-y-[8px] rounded-lg border px-4 pb-2",
                collapsed[index] && "h-10",
              )}
            >
              <div className="flex w-full items-center justify-between pt-1">
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
                {collapsed[index] && (
                  <p className="text-muted-foreground">
                    {form.watch(`questions.${index}.question`) ||
                      "Empty question"}
                  </p>
                )}
                <Button
                  type="button"
                  variant={"ghost"}
                  onClick={() => removeQuestion(index)}
                  className={"-mr-3 h-8 w-8 p-0"}
                >
                  <X size={20} />
                </Button>
              </div>

              {!collapsed[index] && (
                <>
                  <FormField
                    control={form.control}
                    key={`${field.id}-question`}
                    name={`questions.${index}.question`}
                    render={({ field }) => (
                      <FormItem className="space-y-[3px]">
                        <FormLabel className="required">Question</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Type in the question..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    key={`${field.id}-image`}
                    name={`questions.${index}.image`}
                    render={({ field }) => (
                      <FormItem className="space-y-[3px]">
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Type in an image URL..."
                            {...field}
                          />
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
                        <FormLabel className="required">
                          Question Type
                        </FormLabel>
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
                            <SelectItem value="multiple">
                              Multiple-choice
                            </SelectItem>
                            <SelectItem value="single">
                              Single-choice
                            </SelectItem>
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
                        key={`${field.id}-answer`}
                        name={`questions.${index}.answer`}
                        render={({ field }) => (
                          <FormItem className="space-y-[3px]">
                            <FormLabel className="required">Answer</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type in the correct answer..."
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        key={`${field.id}-options`}
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
                        key={`${field.id}-answer`}
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
                        key={`${field.id}-options`}
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
            </m.div>
          ))}
        </div>
        <p className="text-center text-destructive">
          🚧 Image upload is a Work in Progress, coming soon... 🚧
        </p>
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            className=""
            onClick={() => {
              setOptions((prev) => [...prev, []]);
              setAnswers((prev) => [...prev, []]);
              setCollapsed((prev) => [...prev, false]);
              append({
                question: "",
                answer: [""],
                options: [],
                type: "single",
              });
            }}
          >
            Add Question
          </Button>
          <Button type="submit">Create Quiz</Button>
        </div>
      </form>
    </Form>
  );
}
