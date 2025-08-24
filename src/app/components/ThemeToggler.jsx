"use client";
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const ThemeToggler = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Apply theme to <html> tag
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full border bg-gray-200 dark:bg-gray-800 dark:border-gray-700"
    >
      {!darkMode ? (
        <Icon
          icon="line-md:sunny-outline-to-moon-alt-loop-transition"
          width="24"
        />
      ) : (
        <Icon icon="line-md:moon-to-sunny-outline-loop-transition" width="24" />
      )}
    </button>
  );
};

export default ThemeToggler;
