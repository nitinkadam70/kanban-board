"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { addColumn } from "../redux/features/kanbanActions";
import { useDispatch } from "react-redux";

const AddColumnModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    columnName: "",
    columnColor: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    dispatch(addColumn(formData));
    setIsOpen(false);
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center text-white bg-green-600 hover:bg-green-700 
          focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
          rounded-lg text-sm px-4 py-2.5 dark:focus:ring-green-800"
      >
        <Icon icon="mdi:view-column" className="w-4 h-4 mr-2" />
        Add Column
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Column
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
              <div>
                <label
                  htmlFor="columnName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Column Name
                </label>
                <input
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      columnName: e.target.value,
                    }))
                  }
                  type="text"
                  name="columnName"
                  placeholder="Enter column name"
                  className="w-full p-2.5 border rounded-lg bg-gray-50 border-gray-300 text-gray-900 text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
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
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-green-600 hover:bg-green-700 text-white"
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
export default AddColumnModal;
