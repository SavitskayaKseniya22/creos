import { FormEvent } from "react";

export default function WeekPicker({ onChange }: { onChange: (value: string) => void }) {
  return (
    <form
      className="w-20"
      onChange={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const weekValue = formData.get("week");
        if (weekValue) {
          onChange(weekValue as string);
        }
      }}
    >
      <select
        name="week"
        className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm dark:border-gray-800 dark:bg-gray-800"
        defaultValue="8"
      >
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
        <option value="12">12</option>
        <option value="14">14</option>
      </select>
    </form>
  );
}
