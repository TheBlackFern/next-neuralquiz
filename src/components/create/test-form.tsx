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
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { QuestionsForm } from "./questions-form";

const testSchema = z.object({
  topic: z
    .string()
    .min(2, { message: "Topic should be at least 2 characters long." })
    .max(50, { message: "Topic is too long." }),
  description: z.string().optional(),
});

export function TestForm() {
  const [showQuestionsForm, setShowQuestionsForm] = useState(false);
  const form = useForm<z.infer<typeof testSchema>>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      topic: "",
      description: "",
    },
  });

  function onSubmit(values: z.infer<typeof testSchema>) {
    setShowQuestionsForm(true);
    console.log(values);
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 min-w-[300px] max-w-[612px]"
        >
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic*</FormLabel>
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
                    placeholder="You will be tested in physics."
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
      {showQuestionsForm && <QuestionsForm />}
    </>
  );
}
