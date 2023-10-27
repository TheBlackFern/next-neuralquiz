"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useToast } from "../ui/use-toast";
import { UseFieldArraySwap, useFieldArray, useForm } from "react-hook-form";
import { createTestWithQuestions } from "@/db";

import { FormQuestion, questionsSchema } from "@/db/schema";
import { SortableList } from "../sortable/sortable-list";
import QuestionForm from "./question-form";

const questionsInitial: FormQuestion[] = [
  {
    question: "What is 2 + 2?",
    answer: ["4"],
    options: ["3", "4", "5"],
    type: "single",
  },
];

type QuestionsFormProps = {
  test: {
    topic: string;
    description?: string | undefined;
  };
  resetTestForm: () => void;
};

export function QuestionsForm({ test, resetTestForm }: QuestionsFormProps) {
  const { toast } = useToast();
  const prevCollapsedRef = React.useRef([false]);
  const [collapsed, setCollapsed] = React.useState([false]);
  // TODO: rewrite with form.setValue!
  const [answers, setAnswers] = React.useState<string[][]>([["4"]]);
  const [options, setOptions] = React.useState<string[][]>([["3", "4", "5"]]);
  const form = useForm<z.infer<typeof questionsSchema>>({
    resolver: zodResolver(questionsSchema),
    defaultValues: {
      questions: questionsInitial,
    },
  });

  const { fields, append, remove, swap } = useFieldArray({
    name: "questions",
    control: form.control,
  });

  // this all here is to fix the problem of the page height
  // decreasing when all questions get collapsed on drag.
  // we just force it to be as big as possible
  const formRef = React.useRef<HTMLFormElement>(null);
  const [formHeight, setFormHeight] = React.useState(200);

  React.useLayoutEffect(() => {
    if (formRef.current) {
      const height = Math.max(
        formRef.current.scrollHeight,
        formRef.current.offsetHeight,
        formHeight,
      );
      setFormHeight(height);
    }
  }, [answers, options, fields]);

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
    // toast({
    //   title: "Submitted questions",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">
    //         {JSON.stringify(values.questions, null, 2)}
    //       </code>
    //     </pre>
    //   ),
    // });
    form.reset();
    resetTestForm();
  }

  function removeQuestion(indexToRemove: number) {
    setOptions(options.filter((_, index) => index !== indexToRemove));
    setAnswers(answers.filter((_, index) => index !== indexToRemove));
    setCollapsed(collapsed.filter((_, index) => index !== indexToRemove));
    remove(indexToRemove);
  }

  function smoothSwap(index1: number, index2: number, swap: UseFieldArraySwap) {
    if (index1 < index2) {
      for (let i = index1; i < index2; i++) {
        swap(i, i + 1);
      }
    } else {
      for (let i = index1; i > index2; i--) {
        swap(i, i - 1);
      }
    }
  }

  // TODO: masonry layout
  // TODO: rearrange
  /*   grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] */
  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        style={{
          height: formHeight + "px",
        }}
        className="min-w-[300px] space-y-[6px]"
      >
        <SortableList
          className="grid grid-cols-1 place-content-center gap-3"
          items={fields}
          onDragStartAdditional={() => {
            prevCollapsedRef.current = collapsed;
            setCollapsed((prev) => new Array(prev.length).fill(true));
          }}
          onDragEndAdditional={() => {
            setCollapsed(prevCollapsedRef.current);
          }}
          onChange={(index1, index2) => {
            const temp = prevCollapsedRef.current[index1];
            prevCollapsedRef.current[index1] = prevCollapsedRef.current[index2];
            prevCollapsedRef.current[index2] = temp;
            smoothSwap(index1, index2, swap);
          }}
          renderItem={(field, index) => (
            <SortableList.Item
              className={
                "relative h-auto w-full list-none space-y-[8px] rounded-lg border px-4 py-1"
              }
              id={field.id}
              key={field.id}
            >
              <QuestionForm
                form={form}
                id={field.id}
                index={index}
                setCollapsed={setCollapsed}
                isCollapsed={collapsed[index]}
                setOptions={setOptions}
                options={options}
                setAnswers={setAnswers}
                answers={answers}
                removeQuestion={removeQuestion}
              />
            </SortableList.Item>
          )}
          renderDraggedItem={(field, index) => (
            <SortableList.Item
              className={
                "relative h-auto w-full list-none space-y-[8px] rounded-lg border px-4"
              }
              id={field.id}
              key={field.id}
            >
              <QuestionForm
                form={form}
                id={field.id}
                index={index}
                setCollapsed={setCollapsed}
                isCollapsed={true}
                setOptions={setOptions}
                options={options}
                setAnswers={setAnswers}
                answers={answers}
                removeQuestion={removeQuestion}
              />
            </SortableList.Item>
          )}
        />
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
