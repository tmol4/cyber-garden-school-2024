import { createLazyFileRoute } from "@tanstack/react-router";
import { SectionHello } from "../components/section-hello";

function Index() {
  return (
    <div>
      <SectionHello />
    </div>
  )
}

export const Route = createLazyFileRoute("/")({
  component: Index,
});
