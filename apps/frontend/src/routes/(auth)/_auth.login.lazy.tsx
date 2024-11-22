import { Button, MaterialSymbol } from "@star4/react";
import { createLazyFileRoute } from "@tanstack/react-router";

import styles from "./_auth.login.module.sass";

export const Route = createLazyFileRoute("/(auth)/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={styles["container"]}>
      <Button
        variant="filled"
        icon={<MaterialSymbol name="login" />}
        label="Войти"
      />
    </div>
  );
}
