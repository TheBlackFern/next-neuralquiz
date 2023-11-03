"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { UseFormReturn, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { createResults } from "@/db";
import { getErrorMessage } from "@/lib/utils";
import type { TAnswer } from "@/db/schema";

const usernameSchema = z.object({
  username: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type QuizSubmitButtonProps = {
  answers: TAnswer[];
  testId: number;
  isDisabled?: boolean;
};

export const QuizSubmitButton = ({
  answers,
  testId,
  isDisabled,
}: QuizSubmitButtonProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof usernameSchema>>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof usernameSchema>) {
    try {
      const res = await createResults(answers, values.username, testId);
      // toast({
      //   title: "Submitted results",
      //   description: (
      //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
      //       <code className="text-white">{JSON.stringify(res, null, 2)}</code>
      //     </pre>
      //   ),
      // });
      router.push("/results/" + res);
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `Failed to submit results: ${getErrorMessage(
          error,
        )}. Please, try again.`,
      });
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={isDisabled || false} type="button">
          Submit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>One Last Thing</DialogTitle>
          <DialogDescription>
            Enter your name, so that the result is stored.
          </DialogDescription>
        </DialogHeader>
        <QuizSubmitButton.Form onSubmit={onSubmit} form={form} />
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

QuizSubmitButton.displayName = "QuizSubmitButton";

type FormProps = {
  form: UseFormReturn<z.infer<typeof usernameSchema>>;
  onSubmit(values: z.infer<typeof usernameSchema>): Promise<void>;
};

const QuizSubmitButtonForm = ({ form, onSubmit }: FormProps) => (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter your name" {...field} />
            </FormControl>
            <FormDescription>
              This is the name which will be displayed in the test result.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </form>
  </Form>
);

QuizSubmitButtonForm.displayName = "QuizSubmitButtonForm";
QuizSubmitButton.Form = QuizSubmitButtonForm;
