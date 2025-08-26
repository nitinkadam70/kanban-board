"use client";
import React from "react";

export const users = [
  {
    id: 1,
    name: "Jese Leos",
    image: "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
  },
  {
    id: 2,
    name: "Bonnie Green",
    image: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
  },
  {
    id: 3,
    name: "Michael Gough",
    image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
  },
  {
    id: 4,
    name: "Thomas Lean",
    image: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
  },
];

const Users = () => {
  return (
    <div className="flex -space-x-4 w-fit rtl:space-x-reverse relative bg-gray-900 p-2 rounded-lg">
      {users.map((user, idx) => (
        <div key={idx} className="group relative">
          {/* Avatar */}
          <img
            className="w-10 h-10 border-2 border-gray-800 rounded-full cursor-pointer"
            src={user.image}
            alt={user.name}
          />

          {/* Hover Popup */}
          <div className="absolute left-0 mt-2 z-10 hidden group-hover:flex items-center gap-2 bg-gray-800 text-white p-2 rounded-lg shadow-lg w-max">
            <img
              className="w-5 h-5 rounded-full"
              src={user.image}
              alt={user.name}
            />
            <div className="text-xs whitespace-nowrap">{user.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
