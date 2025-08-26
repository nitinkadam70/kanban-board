# Kanban Board

This is a **Kanban Board** project built using **Next.js** and **Tailwind CSS**. It allows users to manage tasks across multiple columns with drag-and-drop functionality, search, filters, and persistent state.

---

## Project Setup

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

## Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open http://localhost:3000
in your browser to see the project. The page auto-updates as you edit files.

## Build and Start for Production

```bash
 npm run build
npm run start
```

## Tech Stack
- Next.js – Provides fast setup, React optimizations, and easy deployment with Vercel.

- React – For building the UI components.

- Tailwind CSS – Utility-first CSS framework for rapid and responsive styling.

- Redux Toolkit – State management for task and column data.

- Redux Persist – Persist board state in localStorage.

- @iconify/react – Icons for UI elements.
````

## Features

Board Layout: Default 3 columns (To Do, In Progress, Done) with the ability to add and delete custom columns.

- Task Management: Add, edit, delete tasks with title, description, status, start date, end date, and assign tasks to users.

- Drag & Drop: Smooth movement of tasks between columns.

- Persistence: Task and board state saved in localStorage using Redux Persist.

- Search & Filter: Quickly find tasks by name or assigned user.

- Responsive UI: Works well on desktop, tablet, and mobile devices.

## File Structure

- app/page.js – Main entry page of the app.

- components/ – React components for tasks, columns, filters, and buttons.

- redux/ – Redux slices, actions, and store configuration.
