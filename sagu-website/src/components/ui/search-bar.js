"use client";
// Import all required packages
import React, { useState } from "react";
import Link from "next/link";

import { FaSearch } from "react-icons/fa";

/**
 * Creates the layout and functionality of the search bar feature
 * @param { data } data - Search bar data that will be filtered based on the users input
 * @returns The layout of the search bar and it functionality
 */
function SearchBar({ data }) {
  // Create a some useState variables
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  /**
   * Takes the user input in the search bar and filters the search data to match the user input
   * @param { inputValue } inputValue - The user input in the search bar
   * @returns The filtered list of the search data
   */
  const filterSuggestions = (inputValue) => {
    const filtered = data.filter((opt) =>
      opt.related.some((relatedText) =>
        relatedText.toLowerCase().includes(inputValue.toLowerCase())
      )
    );

    return filtered;
  };

  /**
   * Handles the user input and the result of the filteration of the search data
   * @param { e } e - The event of the user typing their input in the search bar
   * @returns Nothing in both cases
   */
  const handleInputChange = (e) => {
    const inputValue = e.target.value; // Get the user input
    setQuery(inputValue); // Set the query useState variable to the user input

    // Check if the input filed is empty
    if (inputValue === "") {
      // Clear the suggestions list and return nothing
      setSuggestions([]);
      return;
    }

    const options = filterSuggestions(inputValue); // Call the filterSuggestions() on the inputValue
    setSuggestions(options); // Set the suggestions useState list to options
  };

  /**
   * Clears the suggestions useState list of filtered options
   */
  const clearSuggestions = () => {
    setSuggestions([]);
    setQuery("");
  };

  return (
    <div className="relative mt-0 mb-0">
      {/* The input bar for the user input */}
      <section className="">
        <input
          className={`${
            suggestions.length > 0 ? "rounded-t-md" : "rounded-md"
          } font-medium pl-10 pr-3 py-2  text-lg focus:outline-none w-full sm:w-[400px]`}
          placeholder="Search Sagu"
          value={query}
          onChange={handleInputChange}
        />
        <button
          className="absolute inset-y-0 left-0 flex items-center pl-2 md:pl-3 rounded-l-md focus:outline-none"
          type="submit"
        >
          <FaSearch />
        </button>
      </section>

      {/* The drop down option menu for the filtered suggestions */}
      {suggestions.length > 0 && (
        <section className="absolute top-full z-10 flex flex-col py-2 bg-white rounded-b-lg border-t-2 w-full mt-0 shadow-md">
          {suggestions.map((suggestion, index) => (
            <Link
              href={suggestion.path}
              key={index}
              onClick={clearSuggestions}
              className="w-full hover:bg-black/5"
            >
              <span className="px-2"> {suggestion.text}</span>
            </Link>
          ))}
        </section>
      )}
    </div>
  );
}

export default SearchBar;
