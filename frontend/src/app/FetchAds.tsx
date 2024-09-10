"use client";

import AdCard, { AdProps } from "@/components/shared/AdCard";
import { getAds } from "@/lib/actions/ads.actions";
import { useQuery } from "@tanstack/react-query";
import LoadingAds from "./LoadingAds";
import ErrorAds from "./ErrorAds";

const FetchAds = () => {
  const {
    data: ads,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ads"],
    queryFn: () => getAds(),
  });

  if (isLoading) return <LoadingAds />;

  if (error) return <ErrorAds />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ads?.map((ad: AdProps) => (
        <AdCard key={ad.id} ad={ad} />
      ))}
    </div>
  );
};

export default FetchAds;
