import { Lenis } from "@star4/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const TanStackRouterDevtools =
  import.meta.env.DEV
    ? lazy(() => import("@tanstack/router-devtools")
        .then(
          (module) => ({ default: module.TanStackRouterDevtools })
        ),
      )
    : () => undefined;

export const Route = createRootRoute({
  component: () => (
    <>
      <Lenis>
        <Outlet />
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </Lenis>
    </>
  ),
})
