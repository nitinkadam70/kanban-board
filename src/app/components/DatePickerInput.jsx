"use client";
import { Icon } from "@iconify/react";

const DatePickerInput = ({ name, handleChange, placeholder, value }) => {
  return (
    <div className="relative w-full max-w-sm">
      {/* Left icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Icon
          icon="mdi:calendar-month"
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
        />
      </div>

      <input
        type="date"
        name={name}
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-4 py-2.5
          text-sm rounded-xl
          border shadow-sm
          bg-white text-gray-900
          border-gray-300
          placeholder-gray-400
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          dark:bg-gray-800 dark:text-gray-100
          dark:border-gray-600 dark:placeholder-gray-500
          dark:focus:ring-blue-400 dark:focus:border-blue-400
          transition-colors duration-200
        "
      />
    </div>
  );
};

export default DatePickerInput;
