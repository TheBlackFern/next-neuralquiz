"use server";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { NewQuestion, NewTest, questions, tests } from "./schema";

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
  newQuestions: Omit<NewQuestion, "test">[],
  newTest: NewTest
) {
  await db.transaction(async (tx) => {
    const insertedTest = await tx.insert(tests).values(newTest).returning();
    const newQuestionsWithTest = newQuestions.map((question) => ({
      ...question,
      test: insertedTest[0].id,
    }));
    await tx.insert(questions).values(newQuestionsWithTest);
  });
}
