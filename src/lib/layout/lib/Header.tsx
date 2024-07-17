import LangPicker from "./LangPicker";
import Navigation from "./Navigation";
import ThemePicker from "./ThemePicker";
import WeekNumber from "./WeekNumber";

export default function Header() {
  return (
    <header className="container flex items-center justify-between gap-2 rounded-md bg-white px-4 py-2 dark:bg-gray-700">
      <div className="flex flex-col gap-2 sm:flex-row">
        <LangPicker></LangPicker>
        <ThemePicker></ThemePicker>
      </div>
      <Navigation></Navigation>
      <WeekNumber></WeekNumber>
    </header>
  );
}
