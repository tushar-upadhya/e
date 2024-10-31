import { Skeleton } from "../ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div
      className="flex flex-col  sm:grid grid-cols-2
       md:grid-cols-3 pt-12 lg:grid-cols-4 gap-5"
    >
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} className="h-[20rem] w-full" />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
