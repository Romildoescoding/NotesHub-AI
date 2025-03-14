import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Cancel from "./svgs/Cancel";

const colors = [
  { primary: "#1E3A8A", secondary: "#BFDBFE" },
  { primary: "#6B21A8", secondary: "#E9D5FF" },
  { primary: "#9A3412", secondary: "#FBCFE8" },
  { primary: "#065F46", secondary: "#A7F3D0" },
  { primary: "#92400E", secondary: "#FDE68A" },
  { primary: "#B91C1C", secondary: "#FECACA" },
  { primary: "#1E40AF", secondary: "#93C5FD" },
  { primary: "#4C1D95", secondary: "#D8B4FE" },
  { primary: "#064E3B", secondary: "#6EE7B7" },
  { primary: "#7C2D12", secondary: "#FED7AA" },
  { primary: "#4338CA", secondary: "#A5B4FC" },
  { primary: "#831843", secondary: "#F9A8D4" },
  { primary: "#365314", secondary: "#BEF264" },
  { primary: "#4D7C0F", secondary: "#BBF7D0" },
  { primary: "#A21CAF", secondary: "#F5D0FE" },
];

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

const Categories = ({
  categoryInput,
  setCategoryInput,
  selectedCategories,
  setSelectedCategories,
  error,
}) => {
  const allCategories = useRef(new Set(["Tech", "Health", "Finance"]));
  const selectedSet = new Set(
    selectedCategories.map((c) => c.category.toLowerCase())
  );

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  const handleAddCategory = (categoryName) => {
    const lowerCaseName = categoryName.toLowerCase();

    if (!selectedSet.has(lowerCaseName)) {
      const { primary, secondary } = getRandomColor();
      setSelectedCategories((prev) => [
        ...prev,
        { category: categoryName, primary, secondary },
      ]);
    }

    setCategoryInput("");
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  const handleRemoveCategory = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.filter(
        (cat) => cat.category.toLowerCase() !== categoryName.toLowerCase()
      )
    );
  };

  const filteredCategories = Array.from(allCategories.current).filter(
    (cat) =>
      cat.toLowerCase().includes(categoryInput.toLowerCase()) &&
      !selectedSet.has(cat.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (
        highlightedIndex >= 0 &&
        highlightedIndex < filteredCategories.length
      ) {
        handleAddCategory(filteredCategories[highlightedIndex]);
      } else if (categoryInput.trim()) {
        handleAddCategory(categoryInput.trim());
      }
    } else if (
      e.key === "Backspace" &&
      !categoryInput &&
      selectedCategories.length > 0
    ) {
      handleRemoveCategory(
        selectedCategories[selectedCategories.length - 1].category
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredCategories.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredCategories.length - 1
      );
    }
  };

  return (
    <div className="flex flex-col gap-2 relative pb-4">
      <label className="text-sm font-medium">Categories</label>
      <div
        className={`flex flex-wrap gap-2 border p-2 max-h-40 overflow-y-scroll rounded-md cursor-text ${
          error.categories
            ? "border-2 border-red-500"
            : "border border-gray-300"
        }`}
        onClick={() => inputRef.current.focus()}
      >
        {selectedCategories.map(({ category, primary, secondary }) => (
          <div
            key={category}
            style={{ backgroundColor: secondary, color: primary }}
            className="pr-3 pl-2 py-1 rounded-full flex items-center gap-2"
          >
            {category}
            <button onClick={() => handleRemoveCategory(category)}>
              <Cancel height={15} width={15} color={primary} />
            </button>
          </div>
        ))}
        <input
          ref={inputRef}
          type="text"
          placeholder="Type and select categories"
          value={categoryInput}
          onChange={(e) => {
            setCategoryInput(e.target.value);
            setShowSuggestions(true);
            setHighlightedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          className="border-none outline-none p-2 w-auto"
        />
        {showSuggestions && categoryInput && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full left-0 w-full bg-white border rounded-md shadow-lg mt-1 max-h-40 overflow-auto"
          >
            {filteredCategories.map((category, index) => (
              <div
                key={category}
                className={`p-2 hover:bg-zinc-100 cursor-pointer ${
                  index === highlightedIndex ? "bg-zinc-100" : ""
                }`}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleAddCategory(category)}
              >
                {category}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Categories;
