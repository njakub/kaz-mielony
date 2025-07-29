import { useState } from "react";

interface FilterBarProps {
  onFilterChange: (filters: {
    mealType: string;
    difficulty: string;
    figure: string;
  }) => void;
  figures: string[];
}

export default function FilterBar({ onFilterChange, figures }: FilterBarProps) {
  const [filters, setFilters] = useState({
    mealType: "",
    difficulty: "",
    figure: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meal Type
          </label>
          <select
            value={filters.mealType}
            onChange={(e) => handleFilterChange("mealType", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">All Types</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty
          </label>
          <select
            value={filters.difficulty}
            onChange={(e) => handleFilterChange("difficulty", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Historical Figure
          </label>
          <select
            value={filters.figure}
            onChange={(e) => handleFilterChange("figure", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">All Figures</option>
            {figures.map((figure) => (
              <option key={figure} value={figure}>
                {figure}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
