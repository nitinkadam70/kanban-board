import Header from "./components/Header";
import TaskColumn from "./components/TaskColumn";
import { columnsData } from "./utils/data";

export default function Home() {
  return (
    <div className="container mx-auto">
      <Header />
      <div className="w-full max-auto">
        <div className="w-full flex justify-around items-center gap-2 ml-2 overflow-x-auto">
          {columnsData.map((column) => (
            <div key={column.id} className="w-full mx-auto">
              <TaskColumn title={column.title} bgColor={column.bgColor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
