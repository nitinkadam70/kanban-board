"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/features/kanbanActions";
import { users } from "./Users";
import DatePickerInput from "./DatePickerInput";

const AddTaskModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "",
    assignTo: "" || 0,
    startDate: "",
    endDate: "",
  });
  const dispatch = useDispatch();
  const { columnsData } = useSelector((state) => state.columns);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, status, startDate, endDate, assignTo } =
      newTask;
    console.log("New Task:", newTask);
    if (
      !title ||
      !description ||
      !status ||
      !startDate ||
      !endDate ||
      !assignTo
    ) {
      alert("Please fill in all fields");
      return;
    }
    dispatch(
      addTask({
        title,
        description,
        status,
        startDate,
        endDate,
        assignTo: Number(assignTo) || "0",
      })
    );
    setNewTask({
      title: "",
      description: "",
      status: "",
      startDate: "",
      endDate: "",
      assignTo: "",
    });
    setIsOpen(false);
  };
  return (
    <div>
      {/* Button to open modal */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 
          focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium 
          rounded-lg text-sm px-4 py-2.5 dark:focus:ring-[#1da1f2]/55"
      >
        <Icon icon="mdi:plus" className="w-4 h-4 mr-2" />
        Add Task
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Task
              </h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <form className="p-4 space-y-4" onSubmit={handleSubmit}>
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  name="title"
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter Task Title"
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
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">Select Status</option>
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
                  value={newTask.assignTo || 0}
                  onChange={handleChange}
                  className="w-full p-2.5 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  {" "}
                  <option value="">Select User</option>
                  {/* ✅ Match status values with slice */}
                  {users?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-around items-center gap-2">
                {/* Start Date */}
                <DatePickerInput
                  name="startDate"
                  value={newTask.startDate}
                  handleChange={handleChange}
                  placeholder="Select start date"
                />

                {/* End Date */}
                <DatePickerInput
                  name="endDate"
                  value={newTask.endDate}
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
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter Task Description"
                  className="w-full p-2.5 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              {/* Footer */}
              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-200 dark:border-gray-600">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddTaskModal;
