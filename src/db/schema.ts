import { pgTable, integer, serial, text, json } from "drizzle-orm/pg-core";
import { z } from "zod";

export const tests = pgTable("tests", {
  id: serial("id").primaryKey(),
  topic: text("topic").notNull(),
  description: text("description"),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").array(),
  options: text("options").array(),
  image: text("image"),
  test: integer("test").references(() => tests.id),
  type: text("type").notNull(),
});

export const results = pgTable("results", {
  id: serial("id").primaryKey(),
  testtaker: text("testtaker").notNull(),
  answers: json("answers").array().notNull(),
  test: integer("test")
    .references(() => tests.id)
    .notNull(),
});

// export const testsRelations = relations(tests, ({ many }) => ({
//   questions: many(questions),
// }));

// export const questionsRelations = relations(questions, ({ one }) => ({
//   test: one(tests, {
//     fields: [questions.test],
//     references: [tests.id],
//   }),
// }));

export type TTest = typeof tests.$inferSelect;
export type TNewTest = typeof tests.$inferInsert;
export type TQuestion = typeof questions.$inferSelect;
export type TNewQuestion = typeof questions.$inferInsert;
export type TResult = typeof results.$inferSelect;
export type TNewResult = typeof results.$inferInsert;
export type TAnswer =
  | { type: "multiple"; answer: string[] }
  | { type: "single" | "open"; answer: string };

// TODO: check if answer in options
const questionSchema = z.discriminatedUnion("type", [
  z.object({
    question: z
      .string()
      .min(2, { message: "Question should be at least 2 characters long." })
      .max(50, { message: "Question is too long." }),
    image: z.string().url().optional(),
    type: z.literal("multiple"),
    answer: z.array(
      z
        .string()
        .min(1, {
          message: "Answer should be at least 1 character long.",
        })
        .max(100, { message: "Answer is too long." }),
    ),
    options: z
      .array(z.string())
      .min(2, { message: "There should be at least 2 options." }),
  }),
  z.object({
    question: z
      .string()
      .min(2, { message: "Question should be at least 2 characters long." })
      .max(50, { message: "Question is too long." }),
    image: z.string().url().optional(),
    type: z.literal("open"),
  }),
  z.object({
    question: z
      .string()
      .min(2, { message: "Question should be at least 2 characters long." })
      .max(50, { message: "Question is too long." }),
    image: z.string().url().optional(),
    type: z.literal("single"),
    answer: z.array(
      z
        .string()
        .min(1, {
          message: "Answer should be at least 1 character long.",
        })
        .max(100, { message: "Answer is too long." }),
    ),
    options: z
      .array(z.string())
      .min(2, { message: "There should be at least 2 options." }),
  }),
]);

export const questionsSchema = z.object({
  questions: z
    .array(questionSchema)
    .min(1, { message: "The test should have at least one question." }),
});
