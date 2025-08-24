import { createSlice, nanoid } from "@reduxjs/toolkit";

// Dummy Task
const dummyTask = {
  id: nanoid(),
  title: "✨ Add your first task",
  description: "Create a new task to get started with your to-do list.",
  status: "To Do",
};

// Initial State
const initialState = {
  columnsData: [
    {
      id: nanoid(),
      title: "To Do",
      bgColor: "gray",
      tasks: [],
    },
    {
      id: nanoid(),
      title: "In Progress",
      bgColor: "blue",
      tasks: [],
    },
    {
      id: nanoid(),
      title: "Done",
      bgColor: "green",
      tasks: [],
    },
  ],
};

// Add dummy task if all columns are empty
const allEmpty = initialState.columnsData.every(
  (col) => col.tasks.length === 0
);
if (allEmpty) {
  initialState.columnsData[0].tasks.push(dummyTask);
}

export const columnsSlice = createSlice({
  name: "columns",
  initialState,
  reducers: {
    // ========== COLUMN OPERATIONS ==========
    addColumn: (state, action) => {
      let { title, bgColor } = action.payload;

      // Prevent duplicate column names
      const titleExists = state.columnsData.some(
        (col) => col.title.toLowerCase() === title.toLowerCase()
      );
      if (titleExists) {
        if (typeof window !== "undefined") {
          alert("Use another column name, it's already exists!");
        }
        return;
      }

      // Pick random color if not provided
      const colors = ["yellow", "red", "pink", "purple", "indigo"];
      if (!bgColor) {
        bgColor = colors[Math.floor(Math.random() * colors.length)];
      }

      state.columnsData.push({
        id: nanoid(),
        title,
        bgColor,
        tasks: [],
      });
    },

    deleteColumn: (state, action) => {
      state.columnsData = state.columnsData.filter(
        (col) => col.id !== action.payload
      );
    },

    // ========== TASK OPERATIONS ==========
    addTask: (state, action) => {
      const { id, title, description, status } = action.payload;

      // Find column by status (title)
      const column = state.columnsData.find(
        (col) => col.title.toLowerCase() === status.toLowerCase()
      );

      if (column) {
        column.tasks.push({
          id: id || nanoid(),
          title,
          description,
          status,
        });
      } else {
        if (typeof window !== "undefined") {
          alert(`Column "${status}" not found!`);
        }
      }
    },

    editTask: (state, action) => {
      const { taskId, updates } = action.payload;

      // Find column containing this task
      for (const col of state.columnsData) {
        const task = col.tasks.find((t) => t.id === taskId);
        if (task) {
          Object.assign(task, updates);
          break;
        }
      }
    },

    deleteTask: (state, action) => {
      const { taskId } = action.payload;

      for (const col of state.columnsData) {
        col.tasks = col.tasks.filter((t) => t.id !== taskId);
      }
    },
  },
});

export const { addColumn, deleteColumn, addTask, editTask, deleteTask } =
  columnsSlice.actions;

export default columnsSlice.reducer;
