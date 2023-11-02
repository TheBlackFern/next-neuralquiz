"use server";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import {
  TNewQuestion,
  TNewResult,
  TNewTest,
  TAnswer,
  questions,
  results,
  tests,
} from "./schema";
import { getErrorMessage } from "@/lib/utils";
import { revalidatePath } from "next/cache";

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
// const client = postgres(connectionString);
const db = drizzle(pool);

// export async function fetchTests(req, ctx) {
//   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
//   const db = drizzle(pool)
//   const result = await db.select().from(tests);
//   ctx.waitUntil(pool.end());
//   return new Response(now);
// }

export async function fetchTests() {
  const allTests = await db.select().from(tests);
  return allTests;
}

export async function fetchResults() {
  const allResults = await db
    .select({
      id: results.id,
      testtaker: results.testtaker,
      test: tests.topic,
    })
    .from(results)
    .leftJoin(tests, eq(results.test, tests.id));
  return allResults;
}

export async function fetchResult(resultID: number) {
  return await db.transaction(async (tx) => {
    const result = await tx
      .select()
      .from(results)
      .where(eq(results.id, resultID));
    const answers = await tx
      .select({
        answer: questions.answer,
      })
      .from(questions)
      .where(eq(questions.test, result[0].test));
    return {
      result: result[0],
      correctAnswers: answers.map((val) => val.answer),
    };
  });
}

export async function fetchQuestionsByTestID(testID: number) {
  const allQuestionsForTest = await db
    .select({
      id: questions.id,
      question: questions.question,
      answer: questions.answer,
      options: questions.options,
      image: questions.image,
      test: questions.test,
      type: questions.type,
      // test: {
      //   id: tests.id,
      //   topic: tests.topic,
      //   description: tests.description,
      // },
    })
    .from(questions)
    // .leftJoin(tests, eq(questions.test, tests.id))
    .where(eq(questions.test, testID));
  return allQuestionsForTest;
}

export type TQuestions = Awaited<ReturnType<typeof fetchQuestionsByTestID>>;

export async function createTestWithQuestions(
  newQuestions: Omit<TNewQuestion, "test">[],
  newTest: TNewTest,
) {
  try {
    // throw new Error("Test");
    await db.transaction(async (tx) => {
      const insertedTest = await tx.insert(tests).values(newTest).returning();
      const newQuestionsWithTest = newQuestions.map((question) => ({
        ...question,
        test: insertedTest[0].id,
      }));
      await tx.insert(questions).values(newQuestionsWithTest);
    });
    revalidatePath("/tests");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function createResults(
  answers: TAnswer[],
  username: string,
  testID: number,
) {
  try {
    const result: TNewResult = {
      testtaker: username,
      test: testID,
      answers: answers,
    };
    // throw new Error("Test");
    const createdResult = await db.insert(results).values(result).returning();
    return createdResult[0].id;
    // revalidatePath("/tests");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
