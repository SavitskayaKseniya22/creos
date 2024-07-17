import { useEffect, useState } from "react";
import { useGetDesignersQuery } from "../../../store/api";
import SortControl from "./lib/SortControl";
import Projects from "./lib/Projects";
import StatusControl from "./lib/StatusControl";
import DesignerList from "./lib/DesignersList";
import { useTranslation } from "react-i18next";
import Spinner from "../../layout/lib/Spinner";

export default function Designers() {
  const [pageNumber, setPageNumber] = useState(1);

  const [sortValue, setSortValue] = useState<string>("username");
  const [project, setProject] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const { t } = useTranslation();

  const { data, error, isLoading } = useGetDesignersQuery({
    page: pageNumber,
    ordering: sortValue,
    status: status || undefined,
    key: project || undefined,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  if (error) {
    throw error;
  }

  return (
    <div className="flex w-full flex-col gap-8">
      <h2 className="text-xl font-bold">{t("titles.designers")}</h2>

      <div className="flex items-center gap-4">
        <button
          type="button"
          className="rounded-md bg-indigo-50 px-4 py-2 disabled:opacity-50 dark:bg-gray-800"
          disabled={pageNumber === 1}
          onClick={() => {
            setPageNumber((a) => a - 1);
          }}
        >
          {t("page.prev")}
        </button>
        {pageNumber}
        <button
          type="button"
          className="rounded-md bg-indigo-50 px-4 py-2 disabled:opacity-50 dark:bg-gray-800"
          disabled={data?.next === null}
          onClick={() => {
            setPageNumber((a) => a + 1);
          }}
        >
          {t("page.next")}
        </button>
      </div>

      <div className="flex flex-col items-center gap-4">
        <SortControl
          onChange={(value) => {
            setSortValue(value);
            setPageNumber(1);
          }}
        ></SortControl>

        <Projects
          onChange={(value) => {
            if (value === "none") {
              setProject(null);
            } else {
              setProject(value);
            }
            setPageNumber(1);
          }}
        ></Projects>

        <StatusControl
          onChange={(value) => {
            if (value === "none") {
              setStatus(null);
            } else {
              setStatus(value);
            }
            setPageNumber(1);
          }}
        ></StatusControl>
      </div>

      {isLoading && <Spinner></Spinner>}

      {data && data.results.length > 0 && <DesignerList data={data.results}></DesignerList>}
      {data && !data.results.length && <p className="m-auto self-center">{t("emptysearch")}</p>}
    </div>
  );
}
