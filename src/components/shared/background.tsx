const Background = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute z-[-1] blur-3xl left-1/2 -translate-x-1/2 top-[calc(40px+10%)] rotate-[30deg]"
      >
        <div
          className="aspect-[1155/678] w-[50vw] max-w-[500px] bg-gradient-to-tr from-orange-400 to-red-800 dark:invert opacity-30 sm:left-0"
          style={{
            clipPath:
              "polygon(79% 16%, 80% 16%, 87% 31%, 76% 74%, 20% 78%, 5% 61%, 5% 31%, 10% 10%, 20% 12%, 28% 26%, 24% 49%, 44% 54%, 54% 26%, 56% 4%)",
          }}
        />
      </div>
      {/* <div aria-hidden="true" className="absolute z-[-1] blur-3xl left-[10%] top-1/2 rotate-[50deg]">
        <div
          className="aspect-[1155/678] w-[30vw] bg-gradient-to-tr from-orange-400 to-red-800 dark:from-cyan-400 dark:to-sky-500 opacity-30 sm:left-0 "
          style={{
            clipPath:
              "polygon(36% 5%, 51% 14%, 71% 15%, 80% 35%, 86% 56%, 92% 82%, 93% 97%, 84% 72%, 70% 59%, 62% 47%, 54% 30%, 38% 24%, 18% 16%, 9% 8%)",
          }}
        />
      </div> */}
    </>
  );
};

export default Background;
