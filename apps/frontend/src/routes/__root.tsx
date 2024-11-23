import { Divider, Lenis } from "@star4/react";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { lazy, Suspense, type HTMLAttributes } from "react";
import { Glossary } from "~/components/glossary";
import { Header } from "~/components/header";
import { MDXProvider } from "@mdx-js/react";

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
    <MDXProvider
      components={{
        hr: (props) => <Divider {...props as HTMLAttributes<HTMLElement>} />,
      }}>
        <Lenis>
          <Header headline="Budget helper" trailing={<Glossary />} />
          <Outlet />
          <Suspense>
            <TanStackRouterDevtools />
          </Suspense>
        </Lenis>
    </MDXProvider>
  ),
})
