import { Divider, Lenis } from "@star4/react";
import { createRootRoute, createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { lazy, Suspense, type HTMLAttributes } from "react";
import { Glossary } from "~/components/glossary";
import { Header } from "~/components/header";
import { MDXProvider } from "@mdx-js/react";
import { AppContextProvider } from "~/components/context";
import type { QueryClient } from "@tanstack/react-query";

const TanStackRouterDevtools =
  import.meta.env.DEV
    ? lazy(() => import("@tanstack/router-devtools")
        .then(
          (module) => ({ default: module.TanStackRouterDevtools })
        ),
      )
    : () => undefined;

const ReactQueryDevtools =
  import.meta.env.DEV
    ? lazy(() => import("@tanstack/react-query-devtools")
        .then(
          (module) => ({ default: module.ReactQueryDevtools })
        ),
      )
    : () => undefined;

type RootRouteContext = {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({

  component: () => (
    <MDXProvider
      components={{
        hr: (props) => <Divider {...props as HTMLAttributes<HTMLElement>} />,
      }}>
        <Lenis>
          <AppContextProvider>
            <Header headline="Budget helper" trailing={<Glossary />} />
            <Outlet />
            <Suspense>
              <ReactQueryDevtools />
              <TanStackRouterDevtools />
            </Suspense>
          </AppContextProvider>
        </Lenis>
    </MDXProvider>
  ),
})
