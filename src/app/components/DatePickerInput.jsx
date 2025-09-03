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
        className="date-picker-input"
      />
    </div>
  );
};

export default DatePickerInput;
