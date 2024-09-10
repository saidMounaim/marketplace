import { Input } from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import CategoryFilter from "./CategoryFilter";

const FiltersSidebar = () => {
  return (
    <aside className="w-full md:w-64 space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <SlidersHorizontal className="mr-2" /> Filters
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <Input type="text" placeholder="Search" />
          </div>
          <CategoryFilter />
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Apply Filters
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
