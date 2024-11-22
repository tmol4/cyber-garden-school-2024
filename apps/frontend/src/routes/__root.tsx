import { Lenis } from "@star4/react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
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
      {/* <div>
        <Link to="/">
          Home
        </Link>{' '}
        <Link to="/about">
          About
        </Link>
      </div>
      <hr /> */}
      <Lenis>
        <Outlet />
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </Lenis>
    </>
  ),
})
