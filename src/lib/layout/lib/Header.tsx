import LangPicker from "./LangPicker";
import ThemePicker from "./ThemePicker";
import WeekNumber from "./WeekNumber";

export default function Header() {
  return (
    <header className="container flex items-center gap-2 rounded-md bg-white p-2 dark:bg-gray-700">
      <LangPicker></LangPicker>
      <ThemePicker></ThemePicker>
      <WeekNumber></WeekNumber>
    </header>
  );
}
