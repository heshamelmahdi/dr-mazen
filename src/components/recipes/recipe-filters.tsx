"use client";

import { useState } from "react";

interface ActiveFilters {
  mealType?: string;
  tags: string[];
  minCalories?: number;
  maxCalories?: number;
}

interface RecipeFiltersProps {
  mealTypes: string[];
  tags: string[];
  activeFilters: ActiveFilters;
  onApplyFilters: (filters: ActiveFilters) => void;
  isLoading?: boolean;
}

export default function RecipeFilters({
  mealTypes,
  tags,
  activeFilters,
  onApplyFilters,
  isLoading = false
}: RecipeFiltersProps) {
  const [selectedMealType, setSelectedMealType] = useState<string | undefined>(
    activeFilters.mealType
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    activeFilters.tags || []
  );
  const [minCalories, setMinCalories] = useState<number | undefined>(
    activeFilters.minCalories
  );
  const [maxCalories, setMaxCalories] = useState<number | undefined>(
    activeFilters.maxCalories
  );
  
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleApplyFilters = () => {
    onApplyFilters({
      mealType: selectedMealType,
      tags: selectedTags,
      minCalories,
      maxCalories
    });
  };
  
  const handleResetFilters = () => {
    setSelectedMealType(undefined);
    setSelectedTags([]);
    setMinCalories(undefined);
    setMaxCalories(undefined);
    
    onApplyFilters({
      tags: []
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Meal Type Filter */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-2">Meal Type</h3>
        <select
          value={selectedMealType || ""}
          onChange={(e) => setSelectedMealType(e.target.value || undefined)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          disabled={isLoading}
        >
          <option value="">All Meal Types</option>
          {mealTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
      {/* Calories Filter */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-2">Calories</h3>
        <div className="flex space-x-2">
          <div>
            <label htmlFor="minCalories" className="block text-xs text-gray-500">
              Min
            </label>
            <input
              type="number"
              id="minCalories"
              value={minCalories || ""}
              onChange={(e) => setMinCalories(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="Min"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="maxCalories" className="block text-xs text-gray-500">
              Max
            </label>
            <input
              type="number"
              id="maxCalories"
              value={maxCalories || ""}
              onChange={(e) => setMaxCalories(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="Max"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
      
      {/* Tags Filter */}
      <div>
        <h3 className="text-md font-medium text-gray-700 mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 text-sm rounded-full ${
                selectedTags.includes(tag)
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              disabled={isLoading}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="flex space-x-2 pt-4">
        <button
          onClick={handleApplyFilters}
          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Applying..." : "Apply Filters"}
        </button>
        <button
          onClick={handleResetFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
          disabled={isLoading}
        >
          Reset
        </button>
      </div>
    </div>
  );
} 