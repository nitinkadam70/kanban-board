"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTask, selectTaskById } from "../redux/features/kanbanActions";
import { users } from "./Users";
import DatePickerInput from "./DatePickerInput";
const EditTaskModal = ({ id, onClose }) => {
  const dispatch = useDispatch();
  const { columnsData } = useSelector((state) => state.columns);
  // Manage all fields in one state object
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    status: "",
    description: "",
    assignTo: "0",
    startDate: "",
    endDate: "",
  });

  //  Get task by ID using selector
  const task = useSelector((state) => selectTaskById(state, id));

  //  Update formData when task changes
  useEffect(() => {
    if (task) {
      //console.log("get task", task);
      setFormData({
        id: task.id,
        title: task.title,
        status: task.status,
        description: task.description,
        assignTo: task.assignTo || "0",
        startDate: task.startDate || "",
        endDate: task.endDate || "",
      });
    }
  }, [task]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); //  fixed bug
  };

  //  Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTask({ taskId: formData.id, updates: formData })); //  update redux
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Edit Task
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          {/* Status */}
          <div>
            <label
              htmlFor="status"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {/* ✅ Match status values with slice */}
              {columnsData?.map((column) => (
                <option key={column.id} value={column.columnName}>
                  {column.columnName}
                </option>
              ))}
            </select>
          </div>
          {/* Assign To */}
          <div>
            <label
              htmlFor="assignTO"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Assign To
            </label>
            <select
              name="assignTo"
              value={formData.assignTo}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {/* ✅ Match status values with slice */}
              {users?.map((user, index) => (
                <option key={user.id - 1} value={index}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-around items-center gap-2">
            {/* Start Date */}
            <DatePickerInput
              name="startDate"
              value={formData.startDate}
              handleChange={handleChange}
              placeholder="Select start date"
            />

            {/* End Date */}
            <DatePickerInput
              name="endDate"
              value={formData.endDate}
              handleChange={handleChange}
              placeholder="Select end date"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2.5 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          {/* Footer */}
          <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200 dark:border-gray-600">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-medium bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
