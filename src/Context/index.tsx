import AddTask from "./AddTask";
import "./style.css";
import TaskList from "./TaskList";
import { TaskProvider } from "./TasksContext";

export default function App() {
  return (
    <TaskProvider>
      <div className="p-4">
        <h1>My todo list</h1>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}
