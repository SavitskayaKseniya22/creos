import { useGetDoneIssuesQuery } from "../../../../store/api";
import { ParsedIssueArrayType } from "../../../../types";
import { convertMilliseconds, createDateString } from "../../../../utils";

function DesignerPreview({ data }: { data: ParsedIssueArrayType }) {
  const res = convertMilliseconds(data.median);

  return (
    <li className="flex flex-col items-center gap-2 rounded-lg border-2 border-indigo-50 p-2">
      <img
        src={`https://sandbox.creos.me/media/images/avatars/${data.name}.jpg`}
        alt="Avatar"
        className="h-16 w-16 rounded-lg sm:h-20 sm:w-20"
      />
      <h3 className="text-lg font-bold">{data.name}</h3>

      <div className="flex w-full items-center gap-2 rounded-lg bg-red-50 p-2 dark:bg-gray-900">
        <h4 className="font-bold">Done: </h4>
        <span className="font-bold">{data.count}</span>
      </div>
      <div className="flex w-full flex-col rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
        <h4 className="font-bold">Median time:</h4>
        <span className="self-center">{createDateString(res)}</span>
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
  const { data, error, isLoading } = useGetDoneIssuesQuery();

  if (error) {
    throw error;
  }
  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h2 className="text-xl font-bold">Top designers</h2>
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
