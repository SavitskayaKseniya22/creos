import { DesignerType } from "../../../../types";

function DesignerPreview({ data }: { data: DesignerType }) {
  const progressProjects = data.issues.filter((item) => item.status === "In Progress").length;
  const doneProjects = data.issues.filter((item) => item.status === "Done").length;
  return (
    <li className="flex flex-col items-center gap-2 rounded-lg border-2 border-indigo-50 p-2">
      <img src={data.avatar} alt="Avatar" className="h-16 w-16 rounded-lg sm:h-20 sm:w-20" />
      <h3 className="text-lg font-bold">{data.username}</h3>
      <h4 className="text-sm font-bold">{data.email}</h4>
      <div>
        {progressProjects}/{doneProjects}
      </div>
    </li>
  );
}

export default function DesignerList({ data }: { data: DesignerType[] }) {
  return (
    <ul className="flex w-full flex-wrap items-center justify-center gap-2">
      {data.map((designer, i) => (
        <DesignerPreview data={designer} key={designer.username + i}></DesignerPreview>
      ))}
    </ul>
  );
}
