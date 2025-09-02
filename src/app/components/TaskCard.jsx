"use client";

import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import EditTaskModal from "./EditTaskModel";
import { deleteTask } from "../redux/features/kanbanActions";
import { useDispatch } from "react-redux";
import { users } from "./Users";
const TaskCard = ({ task, ColumnColor }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [isOpenEditModel, setIsOpenEditModel] = useState(false);
  const { title, description, id, assignTo, startDate, endDate } = task;
  const dispatch = useDispatch();

  // Handle Delete Task
  const handleDeleteTask = (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      dispatch(deleteTask(taskId));
      setShowMenu(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setIsOpenEditModel(true)}
        className="fade-in-up max-w-sm p-4 cursor-pointer bg-gray-800 border border-gray-700 rounded-lg shadow-sm m-4"
      >
        <div className="flex items-center justify-between mb-3 relative">
          <Icon icon="mingcute:task-2-fill" className="w-7 h-7 text-gray-400" />

          {/* Card menu */}
          <div
            className="relative"
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
          >
            <Icon
              icon="charm:menu-kebab"
              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-200"
              onClick={() => setShowMenu(!showMenu)}
            />

            {showMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-gray-700 text-white rounded-md shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
                  onClick={() => setIsOpenEditModel(true)}
                >
                  Edit Task
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-600"
                  onClick={() => handleDeleteTask(id)}
                >
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>

        <h5
          className="
    mb-2 
    text-lg sm:text-xl lg:text-2xl 
    font-semibold tracking-tight text-white
    text-center lg:text-left
  "
        >
          {title}
        </h5>

        <p
          className="
    mb-3 
    text-sm sm:text-base lg:text-lg 
    font-normal text-gray-400
    text-center lg:text-left
  "
        >
          {description}
        </p>

        <div className="flex flex-col lg:flex-row  items-center justify-between mt-4">
          {/* Assigned user badge */}
          {(() => {
            const user = users.find((u) => u.id == assignTo);
            return (
              user && (
                <div className="flex items-center gap-2 bg-gray-800 p-2 rounded-lg shadow-lg w-max">
                  <img
                    className="w-5 h-5 rounded-full"
                    src={user.image}
                    alt={user.name}
                  />
                  <div className="text-xs text-white whitespace-nowrap">
                    {user.name}
                  </div>
                </div>
              )
            );
          })()}

          {/* Dates section (only if provided) */}
          {(startDate || endDate) && (
            <div className="mt-3 space-y-1 text-xs text-gray-400">
              {startDate && (
                <p>
                  <Icon
                    icon="mdi:calendar-start"
                    className="inline w-4 h-4 mr-1 text-gray-400"
                  />
                  Start: {startDate}
                </p>
              )}
              {endDate && (
                <p>
                  <Icon
                    icon="mdi:calendar-end"
                    className="inline w-4 h-4 mr-1 text-gray-400"
                  />
                  End: {endDate}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Modal */}
      {isOpenEditModel && (
        <EditTaskModal id={id} onClose={() => setIsOpenEditModel(false)} />
      )}
    </>
  );
};

export default TaskCard;
