import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/visibleLayout")({
  component: () => (
    <div>
      <p>This layout is visible in the URL 👀</p>
      <Link to="/visibleLayout/foo">Foo</Link>{" "}
      <Link to="/visibleLayout/bar">Bar</Link>
      <hr />
      <Outlet />
    </div>
  ),
  notFoundComponent: () => (
    <div>I'm the Not found page, inside /visibleLayout</div>
  ),
});
