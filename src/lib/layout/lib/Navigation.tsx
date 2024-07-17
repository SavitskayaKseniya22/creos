import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Navigation() {
  const { t } = useTranslation();
  return (
    <ul className="flex flex-col justify-center gap-2 text-center sm:flex-row sm:gap-8">
      <li>
        <NavLink
          to="/"
          className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) => (isPending ? "pending" : isActive ? "active" : "")} px-2 py-1 sm:px-4 sm:py-2`}
        >
          {t("titles.home")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/designers"
          className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) => (isPending ? "pending" : isActive ? "active" : "")} px-2 py-1 sm:px-4 sm:py-2`}
        >
          {t("titles.designers")}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/tasks"
          className={`${({ isActive, isPending }: { isActive: boolean; isPending: boolean }) => (isPending ? "pending" : isActive ? "active" : "")} px-2 py-1 sm:px-4 sm:py-2`}
        >
          {t("titles.tasks")}
        </NavLink>
      </li>
    </ul>
  );
}
