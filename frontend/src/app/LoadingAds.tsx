import { Skeleton } from "@/components/ui/skeleton";

const LoadingAds = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[190px] w-[380px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[380px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default LoadingAds;
