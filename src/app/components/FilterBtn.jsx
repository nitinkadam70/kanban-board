"use client";
import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterUser } from "../redux/features/kanbanActions";
import { users } from "./Users";

const FilterSortResetBtn = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleMenu = () => setOpenMenu(!openMenu);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    dispatch(setFilterUser(userId)); // filter tasks by selected user
    setOpenMenu(false);
  };

  const handleReset = () => {
    setSelectedUser(null);
    dispatch(setFilterUser(null)); // reset filter
  };

  useEffect(() => {
    console.log("Selected User:", selectedUser);
  }, [selectedUser]);
  return (
    <div className="relative flex items-center gap-2">
      {/* Filter Button */}
      <button
        className="p-2 rounded-full hover:bg-gray-700 transition-colors"
        onClick={toggleMenu}
      >
        <Icon icon="mdi:filter-variant" className="w-6 h-6 text-white" />
      </button>

      {/* Dropdown Menu */}
      {openMenu && (
        <div className="absolute top-full left-0 mt-2 z-10 bg-gray-800 text-white rounded-lg shadow-lg w-56">
          <div className="p-2 text-xs font-semibold border-b border-gray-700">
            Filter Tasks by User
          </div>
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-700 ${
                selectedUser === user.id ? "bg-gray-700" : ""
              }`}
              onClick={() => handleUserClick(Number(user?.id))}
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm">{user.name}</span>
            </div>
          ))}
        </div>
      )}

      {/* Reset Button */}
      {selectedUser && (
        <button
          className="p-2 rounded-full hover:bg-gray-700 transition-colors"
          onClick={handleReset}
        >
          <Icon icon="mdi:restart" className="w-6 h-6 text-white" />
        </button>
      )}
    </div>
  );
};

export default FilterSortResetBtn;
