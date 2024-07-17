import { useTranslation } from "react-i18next";
import { DesignerType, PartType } from "../../../../types";
import { getPartForStatus } from "../../../../utils";

function DesignerPreview({ data }: { data: DesignerType }) {
  const { progress, done } = getPartForStatus(data.issues, PartType.VALUE);
  const { t } = useTranslation();

  return (
    <li className="flex flex-col items-center gap-2 rounded-lg border-2 border-indigo-50 p-2">
      <img src={data.avatar} alt="Avatar" className="h-16 w-16 rounded-lg sm:h-20 sm:w-20" />
      <h3 className="text-lg font-bold">{data.username}</h3>
      <h4 className="text-sm font-bold">{data.email}</h4>

      <div className="flex w-full items-center gap-2 rounded-lg bg-green-50 p-2 dark:bg-gray-900">
        <h4 className="font-bold">
          {t("status.inprogress")} - {progress}
        </h4>
      </div>
      <div className="flex w-full flex-col rounded-lg bg-red-50 p-2 dark:bg-gray-800">
        <h4 className="font-bold">
          {t("status.done")} - {done}
        </h4>
      </div>
    </li>
  );
}

export default function DesignerList({ data }: { data: DesignerType[] }) {
  return (
    <ul className="flex w-full flex-wrap items-center justify-center gap-2">
      {data.map((designer, i) => {
        return <DesignerPreview data={designer} key={designer.username + i}></DesignerPreview>;
      })}
    </ul>
  );
}
