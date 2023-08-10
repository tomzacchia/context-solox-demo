import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";

export interface Task {
  text: string;
  id: number;
}

interface TasksContext {
  tasks: Task[];
  showTasks: boolean;
}

// 1. Create context object. Specify the properties on the object
const TasksContext = createContext<TasksContext | undefined>(undefined);

const TasksDispatchContext = createContext<Dispatch<TaskAction> | undefined>(
  undefined
);

/**
 * Reusable hook for consuming TasksContext
 */
export function useTasks() {
  // 2. Using the context. By passing in the context object React  rerenders a component that subscribes to this Context object from the cloests matching Provider
  const taskContext = useContext(TasksContext);

  if (!taskContext) {
    throw new Error("Component is not wrapped by task provider");
  }

  return taskContext;
}

export function useTasksDispatch() {
  const dispatch = useContext(TasksDispatchContext);

  if (!dispatch) {
    throw new Error("Component is not wrapped by task provider");
  }

  return dispatch;
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [taskState, dispatch] = useReducer(tasksReducer, {
    showTasks: false,
    tasks: [],
  });

  return (
    /**
     * Two-context pattern: we split apart the state and dispatch provider. This forces us to split apart our child components, one for rendering the list of todos and the todo itself which can dispatch actions
     */
    // 3. Providing context. If any child of <TaskProvider /> of subscribes to TasksContext or TasksDispatchContext give them
    // taskState or dispatch
    <TasksContext.Provider value={taskState}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

type TaskAction =
  | { type: "add"; payload: string }
  | { type: "delete"; payload: number };

function tasksReducer(state: TasksContext, action: TaskAction): TasksContext {
  const { type, payload } = action;
  switch (type) {
    case "add": {
      const newId = state.tasks.length;
      return {
        ...state,
        tasks: [...state.tasks, { id: newId + 1, text: payload }],
      };
    }
    case "delete": {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== payload),
      };
    }
    default: {
      throw Error("Unknown action :( " + type);
    }
  }
}
