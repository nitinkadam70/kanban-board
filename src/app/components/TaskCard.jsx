import { Icon } from "@iconify/react";
import React from "react";

const TaskCard = ({ bgColor = "blue" }) => {
  return (
    <div className="max-w-sm p-6 bg-gray-800 border border-gray-700 rounded-lg shadow-sm m-4">
      <div className="flex items-center justify-between mb-3">
        <Icon icon="mingcute:task-2-fill" className="w-7 h-7 text-gray-400" />
        <Icon
          icon="charm:menu-kebab"
          className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-200"
        />
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
