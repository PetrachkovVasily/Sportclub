import { createFileRoute } from "@tanstack/react-router";
import Goals from "../../components/Goals/Goals";

export const Route = createFileRoute("/profile/goals")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Goals />;
}
