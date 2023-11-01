import React from "react";
import { TestForm } from "@/components/create/test-form";

const Page = () => {
  return (
    <div className="flex w-full flex-col justify-start gap-5 px-0 sm:px-10 md:px-[5%] lg:px-[15%]">
      <h2 className="text-3xl font-medium">Create a new test</h2>
      <TestForm />
    </div>
  );
};

export default Page;
