import { createLazyFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return "Hello /_auth/register!";
}

export const Route = createLazyFileRoute("/(auth)/_auth/register")({
  component: RouteComponent,
});
