import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="grid grid-rows-[100px_1fr] w-full h-full">
      <nav className="row-span-1">
        <ul className="flex gap-2 p-4">
          <Link
            className="border-2 rounded border-slate-500 py-2 px-4"
            to="/context"
          >
            Context
          </Link>
          <Link
            className="border-2 rounded border-slate-500 py-2 px-4"
            to="/solox"
          >
            Solox
          </Link>
        </ul>
      </nav>

      <div className="row-span-2">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
