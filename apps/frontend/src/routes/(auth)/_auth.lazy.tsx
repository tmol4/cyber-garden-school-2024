import { ActionButton, MaterialSymbol, Tab, TabBar, usePresence } from "@star4/react";
import {
  createLazyFileRoute,
  Outlet,
  useLocation,
  useMatchRoute,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useState } from "react";

import styles from "./_auth.module.sass";
import clsx from "clsx";
import { OutletWithPresence } from "~/components/outlet";

export const Route = createLazyFileRoute("/(auth)/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate({ from: "/" });
  const pathname = useLocation({
    select: location => location.pathname,
  });

  const { isMounted, isEntering, isExiting, isVisible } = usePresence({
    source: pathname,
    transitionDuration: [600, 300],
  });

  return (
    <main className={styles["container"]}>
      <TabBar
        value={pathname}
        onValueChange={(value) => navigate({ to: value })}>
          <Tab
            value={"/login"}
            icon={<MaterialSymbol name="login" />}
            label="Вход"
          />
          <Tab
            value={"/register"}
            icon={<MaterialSymbol name="person_add" />}
            label="Регистрация"
          />
      </TabBar>
      <OutletWithPresence mounted={isMounted} />
    </main>
  );
}
