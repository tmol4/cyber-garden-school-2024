import { createLazyFileRoute } from "@tanstack/react-router";
import { SectionHello } from "~/components/section-hello";
import { Hero } from "~/components/hero-old";

import styles from "./index.module.sass";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className={styles["page"]}>
      {/* <SectionHello /> */}
      <div className={styles["hero"]}>
        <Hero />
      </div>
    </main>
  )
}
