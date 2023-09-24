import { Button } from "@/components/ui/button";
import { fetchTests } from "@/db";
import Link from "next/link";

async function Page() {
  const tests = await fetchTests();

  return (
    <div className="flex flex-col gap-5">
      {tests
        ? tests.map((test) => (
            <Link href={`/test/${test.id}`}>
              <Button>{test.topic}</Button>
            </Link>
          ))
        : null}
    </div>
  );
}

export default Page;
