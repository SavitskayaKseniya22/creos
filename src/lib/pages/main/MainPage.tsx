import Comments from "./lib/Comments";
import TopDesigners from "./lib/TopDesigners";

export default function MainPage() {
  return (
    <div className="flex flex-col gap-8">
      <TopDesigners></TopDesigners>
      <Comments></Comments>
    </div>
  );
}
