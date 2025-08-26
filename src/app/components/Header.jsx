"use client";
import React from "react";
import TaskSearchBar from "./TaskSearchBar";
import { Icon } from "@iconify/react";
import FilterBtn from "./FilterBtn";
import AddTaskModal from "./AddTaskModal";
import AddColumnModal from "./AddColoumnModel";
import ThemeToggler from "./ThemeToggler";
import Users from "./Users";

const Header = () => {
  return (
    <header className="w-full bg-gray-900 dark:bg-gray-800 transition-colors duration-300">
      {/* Top title bar */}
      <div className="text-white dark:text-gray-100 p-4 text-center border-b-2 border-b-[#64748b] dark:border-b-gray-700">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
      </div>

      {/* Sub-header with controls */}
      <div
        className="
          flex flex-col sm:flex-row 
          justify-between sm:items-center 
          px-4 py-3 gap-3 
          text-white dark:text-gray-100
        "
      >
        {/* Left side */}
        <div className="font-semibold text-lg text-center sm:text-left">
          <Users />
        </div>

        {/* Right side controls */}
        <div
          className="
            flex flex-wrap justify-center sm:justify-end 
            gap-2 items-center
          "
        >
          <TaskSearchBar />
          <FilterBtn />
          <AddTaskModal />
          <AddColumnModal />
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
};

export default Header;
