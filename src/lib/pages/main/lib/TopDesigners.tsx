import { useTranslation } from "react-i18next";
import { useGetDesignersStatsQuery } from "../../../../store/api";
import { DesignerStatType } from "../../../../types";
import { convertMilliseconds, createDateString } from "../../../../utils";
import ErrorView from "../../../layout/lib/ErrorView";

function DesignerPreview({ data }: { data: DesignerStatType }) {
  const res = convertMilliseconds(data.median);
  const { t } = useTranslation();

  return (
    <li className="flex flex-col items-center gap-2 rounded-lg border-2 border-indigo-50 p-2">
      <img
        src={`https://sandbox.creos.me/media/images/avatars/${data.name}.jpg`}
        alt="Avatar"
        className="h-16 w-16 rounded-lg sm:h-20 sm:w-20"
      />
      <h3 className="text-lg font-bold">{data.name}</h3>
      <div className="flex w-full items-center gap-2 rounded-lg bg-red-50 p-2 dark:bg-gray-900">
        <h4 className="font-bold">
          {t("status.done")} - {data.count}
        </h4>
      </div>
      <div className="flex w-full flex-col items-center rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
        <h4 className="font-bold">{t("date.time")}</h4>
        <span>{createDateString(res, t)}</span>
      </div>
    </li>
  );
}

function DesignerPreviewPlaceholder() {
  return (
    <li className="flex w-32 animate-pulse flex-col items-center gap-2 rounded-lg border-2 border-indigo-50 p-2">
      <div className="h-16 w-16 rounded-lg bg-gray-100 sm:h-20 sm:w-20"></div>
      <h3 className="h-6 w-full rounded-lg bg-gray-100"></h3>
      <div className="h-10 w-full rounded-lg bg-red-50 dark:bg-gray-900"></div>
      <div className="h-16 w-full rounded-lg bg-gray-100 dark:bg-gray-800"></div>
    </li>
  );
}

export default function TopDesigners() {
  const { data, error, isLoading } = useGetDesignersStatsQuery();
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h2 className="text-xl font-bold">{t("titles.designers")}</h2>
      {error && <ErrorView></ErrorView>}
      {isLoading && (
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {new Array(10).fill(0).map((_, i) => {
            return <DesignerPreviewPlaceholder key={i}></DesignerPreviewPlaceholder>;
          })}
        </ul>
      )}
      {data && (
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {data.slice(0, 10).map((designer) => {
            return <DesignerPreview data={designer} key={designer.name}></DesignerPreview>;
          })}
        </ul>
      )}
    </div>
  );
}
