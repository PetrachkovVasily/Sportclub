import { createFileRoute } from "@tanstack/react-router";
import Goals from "../../../components/Goals/Goals";

export const Route = createFileRoute("/profile/$id/goals")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <article
      className={`flex flex-col items-center gap-[24px] p-[16px] py-[24px] rounded-b-[8px] bg-white w-[100%]`}
    >
      <Goals isFull={true} />
    </article>
  );
}
