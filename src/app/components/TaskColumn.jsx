"use client";

import React, { useEffect } from "react";
import TaskCard from "./TaskCard";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { deleteColumn, editTask } from "../redux/features/kanbanActions";

const TaskColumn = ({
  columnName,
  columnColor,
  tasks,
  index,
  id,
  columnOptionalName,
}) => {
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
  useEffect(() => {
    console.log("columnOptionalName", columnOptionalName);
  }, [columnOptionalName]);
  return (
    <div className="task-column">
      {/* Column Header */}
      <div className="task-column-header">
        <div>
          <span className={`task-badge badge-${columnColor}`}>
            • {columnName}{" "}
            {columnOptionalName?.length > 0 && `( ${columnOptionalName} )`}
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
            className="delete-icon"
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
