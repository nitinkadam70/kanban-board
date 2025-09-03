"use client";

import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import EditTaskModal from "./EditTaskModel";
import { deleteTask } from "../redux/features/kanbanActions";
import { useDispatch } from "react-redux";
import { users } from "./Users";

const TaskCard = ({ task }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpenEditModel, setIsOpenEditModel] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  const { title, description, id, assignTo, startDate, endDate } = task;

  // Handle Delete Task
  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(taskId));
      setShowMenu(false);
    }
  };

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const assignedUser = users.find((u) => u.id == assignTo);

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setIsOpenEditModel(true)}
        className="task-card fade-in-up max-w-sm"
      >
        <div className="task-card-header">
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
              onClick={() => setShowMenu((prev) => !prev)}
            />

            {showMenu && (
              <div className="task-menu">
                <button
                  className="task-menu-item"
                  onClick={() => setIsOpenEditModel(true)}
                >
                  Edit Task
                </button>
                <button
                  className="task-menu-item"
                  onClick={() => handleDeleteTask(id)}
                >
                  Delete Task
                </button>
              </div>
            )}
          </div>
        </div>

        <h5 className="task-card-title">{title}</h5>
        <p className="task-card-desc">{description}</p>

        <div className="card-user">
          {/* Assigned user */}
          {assignedUser && (
            <div className="task-user">
              <img
                className="task-user-img"
                src={assignedUser.image}
                alt={assignedUser.name}
              />
              <div className="task-user-name">{assignedUser.name}</div>
            </div>
          )}

          {/* Dates */}
          {(startDate || endDate) && (
            <div className="task-dates">
              {startDate && (
                <p>
                  <Icon icon="mdi:calendar-start" className="task-date-icon" />
                  Start: {startDate}
                </p>
              )}
              {endDate && (
                <p>
                  <Icon icon="mdi:calendar-end" className="task-date-icon" />
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
