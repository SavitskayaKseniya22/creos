import { FormEvent } from "react";

export default function SortControl({ onChange }: { onChange: (value: string) => void }) {
  return (
    <form
      onChange={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const sortValue = formData.get("sort");
        if (sortValue) {
          onChange(sortValue as string);
        }
      }}
    >
      <select
        name="sort"
        className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm dark:border-gray-800 dark:bg-gray-800"
        defaultValue="username"
      >
        <option value="username">Name Up</option>
        <option value="-username">Name Down</option>
        <option value="email">Email Up</option>
        <option value="-email">Email Down</option>
      </select>
    </form>
  );
}
