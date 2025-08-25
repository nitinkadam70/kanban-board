"use client";

import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import EditTaskModal from "./EditTaskModel";
import { deleteTask } from "../features/kanbanActions";
import { useDispatch } from "react-redux";

const TaskCard = ({ task }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const [isOpenEditModel, setIsOpenEditModel] = useState(false);
  const { title, description, id } = task;
  const dispatch = useDispatch();

  // Handle Delete Task
  const handleDeleteTask = (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (confirmDelete) {
      console.log("taskId 1", taskId);
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
      <div className="max-w-sm p-4 bg-gray-800 border border-gray-700 rounded-lg shadow-sm m-4">
        <div className="flex items-center justify-between mb-3 relative">
          <Icon icon="mingcute:task-2-fill" className="w-7 h-7 text-gray-400" />

          {/* Card menu */}
          <div className="relative" ref={menuRef}>
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

        <h5 className="mb-2 text-xl font-semibold tracking-tight text-white">
          {title}
        </h5>

        <p className="mb-3 font-normal text-gray-400">{description}</p>
      </div>
      {isOpenEditModel && (
        <EditTaskModal id={id} onClose={() => setIsOpenEditModel(false)} />
      )}
    </>
  );
};

export default TaskCard;
