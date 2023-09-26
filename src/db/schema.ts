"use server";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const tests = pgTable("tests", {
  id: serial("id").primaryKey(),
  topic: text("topic").notNull(),
  description: text("description"),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  options: text("options").array().notNull(),
  image: text("image"),
  test: integer("test").references(() => tests.id),
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

export const insertTestSchema = createInsertSchema(tests);
export const insertQuestionSchema = createInsertSchema(questions);

export type Test = typeof tests.$inferSelect;
export type NewTest = typeof tests.$inferInsert;
export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;
