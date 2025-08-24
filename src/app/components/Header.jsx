import React from "react";

const Header = () => {
  return (
    <div className="w-full">
      <div className="text-white p-4 text-center w-full border-b-2 border-[#64748b]">
        <h1 className="text-2xl font-bold">Kanban Board</h1>
      </div>
      <div className="flex justify-between items-center py-4">
        <div>Project Name</div>
        <div>Search Bar, </div>
      </div>
    </div>
  );
};

export default Header;
