"use client";
import React from "react";
import TaskSearchBar from "./TaskSearchBar";
import { Icon } from "@iconify/react";
import FilterBtn from "./FilterBtn";
import AddTaskModal from "./AddTaskModal";
import AddColumnModal from "./AddColoumnModel";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  return (
    <header className="w-full bg-gray-900">
      {/* Top title bar */}
      <div className="text-white p-4 text-center border-b-2 border-b-[#64748b]">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
      </div>

      {/* Sub-header with controls */}
      <div className="flex flex-wrap justify-between items-center px-4 py-3 text-white gap-3">
        {/* Left side */}
        <div className="font-semibold text-lg">Project Name</div>

        {/* Right side controls */}
        <div className="flex flex-wrap gap-2 items-center">
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
