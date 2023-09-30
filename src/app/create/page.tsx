import React from "react";
import { TestForm } from "@/components/create/test-form";

const Page = () => {
  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-medium">Create a new test</h2>
      <TestForm />
    </div>
  );
};

export default Page;
