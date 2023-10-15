"use client";
import React from "react";
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
import { Textarea } from "../ui/textarea";
import { Input } from "@/components/ui/input";
import { QuestionsForm } from "./questions-form";

import { useForm } from "react-hook-form";

const testSchema = z.object({
  topic: z
    .string()
    .min(2, { message: "Topic should be at least 2 characters long." })
    .max(50, { message: "Topic is too long." }),
  description: z.string().optional(),
});

export function TestForm() {
  const [showQuestionsForm, setShowQuestionsForm] = React.useState(false);
  const [test, setTest] = React.useState<z.infer<typeof testSchema> | null>(
    null,
  );
  const form = useForm<z.infer<typeof testSchema>>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      topic: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof testSchema>) {
    setShowQuestionsForm(true);
    setTest(values);
  }

  function resetTestForm() {
    setTest(null);
    setShowQuestionsForm(false);
    form.reset();
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="min-w-[300px] max-w-[1000px] space-y-4"
        >
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="required">Topic</FormLabel>
                <FormControl>
                  <Input placeholder="Mechanics 101" {...field} />
                </FormControl>
                <FormDescription>
                  Give your test an understandable title.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    rows={3}
                    className="h-24"
                    placeholder="You will be tested on your physics knowledge."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Explain what the test is all about.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {!showQuestionsForm && <Button type="submit">Add questions</Button>}
        </form>
      </Form>
      {showQuestionsForm && (
        <QuestionsForm test={test!} resetTestForm={resetTestForm} />
      )}
    </>
  );
}
