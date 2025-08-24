"use client";

import { Icon } from "@iconify/react";
import React, { useState } from "react";

const TaskCard = ({ bgColor = "blue" }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm m-4">
      <div className="flex items-center justify-between mb-3 relative">
        <Icon icon="mingcute:task-2-fill" className="w-7 h-7 text-gray-400" />

        {/* Card menu */}
        <div className="relative">
          <Icon
            icon="charm:menu-kebab"
            className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-200"
            onClick={() => setShowMenu(!showMenu)}
          />

          {showMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-gray-700 text-white rounded-md shadow-lg">
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
                onClick={() => alert("Edit Task Clicked")}
              >
                Edit Task
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
                onClick={() => alert("Delete Task Clicked")}
              >
                Delete Task
              </button>
            </div>
          )}
        </div>
      </div>

      <h5 className="mb-2 text-xl font-semibold tracking-tight text-white">
        Need a help in Claim?
      </h5>

      <p className="mb-3 font-normal text-gray-400">
        Go to this step by step guideline process on how to certify for your
        weekly benefits:
      </p>
    </div>
  );
};

export default TaskCard;
