import LangPicker from "./LangPicker";
import ThemePicker from "./ThemePicker";

export default function Header() {
  return (
    <header className="container flex gap-2 rounded-md bg-white p-2 dark:bg-gray-700">
      <LangPicker></LangPicker>
      <ThemePicker></ThemePicker>
    </header>
  );
}
