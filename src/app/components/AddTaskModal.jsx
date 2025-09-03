"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/features/kanbanActions";

const AddTaskModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "To do",
    assignTo: "1",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
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

    if (!title || !description) {
      alert("Please fill in all fields");
      return;
    }

    dispatch(
      addTask({ title, description, status, startDate, endDate, assignTo })
    );
    setNewTask({
      title: "",
      description: "",
      status: "To do",
      assignTo: "1",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
    });
    setIsOpen(false);
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn-add btn-blue"
      >
        <Icon icon="mdi:plus" className="w-4 h-4 mr-2" />
        Add Task
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal-container">
          <div className="modal-box fade-in-up">
            {/* Header */}
            <div className="modal-header">
              <h3 className="modal-title">Add New Task</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn-close"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <form className="modal-body" onSubmit={handleSubmit}>
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
                  className="input-base-text"
                  required
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
                className="input-base-desc"
                />
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-blue px-4 py-2 rounded-lg text-sm font-medium"
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
