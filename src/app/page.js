"use client";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import TaskColumn from "./components/TaskColumn";
import { useSelector } from "react-redux";
import { searchTaskByTitle } from "./features/kanbanActions";

export default function Home() {
  // const { columnsData } = useSelector((state) => state.columns);
  const columnsData = useSelector((state) => searchTaskByTitle(state));
  return (
    <div className="container mx-auto">
      <Header />
      <div className="w-full max-auto">
        <div className="w-full flex justify-around items-center gap-2 ml-2 overflow-x-auto">
          {columnsData?.map((column, index) => (
            <div key={column.id} className="w-full mx-auto">
              <TaskColumn
                id={column.id}
                tasks={column?.tasks}
                columnName={column.columnName}
                columnColor={column.columnColor}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
