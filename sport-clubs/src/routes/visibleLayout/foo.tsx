import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/visibleLayout/foo"
)({
  component: () => <div>Hello /(hidden-folder)/layouts/visibleLayout/foo!</div>,
});
