import { useGetCommentsQuery } from "../../../../store/api";
import { CommentType } from "../../../../types";
import { getTimePast } from "../../../../utils";

function Comment({ data }: { data: CommentType }) {
  const { days, hours, minutes, seconds } = getTimePast(data.date_created);
  return (
    <li className="flex flex-col gap-2 rounded-lg border-2 border-indigo-50 p-2 sm:p-4">
      <div className="flex w-full gap-8 self-start rounded-lg">
        <img src={data.designer.avatar} alt="Avatar" className="h-16 w-16 rounded-lg sm:h-20 sm:w-20" />
        <div className="flex flex-col items-start justify-between gap-2 sm:gap-4">
          <h3 className="text-lg font-bold">{data.designer.username}</h3>
          <p className="rounded-lg bg-red-50 p-1 dark:bg-gray-900 sm:p-2">{data.issue}</p>
        </div>
        <p className="ml-auto self-start text-center">
          {(days && `${days} days ago`) ||
            (hours && `${hours} hours ago`) ||
            (minutes && `${minutes} minutes ago`) ||
            (seconds && `${seconds} seconds ago`)}
        </p>
      </div>

      <p className="rounded-lg bg-gray-100 p-2 indent-4 dark:bg-gray-800 sm:p-4">{data.message}</p>
    </li>
  );
}

function CommentPlaceholder() {
  return (
    <li className="flex animate-pulse flex-col gap-2 rounded-lg border-2 border-indigo-50 p-2 sm:p-4">
      <div className="flex w-full gap-4 self-start rounded-lg sm:gap-8">
        <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-100 sm:h-20 sm:w-20"></div>
        <div className="flex flex-col items-start justify-between gap-2 sm:gap-4">
          <div className="h-6 w-24 rounded-lg bg-gray-100 sm:h-8"></div>
          <div className="h-6 w-20 rounded-lg bg-red-50 sm:h-8"></div>
        </div>
        <div className="ml-auto h-6 w-full self-start rounded-lg bg-gray-100 sm:h-8 sm:w-52"></div>
      </div>
      <div className="h-16 w-full rounded-lg bg-gray-100"></div>
    </li>
  );
}

export default function Comments() {
  const { data, error, isLoading } = useGetCommentsQuery();

  if (error) {
    throw error;
  }

  return (
    <div className="flex h-full w-full flex-col gap-4">
      <h2 className="text-xl font-bold">Last comments</h2>
      {data && (
        <ul className="flex flex-col gap-4">
          {data
            .slice(-10)
            .reverse()
            .map((comment) => {
              return <Comment key={comment.id} data={comment}></Comment>;
            })}
        </ul>
      )}
      {isLoading && (
        <ul className="flex flex-col gap-4">
          {new Array(10).fill(0).map((_, i) => {
            return <CommentPlaceholder key={i}></CommentPlaceholder>;
          })}
        </ul>
      )}
    </div>
  );
}
