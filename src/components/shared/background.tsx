const Background = () => {
  return (
    <>
      <div className="absolute z-[-1] blur-3xl left-[calc(5%)] sm:left-[calc(10%)] top-[calc(40px+10%)] rotate-[30deg]">
        <div
          className="aspect-[1155/678] w-[400px]  bg-gradient-to-tr from-orange-400 to-red-800 dark:from-cyan-400 dark:to-sky-500 opacity-30 sm:left-0 sm:w-[400px]"
          style={{
            clipPath:
              "polygon(79% 16%, 80% 16%, 87% 31%, 76% 74%, 20% 78%, 5% 61%, 5% 31%, 10% 10%, 20% 12%, 28% 26%, 24% 49%, 44% 54%, 54% 26%, 56% 4%)",
          }}
        />
      </div>
      <div className="absolute z-[-1] blur-3xl left-1/2 sm:right-[calc(10%)] top-[80%] rotate-[-50deg]">
        <div
          className="aspect-[1155/678] w-[400px]  bg-gradient-to-tr from-orange-400 to-red-800 dark:from-cyan-400 dark:to-sky-500 opacity-30 sm:left-0 sm:w-[1000px]"
          style={{
            clipPath:
              "polygon(36% 5%, 51% 14%, 71% 15%, 80% 35%, 86% 56%, 92% 82%, 93% 97%, 84% 72%, 70% 59%, 62% 47%, 54% 30%, 38% 24%, 18% 16%, 9% 8%)",
          }}
        />
      </div>
    </>
  );
};

export default Background;
