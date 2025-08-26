"use client";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import TaskColumn from "./components/TaskColumn";
import { selectFilteredColumns } from "./redux/features/kanbanActions";

export default function Home() {
  const columnsData = useSelector((state) => selectFilteredColumns(state));

  return (
    <div className="container mx-auto">
      <Header />
      <div className="w-full max-auto">
        <div
          className="w-full flex justify-around items-center gap-2 ml-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "rgba(156, 163, 175, 0.2) transparent",
          }}
        >
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
