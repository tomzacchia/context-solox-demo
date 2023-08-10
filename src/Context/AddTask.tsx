import { useRef } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTasks, useTasksDispatch } from "./TasksContext";
import Counter from "../Counter";

function AddTask() {
  // Highlight: benefit of 2 context approach, splitting state from dispatch to minimize unecessary renders
  const dispatch = useTasksDispatch();
  const input = useRef<HTMLInputElement>(null);

  // Demo: destructuring specific properties from context will cause re-renders even if the previous context's value did not change
  // const { showTasks } = useTasks();

  function onAddTasks(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();

    const value = input.current?.value;

    if (!value) {
      return;
    }

    dispatch({ type: "add", payload: value });
    input.current.value = "";
  }

  return (
    <div className="mt-4 p-4 border-2 border-red-400">
      <form className="flex gap-4">
        <fieldset>
          <input
            className="border-2 w-[200px] p-2"
            ref={input}
            type="text"
            placeholder="new task"
          />
        </fieldset>
        <button onClick={onAddTasks}>Add</button>
      </form>
      <Counter message="<AddTask />" />
    </div>
  );
}

// Overriding context provider
/**
 * function AddTaskWarpper() {
 *  return <TasksContext.Provider value={}>
 *    <AddTask />
 *   <TasksContext.Provider />
 * }
 */

export default AddTask;
