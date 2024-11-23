import { createLazyFileRoute } from "@tanstack/react-router";
import { SectionHello } from "~/components/section-hello";
import { Hero } from "~/components/hero";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      {/* <SectionHello /> */}
      <Hero />
    </div>
  )
}
