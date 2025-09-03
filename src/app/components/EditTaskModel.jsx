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
    assignTo: "1",
    startDate: "",
    endDate: "",
  });

  // Get task by ID using selector
  const task = useSelector((state) => selectTaskById(state, id));

  // Update formData when task changes
  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        title: task.title,
        status: task.status,
        description: task.description,
        assignTo: task.assignTo || "1",
        startDate: task.startDate || "",
        endDate: task.endDate || "",
      });
    }
  }, [task]);

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTask({ taskId: formData.id, updates: formData }));
    onClose();
  };

  return (
    <div className="modal-container">
      <div className="modal-box fade-in-up">
        {/* Header */}
        <div className="modal-header">
          <h3 className="modal-title">Edit Task</h3>
          <button type="button" onClick={onClose} className="btn-close">
            ✕
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="modal-body">
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
              className="input-base-text"
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
              className="input-base-select"
            >
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
              htmlFor="assignTo"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Assign To
            </label>
            <select
              name="assignTo"
              value={formData.assignTo}
              onChange={handleChange}
              className="input-base-select"
            >
              {users?.map((user) => (
                <option key={user?.id} value={user?.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Dates */}
          <div className="flex-around-custom">
            <DatePickerInput
              name="startDate"
              value={formData.startDate}
              handleChange={handleChange}
              placeholder="Select start date"
            />
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
              className="input-base-desc"
            />
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
