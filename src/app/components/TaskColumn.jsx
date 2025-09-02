import React from "react";
import TaskCard from "./TaskCard";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { deleteColumn, editTask } from "../redux/features/kanbanActions";

const colorClasses = {
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  gray: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  yellow:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
  purple:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  indigo:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
};

const TaskColumn = ({ columnName, columnColor, tasks, index, id }) => {
  const dispatch = useDispatch();

  // Delete Column
  const handleDeleteColumn = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this column and all its tasks?"
    );
    if (confirmDelete) {
      dispatch(deleteColumn(id));
    }
  };

  // Drag Handlers
  const handleDragStart = (e, task) => {
    e.currentTarget.style.opacity = "0.5";
    // Save task data in the native dataTransfer object
    e.dataTransfer.setData("task", JSON.stringify(task));
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const taskData = e.dataTransfer.getData("task");

    if (!taskData) return;

    const task = JSON.parse(taskData);

    if (task.status === targetStatus) return; // same column, ignore

    // Update the task's status to the new column
    dispatch(
      editTask({
        taskId: task.id,
        updates: { ...task, status: targetStatus },
      })
    );
  };

  return (
    <div className="min-w-[300px] w-full max-w-[400px] h-[550px] border-2 border-blue-400 rounded-md shadow-md flex flex-col">
      {/* Column Header */}
      <div className="font-bold flex justify-center relative text-white text-lg text-center p-2 border-b-2 border-blue-400">
        <div>
          <span
            className={`${colorClasses[columnColor]} text-[14px] me-2 px-2.5 py-0.5 rounded-full font-semibold`}
          >
            • {columnName}
          </span>
          <span style={{ color: columnColor }} className="text-xs">
            {" "}
            {tasks?.length}
          </span>
        </div>
        {index > 2 && (
          <Icon
            onClick={() => handleDeleteColumn(id)}
            icon="mdi:delete"
            className="w-5 h-5 hover:text-blue-200 text-blue-100 absolute right-2 top-3 cursor-pointer"
          />
        )}
      </div>

      {/* Tasks Area */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, columnName)}
        className="overflow-y-auto w-full h-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500"
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(156, 163, 175, 0.2) transparent",
        }}
      >
        {tasks.map((task) => (
          <div
            className="w-full"
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
            onDragEnd={handleDragEnd}
          >
            <TaskCard task={task} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
