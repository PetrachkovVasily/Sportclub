import { createFileRoute } from "@tanstack/react-router";
import CompleteInfo from "../../components/CompleteInfo/CompleteInfo";

export const Route = createFileRoute("/profile/stats")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CompleteInfo />;
}
