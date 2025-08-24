import { v4 as uuidv4 } from "uuid";

const columnsData = [
  {
    id: uuidv4(),
    title: "To Do",
    bgColor: "gray",
    tasks: [
      {
        id: uuidv4(),
        title: "Task 1",
        description: "This is a sample description for Task 1",
      },
      {
        id: uuidv4(),
        title: "Task 2",
        description: "This is a sample description for Task 1",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "In Progress",
    bgColor: "blue",
    tasks: [
      {
        id: uuidv4(),
        title: "Task 3",
        description: "This is a sample description for Task 3",
      },
    ],
  },
  {
    id: uuidv4(),
    title: "Done",
    bgColor: "green",
    tasks: [
      {
        id: uuidv4(),
        title: "Task 4",
        description: "This is a sample description for Task 4",
      },
    ],
  },
];

export { columnsData };
