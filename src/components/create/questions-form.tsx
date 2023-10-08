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
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";

import { OptionsInput } from "./options-input";
import { X } from "lucide-react";
import { m } from "framer-motion";
import { createTestWithQuestions } from "@/db";

// TODO: check if answer in options
const questionsSchema = z.object({
  questions: z
    .array(
      z.object({
        question: z
          .string()
          .min(2, { message: "Topic should be at least 2 characters long." })
          .max(50, { message: "Topic is too long." }),
        answer: z
          .string()
          .min(1, { message: "Answer should be at least 1 character long." })
          .max(100, { message: "Answer is too long." }),
        image: z.string().url().optional(),
        options: z
          .array(z.string())
          .min(2, { message: "There should be at least 2 option." }),
      })
    )
    .min(1, { message: "The test should have at least one question." }),
});

const questionsInitial: FormQuestion[] = [
  {
    question: "What is 2 + 2?",
    answer: "4",
    options: ["3", "4", "5"],
  },
];

type FormQuestion = z.infer<typeof questionsSchema>["questions"][number];

export function QuestionsForm({
  test,
}: {
  test: {
    topic: string;
    description?: string | undefined;
  };
}) {
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

  const isSubmittable = form.formState.isDirty && form.formState.isValid;

  async function onSubmit(values: z.infer<typeof questionsSchema>) {
    await createTestWithQuestions(values.questions, test);
    form.reset();
  }

  function removeQuestion(indexToRemove: number) {
    setOptions(options.filter((_, index) => index !== indexToRemove));
    remove(indexToRemove);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-[6px] min-w-[300px]"
      >
        <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-3 place-content-center">
          {fields.map((field, index) => (
            <m.div
              key={index}
              className="relative border h-auto space-y-[8px] p-3 w-full"
            >
              <Button
                type="button"
                variant="ghost"
                onClick={() => removeQuestion(index)}
                className={"absolute top-1 h-7 w-7 right-0 p-0"}
              >
                <X size={20} />
              </Button>
              <FormField
                control={form.control}
                key={`${field.id}-question`}
                name={`questions.${index}.question`}
                render={({ field }) => (
                  <FormItem className="space-y-[3px]">
                    <FormLabel>Question*</FormLabel>
                    <FormControl>
                      <Input placeholder="Type in the question..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                key={`${field.id}-answer`}
                name={`questions.${index}.answer`}
                render={({ field }) => (
                  <FormItem className="space-y-[3px]">
                    <FormLabel>Answer*</FormLabel>
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
                key={`${field.id}-image`}
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
                key={`${field.id}-options`}
                name={`questions.${index}.options`}
                render={({ field }) => (
                  <FormItem className="space-y-[3px]">
                    <FormLabel>Options*</FormLabel>
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
                            newOptions[index] as [string, ...string[]]
                          );
                          return setOptions;
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </m.div>
          ))}
        </div>
        <p className="text-destructive text-center">
          🚧 Image upload is a Work in Progress, coming soon... 🚧
        </p>
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            className=""
            onClick={() => {
              setOptions((prev) => [...prev, []]);
              append({
                question: "",
                answer: "",
                options: [],
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
