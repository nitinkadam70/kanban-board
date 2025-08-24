"use client";

import React from "react";
import { Icon } from "@iconify/react";

const TaskSearchBar = () => {
  return (
    <form className="flex items-center max-w-sm mx-auto">
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Icon
            icon="mdi:magnify"
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
          />
        </div>
        <input
          type="search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
          placeholder="Search task..."
          required
        />
      </div>
    </form>
  );
};

export default TaskSearchBar;
