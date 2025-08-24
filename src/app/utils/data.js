import { v4 as uuidv4 } from "uuid";

const columnsDataDefualt = [
  {
    id: uuidv4(),
    title: "To Do",
    bgColor: "gray",
    tasks: [],
  },
  {
    id: uuidv4(),
    title: "In Progress",
    bgColor: "blue",
    tasks: [],
  },
  {
    id: uuidv4(),
    title: "Done",
    bgColor: "green",
    tasks: [],
  },
];

export { columnsDataDefualt };
