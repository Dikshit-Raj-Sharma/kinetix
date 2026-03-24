<div align="center">
  <img src="public/kinetix-icon.png" alt="Kinetix Logo" width="120" height="120">
  
  # KINETIX
  **Work Flow Platform**

  <p>
    A high-performance, fully responsive Kanban board application built with React.<br>
    Features smooth drag-and-drop physics, mobile optimization, and persistent local storage.
  </p>

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started)

</div>

---

## 🚀 Overview

**Kinetix** is a modern task management tool designed to be fast, fluid, and intuitive. Built with a premium glassmorphism aesthetic, it leverages the power of `@dnd-kit` to provide a robust drag-and-drop experience alongside built-in priority sorting and real-time optimistic updates.

The application supports complex interactions like vertical task sorting, horizontal column reordering, and cross-column transfers, all backed by a custom collision detection algorithm for maximum precision.
<a id="features"></a>

## ✨ Features

### 🖱️ Drag & Drop Mechanics

- **Task Management:** Move tasks freely between columns or reorder them within a list.
- **Column Reordering:** Drag entire columns horizontally to reorganize your workflow.
- **Optimistic UI:** Instant visual feedback with drop shadows, scaling, and transparency effects during drag operations.
- **Smart Collision:** Uses a hybrid algorithm (`pointerWithin` for columns, `closestCorners` for tasks) to prevent layout thrashing.

### 📱 Responsive & Mobile-First

- **Touch Optimized:** Prevents "pull-to-refresh" interference for a native app feel.
- **Snap Scrolling:** CSS Scroll Snapping (`snap-x`) ensures columns lock into place on mobile screens.
- **Dynamic Viewport:** Uses `h-dvh` to handle mobile browser address bars gracefully.

### 🛠️ Functionality

- **Full CRUD:** Create, Read, Update, and Delete both Tasks and Columns.
- **Inline Editing:** Rename columns or tasks directly on the board with keyboard support (`Enter` to save, `Esc` to cancel).
- **Data Persistence:** Automatically saves your board state to `localStorage`.
- - **Priority System:** Assign High, Medium, or Low priority to tasks with interactive, color-coded badges.
- **Auto-Sorting:** Instantly organize columns by priority (High to Low) with a single click using the built-in sorting algorithm.

### 🎨 Premium UI/UX

- **Glassmorphism Design:** Beautiful frosted-glass columns and floating task cards that blend seamlessly with the background.
- **Workspace Grid:** A custom, subtle dotted radial grid background mimicking a professional engineering canvas.
- **Visual Affordances:** Interactive hover states and intuitive icons (like priority chevrons) guide user behavior naturally.

<a id="tech-stack"></a>

## 💻 Tech Stack

- **Framework:** [React](https://reactjs.org/) (Vite)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Drag & Drop:** [@dnd-kit/core](https://dndkit.com/) & `@dnd-kit/sortable`
- **Icons:** [Lucide React](https://lucide.dev/)
- **Utilities:** `uuid` for unique ID generation

<a id="getting-started"></a>

## 📦 Getting Started

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation

1.  **Clone the repository**

    ```bash
    git clone [https://github.com/Dikshit-Raj-Sharma/kinetix.git](https://github.com/Dikshit-Raj-Sharma/kinetix.git)
    cd kinetix
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**

    ```bash
    npm run dev
    ```

4.  Open your browser to `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```text
src/
├── assets/              # Static assets and images
├── components/
│   ├── Columns.jsx      # Column list component (Drag source & drop target)
│   └── Task.jsx         # Individual task card (Sortable item)
├── context/
│   └── boardContext.jsx # State management (CRUD logic & LocalStorage)
├── data/
│   └── initialData.js   # Starter data for new users
├── hooks/
│   └── useDragHandler.js # Custom hook isolating Dnd-Kit sensors & logic
├── App.jsx              # Main layout & DndContext provider
└── main.jsx             # Entry point
```

## 🎮 Usage Guide

- **➕ Add Column:** Click the large **"Add Column"** button on the right.
- **📝 Add Task:** Click **"+ Add Task"** at the bottom of any column.
- **✏️ Edit Tasks:** Hover over a task → ✏️ Pencil icon.
- **✏️ Edit Columns:** Hover over column header → ✏️ Pencil icon.
- **🗑️ Delete:** Click the 🗑️ Trash icon (confirmation required).
- **🔀 Reorder:** Drag any task or column title to rearrange.
- **🔴 Set Priority:** Click the priority badge (e.g., "Low", "Med", "High") on any task to cycle through importance levels.
- **↕️ Auto-Sort:** Click the Up/Down arrow icon in any column header to instantly sort its tasks from High to Low priority.
