import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/club")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/club"!</div>;
}
