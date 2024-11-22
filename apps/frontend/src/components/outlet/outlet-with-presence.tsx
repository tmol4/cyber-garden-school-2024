import { createIdentifiableElement } from "@star4/react"
import { getRouterContext, Match, Outlet, useMatches, useRouter, useRouterState } from "@tanstack/react-router";
import { memo, Suspense, useContext, useRef } from "react"

export namespace OutletWithPresence {
  export type Props = {
    mounted?: boolean;
  }
}

const OutletWithPresenceComponent = function(
  {
    mounted: isPresent = true,
  }: OutletWithPresence.Props,
) {
  const matches = useMatches();
  const prevMatches = useRef(matches);

  const RouterContext = getRouterContext();
  const routerContext = useContext(RouterContext);

  let renderedContext = routerContext;


  // const isPresent = useRef(true);

  // if (isPresent.current) {
  //   const clone = cloneDeep(routerContext);
  //   clone.options.context = routerContext.options.context;
  //   renderedContext.current = clone;
  // }

  if (isPresent) {
    // prevMatches.current = structuredClone(matches);
    // prevMatches.current = structuredClone(matches);
    prevMatches.current = [...matches]
  } else {
    // renderedContext = structuredClone(routerContext);
    renderedContext = {...routerContext} as typeof routerContext
    renderedContext.__store.state.matches = [
      ...matches.map((m, i) => ({
        ...(prevMatches.current[i] || m),
        id: m.id,
      })),
      ...prevMatches.current.slice(matches.length),
    ];
  }


  return (
    <RouterContext.Provider value={renderedContext}>
      <Outlet />
    </RouterContext.Provider>
  )
}

export const OutletWithPresence = Object.assign(
  memo(OutletWithPresenceComponent),
  createIdentifiableElement("IS_OUTLET_WITH_PRESENCE"),
);
