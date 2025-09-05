"use client";

import { useState, useMemo } from "react";

/**
 * Custom hook for managing search and filter functionality
 */
export const useSearch = <T>(
  items: T[],
  searchFields: (keyof T)[],
  initialQuery: string = "",
  initialSortBy: string = ""
) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState(initialSortBy);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items;
    
    return items.filter(item => 
      searchFields.some(field => {
        const value = item[field];
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      })
    );
  }, [items, searchQuery, searchFields]);

  const sortedItems = useMemo(() => {
    if (!sortBy) return filteredItems;
    
    return [...filteredItems].sort((a, b) => {
      const aValue = a[sortBy as keyof T];
      const bValue = b[sortBy as keyof T];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue;
      }
      
      if (aValue instanceof Date && bValue instanceof Date) {
        return aValue.getTime() - bValue.getTime();
      }
      
      return 0;
    });
  }, [filteredItems, sortBy]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const clearSort = () => {
    setSortBy("");
  };

  const clearAll = () => {
    clearSearch();
    clearSort();
  };

  return {
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    filteredItems,
    sortedItems,
    clearSearch,
    clearSort,
    clearAll,
    hasActiveFilters: searchQuery.trim() !== "" || sortBy !== "",
  };
};