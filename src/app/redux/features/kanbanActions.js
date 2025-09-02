import { createSlice, nanoid } from "@reduxjs/toolkit";

// Dummy Task
const dummyTask = {
  id: nanoid(),
  title: "✨ Add your first task",
  description: "Create a new task to get started with your to-do list.",
  status: "To Do",
  assignTo: "1",
  startDate: "2025-07-30",
  endDate: "2025-08-10",
};

// Initial State
const initialState = {
  columnsData: [
    {
      id: nanoid(),
      columnName: "To Do",
      columnColor: "gray",
      tasks: [],
    },
    {
      id: nanoid(),
      columnName: "In Progress",
      columnColor: "blue",
      tasks: [],
    },
    {
      id: nanoid(),
      columnName: "Done",
      columnColor: "green",
      tasks: [],
    },
  ],
  searchQuery: "",
  setFilterUser: null,
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
      let { columnName, columnColor } = action.payload;

      // Prevent duplicate column names
      const columnNameExists = state.columnsData.some(
        (col) => col.columnName.toLowerCase() === columnName.toLowerCase()
      );
      if (columnNameExists) {
        if (typeof window !== "undefined") {
          alert("Use another column name, it's already exists!");
        }
        return;
      }

      // Pick random color if not provided
      const colors = ["yellow", "red", "pink", "purple", "indigo"];
      if (!columnColor) {
        columnColor = colors[Math.floor(Math.random() * colors.length)];
      }

      state.columnsData.push({
        id: nanoid(),
        columnName: columnName,
        columnColor,
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
      const { id, title, description, status, assignTo, startDate, endDate } =
        action.payload;

      // Prevent duplicate Task Title
      const taskNameExists = state.columnsData.some((col) =>
        col.tasks.some(
          (task) => task.title.toLowerCase() === title.toLowerCase()
        )
      );
      if (taskNameExists) {
        if (typeof window !== "undefined") {
          alert("Use another task Title, it's already exists!");
        }
        return;
      }

      // Find column by status (title)
      const column = state.columnsData.find(
        (col) => col.columnName.toLowerCase() === status.toLowerCase()
      );

      if (column) {
        column.tasks.push({
          id: id || nanoid(),
          title,
          description,
          status,
          assignTo,
          startDate,
          endDate,
        });
      } else {
        if (typeof window !== "undefined") {
          alert(`Column "${status}" not found!`);
        }
      }
    },

    editTask: (state, action) => {
      const { taskId, updates } = action.payload;

      // Find the column where the task is currently
      let currentColumn = null;
      let taskIndex = -1;

      for (const col of state.columnsData) {
        taskIndex = col.tasks.findIndex((t) => t.id === taskId);
        if (taskIndex !== -1) {
          currentColumn = col;
          break;
        }
      }

      if (currentColumn) {
        const task = currentColumn.tasks[taskIndex];

        // If status is updated
        if (updates.status && updates.status !== task.status) {
          // Remove from current column
          currentColumn.tasks.splice(taskIndex, 1);

          // Find new column based on status
          const newColumn = state.columnsData.find(
            (c) => c.columnName.toLowerCase() === updates.status.toLowerCase()
          );

          if (newColumn) {
            // Update task and move to new column
            newColumn.tasks.push({ ...task, ...updates });
          }
        } else {
          // Just update inside same column
          Object.assign(task, updates);
        }
      }
    },

    deleteTask: (state, action) => {
      const taskId = action.payload;
      for (const col of state.columnsData) {
        col.tasks = col.tasks.filter((t) => t.id !== taskId);
      }
    },

    // Search Task
    searchTask: (state, action) => {
      state.searchQuery = action.payload.toLowerCase();
    },

    // FIlter Task by Assigned user
    setFilterUser: (state, action) => {
      state.filterUser = action.payload;
    },
  },
});

export const {
  addColumn,
  deleteColumn,
  addTask,
  editTask,
  deleteTask,
  searchTask,
  setFilterUser,
} = columnsSlice.actions;

// Selector to get task by ID
export const selectTaskById = (state, taskId) => {
  for (const col of state.columns.columnsData) {
    const task = col.tasks.find((t) => t.id === taskId);
    if (task) return task;
  }
  return null;
};

// for Search Task
export const searchTaskByTitle = (state) => {
  const { columnsData, searchQuery } = state.columns;

  if (!searchQuery) return columnsData;

  return columnsData.map((col) => ({
    ...col,
    tasks: col.tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery)
    ),
  }));
};

// Filter Task by User
export const selectFilteredColumns = (state) => {
  const { columnsData, searchQuery, filterUser } = state.columns;
  console.log("Current filterUser:", filterUser);
  console.log(
    "Filtering columns with searchQuery:",
    searchQuery,
    "and filterUser:",
    filterUser
  );

  return columnsData.map((col) => ({
    ...col,
    tasks: col.tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery);
      
      const matchesUser = !filterUser || task.assignTo == filterUser;
      return matchesSearch && matchesUser;
    }),
  }));
};

export default columnsSlice.reducer;
