import Counter from "../Counter";
import { Task, useTasks, useTasksDispatch } from "./TasksContext";

export default function TaskList() {
  const { tasks } = useTasks();

  return (
    <div className="mt-4 p-4 border-2 border-green-500">
      <ul className="mt-5 w-[250px]">
        {tasks.map((task) => (
          <li className="mt-2" key={task.id}>
            <Task task={task} />
          </li>
        ))}
      </ul>
      <Counter message="<TaskList />" />
    </div>
  );
}

/**
 * <Task /> is a child of <TaskList />, which itself is a child of <App />
 * Task is able to make use of dispatch, provided in App, without needing to use prop-drilling which would entail passing dispatch via
 * <TaskList />
 */
function Task({ task }: { task: Task }) {
  const dispatch = useTasksDispatch();

  function onDeleteClick() {
    dispatch({ type: "delete", payload: task.id });
  }

  return (
    <div className="flex items-center justify-between gap-4 border-2 border-green-500 px-8">
      <p className="m-0">{task.text}</p>
      <button className="bg-slate-500 text-white" onClick={onDeleteClick}>
        X
      </button>
    </div>
  );
}
