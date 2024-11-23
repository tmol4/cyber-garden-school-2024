import { createLazyFileRoute } from "@tanstack/react-router";
import { SectionHello } from "~/components/section-hello";
import { Hero } from "~/components/hero-old";
import { LastSection } from "~/components/lastSection/lastSection";

import styles from "./index.module.sass";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className={styles["page"]}>
      {/* <SectionHello /> */}
        <LastSection />
    </main>
  )
}
