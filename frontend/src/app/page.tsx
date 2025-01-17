import FiltersSidebar from "@/components/shared/FiltersSidebar";
import FetchAds from "./FetchAds";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAds } from "@/lib/actions/ads.actions";

interface HomePageParams {
  searchParams: {
    category?: string;
    s?: string;
  };
}

export default function Home({ searchParams }: HomePageParams) {
  const query = searchParams.s || "";
  const category = searchParams.category || "";

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["ads"],
    queryFn: () => getAds(),
  });

  return (
    <>
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <FiltersSidebar />
          {/* Ad Cards Grid */}
          <div className="flex-grow">
            <div className="mb-4 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800">Featured Ads</h1>
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <FetchAds query={query} category={category} />
            </HydrationBoundary>
          </div>
        </div>
      </main>
    </>
  );
}
