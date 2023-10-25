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
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useToast } from "../ui/use-toast";
import { UseFieldArraySwap, useFieldArray, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
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

  const { fields, append, remove, swap } = useFieldArray({
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-[300px] space-y-[6px]"
      >
        <div className="grid grid-cols-1 place-content-center gap-3">
          <SortableList
            items={fields}
            onChange={(index1, index2) => {
              smoothSwap(index1, index2, swap);

              // swap(index1, index2);
            }}
            renderItem={(field, index) => (
              <SortableList.Item
                className={cn(
                  "relative h-auto w-full list-none space-y-[8px] rounded-lg border px-4 pb-2",
                  collapsed[index] && "h-10",
                )}
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
                {/* <div className="flex w-full items-center pt-1">
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

                  {collapsed[index] && (
                    <div className="relative ml-auto mr-auto flex max-w-[50%] justify-center">
                      {form.getFieldState(`questions.${index}`).invalid && (
                        <div className="absolute -left-7 top-0 h-6 w-6 rounded-md border bg-destructive text-center font-bold text-destructive-foreground">
                          !
                        </div>
                      )}
                      <p className="line-clamp-1 break-all text-muted-foreground">
                        {form.watch(`questions.${index}.question`) ||
                          "Empty question"}
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
                          key={`${field.id}-options`}
                          name={`questions.${index}.options`}
                          render={({ field }) => (
                            <FormItem className="space-y-[3px]">
                              <FormLabel className="required">
                                Options
                              </FormLabel>
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
                                      newOptions[index] as [
                                        string,
                                        ...string[],
                                      ],
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
                              <FormLabel className="required">
                                Answers
                              </FormLabel>
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
                                      newOptions[index] as [
                                        string,
                                        ...string[],
                                      ],
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
                              <FormLabel className="required">
                                Options
                              </FormLabel>
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
                                      newOptions[index] as [
                                        string,
                                        ...string[],
                                      ],
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
                )} */}
              </SortableList.Item>
            )}
            renderDraggedItem={(field, index) => (
              <SortableList.Item
                className={cn(
                  "relative h-auto w-full list-none space-y-[8px] rounded-lg border px-4 pb-2",
                  collapsed[index] && "h-10",
                )}
                id={field.id}
                key={field.id}
              >
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

                  <div className="relative ml-auto mr-auto flex max-w-[50%] justify-center">
                    {form.getFieldState(`questions.${index}`).invalid && (
                      <div className="absolute -left-7 top-0 h-6 w-6 rounded-md border bg-destructive text-center font-bold text-destructive-foreground">
                        !
                      </div>
                    )}
                    <p className="line-clamp-1 break-all text-muted-foreground">
                      {form.watch(`questions.${index}.question`) ||
                        "Empty question"}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant={"ghost"}
                    onClick={() => removeQuestion(index)}
                    className={"-mr-3 ml-auto h-8 w-8 p-0"}
                  >
                    <X size={20} />
                  </Button>
                </div>
              </SortableList.Item>
            )}
          />
          {/* {fields.map((field, index) => (
              <SortableList.Item
                className={cn(
                  "relative h-auto w-full space-y-[8px] rounded-lg border px-4 pb-2",
                  collapsed[index] && "h-10",
                )}
                id={field.id}
                key={field.id}
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

                  <SortableList.DragHandle />
                  {collapsed[index] && (
                    <div className="relative flex max-w-[50%] justify-center">
                      {form.getFieldState(`questions.${index}`).invalid && (
                        <div className="absolute -left-7 top-0 h-6 w-6 rounded-md border bg-destructive text-center font-bold text-destructive-foreground">
                          !
                        </div>
                      )}
                      <p className="line-clamp-1 break-all text-muted-foreground">
                        {form.watch(`questions.${index}.question`) ||
                          "Empty question"}
                      </p>
                    </div>
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
                          key={`${field.id}-options`}
                          name={`questions.${index}.options`}
                          render={({ field }) => (
                            <FormItem className="space-y-[3px]">
                              <FormLabel className="required">
                                Options
                              </FormLabel>
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
                                      newOptions[index] as [
                                        string,
                                        ...string[],
                                      ],
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
                              <FormLabel className="required">
                                Answers
                              </FormLabel>
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
                                      newOptions[index] as [
                                        string,
                                        ...string[],
                                      ],
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
                              <FormLabel className="required">
                                Options
                              </FormLabel>
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
                                      newOptions[index] as [
                                        string,
                                        ...string[],
                                      ],
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
              </SortableList.Item>
            ))}
          </SortableList> */}
          {/* <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          > */}
          {/* {fields.map((field, index) => (
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
                  <div className="relative flex max-w-[50%] justify-center">
                    {form.getFieldState(`questions.${index}`).invalid && (
                      <div className="absolute -left-7 top-0 h-6 w-6 rounded-md border bg-destructive text-center font-bold text-destructive-foreground">
                        !
                      </div>
                    )}
                    <p className="line-clamp-1 break-all text-muted-foreground">
                      {form.watch(`questions.${index}.question`) ||
                        "Empty question"}
                    </p>
                  </div>
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
          ))} */}
          {/* </DndContext> */}
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
