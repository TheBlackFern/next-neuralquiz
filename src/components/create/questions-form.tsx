"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

// TODO: check if answer in options
const questionsSchema = z.object({
  questions: z.array(
    z.object({
      question: z
        .string()
        .min(2, { message: "Topic should be at least 2 characters long." })
        .max(50, { message: "Topic is too long." }),
      answer: z
        .string()
        .min(2, { message: "Answer should be at least 2 characters long." })
        .max(100, { message: "Answer is too long." }),
      options: z.array(z.string()),
      image: z.string().url().optional(),
    })
  ),
});

const questionsInitial: FormQuestion[] = [
  { question: "What is 2 + 2?", answer: "4", options: ["3", "4", "5"] },
];

type FormQuestion = z.infer<typeof questionsSchema>["questions"][number];

export function TestForm() {
  const [questions, setQuestions] = useState<FormQuestion[]>(
    () => questionsInitial
  );

  const form = useForm<z.infer<typeof questionsSchema>>({
    resolver: zodResolver(questionsSchema),
    defaultValues: {
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  const isSubmittable = form.formState.isDirty && form.formState.isValid;

  function onSubmit(values: z.infer<typeof questionsSchema>) {
    setQuestions(values.questions);
    console.log(values);
    form.reset(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[300px]"
      >
        {fields.map((field, index) => {
          const errorForField = form.formState.errors?.questions?.[index];
          return (
            <>
              <p>hi</p>
              <p>{errorForField?.answer?.message}</p>
            </>
          );
        })}

        <Button disabled={!isSubmittable} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
