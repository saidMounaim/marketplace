"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

enum Category {
  CLOTHES = "CLOTHES",
  ELECTRONICS = "ELECTRONICS",
  FURNITURE = "FURNITURE",
  TOYS = "TOYS",
  BOOKS = "BOOKS",
}

const CategoryFilter = () => {
  const categories: Category[] = [
    Category.CLOTHES,
    Category.ELECTRONICS,
    Category.FURNITURE,
    Category.TOYS,
    Category.BOOKS,
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Category
      </label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
