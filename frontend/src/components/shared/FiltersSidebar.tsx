"use client";

import { Input } from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import CategoryFilter from "./CategoryFilter";
import { FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FiltersSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleFilter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get("query");
    const category = formData.get("category");

    const params = new URLSearchParams(searchParams.toString());

    updateParam(params, "s", query);
    updateParam(params, "category", category);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, { scroll: false });
  };

  const updateParam = (
    params: URLSearchParams,
    key: string,
    value: FormDataEntryValue | null
  ) => {
    if (value && value.toString().trim() !== "") {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }
    if (value && value.toString().trim() == "all") {
      params.delete(key);
    }
  };

  return (
    <aside className="w-full md:w-64 space-y-4">
      <form onSubmit={handleFilter} className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <SlidersHorizontal className="mr-2" /> Filters
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <Input type="text" name="query" placeholder="Search" />
          </div>
          <CategoryFilter />
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            type="submit"
          >
            Apply Filters
          </Button>
        </div>
      </form>
    </aside>
  );
};

export default FiltersSidebar;
