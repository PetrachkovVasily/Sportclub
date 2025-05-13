import { createFileRoute } from "@tanstack/react-router";
import CompleteInfo from "../../../components/CompleteInfo/CompleteInfo";

export const Route = createFileRoute("/profile/$id/stats")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <CompleteInfo id={id} />;
}
