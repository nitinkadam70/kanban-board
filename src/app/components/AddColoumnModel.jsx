"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { addColumn } from "../redux/features/kanbanActions";
import { useDispatch } from "react-redux";

const AddColumnModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    columnName: "",
    columnColor: "#16a34a",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addColumn(formData));
    setIsOpen(false);
    setFormData({ columnName: "", columnColor: "#16a34a" });
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="btn-add btn-green"
      >
        <Icon icon="mdi:view-column" className="w-4 h-4 mr-2" />
        Add Column
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal-container">
          <div className="modal-box fade-in-up">
            {/* Header */}
            <div className="modal-header">
              <h3 className="modal-title">Add New Column</h3>
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
              {/* Column Name */}
              <div>
                <label
                  htmlFor="columnName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Column Name
                </label>
                <input
                  value={formData.columnName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      columnName: e.target.value,
                    }))
                  }
                  type="text"
                  name="columnName"
                  placeholder="Enter column name"
                  className="input-base-text"
                  required
                />
              </div>

              {/* Column Color */}
              <div>
                <label
                  htmlFor="columnColor"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Column Color
                </label>
                <input
                  value={formData.columnColor}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      columnColor: e.target.value,
                    }))
                  }
                  type="color"
                  name="columnColor"
                  className="input-color"
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
                <button type="submit" className="btn-save btn-green">
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
