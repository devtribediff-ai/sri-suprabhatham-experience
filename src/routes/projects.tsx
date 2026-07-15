import { createFileRoute, Outlet } from "@tanstack/react-router";

/** Layout route for /projects/* — its child leaves mount via <Outlet />. */
export const Route = createFileRoute("/projects")({
  component: () => <Outlet />,
});
