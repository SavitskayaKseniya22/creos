import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <ul className="m-auto flex flex-col gap-2 text-center sm:flex-row sm:gap-8">
      <li>
        <NavLink
          to="/"
          className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) => (isPending ? "pending" : isActive ? "active" : "")} px-2 py-1 sm:px-4 sm:py-2`}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/designers"
          className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) => (isPending ? "pending" : isActive ? "active" : "")} px-2 py-1 sm:px-4 sm:py-2`}
        >
          Designers
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tasks"
          className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) => (isPending ? "pending" : isActive ? "active" : "")} px-2 py-1 sm:px-4 sm:py-2`}
        >
          Tasks
        </NavLink>
      </li>
    </ul>
  );
}
