import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq } from "drizzle-orm";
import { questions, tests } from "./schema";

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client);

export async function fetchTests() {
  const allTests = await db.select().from(tests);
  return allTests;
}

export async function fetchQuestions(testID: number) {
  const allQuestionsForTest = await db
    .select({
      id: questions.id,
      question: questions.question,
      answer: questions.answer,
      options: questions.options,
      image: questions.image,
      test: {
        id: tests.id,
        topic: tests.topic,
        description: tests.description,
      },
    })
    .from(questions)
    .leftJoin(tests, eq(questions.test, tests.id))
    .where(eq(tests.id, testID));
  return allQuestionsForTest;
}
